// Mock Invitation Service
// This simulates a real SMS/Email invitation system for development

export interface InvitationRequest {
  guestId: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventVenue: string;
  message: string;
  djName: string;
}

export interface InvitationResponse {
  id: string;
  guestId: string;
  status: 'sent' | 'failed' | 'pending';
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
  errorMessage?: string;
}

export interface InvitationAnalytics {
  totalSent: number;
  delivered: number;
  read: number;
  failed: number;
  responses: {
    accepted: number;
    declined: number;
    noResponse: number;
  };
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Store invitation history in localStorage
const INVITATION_STORAGE_KEY = 'nightlist_invitations';

export class MockInvitationService {
  // Send a single invitation
  static async sendInvitation(request: InvitationRequest): Promise<InvitationResponse> {
    await delay(Math.random() * 500 + 200); // 200-700ms delay

    // Simulate 90% success rate
    const isSuccess = Math.random() > 0.1;

    const invitation: InvitationResponse = {
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      guestId: request.guestId,
      status: isSuccess ? 'sent' : 'failed',
      sentAt: new Date().toISOString(),
      errorMessage: isSuccess ? undefined : 'Failed to deliver message',
    };

    // Simulate delivery and read receipts for successful sends
    if (isSuccess) {
      // 95% get delivered
      if (Math.random() > 0.05) {
        invitation.deliveredAt = new Date(Date.now() + Math.random() * 60000).toISOString(); // 0-60s later

        // 70% of delivered get read
        if (Math.random() > 0.3) {
          invitation.readAt = new Date(Date.now() + Math.random() * 300000 + 60000).toISOString(); // 1-6min later
        }
      }
    }

    // Store in localStorage
    this.storeInvitation(request, invitation);

    return invitation;
  }

  // Send multiple invitations
  static async sendBulkInvitations(
    requests: InvitationRequest[],
    onProgress?: (completed: number, total: number) => void
  ): Promise<InvitationResponse[]> {
    const results: InvitationResponse[] = [];

    for (let i = 0; i < requests.length; i++) {
      const result = await this.sendInvitation(requests[i]);
      results.push(result);

      if (onProgress) {
        onProgress(i + 1, requests.length);
      }
    }

    return results;
  }

  // Shorten URLs in message (mock implementation)
  static shortenUrl(longUrl: string): string {
    // Mock URL shortening - in real app, use bit.ly, tinyurl, etc.
    const urlHash = btoa(longUrl).substring(0, 8).replace(/[+/=]/g, '');
    return `https://ntl.st/${urlHash}`;
  }

  // Personalize message by replacing variables
  static personalizeMessage(template: string, variables: Record<string, string>): string {
    let message = template;

    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      message = message.replace(regex, value);
    });

    // Auto-shorten any URLs in the message
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    message = message.replace(urlRegex, url => this.shortenUrl(url));

    return message;
  }

  // Get invitation history for an event
  static getEventInvitations(eventId: string): InvitationResponse[] {
    const stored = localStorage.getItem(INVITATION_STORAGE_KEY);
    if (!stored) return [];

    const all = JSON.parse(stored);
    return all.filter((inv: any) => inv.request.eventId === eventId);
  }

  // Get invitation analytics for an event
  static getEventAnalytics(eventId: string): InvitationAnalytics {
    const invitations = this.getEventInvitations(eventId);

    const analytics: InvitationAnalytics = {
      totalSent: invitations.length,
      delivered: invitations.filter(inv => inv.deliveredAt).length,
      read: invitations.filter(inv => inv.readAt).length,
      failed: invitations.filter(inv => inv.status === 'failed').length,
      responses: {
        accepted: 0,
        declined: 0,
        noResponse: 0,
      },
    };

    // Simulate response rates for read messages
    invitations.forEach(inv => {
      if (inv.readAt) {
        const rand = Math.random();
        if (rand < 0.6) {
          analytics.responses.accepted++;
        } else if (rand < 0.8) {
          analytics.responses.declined++;
        } else {
          analytics.responses.noResponse++;
        }
      }
    });

    return analytics;
  }

  // Check if guest was already invited to an event
  static wasGuestInvited(guestId: string, eventId: string): boolean {
    const invitations = this.getEventInvitations(eventId);
    return invitations.some(inv => inv.guestId === guestId);
  }

  // Store invitation in localStorage
  private static storeInvitation(request: InvitationRequest, response: InvitationResponse) {
    const stored = localStorage.getItem(INVITATION_STORAGE_KEY);
    const invitations = stored ? JSON.parse(stored) : [];

    invitations.push({
      request,
      response,
      timestamp: new Date().toISOString(),
    });

    // Keep only last 1000 invitations
    if (invitations.length > 1000) {
      invitations.splice(0, invitations.length - 1000);
    }

    localStorage.setItem(INVITATION_STORAGE_KEY, JSON.stringify(invitations));
  }

  // Simulate guest response to invitation
  static async simulateGuestResponse(
    invitationId: string
  ): Promise<'accepted' | 'declined' | 'no_response'> {
    await delay(Math.random() * 2000 + 1000); // 1-3s delay

    const rand = Math.random();
    if (rand < 0.6) return 'accepted';
    if (rand < 0.8) return 'declined';
    return 'no_response';
  }

  // Clear all invitation history (for testing)
  static clearHistory() {
    localStorage.removeItem(INVITATION_STORAGE_KEY);
  }
}
