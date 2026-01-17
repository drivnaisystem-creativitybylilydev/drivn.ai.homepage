
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  HelpCircle,
  LifeBuoy,
  MessageSquare,
  PhoneCall,
  Timer,
  TrendingUp,
  Workflow,
  User,
} from "lucide-react";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#who-its-for", label: "Who It's For" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];


export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0014] text-white">
      <div className="absolute inset-x-0 top-0 z-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(255,157,255,0.22),_transparent_60%)] blur-2xl" />
      <main className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-6 pb-24 pt-[4px] sm:px-10">
        <nav className="sticky top-4 z-50 mx-auto flex w-full max-w-5xl items-center justify-center px-8 py-4 text-white">
          <div className="flex items-center justify-center gap-6 font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xl text-white transition hover:text-white whitespace-nowrap relative group font-[var(--font-navbar)]"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a367ff] via-[#6b36ff] to-[#ff9dff] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            ))}
            <Link
              href="/demo"
              className="rounded-full bg-gradient-to-r from-[#a367ff] via-[#6b36ff] to-[#ff9dff] px-6 py-3 text-lg font-semibold text-[#0a0014] shadow-[0_16px_36px_rgba(107,54,255,0.35)] transition hover:scale-[1.03] whitespace-nowrap"
            >
              Book a Demo
            </Link>
          </div>
        </nav>

        {/* SECTION 1: HERO */}
        <section
          id="hero"
          className="mb-16 flex flex-col items-center gap-8 text-center sm:mb-20 sm:gap-10 -mt-20"
        >
          <div className="relative w-full max-w-5xl px-4 sm:px-10">
            <div className="floating-logo relative mx-auto flex max-w-4xl items-center justify-center drop-shadow-[0_28px_96px_rgba(107,54,255,0.27)]">
        <Image
                src="/drivn-logo-transparent-refined.png"
                alt="Drivn.ai wordmark"
                width={1200}
                height={320}
                className="h-auto w-full object-contain"
          priority
        />
            </div>
          </div>

          <div className="-mt-36 space-y-6 sm:-mt-48 sm:space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/55">
              AI Quote-to-Booking Engine
            </p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
              Turn Every Lead Into a Booked Appointment—Automatically
          </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/80 sm:text-xl">
              AI-powered quote-to-booking engine that answers calls, delivers instant quotes, and books appointments 24/7. No missed leads. No manual follow-up. Just booked calendar slots and real-time owner notifications.
            </p>
            <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                  href="/demo"
                className="inline-flex items-center justify-center rounded-full bg-[#6b36ff] px-8 py-3.5 text-base font-semibold text-white shadow-[0_20px_55px_rgba(107,54,255,0.4)] transition hover:bg-[#7c47ff]"
              >
                  Book a Demo
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white/80 transition hover:border-white/60 hover:text-white"
                >
                  See How It Works
              </Link>
              </div>
              <ul className="flex flex-col gap-3 text-sm text-white/70 text-left max-w-2xl mt-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#6b36ff] flex-shrink-0 mt-0.5" />
                  <span>Answer 100% of inbound calls with AI voice agents that qualify leads and deliver accurate quotes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#6b36ff] flex-shrink-0 mt-0.5" />
                  <span>Book appointments directly into your calendar with instant SMS confirmations and reminders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#6b36ff] flex-shrink-0 mt-0.5" />
                  <span>Track every dollar: see exactly which leads turn into booked appointments and closed revenue</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROBLEM STATEMENT */}
        <section
          id="problem"
          className="space-y-6 py-4 -mt-8"
        >
          <div className="space-y-4 text-center sm:space-y-5">
            <p className="mx-auto max-w-3xl text-[25px] font-bold text-white">
              Quote-based businesses lose 67% of leads to slow response times. By the time you call back, your prospect has already booked with a competitor. Speed-to-lead isn't a nice-to-have—it's the difference between a booked job and a lost opportunity.
            </p>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS */}
        <section
          id="how-it-works"
          className="space-y-10 rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_35px_140px_rgba(107,54,255,0.2)] sm:p-12"
        >
          <div className="space-y-4 text-center sm:space-y-5">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              From Lead to Booked Appointment in Under 60 Seconds
            </h2>
          </div>
          <div className="mx-auto max-w-4xl space-y-6">
            {[
              {
                step: "Step 1",
                title: "Lead Capture",
                description: "A lead submits a form or calls your business line. Drivn.AI instantly routes them to an AI voice agent or responds via SMS.",
                icon: MessageSquare,
              },
              {
                step: "Step 2",
                title: "AI Qualification Call",
                description: "Our AI voice agent asks qualifying questions, understands project details, and gathers the information needed to generate an accurate quote—just like your best salesperson would.",
                icon: PhoneCall,
              },
              {
                step: "Step 3",
                title: "Instant Quote Delivery",
                description: "AI delivers an exact quote or pricing range based on your configuration, removing friction and keeping the lead engaged in real-time.",
                icon: TrendingUp,
              },
              {
                step: "Step 4",
                title: "Appointment Booking",
                description: "Lead books directly into your calendar. SMS confirmation sent instantly. Automated reminders reduce no-shows by 40%.",
                icon: CheckCircle2,
              },
              {
                step: "Step 5",
                title: "Owner Notification & CRM Sync",
                description: "You get an instant notification with lead details, quote provided, and appointment time. Everything syncs to your CRM automatically. You stay in control.",
                icon: Workflow,
              },
            ].map(({ step, title, description, icon: Icon }, index) => (
              <div
                key={step}
                className="flex gap-6 rounded-3xl border border-white/10 bg-[#0c011d]/70 p-6 transition hover:border-white/25 hover:bg-[#12032d]/70"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#6b36ff]/20">
                  <span className="text-lg font-semibold text-[#a367ff]">{index + 1}</span>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-[#ff9dff]" />
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                  </div>
                  <p className="text-sm text-white/75">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CORE BENEFITS */}
        <section
          id="benefits"
          className="space-y-10 rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_35px_140px_rgba(107,54,255,0.2)] sm:p-12"
        >
          <div className="space-y-4 text-center sm:space-y-5">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Built for Operators Who Value Speed, Control, and ROI
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Speed-to-Lead Wins",
                subtitle: "Answer Every Call in Under 3 Seconds",
                description: "No voicemail. No \"we'll call you back.\" AI picks up instantly, qualifies the lead, and delivers a quote before they hang up or move on to the next company.",
                icon: Timer,
              },
              {
                title: "Human Oversight, Always",
                subtitle: "Live Takeover & Manual Override",
                description: "You're never locked out. Jump into any AI call, override quotes, manually book appointments, or take full control whenever needed. AI handles volume; you handle exceptions.",
                icon: User,
              },
              {
                title: "ROI You Can Measure",
                subtitle: "See Exactly What's Working",
                description: "Track leads, calls completed, quotes delivered, appointments booked, show rate, and revenue influenced. Know your cost per booked appointment and ROI in real-time. No black box.",
                icon: BarChart3,
              },
            ].map(({ title, subtitle, description, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0c011d]/70 p-6 transition hover:border-white/25 hover:bg-[#12032d]/70"
              >
                <Icon className="h-8 w-8 text-[#ff9dff]" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="text-sm font-semibold text-[#a367ff]">{subtitle}</p>
                  <p className="text-sm text-white/75">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: WHO IT'S FOR */}
        <section
          id="who-its-for"
          className="space-y-10 rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_35px_140px_rgba(107,54,255,0.2)] sm:p-12"
        >
          <div className="space-y-4 text-center sm:space-y-5">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Perfect for Quote-Based Businesses with Variable Pricing
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Home Services & Contractors",
                description: "HVAC, plumbing, electrical, roofing, landscaping, pool service. Any trade where pricing varies by job scope, location, and urgency. Handle estimate requests 24/7 and book more on-site visits.",
                icon: Workflow,
              },
              {
                title: "Professional Services",
                description: "Legal consultations, accounting, marketing agencies, real estate. Qualify leads, provide ballpark pricing, and book discovery calls without manual back-and-forth.",
                icon: ClipboardList,
              },
              {
                title: "Health & Wellness",
                description: "Med spas, dental practices, cosmetic surgery, physical therapy. Answer pricing questions, book consultations, and reduce front-desk workload while staying HIPAA-aware.",
                icon: LifeBuoy,
              },
            ].map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0c011d]/70 p-6 transition hover:border-white/25 hover:bg-[#12032d]/70"
              >
                <Icon className="h-8 w-8 text-[#ff9dff]" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="text-sm text-white/75">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: HUMAN-IN-THE-LOOP TRUST */}
        <section
          id="human-control"
          className="space-y-8 rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_35px_140px_rgba(107,54,255,0.2)] sm:p-12"
        >
          <div className="space-y-4 text-center sm:space-y-5">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              You Stay in Control. Always.
            </h2>
            <p className="mx-auto max-w-3xl text-base text-white/75 sm:text-lg">
              AI handles the volume. You handle the exceptions.
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            <ul className="space-y-3 text-sm text-white/75 sm:text-base">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#6b36ff] flex-shrink-0" />
                <span><strong className="text-white">Live call takeover:</strong> Jump into any AI conversation and take over seamlessly</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#6b36ff] flex-shrink-0" />
                <span><strong className="text-white">Manual override:</strong> Adjust quotes, reschedule appointments, or pause automation anytime</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#6b36ff] flex-shrink-0" />
                <span><strong className="text-white">Instant notifications:</strong> Get alerts the moment an appointment is booked with full lead context</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#6b36ff] flex-shrink-0" />
                <span><strong className="text-white">Full conversation logs:</strong> Review every AI interaction, quote delivered, and booking made</span>
              </li>
            </ul>
            <p className="text-center text-base text-white/75 sm:text-lg pt-4">
              This isn't about replacing your team. It's about giving them leverage and ensuring nothing falls through the cracks.
            </p>
          </div>
        </section>

        {/* SECTION 7: ANALYTICS & ROI */}
        <section
          id="analytics"
          className="space-y-8 rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_35px_140px_rgba(107,54,255,0.2)] sm:p-12"
        >
          <div className="space-y-4 text-center sm:space-y-5">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Know Your Numbers. Prove Your ROI.
            </h2>
            <p className="mx-auto max-w-3xl text-base text-white/75 sm:text-lg">
              Every marketing dollar should be accountable. Drivn.AI gives you a real-time dashboard that tracks:
            </p>
          </div>
          <div className="mx-auto max-w-3xl grid gap-4 sm:grid-cols-2">
            {[
              "Leads captured (form fills, inbound calls, SMS)",
              "Calls completed (AI conversations finished)",
              "Quotes delivered (exact quote or range provided)",
              "Appointments booked (calendar slots filled)",
              "Show rate (% of appointments that showed up)",
              "Revenue influenced (closed deals traced back to AI-booked appointments)",
              "Cost per booked appointment (ad spend ÷ appointments)",
              "ROI/ROAS (revenue ÷ total cost)",
            ].map((metric) => (
              <div
                key={metric}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0c011d]/70 p-4"
              >
                <BarChart3 className="h-5 w-5 text-[#6b36ff] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/75">{metric}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-base text-white/75 sm:text-lg pt-4">
            No fluff metrics. Just the numbers that matter to operators.
          </p>
        </section>

        {/* SECTION 8: PRICING/PACKAGES */}
        <section
          id="pricing"
          className="space-y-10 rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_35px_140px_rgba(107,54,255,0.2)] sm:p-12"
        >
          <div className="space-y-4 text-center sm:space-y-5">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Start Where You Are. Scale When You're Ready.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                tier: "Foundation",
                subtitle: "For businesses building lead volume",
                features: [
                  "Conversion-focused website design & build",
                  "Lead capture forms & tracking setup",
                  "CRM configuration & pipeline structure",
                  "Landing pages for paid ads",
                  "Basic retargeting & analytics foundation",
                ],
                bestFor: "New businesses or those generating <50 leads/month who need infrastructure before automation pays off.",
                cta: "Get Started",
                ctaHref: "/demo",
                highlight: false,
              },
              {
                tier: "Growth",
                subtitle: "For businesses ready to scale lead gen",
                features: [
                  "Everything in Foundation, plus:",
                  "Paid ads management (Google, Meta)",
                  "Advanced landing page optimization",
                  "Multi-channel lead capture (phone, SMS, web)",
                  "Lead tracking & attribution",
                  "Monthly performance reporting",
                ],
                bestFor: "Businesses generating 50-200 leads/month who need consistent pipeline growth.",
                cta: "Book a Demo",
                ctaHref: "/demo",
                highlight: false,
              },
              {
                tier: "Automation",
                subtitle: "For businesses with proven lead volume",
                features: [
                  "Everything in Growth, plus:",
                  "AI Quote-to-Booking Engine (voice + SMS)",
                  "24/7 AI call answering & qualification",
                  "Instant quote delivery (exact or range)",
                  "Automated appointment booking & SMS confirmations",
                  "Live takeover & manual override controls",
                  "Owner notifications for every booking",
                  "Full ROI analytics dashboard",
                  "CRM sync & conversation logs",
                ],
                bestFor: "Businesses generating 200+ leads/month who want to convert more without hiring.",
                cta: "Book a Demo",
                ctaHref: "/demo",
                highlight: true,
              },
            ].map(({ tier, subtitle, features, bestFor, cta, ctaHref, highlight }) => (
              <div
                key={tier}
                className={`flex flex-col gap-6 rounded-3xl border p-6 transition ${
                  highlight
                    ? "border-[#6b36ff]/50 bg-[#1a063a]/40 shadow-[0_0_40px_rgba(107,54,255,0.3)]"
                    : "border-white/10 bg-[#0c011d]/70 hover:border-white/25"
                }`}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-white">{tier}</h3>
                  <p className="text-sm text-white/60 italic">{subtitle}</p>
                </div>
                <div className="space-y-3 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
                    What's Included:
                  </p>
                  <ul className="space-y-2 text-sm text-white/75">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#6b36ff] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs font-semibold text-white/60 mb-1">Best For:</p>
                    <p className="text-sm text-white/75">{bestFor}</p>
                  </div>
                  <Link
                    href={ctaHref}
                    className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                      highlight
                        ? "bg-[#6b36ff] text-white shadow-[0_20px_55px_rgba(107,54,255,0.4)] hover:bg-[#7c47ff]"
                        : "border border-white/30 text-white/80 hover:border-white/60 hover:text-white"
                    }`}
                  >
                    {cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 9: PATH FOR SMALL BUSINESSES */}
        <section
          id="small-business-path"
          className="space-y-8 rounded-[36px] border border-[#6b36ff]/40 bg-[#1a063a]/40 p-8 shadow-[0_35px_140px_rgba(107,54,255,0.2)] sm:p-12"
        >
          <div className="space-y-4 text-center sm:space-y-5">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Not Enough Lead Volume Yet? Start Here.
            </h2>
            <p className="mx-auto max-w-3xl text-base text-white/75 sm:text-lg">
              The Quote-to-Booking Engine works best when you have consistent inbound volume (200+ leads/month). If you're not there yet, we'll help you build the foundation first:
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {[
              { step: "Step 1", text: "Launch a high-converting website with lead capture" },
              { step: "Step 2", text: "Set up tracking, CRM, and pipeline structure" },
              { step: "Step 3", text: "Drive traffic with ads and retargeting" },
              { step: "Step 4", text: "Add AI automation once the volume justifies it" },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0c011d]/70 p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#6b36ff]/20">
                  <span className="text-sm font-semibold text-[#a367ff]">{step.split(" ")[1]}</span>
                </div>
                <p className="text-sm text-white/75 pt-1">{text}</p>
              </div>
            ))}
          </div>
          <div className="text-center space-y-4">
            <p className="text-base text-white/75 sm:text-lg">
              You don't need to be "ready" for AI. You just need a clear path to get there. We'll build it with you.
          </p>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-[#6b36ff] px-8 py-3.5 text-base font-semibold text-white shadow-[0_20px_55px_rgba(107,54,255,0.4)] transition hover:bg-[#7c47ff]"
            >
              Start with Foundation Package
            </Link>
          </div>
        </section>

        {/* SECTION 10: FINAL CTA */}
        <section
          id="final-cta"
          className="space-y-8 rounded-[36px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_25px_110px_rgba(107,54,255,0.24)] sm:p-12"
        >
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Stop Losing Leads to Slow Follow-Up
            </h2>
            <p className="mx-auto max-w-2xl text-base text-white/75 sm:text-lg">
              Book a 20-minute demo and we'll show you exactly how Drivn.AI handles your leads, delivers quotes, and books appointments—without you lifting a finger.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-[#6b36ff] px-8 py-3.5 text-base font-semibold text-white shadow-[0_20px_55px_rgba(107,54,255,0.4)] transition hover:bg-[#7c47ff]"
            >
              Book a Demo
            </Link>
          </div>
        </section>

        {/* SECTION 11: FAQ */}
        <section
          id="faq"
          className="space-y-8 rounded-[36px] border border-white/10 bg-[#0c021d]/80 p-8 shadow-[0_25px_110px_rgba(107,54,255,0.22)] sm:p-12"
        >
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4">
            <HelpCircle className="h-8 w-8 text-[#ff9dff]" />
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "Does AI actually sound human, or is it obviously a robot?",
                answer: "Our AI voice agents are trained on real sales conversations and sound natural. Most leads don't realize they're speaking with AI until we tell them. But we're transparent—if a lead asks, the AI will confirm it's AI and offer to connect them to a human.",
              },
              {
                question: "What happens if the AI gives the wrong quote?",
                answer: "You control the pricing logic. AI follows your rules (square footage, project type, urgency, etc.). You can also set quote ranges instead of exact prices, or require human approval for quotes above a threshold. Plus, you can override any quote manually.",
              },
              {
                question: "Can I take over a call if something goes wrong?",
                answer: "Yes. You can jump into any AI call in real-time and take over seamlessly. The lead won't even know there was a handoff. You stay in control.",
              },
              {
                question: "How do I know if a lead actually booked an appointment?",
                answer: "You get an instant notification (SMS, email, or Slack) the moment an appointment is booked, with full lead details and the quote provided. Everything also syncs to your CRM automatically.",
              },
              {
                question: "What if I don't have 200 leads/month yet?",
                answer: "Start with our Foundation or Growth packages. We'll help you build a conversion-focused website, set up lead tracking, and drive traffic with ads. Once you hit volume, we add the AI automation layer.",
              },
              {
                question: "Do I need to change my CRM or phone system?",
                answer: "No. Drivn.AI integrates with most major CRMs (HubSpot, Salesforce, GoHighLevel, etc.) and works with your existing phone number. We handle the technical setup.",
              },
              {
                question: "What's the ROI timeline?",
                answer: "Most clients see positive ROI within 30-60 days. If you're currently missing 20-30% of inbound calls, the AI pays for itself by capturing those lost opportunities. We track everything so you know exactly what's working.",
              },
              {
                question: "Is this HIPAA-compliant for healthcare businesses?",
                answer: "We follow HIPAA-aware practices for health and wellness clients. AI can qualify leads and book consultations without collecting PHI over the phone. We'll configure the system to match your compliance requirements.",
              },
            ].map(({ question, answer }, index) => (
              <details
                key={index}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-5 text-left text-sm font-semibold text-white/85">
                  {question}
                  <span className="text-white/50 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-sm text-white/70">{answer}</div>
              </details>
            ))}
          </div>
        </section>

        <footer className="flex flex-col items-center gap-6 border-t border-white/10 py-10 text-center text-sm text-white/60">
          <p className="text-base font-semibold text-white/80">Drivn.AI – AI automation for quote-based businesses. Answer every lead. Book every appointment. Measure every dollar.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="#how-it-works" className="transition hover:text-white">How It Works</Link>
            <Link href="#who-its-for" className="transition hover:text-white">Who It's For</Link>
            <Link href="#pricing" className="transition hover:text-white">Pricing</Link>
            <Link href="/demo" className="transition hover:text-white">Book a Demo</Link>
            <Link href="#" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="#" className="transition hover:text-white">Terms of Service</Link>
          </div>
          <div className="flex flex-col items-center gap-2 text-white/50 sm:flex-row sm:gap-4">
            <p>Questions? Email us at <Link href="mailto:hello@drivn.ai" className="transition hover:text-white">hello@drivn.ai</Link></p>
            <span>© {new Date().getFullYear()} Drivn.ai. All rights reserved.</span>
        </div>
        </footer>
      </main>
    </div>
  );
}
