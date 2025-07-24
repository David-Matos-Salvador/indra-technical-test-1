import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://xparkuktgocgyoranniq.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwYXJrdWt0Z29jZ3lvcmFubmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzUzODgsImV4cCI6MjA2ODg1MTM4OH0.7ZhX3ZZiiAhhc2RB9iOb_8k6t06ud00AcGsnAG00X8I';

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  get client() {
    return this.supabase;
  }
}
