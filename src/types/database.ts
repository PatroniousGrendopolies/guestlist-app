import { UserRole, EntryStatus } from './enums';

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  given_name?: string;
  stage_name?: string;
  instagram_handle?: string;
  phone?: string;
  manager_permissions?: Record<string, any>;
  vip_qr_code?: string;
  vip_max_plus_ones?: number;
  account_status: 'active' | 'suspended' | 'inactive';
  invited_by_user_id?: string;
  default_capacity?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  instagram_handle?: string;
  guest_tier: 'regular' | 'micro_promoter' | 'vip' | 'blocked';
  total_events_attended: number;
  conversion_rate: number;
  last_attended_date?: string;
  vip_status_granted_by?: string;
  vip_status_granted_at?: string;
  monthly_invite_allowance: number;
  profile_photo_url?: string;
  date_of_birth?: string;
  marketing_consent: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface GuestAuth {
  id: string;
  guest_id: string;
  email: string;
  password_hash?: string;
  google_id?: string;
  email_verified: boolean;
  email_verified_at?: string;
  last_login?: string;
  reset_token?: string;
  reset_token_expires?: string;
  created_at: string;
  updated_at: string;
}

export interface Ban {
  id: string;
  guest_id?: string;
  banned_email?: string;
  banned_phone?: string;
  banned_instagram?: string;
  banned_name?: string;
  reason: string;
  duration_type: 'days' | 'months' | 'years' | 'permanent';
  duration_value?: number;
  expires_at?: string;
  banned_by_user_id: string;
  ban_lifted_by_user_id?: string;
  ban_lifted_at?: string;
  ban_lifted_reason?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CapacityRequest {
  id: string;
  requester_id: string;
  event_id: string;
  guest_list_id?: string;
  current_limit: number;
  requested_limit: number;
  reason?: string;
  status: 'pending' | 'approved' | 'denied';
  approved_by_user_id?: string;
  approved_at?: string;
  denial_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface VenueSettings {
  id: string;
  venue_id: string;
  default_event_capacity: number;
  default_staff_capacity: number;
  default_promoter_capacity: number;
  default_dj_capacity: number;
  default_max_plus_ones: number;
  operating_schedule: OperatingDay[];
  approval_warning_time: string; // HH:MM:SS format
  approval_warning_threshold: number; // percentage
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface OperatingDay {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  is_open: boolean;
  open_time?: string; // HH:MM format
  close_time?: string; // HH:MM format
}

export interface Event {
  id: string;
  name: string;
  date: string;
  day_of_week: string;
  venue_id: string;
  status: 'active' | 'cancelled' | 'completed' | 'under_promoted';
  max_total_capacity: number;
  created_by_user_id: string;
  lightspeed_event_id?: string;
  predicted_attendance?: number;
  actual_attendance?: number;
  total_bar_sales?: number;
  total_door_sales?: number;
  paid_covers_count?: number;
  promotional_photos: string[];
  event_flyers: string[];
  created_at: string;
  updated_at: string;
}

export interface EventDjAssignment {
  id: string;
  event_id: string;
  dj_user_id: string;
  invitation_sent_at?: string;
  invitation_status: 'pending' | 'accepted' | 'declined';
  is_returning_dj: boolean;
  display_order?: number;
  individual_capacity?: number;
  created_at: string;
  updated_at: string;
}

export interface GuestList {
  id: string;
  event_id: string;
  created_by_user_id: string;
  list_type: 'dj_list' | 'staff_list' | 'vip_list' | 'promoter_list';
  name: string;
  max_capacity: number;
  max_plus_size: number;
  current_capacity: number;
  list_deadline?: string;
  approval_deadline?: string;
  status: 'active' | 'cancelled' | 'completed';
  conversion_rate: number;
  created_at: string;
  updated_at: string;
}

export interface GuestListEntry {
  id: string;
  guest_list_id: string;
  guest_id: string;
  status: 'pending' | 'approved' | 'denied';
  plus_ones_requested: number;
  plus_ones_checked_in: number;
  qr_code?: string;
  qr_code_used: boolean;
  checked_in_at?: string;
  checked_in_by_user_id?: string;
  approved_by_user_id?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

// Utility types for forms and API responses
export interface CreateBanRequest {
  guest_id?: string;
  banned_email?: string;
  banned_phone?: string;
  banned_instagram?: string;
  banned_name?: string;
  reason: string;
  duration_type: 'days' | 'months' | 'years' | 'permanent';
  duration_value?: number;
}

export interface CreateCapacityRequest {
  event_id: string;
  guest_list_id?: string;
  requested_limit: number;
  reason?: string;
}

export interface CreateEventRequest {
  name: string;
  date: string;
  max_total_capacity?: number;
  djs: Array<{
    user_id?: string; // Existing DJ
    dj_name?: string; // New DJ name
    given_name?: string; // New DJ real name
    email?: string; // New DJ email
    invite_link?: string; // Generated invite link for new DJ
    individual_capacity?: number;
  }>;
  capacity_distribution: 'shared' | 'individual';
}

export interface GuestSignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  instagram_handle?: string;
  plus_ones_requested: number;
  guest_list_id: string;
  privacy_consent: boolean;
  marketing_consent?: boolean;
}

export interface InviteUserRequest {
  email?: string;
  phone?: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  stage_name?: string; // For DJs
  default_capacity?: number;
  event_id?: string; // For DJ invitations
}