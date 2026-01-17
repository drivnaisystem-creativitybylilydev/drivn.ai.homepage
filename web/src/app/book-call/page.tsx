"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { CalendlyWidget } from "@/components/CalendlyWidget";
import { supabase } from "@/lib/supabase";

const totalSteps = 4;

const serviceTypeOptions = [
  "Home Services (HVAC, Plumbing, Electrical, etc.)",
  "Contracting (Roofing, Landscaping, Remodeling, etc.)",
  "Professional Services (Legal, Accounting, Consulting, etc.)",
  "Health & Wellness (Med Spa, Dental, Physical Therapy, etc.)",
  "Other",
] as const;

const monthlyLeadsOptions = [
  "Less than 50 leads/month",
  "50-200 leads/month",
  "200-500 leads/month",
  "500+ leads/month",
] as const;

const averageTicketOptions = [
  "Under $500",
  "$500 - $2,000",
  "$2,000 - $10,000",
  "$10,000 - $50,000",
  "Over $50,000",
] as const;

const timelineOptions = [
  "ASAP (within 2 weeks)",
  "Within 30 days",
  "Within 90 days",
  "Just exploring",
] as const;

type ServiceTypeOption = (typeof serviceTypeOptions)[number];
type MonthlyLeadsOption = (typeof monthlyLeadsOptions)[number];
type AverageTicketOption = (typeof averageTicketOptions)[number];
type TimelineOption = (typeof timelineOptions)[number];

type FormData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  serviceType: ServiceTypeOption | "";
  monthlyLeads: MonthlyLeadsOption | "";
  averageTicket: AverageTicketOption | "";
  currentCRM: string;
  urgency: TimelineOption | "";
};

const initialFormData: FormData = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  serviceType: "",
  monthlyLeads: "",
  averageTicket: "",
  currentCRM: "",
  urgency: "",
};

const stepTitles = [
  "Welcome",
  "Company Information",
  "Service & Lead Volume",
  "Schedule",
];

type ErrorMap = Record<string, string>;

export default function BookCallPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ErrorMap>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  const progress = ((currentStep + 1) / totalSteps) * 100;


  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep = (): ErrorMap => {
    return {};
  };

  const goNext = async () => {
    console.log("=== goNext called ===");
    console.log("Current step:", currentStep);
    console.log("Total steps:", totalSteps);
    
    const validation = validateStep();
    if (Object.keys(validation).length > 0) {
      console.log("Validation failed:", validation);
      setErrors(validation);
      return;
    }

    console.log("Validation passed, proceeding...");
    setErrors({});

    // Submit when moving from step 2 (Service & Lead Volume) to step 3 (Calendly)
    if (currentStep === totalSteps - 2) {
      console.log("On second-to-last step - submitting form data before showing Calendly...");
      try {
        const submissionData = {
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone || null,
          service_type: formData.serviceType || null,
          monthly_leads: formData.monthlyLeads || null,
          average_ticket: formData.averageTicket || null,
          current_crm: formData.currentCRM || null,
          urgency: formData.urgency || null,
          status: 'new' as const, // Default status for new leads
          created_at: new Date().toISOString(),
        };

        console.log("Submitting form data:", submissionData);
        console.log("Current step:", currentStep, "Total steps:", totalSteps);
        
        const { data, error } = await supabase.from("clients").insert(submissionData).select();

        if (error) {
          console.error("=== Supabase Insert Error ===");
          console.error("Error message:", error.message);
          console.error("Error code:", error.code);
          console.error("Error details:", error.details);
          console.error("Error hint:", error.hint);
          console.error("Full error:", error);
          alert(`Error saving submission: ${error.message}. Please check the console for details.`);
        } else {
          console.log("✅ Survey submission saved successfully!");
          console.log("Inserted data:", data);
          
          // Send welcome email if client was created
          if (data && data.length > 0) {
            const clientId = data[0].id;
            try {
              // Get welcome template
              const templateResponse = await fetch('/api/emails/templates?category=welcome');
              const templateData = await templateResponse.json();
              
              if (templateData.templates && templateData.templates.length > 0) {
                const welcomeTemplate = templateData.templates[0];
                
                // Send welcome email
                await fetch("/api/emails/send", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    clientId,
                    recipientEmail: formData.email,
                    recipientName: formData.contactName,
                    templateId: welcomeTemplate.id,
                    variables: {
                      contact_name: formData.contactName,
                      company_name: formData.companyName,
                    },
                  }),
                });
                console.log("✅ Welcome email sent!");
              }
            } catch (emailError) {
              console.error("Error sending welcome email:", emailError);
              // Don't block the user flow if email fails
            }
          }
          
          // Send email notification (legacy)
          try {
            await fetch("/api/send-notification", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(submissionData),
            });
          } catch (emailError) {
            console.error("Error sending notification email:", emailError);
            // Don't block the user flow if email fails
          }
        }
      } catch (err) {
        console.error("=== Exception during form submission ===");
        console.error("Error:", err);
        if (err instanceof Error) {
          console.error("Error message:", err.message);
          console.error("Error stack:", err.stack);
          alert(`Error saving submission: ${err.message}. Please check the console for details.`);
        }
      }
      setHasSubmitted(true);
    }

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const goBack = () => {
    if (currentStep === 0) return;
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
              See Drivn.AI in Action
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
              Book a 20-Minute Demo
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-white/70 sm:text-base">
              Book a 20-minute demo and we'll show you how our AI Quote-to-Booking Engine handles your leads in real-time.
            </p>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#a367ff] via-[#6b36ff] to-[#ff9dff] px-8 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#0a0014] shadow-[0_20px_55px_rgba(107,54,255,0.4)] transition hover:scale-[1.02]"
            >
              Get Started
            </button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Company Information</h3>
              <p className="text-sm text-white/65">
                Tell us about your business so we can customize the demo for you.
              </p>
            </div>
            <div className="grid gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                  Company Name
                </span>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(event) => handleInputChange("companyName")(event.target.value)}
                    className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-3 text-white text-base outline-none transition-all focus:border-transparent peer"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a367ff] via-[#6b36ff] to-[#ff9dff] transition-all duration-300 peer-focus:w-full"></span>
                </div>
                {errors.companyName && (
                  <p className="text-sm text-[#ff9dff]">{errors.companyName}</p>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                  Your Name
                </span>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(event) => handleInputChange("contactName")(event.target.value)}
                    className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-3 text-white text-base outline-none transition-all focus:border-transparent peer"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a367ff] via-[#6b36ff] to-[#ff9dff] transition-all duration-300 peer-focus:w-full"></span>
                </div>
                {errors.contactName && (
                  <p className="text-sm text-[#ff9dff]">{errors.contactName}</p>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                  Email
                </span>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => handleInputChange("email")(event.target.value)}
                    className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-3 text-white text-base outline-none transition-all focus:border-transparent peer"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a367ff] via-[#6b36ff] to-[#ff9dff] transition-all duration-300 peer-focus:w-full"></span>
                </div>
                {errors.email && (
                  <p className="text-sm text-[#ff9dff]">{errors.email}</p>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                  Phone
                </span>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => handleInputChange("phone")(event.target.value)}
                    className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-3 text-white text-base outline-none transition-all focus:border-transparent peer"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a367ff] via-[#6b36ff] to-[#ff9dff] transition-all duration-300 peer-focus:w-full"></span>
                </div>
                {errors.phone && (
                  <p className="text-sm text-[#ff9dff]">{errors.phone}</p>
                )}
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Service & Lead Volume</h3>
              <p className="text-sm text-white/65">
                Help us understand your business so we can head into our meeting with some context.
              </p>
            </div>
            <div className="grid gap-5">

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                What type of service do you provide?
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={formData.serviceType}
                  onChange={(event) => handleInputChange("serviceType")(event.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-3 text-white text-base outline-none transition-all focus:border-transparent peer"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a367ff] via-[#6b36ff] to-[#ff9dff] transition-all duration-300 peer-focus:w-full"></span>
              </div>
              {errors.serviceType && (
                <p className="text-sm text-[#ff9dff]">{errors.serviceType}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                Approximate monthly lead volume
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={formData.monthlyLeads}
                  onChange={(event) => handleInputChange("monthlyLeads")(event.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-3 text-white text-base outline-none transition-all focus:border-transparent peer"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a367ff] via-[#6b36ff] to-[#ff9dff] transition-all duration-300 peer-focus:w-full"></span>
              </div>
              {errors.monthlyLeads && (
                <p className="text-sm text-[#ff9dff]">{errors.monthlyLeads}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                Average project/job value
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={formData.averageTicket}
                  onChange={(event) => handleInputChange("averageTicket")(event.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-3 text-white text-base outline-none transition-all focus:border-transparent peer"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a367ff] via-[#6b36ff] to-[#ff9dff] transition-all duration-300 peer-focus:w-full"></span>
              </div>
              {errors.averageTicket && (
                <p className="text-sm text-[#ff9dff]">{errors.averageTicket}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                Current CRM (if any) <span className="text-white/60">(optional)</span>
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={formData.currentCRM}
                  onChange={(event) => handleInputChange("currentCRM")(event.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 px-0 py-3 text-white text-base outline-none transition-all focus:border-transparent peer"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a367ff] via-[#6b36ff] to-[#ff9dff] transition-all duration-300 peer-focus:w-full"></span>
              </div>
            </label>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsTimelineOpen(!isTimelineOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
                  Timeline to implement
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-white transition-transform duration-200 ${
                    isTimelineOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isTimelineOpen && (
                <div className="rounded-2xl border border-white/15 bg-white/[0.03] overflow-hidden">
                  <div className="grid gap-0">
                    {timelineOptions.map((option) => {
                      const isActive = formData.urgency === option;
                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => {
                            handleInputChange("urgency")(option);
                            setIsTimelineOpen(false);
                          }}
                          className={`px-4 py-3 text-sm text-left transition ${
                            isActive
                              ? "bg-[#6b36ff]/25 text-white border-l-2 border-[#6b36ff]"
                              : "text-white/70 hover:bg-white/[0.05] hover:text-white border-l-2 border-transparent"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {errors.urgency && (
                <p className="text-sm text-[#ff9dff]">{errors.urgency}</p>
              )}
            </div>
            </div>
          </div>
        );
      case 3:
      default:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-3">
              <h3 className="text-3xl font-semibold sm:text-4xl">
                Great — You're Ready to Book Your Demo.
              </h3>
              <p className="mx-auto max-w-2xl text-sm text-white/70 sm:text-base">
                Thanks for sharing everything. Choose a time below for your 20-minute demo —
                Calendly is embedded right here, no extra tabs required.
              </p>
            </div>
            <CalendlyWidget url="https://calendly.com/drivn-ai/new-meeting-1" />
          </div>
        );
    }
  };

  const renderNavigation = () => {
    if (currentStep === 0) return null;

    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white/40 hover:text-white"
        >
          Back
        </button>
        {currentStep < totalSteps - 1 && (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center justify-center rounded-full bg-[#6b36ff] px-8 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-white shadow-[0_20px_55px_rgba(107,54,255,0.4)] transition hover:bg-[#7c47ff]"
          >
            {currentStep === totalSteps - 1 ? "See Available Times" : "Next"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0a0014] text-white">
      <main className="mx-auto flex w-full max-w-[960px] flex-col gap-8 px-6 pb-24 pt-16 sm:px-10">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/50">
          <Link href="/" className="transition hover:text-white">
            ← Back to Home
          </Link>
          <span>{`Step ${currentStep + 1} of ${totalSteps}`}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#6b36ff] via-[#a367ff] to-[#ff9dff] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/55">
          {stepTitles[currentStep]}
        </p>
        <section className="space-y-8 rounded-[36px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_30px_120px_rgba(107,54,255,0.28)]">
          {renderStepContent()}
          {renderNavigation()}
        </section>
        {currentStep === totalSteps - 1 && hasSubmitted && (
          <p className="text-center text-xs uppercase tracking-[0.35em] text-[#ff9dff]">
            Details saved • Calendly is ready below
          </p>
        )}
      </main>
    </div>
  );
}

