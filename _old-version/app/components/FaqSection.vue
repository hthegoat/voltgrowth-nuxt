<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'

interface FAQItem {
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    question: "What is your pricing model and fee structure?",
    answer: "We charge a transparent performance management fee: 20% of your managed monthly ad spend, with a $500/month minimum baseline. You pay Google directly for your media ad spend from your own corporate card with 0% agency markup. Our management fee covers complete high-ticket campaign architecture, negative keyword filtering, automated triage to reject $75 small repairs, CRM webhooks, and strict single-contractor territory radius protection."
  },
  {
    question: "How is strict 1-contractor territory exclusivity enforced?",
    answer: "Every territory is defined by a 15 to 25-mile operational radius based on your local county and postal boundaries. Once a contract is executed, that geographic zone is legally ring-fenced in our dispatch engine. We refuse onboarding from any competing electrical contractors in your designated market."
  },
  {
    question: "How do you screen out low-margin $75 diagnostic and repair calls?",
    answer: "Our advertising funnels and automated qualification forms specifically require commercial scope, multi-phase installations, or main breaker upgrades (200A/400A). Small light-switch or GFCI outlet calls are automatically filtered out before ever reaching your estimator or dispatch team."
  },
  {
    question: "Which field service management CRMs do you integrate with?",
    answer: "VoltGrowth natively integrates via direct API and secure webhooks into ServiceTitan, Housecall Pro, FieldEdge, Jobber, and SimPRO. Booked leads, call recordings, and estimated ticket values sync automatically to your dispatch board."
  },
  {
    question: "What is the 14-day rapid deployment guarantee?",
    answer: "Within 14 days of territory confirmation, we establish your localized search engine pipelines, commercial landing assets, Google Local Services verification, and CRM dispatch webhooks. Your vans typically start fielding verified qualified estimates within week three."
  },
  {
    question: "Is there a long-term lock-in contract?",
    answer: "No. All territory agreements operate on a 90-day performance initiation followed by a flexible month-to-month agreement. You retain exclusive territory rights as long as minimum capacity dispatch benchmarks are maintained."
  }
]

const activeFaq = ref<number | null>(null)
</script>

<template>
  <section id="faq" class="py-16 sm:py-20 bg-[#0b1326] border-b border-[#2d3449]/60 relative z-10">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-10 sm:mb-12">
        <div class="text-xs font-mono text-[#f59e0b] uppercase tracking-widest mb-1.5">
          Contractor Specifications
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] tracking-tight">
          Frequently Asked Questions
        </h2>
        <p class="text-xs sm:text-sm text-[#94a3b8] mt-2">
          Everything master electricians and electrical business owners need to know about our fees and exclusivity model.
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(faq, index) in FAQS"
          :key="index"
          class="bg-[#171f33] border border-[#2d3449] rounded-lg transition-colors overflow-hidden"
        >
          <button
            type="button"
            class="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#f59e0b]"
            :aria-expanded="activeFaq === index"
            @click="activeFaq = activeFaq === index ? null : index"
          >
            <span class="font-semibold text-sm sm:text-base text-[#f8fafc] leading-snug">
              {{ faq.question }}
            </span>
            <span class="w-8 h-8 rounded bg-[#131b2e] border border-[#2d3449] flex items-center justify-center shrink-0 text-[#94a3b8]">
              <ChevronDown
                :class="[
                  'w-4 h-4 transition-transform duration-200',
                  activeFaq === index ? 'rotate-180 text-[#f59e0b]' : '',
                ]"
              />
            </span>
          </button>

          <div
            v-if="activeFaq === index"
            class="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#94a3b8] leading-relaxed border-t border-[#2d3449]/40 animate-in fade-in duration-150"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
