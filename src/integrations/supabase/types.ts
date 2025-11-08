export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      companies: {
        Row: {
          created_at: string
          id: string
          industry: string | null
          name: string
          organization_id: string
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          industry?: string | null
          name: string
          organization_id: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          industry?: string | null
          name?: string
          organization_id?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          company_id: string | null
          created_at: string
          email: string | null
          first_name: string
          id: string
          last_name: string
          organization_id: string
          phone: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          organization_id: string
          phone?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          organization_id?: string
          phone?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          company_id: string | null
          contact_id: string | null
          created_at: string
          created_by: string
          id: string
          organization_id: string
          stage: Database["public"]["Enums"]["deal_stage"]
          title: string
          updated_at: string
          value: number | null
        }
        Insert: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by: string
          id?: string
          organization_id: string
          stage?: Database["public"]["Enums"]["deal_stage"]
          title: string
          updated_at?: string
          value?: number | null
        }
        Update: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string
          id?: string
          organization_id?: string
          stage?: Database["public"]["Enums"]["deal_stage"]
          title?: string
          updated_at?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      detected_cookies: {
        Row: {
          cookie_name: string
          cookie_type: string | null
          detected_at: string
          domain: string | null
          duration: string | null
          id: string
          policy_id: string
          purpose: string | null
        }
        Insert: {
          cookie_name: string
          cookie_type?: string | null
          detected_at?: string
          domain?: string | null
          duration?: string | null
          id?: string
          policy_id: string
          purpose?: string | null
        }
        Update: {
          cookie_name?: string
          cookie_type?: string | null
          detected_at?: string
          domain?: string | null
          duration?: string | null
          id?: string
          policy_id?: string
          purpose?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "detected_cookies_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      job_sources: {
        Row: {
          created_at: string
          embed_config: Json | null
          id: string
          is_active: boolean
          last_synced_at: string | null
          name: string
          source_url: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          embed_config?: Json | null
          id?: string
          is_active?: boolean
          last_synced_at?: string | null
          name: string
          source_url: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          embed_config?: Json | null
          id?: string
          is_active?: boolean
          last_synced_at?: string | null
          name?: string
          source_url?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          company_name: string
          created_at: string
          description: string | null
          id: string
          job_source_id: string | null
          job_title: string
          job_type: string | null
          job_url: string
          last_synced_at: string
          linkedin_url: string
          location: string | null
          posted_date: string | null
          updated_at: string
        }
        Insert: {
          company_name: string
          created_at?: string
          description?: string | null
          id?: string
          job_source_id?: string | null
          job_title: string
          job_type?: string | null
          job_url: string
          last_synced_at?: string
          linkedin_url: string
          location?: string | null
          posted_date?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          description?: string | null
          id?: string
          job_source_id?: string | null
          job_title?: string
          job_type?: string | null
          job_url?: string
          last_synced_at?: string
          linkedin_url?: string
          location?: string | null
          posted_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_job_source_id_fkey"
            columns: ["job_source_id"]
            isOneToOne: false
            referencedRelation: "job_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      message_boards: {
        Row: {
          created_at: string
          created_by: string
          id: string
          organization_id: string
          project_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          organization_id: string
          project_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          organization_id?: string
          project_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_boards_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_boards_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          created_by: string
          id: string
          message_board_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          id?: string
          message_board_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          message_board_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_message_board_id_fkey"
            columns: ["message_board_id"]
            isOneToOne: false
            referencedRelation: "message_boards"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      policies: {
        Row: {
          content: string | null
          created_at: string
          id: string
          policy_type: Database["public"]["Enums"]["policy_type"]
          status: Database["public"]["Enums"]["policy_status"]
          updated_at: string
          user_id: string
          version: number
          website_name: string | null
          website_url: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          policy_type: Database["public"]["Enums"]["policy_type"]
          status?: Database["public"]["Enums"]["policy_status"]
          updated_at?: string
          user_id: string
          version?: number
          website_name?: string | null
          website_url: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          policy_type?: Database["public"]["Enums"]["policy_type"]
          status?: Database["public"]["Enums"]["policy_status"]
          updated_at?: string
          user_id?: string
          version?: number
          website_name?: string | null
          website_url?: string
        }
        Relationships: []
      }
      policy_conversations: {
        Row: {
          answers: Json
          completed: boolean
          created_at: string
          current_step: string | null
          id: string
          messages: Json
          policy_id: string
          updated_at: string
        }
        Insert: {
          answers?: Json
          completed?: boolean
          created_at?: string
          current_step?: string | null
          id?: string
          messages?: Json
          policy_id: string
          updated_at?: string
        }
        Update: {
          answers?: Json
          completed?: boolean
          created_at?: string
          current_step?: string | null
          id?: string
          messages?: Json
          policy_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_conversations_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_versions: {
        Row: {
          changes_summary: string | null
          content: string
          created_at: string
          id: string
          policy_id: string
          version: number
        }
        Insert: {
          changes_summary?: string | null
          content: string
          created_at?: string
          id?: string
          policy_id: string
          version: number
        }
        Update: {
          changes_summary?: string | null
          content?: string
          created_at?: string
          id?: string
          policy_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "policy_versions_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_documents: {
        Row: {
          content: string | null
          created_at: string
          created_by: string
          doc_type: string | null
          id: string
          project_id: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by: string
          doc_type?: string | null
          id?: string
          project_id: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string
          doc_type?: string | null
          id?: string
          project_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_members: {
        Row: {
          created_at: string
          id: string
          project_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_milestones: {
        Row: {
          completed: boolean | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          project_id: string
          title: string
          updated_at: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          project_id: string
          title: string
          updated_at?: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          organization_id: string
          priority: Database["public"]["Enums"]["task_priority"]
          project_id: string | null
          status: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          organization_id: string
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          organization_id?: string
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      todo_items: {
        Row: {
          assigned_to: string | null
          completed: boolean | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          position: number | null
          title: string
          todo_list_id: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed?: boolean | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          position?: number | null
          title: string
          todo_list_id: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed?: boolean | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          position?: number | null
          title?: string
          todo_list_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "todo_items_todo_list_id_fkey"
            columns: ["todo_list_id"]
            isOneToOne: false
            referencedRelation: "todo_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      todo_lists: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          project_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          project_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          project_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "todo_lists_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_organizations: {
        Args: { _user_id: string }
        Returns: {
          created_at: string
          id: string
          name: string
          role: Database["public"]["Enums"]["app_role"]
        }[]
      }
      has_role_in_org: {
        Args: {
          _organization_id: string
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_org_member: {
        Args: { _organization_id: string; _user_id: string }
        Returns: boolean
      }
      sync_all_linkedin_jobs: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "owner" | "admin" | "member" | "guest"
      deal_stage:
        | "lead"
        | "qualified"
        | "proposal"
        | "negotiation"
        | "won"
        | "lost"
      policy_status: "draft" | "in_progress" | "completed" | "published"
      policy_type:
        | "privacy_policy"
        | "cookie_policy"
        | "terms_of_service"
        | "gdpr_compliance"
        | "ccpa_compliance"
      task_priority: "low" | "medium" | "high" | "urgent"
      task_status: "todo" | "in_progress" | "review" | "done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["owner", "admin", "member", "guest"],
      deal_stage: [
        "lead",
        "qualified",
        "proposal",
        "negotiation",
        "won",
        "lost",
      ],
      policy_status: ["draft", "in_progress", "completed", "published"],
      policy_type: [
        "privacy_policy",
        "cookie_policy",
        "terms_of_service",
        "gdpr_compliance",
        "ccpa_compliance",
      ],
      task_priority: ["low", "medium", "high", "urgent"],
      task_status: ["todo", "in_progress", "review", "done"],
    },
  },
} as const
