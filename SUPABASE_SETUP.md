# Supabase Setup Guide

This guide will help you connect your portfolio to Supabase for database functionality.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter a project name (e.g., "portfolio-db")
5. Create a secure database password
6. Select a region close to your users
7. Click "Create new project"

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Configure Your Portfolio

1. Open `js/portfolio-supabase.js`
2. Replace the placeholder values:
   ```javascript
   const supabaseUrl = 'YOUR_SUPABASE_URL'; // Replace with your Project URL
   const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your Anon public key
   ```

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `database/schema.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the SQL commands

This will create the following tables:
- `projects` - Store your portfolio projects
- `contact_submissions` - Store contact form submissions
- `skills` - Store your skills (optional)
- `experiences` - Store work experience (optional)

## Step 5: Configure Row Level Security (RLS)

The schema includes RLS policies that:
- Allow public read access to projects and skills
- Allow anyone to submit contact forms
- Require authentication for admin operations

## Step 6: Test the Connection

1. Open your portfolio in a browser
2. Check the browser console for "Supabase connected successfully!" message
3. Try submitting the contact form
4. Check your Supabase dashboard under **Table Editor** > **contact_submissions**

## Step 7: Environment Variables (Optional)

For better security, you can use environment variables:

1. Copy `.env.example` to `.env`
2. Fill in your actual Supabase credentials
3. Update your deployment settings to use these environment variables

## Features Enabled

### Contact Form
- Form submissions are saved to the `contact_submissions` table
- Includes validation and error handling
- Shows success/error notifications

### Project Management
- Load projects from Supabase database
- Admin panel for adding/editing/deleting projects
- Automatic synchronization between database and UI

### Future Enhancements
- User authentication for admin panel
- Skills management
- Experience/resume management
- Analytics and visitor tracking

## Troubleshooting

### Common Issues

1. **"Supabase not connected" error**
   - Check your Project URL and Anon key
   - Ensure they're properly set in `portfolio-supabase.js`

2. **RLS policy errors**
   - Make sure you ran the complete schema.sql
   - Check that RLS policies are enabled

3. **CORS errors**
   - Supabase should handle CORS automatically
   - If issues persist, check your project settings

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- Check browser console for detailed error messages

## Next Steps

1. **Deploy to Netlify**: Your portfolio will work with Supabase on Netlify
2. **Add Authentication**: Implement user login for the admin panel
3. **Add More Features**: Skills management, blog posts, analytics
4. **Optimize Performance**: Add caching and pagination for large datasets

## Security Notes

- The Anon key is safe to use in client-side code
- RLS policies protect your data
- Never expose your service role key in client-side code
- Consider implementing authentication for admin features