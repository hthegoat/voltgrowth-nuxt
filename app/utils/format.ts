// Fixed locale so server-rendered and client-rendered numbers always match (avoids hydration mismatches).
export const formatNumber = (n: number) => n.toLocaleString('en-US')
export const formatMoney = (n: number) => `$${formatNumber(Math.round(n))}`
