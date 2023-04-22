export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
      }
      products: {
        Row: {
          brand: string | null
          category_id: number | null
          id: number
          image_link: string | null
          inserted_at: string
          platform: string | null
          product_link: string | null
          product_name: string | null
          updated_at: string
        }
        Insert: {
          brand?: string | null
          category_id?: number | null
          id?: number
          image_link?: string | null
          inserted_at?: string
          platform?: string | null
          product_link?: string | null
          product_name?: string | null
          updated_at?: string
        }
        Update: {
          brand?: string | null
          category_id?: number | null
          id?: number
          image_link?: string | null
          inserted_at?: string
          platform?: string | null
          product_link?: string | null
          product_name?: string | null
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
