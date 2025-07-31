// Supabase Configuration
// Replace these values with your actual Supabase project credentials

const SUPABASE_CONFIG = {
    // Get these values from your Supabase project dashboard:
    // 1. Go to Settings > API in your Supabase dashboard
    // 2. Copy the Project URL and Anon public key
    
    // Example: 'https://your-project-ref.supabase.co'
    url: 'https://cggzrylmeexzzfrzqlwt.supabase.co',
    
    // Example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnZ3pyeWxtZWV4enpmcnpxbHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYyMzYsImV4cCI6MjA2Nzk1MjIzNn0.vfuftfJF3uDY88kPBKL4kSFPy-kppd9xEK7KDcW_gLc',
    
    // Set to false to disable Supabase and use local functionality only
    enabled: true
};

// Export configuration
if (typeof window !== 'undefined') {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
}