// Script to book a test appointment via Calendly API
// Run with: node scripts/book-test-appointment.js

const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
let envVars = {};

try {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      envVars[match[1].trim()] = match[2].trim();
    }
  });
} catch (error) {
  console.error('Error reading .env.local:', error.message);
  process.exit(1);
}

const calendlyApiKey = envVars.CALENDLY_API_KEY;

if (!calendlyApiKey) {
  console.error('CALENDLY_API_KEY not found in .env.local');
  process.exit(1);
}

// Calendly event details
// You'll need to get your event URI from Calendly
// It looks like: https://api.calendly.com/scheduled_events/EVENT_UUID
const eventUri = 'https://api.calendly.com/scheduled_events/your-event-uri-here'; // Replace with your actual event URI
const inviteeEmail = 'test@example.com'; // Use an email that matches a lead in your database
const scheduledTime = '2024-01-19T18:00:00-05:00'; // January 19, 2024 at 6:00 PM EST

async function bookAppointment() {
  try {
    console.log('Booking test appointment...');
    console.log('Event URI:', eventUri);
    console.log('Email:', inviteeEmail);
    console.log('Scheduled Time:', scheduledTime);
    
    // Note: Calendly API requires creating an invitee through their API
    // This is a simplified version - you may need to adjust based on Calendly's API
    
    const response = await fetch(`https://api.calendly.com/scheduled_events/${eventUri.split('/').pop()}/invitees`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${calendlyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: inviteeEmail,
        name: 'Test Lead',
        scheduled_event: {
          uri: eventUri,
        },
        // Note: Calendly API may have different requirements
        // Check Calendly API docs for exact format
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error booking appointment:', response.status, errorText);
      console.log('\nNote: You may need to:');
      console.log('1. Get your Calendly event URI from Calendly settings');
      console.log('2. Check Calendly API documentation for the exact booking format');
      console.log('3. Or manually book through the Calendly widget and the webhook will capture it');
      return;
    }

    const data = await response.json();
    console.log('✅ Appointment booked successfully!');
    console.log('Response:', data);
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nAlternative: Book manually through the Calendly widget on your form.');
    console.log('The webhook will automatically capture the scheduled time.');
  }
}

// Actually, Calendly's API doesn't work this way for booking
// The better approach is to manually book or use their scheduling API differently
console.log('Note: Calendly API doesn\'t support direct booking this way.');
console.log('Instead, please:');
console.log('1. Fill out your form with email:', inviteeEmail);
console.log('2. Book the appointment manually in the Calendly widget');
console.log('3. The webhook will automatically capture the scheduled time');
console.log('\nOr set up the webhook first, then book manually.');
