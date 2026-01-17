import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    // Optional: Verify webhook signature if CALENDLY_SIGNING_KEY is set
    const signingKey = process.env.CALENDLY_SIGNING_KEY;
    if (signingKey) {
      const signature = request.headers.get("calendly-webhook-signature");
      // Add signature verification logic here if needed
      // For now, we'll just log if signature is present
      if (signature) {
        console.log("Webhook signature received");
      }
    }
    
    const body = await request.json();
    
    // Calendly sends different event types
    // We're interested in "invitee.created" when someone books
    if (body.event === "invitee.created") {
      const payload = body.payload;
      
      // Extract email from the invitee
      const inviteeEmail = payload.invitee?.email;
      const eventUri = payload.event_uri;
      const inviteeUri = payload.invitee?.uri;
      
      // Get scheduled time
      const scheduledTime = payload.scheduled_event?.start_time;
      const scheduledTimeFormatted = scheduledTime 
        ? new Date(scheduledTime).toISOString()
        : null;
      
      // Parse date and time components
      let scheduledDate = null;
      let scheduledTime = null;
      
      if (scheduledTimeFormatted) {
        const date = new Date(scheduledTimeFormatted);
        scheduledDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
        scheduledTime = date.toTimeString().split(' ')[0]; // HH:MM:SS
      }
      
      console.log("Calendly webhook received:", {
        email: inviteeEmail,
        scheduledTime: scheduledTimeFormatted,
        eventUri,
      });
      
      if (!inviteeEmail) {
        return NextResponse.json(
          { error: "No email found in webhook payload" },
          { status: 400 }
        );
      }
      
      // Find the client by email and update with scheduled time
      const { data, error } = await supabase
        .from("clients")
        .update({
          scheduled_date: scheduledDate,
          scheduled_time: scheduledTime,
          scheduled_datetime: scheduledTimeFormatted,
          calendly_event_uri: eventUri,
        })
        .eq("email", inviteeEmail)
        .order("created_at", { ascending: false })
        .limit(1)
        .select();
      
      if (error) {
        console.error("Error updating lead with scheduled time:", error);
        return NextResponse.json(
          { error: "Failed to update lead", details: error.message },
          { status: 500 }
        );
      }
      
      if (!data || data.length === 0) {
        console.log(`No client found with email: ${inviteeEmail}`);
        // Don't return error - the client might not exist yet or might be created later
        return NextResponse.json({ 
          message: "Webhook received but no matching client found",
          email: inviteeEmail 
        });
      }
      
      console.log("Successfully updated client with scheduled time:", data[0]);
      
      return NextResponse.json({ 
        success: true,
        message: "Client updated with scheduled time",
        client: data[0]
      });
    }
    
    // Handle other event types if needed
    return NextResponse.json({ 
      message: "Webhook received but event type not processed",
      event: body.event 
    });
    
  } catch (error) {
    console.error("Error processing Calendly webhook:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Allow GET for webhook verification (some services ping the endpoint)
export async function GET() {
  return NextResponse.json({ message: "Calendly webhook endpoint is active" });
}
