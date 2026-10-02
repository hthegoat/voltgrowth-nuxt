/**
 * Go Kugs Volt lead webhook + Google Ads offline conversions.
 *
 * - doPost: each form submission adds a row to the first tab and emails you.
 * - onEdit: when you set a lead's Status to "Qualified" or "Signed", and the lead came
 *   from a Google Ads click (has a GCLID), a row is added to the "Google Ads Upload" tab.
 *   Google Ads can import that tab on a schedule, so it learns which clicks became real clients.
 *
 * After pasting changes: Deploy > Manage deployments > pencil > Version: New version > Deploy.
 */

const NOTIFY_EMAIL = 'gokugsvolt@gmail.com';

const HEADERS = [
  'Submitted', 'Type', 'Name', 'Business', 'Phone', 'Email', 'ZIP', 'Call test', 'Status',
  'GCLID', 'GBRAID', 'WBRAID', 'UTM source', 'UTM medium', 'UTM campaign', 'UTM term', 'UTM content',
  'Landing page', 'Referrer',
];
const STATUS_COL = HEADERS.indexOf('Status') + 1;
const GCLID_COL = HEADERS.indexOf('GCLID') + 1;

const STATUSES = ['New', 'Contacted', 'Qualified', 'Booked call', 'Signed', 'Not a fit', 'Spam'];

// Status -> Google Ads conversion action name. Names must match Google Ads exactly.
const CONVERSIONS = {
  'Qualified': { name: 'Volt - Qualified lead', value: '' },
  'Signed': { name: 'Volt - Signed client', value: '' },
};

const UPLOAD_SHEET = 'Google Ads Upload';
const UPLOAD_HEADERS = ['Google Click ID', 'Conversion Name', 'Conversion Time', 'Conversion Value', 'Conversion Currency'];

// ---------- Incoming leads ----------

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const lead = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    saveLead_(lead);
    notify_(lead);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function leadsSheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

function ensureHeaders_(sheet) {
  const current = sheet.getLastRow() === 0
    ? []
    : sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (current.join('|') !== HEADERS.join('|')) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function saveLead_(lead) {
  const sheet = leadsSheet_();
  ensureHeaders_(sheet);
  sheet.appendRow([
    lead.submittedAt ? new Date(lead.submittedAt) : new Date(),
    text_(lead.type),
    text_(lead.name),
    text_(lead.business),
    asText_(lead.phone), // keep phone as text so Sheets doesn't mangle it
    text_(lead.email),
    asText_(lead.zip),   // keep leading zeros (Massachusetts ZIPs start with 0)
    lead.callTest ? 'Yes' : 'No',
    'New',
    asText_(lead.gclid),
    asText_(lead.gbraid),
    asText_(lead.wbraid),
    text_(lead.utm_source),
    text_(lead.utm_medium),
    text_(lead.utm_campaign),
    text_(lead.utm_term),
    text_(lead.utm_content),
    text_(lead.landingPage),
    text_(lead.referrer),
  ]);

  const statusCell = sheet.getRange(sheet.getLastRow(), STATUS_COL);
  statusCell.setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build()
  );
}

function notify_(lead) {
  const kind = lead.type === 'waitlist' ? 'Waitlist signup' : 'Area claim';
  const source = lead.gclid || lead.gbraid || lead.wbraid
    ? 'Google Ads click'
    : (lead.utm_source || lead.referrer || 'Direct / unknown');
  const subject = `New ${kind}: ${lead.name || 'Unknown'} (${lead.zip || 'no ZIP'})`;
  const body = [
    `${kind} from the Go Kugs Volt site`,
    '',
    `Name: ${lead.name || ''}`,
    `Business: ${lead.business || ''}`,
    `Phone: ${lead.phone || ''}`,
    `Email: ${lead.email || ''}`,
    `ZIP: ${lead.zip || ''}`,
    `Wants a call test: ${lead.callTest ? 'Yes' : 'No'}`,
    `Source: ${source}`,
    lead.utm_campaign ? `Campaign: ${lead.utm_campaign}` : '',
    lead.utm_term ? `Keyword: ${lead.utm_term}` : '',
    `Submitted: ${lead.submittedAt || new Date().toISOString()}`,
    '',
    `Sheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
  ].filter((line, i, all) => line !== '' || all[i - 1] !== '').join('\n');

  const options = { to: NOTIFY_EMAIL, subject: subject, body: body };
  if (lead.email) options.replyTo = lead.email; // hit Reply to answer the lead directly
  MailApp.sendEmail(options);
}

// ---------- Offline conversions ----------

// Simple trigger: runs automatically when you edit the sheet by hand.
function onEdit(e) {
  if (!e || !e.range) return;
  const range = e.range;
  const sheet = range.getSheet();
  if (sheet.getName() === UPLOAD_SHEET || sheet.getIndex() !== 1) return;
  if (range.getColumn() !== STATUS_COL || range.getRow() < 2 || range.getNumRows() !== 1) return;

  const conversion = CONVERSIONS[e.value];
  if (!conversion) return;

  const gclid = String(sheet.getRange(range.getRow(), GCLID_COL).getValue() || '').trim();
  if (!gclid) return; // not from a trackable Google Ads click

  const upload = uploadSheet_();
  const last = upload.getLastRow();
  const existing = last > 1 ? upload.getRange(2, 1, last - 1, 2).getValues() : [];
  if (existing.some((r) => r[0] === gclid && r[1] === conversion.name)) return; // already queued

  const time = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ssZ');
  upload.appendRow([gclid, conversion.name, time, conversion.value, 'USD']);
}

function uploadSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(UPLOAD_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(UPLOAD_SHEET);
    sheet.getRange(1, 1, 1, UPLOAD_HEADERS.length).setValues([UPLOAD_HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('@');
    sheet.getRange('C:C').setNumberFormat('@'); // keep the timestamp exactly as Google Ads expects
  }
  return sheet;
}

/** Run once from the editor to add the new columns and the upload tab right away. */
function setup() {
  ensureHeaders_(leadsSheet_());
  uploadSheet_();
}

// ---------- Helpers ----------

// Blocks formula injection (values starting with = + - @).
function text_(v) {
  const s = v == null ? '' : String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

// Forces Sheets to store the value as plain text.
function asText_(v) {
  const s = v == null ? '' : String(v);
  return s ? "'" + s : '';
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Sends yourself a test lead (no GCLID, so it never reaches the upload tab). */
function testLead() {
  doPost({
    postData: {
      contents: JSON.stringify({
        type: 'claim',
        zip: '02134',
        name: 'Test Electrician',
        business: 'Test Electric Co',
        phone: '(555) 123-4567',
        email: 'gokugsvolt@gmail.com',
        callTest: true,
        submittedAt: new Date().toISOString(),
        utm_source: 'test',
      }),
    },
  });
}
