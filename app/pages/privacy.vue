<script setup lang="ts">
import { site } from '~/data/site'

useHead({ title: `Privacy policy | ${site.brand}` })

// TODO: update this date whenever you change the policy
const updated = 'September 30, 2026'
</script>

<template>
  <article class="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
    <h1 class="font-display text-4xl">Privacy policy</h1>
    <p class="mt-3 text-slate">Last updated {{ updated }}</p>

    <div class="mt-10 space-y-8 text-[17px] leading-relaxed [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_p]:text-slate">
      <section>
        <h2>Who we are</h2>
        <p>
          {{ site.brand }} is a service of {{ site.parent }}, run by {{ site.owner }}. This policy covers
          {{ site.url }} and explains what we collect when you use it.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <p>
          When you check your area or join the waitlist, we collect the ZIP code, name, business name, phone number
          and email address you enter. We also collect standard technical data, such as your browser type and pages
          visited, through analytics and advertising tools.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <p>
          We use your details to contact you about our services, to hold or waitlist your service area, and to
          measure how well our own advertising works. We don't sell your information.
        </p>
      </section>

      <section>
        <h2>Cookies and advertising</h2>
        <p>
          We may use Google Analytics and Google Ads conversion tracking. These tools use cookies to measure visits
          and form submissions. You can control cookies in your browser settings, and manage Google ad personalization
          at adssettings.google.com.
        </p>
      </section>

      <section>
        <h2>Who we share it with</h2>
        <p>
          Your details are stored with the tools we use to run the business, such as email, CRM and form-handling
          services. They're used only to provide those services to us.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          You can ask us to access, correct or delete your information at any time by emailing
          <a :href="`mailto:${site.email}`" class="font-semibold text-graphite underline underline-offset-2">{{ site.email }}</a>.
        </p>
      </section>
    </div>
  </article>
</template>
