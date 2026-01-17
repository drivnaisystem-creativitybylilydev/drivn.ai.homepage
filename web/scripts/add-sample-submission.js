// Quick script to add a sample submission to Supabase
// Run with: node scripts/add-sample-submission.js

const { createClient } = require('@supabase/supabase-js');

// Supabase credentials (from .env.local)
const supabaseUrl = 'https://xltdiksmnphfhuntqwqm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdGRpa3NtbnBoZmh1bnRxd3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2Njg2MjQsImV4cCI6MjA4NDI0NDYyNH0.dQT7g7HHyxMssKw--FAOcoE3PdggsNATezsBvnitGlk';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleSubmission = {
  company_name: 'ABC Plumbing & HVAC',
  contact_name: 'John Smith',
  email: 'drivn.ai.systems@gmail.com',
  phone: '(555) 123-4567',
  service_type: 'Home Services (HVAC, Plumbing, Electrical, etc.)',
  monthly_leads: '200-500 leads/month',
  average_ticket: '$2,000 - $10,000',
  current_crm: 'HubSpot',
  urgency: 'ASAP (within 2 weeks)',
  created_at: new Date().toISOString(),
};

async function addSampleSubmission() {
  console.log('Adding sample submission...');
  console.log('Data:', sampleSubmission);
  
  const { data, error } = await supabase
    .from('clients')
    .insert(sampleSubmission)
    .select();

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  console.log('✅ Sample submission added successfully!');
  console.log('Inserted data:', data);
}

addSampleSubmission();
