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
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
      }
      prices: {
        Row: {
          id: number
          inserted_at: string
          num_reviews: number | null
          platform: string | null
          price: number | null
          product_id: number | null
          product_link: string | null
          rating: number | null
          updated_at: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          num_reviews?: number | null
          platform?: string | null
          price?: number | null
          product_id?: number | null
          product_link?: string | null
          rating?: number | null
          updated_at?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          num_reviews?: number | null
          platform?: string | null
          price?: number | null
          product_id?: number | null
          product_link?: string | null
          rating?: number | null
          updated_at?: string
        }
      }
      prices_histories: {
        Row: {
          id: number
          inserted_at: string
          price: number | null
          product_id: number | null
          updated_at: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          price?: number | null
          product_id?: number | null
          updated_at?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          price?: number | null
          product_id?: number | null
          updated_at?: string
        }
      }
      products: {
        Row: {
          brand: string | null
          category_id: number | null
          id: number
          image_link: string | null
          inserted_at: string
          product_name: string | null
          updated_at: string
        }
        Insert: {
          brand?: string | null
          category_id?: number | null
          id?: number
          image_link?: string | null
          inserted_at?: string
          product_name?: string | null
          updated_at?: string
        }
        Update: {
          brand?: string | null
          category_id?: number | null
          id?: number
          image_link?: string | null
          inserted_at?: string
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
