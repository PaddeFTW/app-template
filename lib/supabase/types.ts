export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          company_name: string | null;
          job_title: string | null;
          language: string;
          timezone: string;
          terms_accepted_at: string | null;
          privacy_accepted_at: string | null;
          marketing_consent: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          company_name?: string | null;
          job_title?: string | null;
          language?: string;
          timezone?: string;
          terms_accepted_at?: string | null;
          privacy_accepted_at?: string | null;
          marketing_consent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          company_name?: string | null;
          job_title?: string | null;
          language?: string;
          timezone?: string;
          terms_accepted_at?: string | null;
          privacy_accepted_at?: string | null;
          marketing_consent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience aliases
export type UserProfile =
  Database["public"]["Tables"]["user_profiles"]["Row"];
export type UserProfileInsert =
  Database["public"]["Tables"]["user_profiles"]["Insert"];
export type UserProfileUpdate =
  Database["public"]["Tables"]["user_profiles"]["Update"];
