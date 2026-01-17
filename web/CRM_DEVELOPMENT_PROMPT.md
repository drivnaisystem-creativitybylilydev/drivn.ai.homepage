# Custom CRM Development Prompt for Claude Code

## Current System Overview

### What Has Been Built

**Tech Stack:**
- **Frontend:** Next.js 16.0.1 with React 19, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL database, REST API)
- **Deployment:** Local development environment (localhost:3001)
- **Form Handling:** Multi-step survey form with validation
- **Data Storage:** Supabase table named `Leads` (case-sensitive)

**Current Features:**
1. **Lead Capture Form** (`/book-call` route)
   - Multi-step form (4 steps: Welcome, Company Info, Service & Lead Volume, Schedule)
   - Fields collected:
     - `company_name` (required)
     - `contact_name` (required)
     - `email` (required)
     - `phone` (optional)
     - `service_type` (optional)
     - `monthly_leads` (optional)
     - `average_ticket` (optional)
     - `current_crm` (optional)
     - `urgency` (optional)
     - `scheduled_date` (from Calendly webhook)
     - `scheduled_time` (from Calendly webhook)
     - `scheduled_datetime` (from Calendly webhook)
     - `calendly_event_uri` (from Calendly webhook)
     - `created_at` (auto-generated)
   - Form validation and error handling
   - Integration with Calendly for scheduling
   - Automatic submission to Supabase when moving from step 2 to step 3

2. **Admin Dashboard** (`/admin` route)
   - Client-side React component ("use client")
   - **Overview view:** Simple list of company names (clickable)
   - **Detail view:** Full table showing all fields from Supabase table
   - Displays: All lead data including scheduled date/time from Calendly
   - Sorted by most recent first
   - Click company name to view full details
   - Basic error handling and loading states
   - Dark theme with purple gradient branding

3. **Database Schema** (Supabase `Leads` table)
   - Row Level Security (RLS) enabled
   - Public insert policy (allows form submissions)
   - Public read policy (allows admin page access)
   - Public update policy (allows webhook to update scheduled times)
   - Index on `created_at` for sorting
   - Index on `scheduled_datetime` for scheduled appointments

4. **Environment Configuration**
   - `.env.local` file with Supabase credentials
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `CALENDLY_API_KEY` (for Calendly API integration)
   - `CALENDLY_SIGNING_KEY` (for webhook verification)
   - Supabase client initialization in `/src/lib/supabase.ts`

5. **Calendly Integration**
   - Calendly widget embedded in booking form
   - Webhook endpoint at `/api/calendly-webhook`
   - Automatically captures scheduled date/time when appointments are booked
   - Updates lead records with scheduled information
   - Webhook matches leads by email address

**File Structure:**
```
web/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx (Admin dashboard - company list + detail view)
│   │   ├── api/
│   │   │   └── calendly-webhook/
│   │   │       └── route.ts (Webhook endpoint for Calendly)
│   │   ├── book-call/
│   │   │   └── page.tsx (Lead capture form)
│   │   ├── page.tsx (Homepage)
│   │   └── layout.tsx
│   ├── components/
│   │   └── CalendlyWidget.tsx (Calendly iframe component)
│   └── lib/
│       └── supabase.ts (Supabase client)
├── scripts/
│   ├── add-sample-submission.js (Test data generator)
│   └── test-webhook.js (Test scheduled time updates)
├── supabase-add-scheduled-fields.sql (Database migration)
├── supabase-add-update-policy.sql (RLS policy for updates)
├── .env.local (Environment variables)
└── package.json
```

**Current Limitations:**
- No email automation (Resend API in dependencies but not implemented)
- No invoice generation
- No project scope creation
- No client communication tools
- No lead status tracking (beyond scheduled/unscheduled)
- No task management
- No document generation
- Admin view is read-only (no edit/delete actions)
- No bulk operations
- No filtering/search functionality

---

## Project Goal: Transform into Custom Agency CRM

### Core Requirements

**1. Lead & Client Management**
- Convert `Leads` table into a comprehensive client database
- Add lead status tracking (New → Qualified → Proposal → Contracted → Active → Completed)
- Add client relationship fields (notes, tags, custom fields)
- Add project association (one client can have multiple projects)
- Add activity timeline/history for each client
- Add contact management (multiple contacts per company)

**2. Email Automation & Communication**
- **Branded email templates:**
  - Welcome emails (automated on lead submission)
  - Follow-up sequences (day 1, 3, 7, 14)
  - Proposal emails
  - Invoice reminders
  - Project updates
  - Onboarding sequences
- **Email sending infrastructure:**
  - Integration with Resend API (already in dependencies)
  - Template system with variables (client name, company, etc.)
  - Email scheduling/queuing
  - Email tracking (opens, clicks)
  - Reply handling
- **Email composer:**
  - Rich text editor
  - Template selection
  - Variable insertion
  - Send now or schedule
  - Attach documents

**3. Invoice Generation & Management**
- **Invoice creation:**
  - Branded invoice templates (PDF generation)
  - Line items with descriptions, quantities, rates
  - Tax calculations
  - Payment terms
  - Due dates
  - Invoice numbering system
- **Invoice management:**
  - Invoice status (Draft → Sent → Paid → Overdue)
  - Payment tracking
  - Automatic reminders
  - PDF download/email
  - Integration with accounting (optional)

**4. Project Scope & Proposal Generation**
- **Scope document creation:**
  - Rich text editor for project descriptions
  - Service packages/pricing tiers
  - Timeline/milestones
  - Deliverables checklist
  - Terms & conditions
  - Signature capture (e-signature integration)
- **Proposal management:**
  - Template library
  - Version control
  - Client approval workflow
  - Convert proposal to contract
  - PDF generation

**5. Enhanced Admin Dashboard**
- **Dashboard views:**
  - Overview dashboard (stats, recent activity)
  - Client list view (table with filters, search, sorting)
  - Client detail view (full profile, history, documents)
  - Project management view
  - Invoice list view
  - Email activity view
- **Actions from dashboard:**
  - Send email to client
  - Create invoice
  - Generate proposal/scope
  - Update client status
  - Add notes/tasks
  - Schedule follow-ups

**6. Automation & Workflows**
- **Trigger-based automation:**
  - New lead → Send welcome email
  - Proposal sent → Schedule follow-up in 3 days
  - Invoice overdue → Send reminder
  - Project milestone reached → Notify client
- **Task management:**
  - Create tasks from dashboard
  - Assign tasks to team members
  - Due dates and reminders
  - Task completion tracking

---

## Technical Implementation Plan

### Database Schema Extensions (Supabase)

**New Tables Needed:**
1. `clients` (extend from `Leads`)
   - Add: `status`, `tags`, `notes`, `assigned_to`, `source`, `value`
2. `projects`
   - `client_id`, `name`, `description`, `status`, `start_date`, `end_date`, `budget`
3. `invoices`
   - `client_id`, `project_id`, `invoice_number`, `amount`, `status`, `due_date`, `paid_date`, `items` (JSON)
4. `proposals`
   - `client_id`, `title`, `content`, `status`, `version`, `sent_date`, `approved_date`
5. `emails`
   - `client_id`, `subject`, `body`, `template_id`, `sent_at`, `opened_at`, `clicked_at`
6. `email_templates`
   - `name`, `subject`, `body`, `variables`, `category`
7. `tasks`
   - `client_id`, `project_id`, `title`, `description`, `due_date`, `status`, `assigned_to`
8. `activities`
   - `client_id`, `type`, `description`, `created_at`, `user_id`

### API Routes Needed (Next.js)

1. `/api/emails/send` - Send email via Resend
2. `/api/emails/templates` - Manage email templates
3. `/api/invoices/create` - Generate invoice PDF
4. `/api/invoices/send` - Email invoice to client
5. `/api/proposals/create` - Create proposal document
6. `/api/proposals/send` - Send proposal
7. `/api/clients/update` - Update client status/info
8. `/api/tasks/create` - Create task
9. `/api/automation/trigger` - Trigger automation workflows

### Frontend Components Needed

1. **Client Management:**
   - `ClientList.tsx` - Table view with filters
   - `ClientDetail.tsx` - Full client profile
   - `ClientForm.tsx` - Create/edit client
   - `StatusBadge.tsx` - Visual status indicator

2. **Email System:**
   - `EmailComposer.tsx` - Rich text email editor
   - `EmailTemplates.tsx` - Template library
   - `EmailHistory.tsx` - Sent emails list
   - `EmailPreview.tsx` - Preview email

3. **Invoice System:**
   - `InvoiceForm.tsx` - Create invoice
   - `InvoiceList.tsx` - All invoices
   - `InvoicePDF.tsx` - PDF preview/download
   - `InvoiceStatus.tsx` - Payment tracking

4. **Proposal System:**
   - `ProposalEditor.tsx` - Rich text editor
   - `ProposalTemplates.tsx` - Template library
   - `ProposalPreview.tsx` - Preview before sending
   - `ProposalList.tsx` - All proposals

5. **Dashboard:**
   - `DashboardStats.tsx` - Overview metrics
   - `RecentActivity.tsx` - Activity feed
   - `QuickActions.tsx` - Action buttons
   - `TaskList.tsx` - Upcoming tasks

### Third-Party Integrations

1. **Resend API** (already in dependencies)
   - Email sending
   - Template management
   - Email tracking

2. **PDF Generation**
   - `@react-pdf/renderer` or `pdfkit` or `puppeteer`
   - For invoices and proposals

3. **E-Signature** (optional)
   - DocuSign API or HelloSign API
   - For proposal/contract signing

4. **File Storage**
   - Supabase Storage (for PDFs, documents)
   - Or AWS S3 / Cloudinary

---

## Development Phases

### Phase 1: Enhanced Client Management (Week 1)
- Extend database schema
- Build client list view with filters
- Build client detail page
- Add status management
- Add notes/activity tracking

### Phase 2: Email System (Week 2)
- Set up Resend integration
- Build email template system
- Create email composer
- Implement email sending
- Add email history tracking

### Phase 3: Invoice System (Week 3)
- Build invoice creation form
- Implement PDF generation
- Add invoice management
- Email invoice functionality
- Payment tracking

### Phase 4: Proposal/Scope System (Week 4)
- Build proposal editor
- Create template system
- PDF generation for proposals
- Send proposal functionality
- Approval workflow

### Phase 5: Automation & Polish (Week 5)
- Build automation triggers
- Task management
- Dashboard enhancements
- Email sequences
- Final polish and testing

---

## Design Requirements

- **Maintain existing branding:** Purple gradient theme (`#6b36ff`, `#a367ff`, `#ff9dff`)
- **Dark theme:** Keep dark background (`#0a0014`)
- **Typography:** Continue using Poppins, Inter, Oswald fonts
- **Component library:** Use existing Tailwind patterns
- **Responsive:** Mobile-first design
- **Professional:** Clean, modern, agency-appropriate UI

---

## Success Metrics

- **Efficiency:** Reduce manual follow-up time by 80%
- **Professionalism:** 100% branded communications
- **Automation:** 90% of routine tasks automated
- **Organization:** All client data in one place
- **Revenue:** Faster proposal-to-contract conversion

---

## Next Steps for Developer

1. Review current codebase structure
2. Set up extended database schema in Supabase
3. Begin with Phase 1 (Enhanced Client Management)
4. Build incrementally, testing each feature
5. Maintain code quality and documentation
6. Ensure all features are mobile-responsive
7. Implement proper error handling and loading states
8. Add authentication/authorization if needed
9. Set up proper environment variables for new services
10. Create comprehensive documentation

---

## Questions to Clarify

- What email service do you prefer? (Resend is already in dependencies)
- Do you need multi-user/team support or single-user?
- What payment processing do you want for invoices? (Stripe, PayPal, etc.)
- Do you need e-signature integration?
- What file storage solution? (Supabase Storage, S3, etc.)
- Any specific invoice/proposal templates you want to match?
- Do you need calendar integration beyond Calendly?
- Any existing tools you want to integrate with?

---

**Current Codebase Location:** `/Users/finnschueler/Desktop/Drivn.ai_dev/web`

**Key Files to Review:**
- `src/app/admin/page.tsx` - Current admin dashboard
- `src/app/book-call/page.tsx` - Lead capture form
- `src/lib/supabase.ts` - Database client
- `.env.local` - Environment configuration
- `package.json` - Dependencies

**Ready to begin development. Start with Phase 1 and build incrementally.**
