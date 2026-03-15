import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Graceful initialization check
let supabaseClient = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
  }
} else {
  console.error('Supabase configuration is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = supabaseClient;

export const parseTechnologies = (tech) => {
  if (Array.isArray(tech)) return tech;
  if (!tech || typeof tech !== 'string') return [];
  // Parse Postgres array literal: {Design,Branding,"Adobe XD"}
  const inner = tech.replace(/^\{|\}$/g, '');
  if (!inner) return [];
  const result = [];
  let current = '';
  let inQuotes = false;
  for (const char of inner) {
    if (char === '"') { inQuotes = !inQuotes; continue; }
    if (char === ',' && !inQuotes) { result.push(current); current = ''; continue; }
    current += char;
  }
  if (current) result.push(current);
  return result;
};
