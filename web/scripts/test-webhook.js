// Test script to simulate a Calendly webhook for January 19th at 6pm
// This will update an existing lead with the scheduled time
// Run with: node scripts/test-webhook.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase credentials (from .env.local)
const supabaseUrl = 'https://xltdiksmnphfhuntqwqm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdGRpa3NtbnBoZmh1bnRxd3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2Njg2MjQsImV4cCI6MjA4NDI0NDYyNH0.dQT7g7HHyxMssKw--FAOcoE3PdggsNATezsBvnitGlk';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test data - January 19, 2024 at 6:00 PM EST
const testEmail = process.argv[2] || 'drivn.ai.systems@gmail.com'; // Use email from your test submission
const scheduledDateTime = '2024-01-19T18:00:00-05:00'; // January 19, 2024 at 6:00 PM EST
const scheduledDate = '2024-01-19';
const scheduledTime = '18:00:00';

async function testWebhook() {
  console.log('Testing webhook update...');
  console.log('Email:', testEmail);
  console.log('Scheduled DateTime:', scheduledDateTime);
  console.log('Scheduled Date:', scheduledDate);
  console.log('Scheduled Time:', scheduledTime);
  console.log('\n');

  // Find the lead by email
  const { data: leads, error: findError } = await supabase
    .from('Leads')
    .select('*')
    .eq('email', testEmail)
    .order('created_at', { ascending: false })
    .limit(1);

  if (findError) {
    console.error('Error finding lead:', findError);
    process.exit(1);
  }

  if (!leads || leads.length === 0) {
    console.error(`No lead found with email: ${testEmail}`);
    console.log('\nAvailable emails in database:');
    const { data: allLeads } = await supabase.from('Leads').select('email, company_name').limit(10);
    if (allLeads) {
      allLeads.forEach(lead => {
        console.log(`  - ${lead.email} (${lead.company_name})`);
      });
    }
    console.log('\nUsage: node scripts/test-webhook.js your-email@example.com');
    process.exit(1);
  }

  const lead = leads[0];
  console.log(`Found lead: ${lead.company_name} (${lead.email})`);

  // Update with scheduled time
  console.log('Updating lead ID:', lead.id);
  console.log('Update data:', {
    scheduled_date: scheduledDate,
    scheduled_time: scheduledTime,
    scheduled_datetime: scheduledDateTime,
  });

  const { data, error } = await supabase
    .from('Leads')
    .update({
      scheduled_date: scheduledDate,
      scheduled_time: scheduledTime,
      scheduled_datetime: scheduledDateTime,
      calendly_event_uri: 'https://api.calendly.com/scheduled_events/test-event-uri',
    })
    .eq('id', lead.id)
    .select();

  if (error) {
    console.error('\n❌ Error updating lead:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('\n⚠️ Update completed but no data returned.');
    console.log('This might be due to RLS policies. Checking if update worked...');
    
    // Try to fetch the updated lead
    const { data: updatedLead, error: fetchError } = await supabase
      .from('Leads')
      .select('*')
      .eq('id', lead.id)
      .single();
    
    if (fetchError) {
      console.error('Error fetching updated lead:', fetchError);
    } else {
      console.log('Updated lead data:', updatedLead);
      if (updatedLead.scheduled_date) {
        console.log('\n✅ Update successful! Scheduled date:', updatedLead.scheduled_date);
      } else {
        console.log('\n⚠️ Update may have failed - scheduled_date is still null');
      }
    }
  } else {
    console.log('\n✅ Successfully updated lead with scheduled time!');
    console.log('Updated data:', data[0]);
  }
  
  console.log('\nCheck your admin dashboard to see the scheduled time.');
}

testWebhook();
