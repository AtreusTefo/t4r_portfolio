// Supabase configuration
import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// Export for use in other files
export default supabase

// Helper functions for common operations
export const supabaseHelpers = {
  // Contact form submission
  async submitContactForm(formData) {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      return { success: false, error: error.message }
    }
  },

  // Get all projects
  async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching projects:', error)
      return { success: false, error: error.message }
    }
  },

  // Add new project (admin function)
  async addProject(projectData) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error adding project:', error)
      return { success: false, error: error.message }
    }
  },

  // Update project (admin function)
  async updateProject(id, projectData) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error updating project:', error)
      return { success: false, error: error.message }
    }
  },

  // Delete project (admin function)
  async deleteProject(id) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error deleting project:', error)
      return { success: false, error: error.message }
    }
  }
}