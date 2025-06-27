import { supabase as supabaseClient } from '@/lib/supabase/client';
import * as bcrypt from 'bcryptjs';

export interface GuestAuthData {
  email: string;
  password?: string;
  googleId?: string;
  guestId: string;
}

export interface GuestSession {
  guestId: string;
  email: string;
  name: string;
  verified: boolean;
}

export class GuestAuthService {
  private supabase = supabaseClient;

  /**
   * Register a new guest with email and password
   */
  async registerWithEmail(
    email: string,
    password: string,
    guestData: {
      firstName: string;
      lastName: string;
      phone?: string;
      instagramHandle?: string;
    }
  ): Promise<{ guest: GuestSession; error?: string }> {
    try {
      // Check if email already exists
      const { data: existingAuth } = await this.supabase
        .from('guest_auth')
        .select('id')
        .eq('email', email)
        .single();

      if (existingAuth) {
        return { guest: null!, error: 'Email already registered' };
      }

      // Create guest record
      const { data: guest, error: guestError } = await this.supabase
        .from('guests')
        .insert({
          first_name: guestData.firstName,
          last_name: guestData.lastName,
          email: email,
          phone: guestData.phone,
          instagram_handle: guestData.instagramHandle,
        })
        .select()
        .single();

      if (guestError) {
        return { guest: null!, error: 'Failed to create guest profile' };
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create auth record
      const { error: authError } = await this.supabase
        .from('guest_auth')
        .insert({
          guest_id: guest.id,
          email: email,
          password_hash: passwordHash,
        })
        .select()
        .single();

      if (authError) {
        // Rollback guest creation
        await this.supabase.from('guests').delete().eq('id', guest.id);
        return { guest: null!, error: 'Failed to create authentication' };
      }

      // Skip email verification for now (TODO: implement proper email service)
      // await this.sendVerificationEmail(email, guest.id);

      return {
        guest: {
          guestId: guest.id,
          email: email,
          name: `${guest.first_name} ${guest.last_name}`,
          verified: false,
        },
      };
    } catch (error) {
      console.error('Guest registration error:', error);
      return { guest: null!, error: 'Registration failed' };
    }
  }

  /**
   * Login with email and password
   */
  async loginWithEmail(
    email: string,
    password: string
  ): Promise<{ guest: GuestSession; error?: string }> {
    try {
      // Get auth record
      const { data: auth, error: authError } = await this.supabase
        .from('guest_auth')
        .select('*, guest:guests(*)')
        .eq('email', email)
        .single();

      if (authError || !auth) {
        return { guest: null!, error: 'Invalid credentials' };
      }

      // Verify password
      const validPassword = await bcrypt.compare(password, auth.password_hash);
      if (!validPassword) {
        return { guest: null!, error: 'Invalid credentials' };
      }

      // Update last login
      await this.supabase
        .from('guest_auth')
        .update({ last_login: new Date().toISOString() })
        .eq('id', auth.id);

      await this.supabase
        .from('guests')
        .update({ last_login: new Date().toISOString() })
        .eq('id', auth.guest_id);

      return {
        guest: {
          guestId: auth.guest_id,
          email: auth.email,
          name: `${auth.guest.first_name} ${auth.guest.last_name}`,
          verified: auth.email_verified,
        },
      };
    } catch (error) {
      console.error('Guest login error:', error);
      return { guest: null!, error: 'Login failed' };
    }
  }

  /**
   * Register/login with Google OAuth
   */
  async authenticateWithGoogle(googleProfile: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<{ guest: GuestSession; error?: string }> {
    try {
      // Check if Google ID exists
      const { data: existingAuth } = await this.supabase
        .from('guest_auth')
        .select('*, guest:guests(*)')
        .eq('google_id', googleProfile.id)
        .single();

      if (existingAuth) {
        // Update last login
        await this.supabase
          .from('guest_auth')
          .update({ last_login: new Date().toISOString() })
          .eq('id', existingAuth.id);

        return {
          guest: {
            guestId: existingAuth.guest_id,
            email: existingAuth.email,
            name: `${existingAuth.guest.first_name} ${existingAuth.guest.last_name}`,
            verified: true, // Google accounts are pre-verified
          },
        };
      }

      // Create new guest
      const nameParts = googleProfile.name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';

      const { data: guest, error: guestError } = await this.supabase
        .from('guests')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: googleProfile.email,
          profile_photo_url: googleProfile.picture,
        })
        .select()
        .single();

      if (guestError) {
        return { guest: null!, error: 'Failed to create guest profile' };
      }

      // Create auth record
      const { error: authError } = await this.supabase
        .from('guest_auth')
        .insert({
          guest_id: guest.id,
          email: googleProfile.email,
          google_id: googleProfile.id,
          email_verified: true,
          email_verified_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (authError) {
        // Rollback guest creation
        await this.supabase.from('guests').delete().eq('id', guest.id);
        return { guest: null!, error: 'Failed to create authentication' };
      }

      return {
        guest: {
          guestId: guest.id,
          email: googleProfile.email,
          name: googleProfile.name,
          verified: true,
        },
      };
    } catch (error) {
      console.error('Google auth error:', error);
      return { guest: null!, error: 'Google authentication failed' };
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: auth } = await this.supabase
        .from('guest_auth')
        .select('id, guest_id')
        .eq('email', email)
        .single();

      if (!auth) {
        return { success: false, error: 'Email not found' };
      }

      // Generate reset token
      const resetToken = this.generateResetToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

      await this.supabase
        .from('guest_auth')
        .update({
          reset_token: resetToken,
          reset_token_expires: expiresAt.toISOString(),
        })
        .eq('id', auth.id);

      // TODO: Send actual email
      console.log(`Password reset token for ${email}: ${resetToken}`);

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'Failed to send reset email' };
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Find valid token
      const { data: auth } = await this.supabase
        .from('guest_auth')
        .select('id')
        .eq('reset_token', token)
        .gt('reset_token_expires', new Date().toISOString())
        .single();

      if (!auth) {
        return { success: false, error: 'Invalid or expired token' };
      }

      // Hash new password
      const passwordHash = await bcrypt.hash(newPassword, 10);

      // Update password and clear token
      await this.supabase
        .from('guest_auth')
        .update({
          password_hash: passwordHash,
          reset_token: null,
          reset_token_expires: null,
        })
        .eq('id', auth.id);

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'Failed to reset password' };
    }
  }

  /**
   * Verify email with token
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async verifyEmail(guestId: string, token: string): Promise<{ success: boolean }> {
    // TODO: Implement email verification with token validation
    try {
      await this.supabase
        .from('guest_auth')
        .update({
          email_verified: true,
          email_verified_at: new Date().toISOString(),
        })
        .eq('guest_id', guestId);

      return { success: true };
    } catch (error) {
      console.error('Email verification error:', error);
      return { success: false };
    }
  }

  /**
   * Get guest session by ID
   */
  async getGuestSession(guestId: string): Promise<GuestSession | null> {
    try {
      const { data: guest } = await this.supabase
        .from('guests')
        .select('*, auth:guest_auth(*)')
        .eq('id', guestId)
        .single();

      if (!guest) {
        return null;
      }

      return {
        guestId: guest.id,
        email: guest.email,
        name: `${guest.first_name} ${guest.last_name}`,
        verified: guest.auth?.email_verified || false,
      };
    } catch (error) {
      console.error('Get guest session error:', error);
      return null;
    }
  }

  /**
   * Check if guest is banned
   */
  async isGuestBanned(
    guestId?: string,
    email?: string,
    phone?: string,
    instagram?: string
  ): Promise<boolean> {
    try {
      const { data: ban } = await this.supabase
        .rpc('is_guest_banned', {
          p_guest_id: guestId,
          p_email: email,
          p_phone: phone,
          p_instagram: instagram,
        });

      return ban || false;
    } catch (error) {
      console.error('Ban check error:', error);
      return false;
    }
  }

  private generateResetToken(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  private async sendVerificationEmail(email: string, guestId: string): Promise<void> {
    // TODO: Implement actual email sending
    const verificationToken = this.generateResetToken();
    console.log(`Verification link for ${email}: /verify?id=${guestId}&token=${verificationToken}`);
  }
}