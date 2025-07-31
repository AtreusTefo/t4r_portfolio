// Portfolio Supabase Integration
// This file integrates Supabase functionality with the existing portfolio

// Import Supabase (this will work when using a module bundler or ES6 modules)
// For now, we'll use the CDN version in HTML

// Global variables
let supabase = null;
let isSupabaseConnected = false;

// Initialize Supabase connection
function initializeSupabase() {
    // Check if Supabase is loaded from CDN and configuration is available
    if (typeof window.supabase !== 'undefined' && window.SUPABASE_CONFIG) {
        const config = window.SUPABASE_CONFIG;
        
        // Check if Supabase is enabled and properly configured
        if (!config.enabled) {
            console.log('Supabase is disabled in configuration. Using local functionality.');
            isSupabaseConnected = false;
            return;
        }
        
        if (config.url === 'YOUR_SUPABASE_URL' || config.anonKey === 'YOUR_SUPABASE_ANON_KEY') {
            console.warn('Supabase credentials not configured. Please update js/supabase-config.js with your actual Supabase project credentials.');
            console.log('Using local functionality until Supabase is properly configured.');
            isSupabaseConnected = false;
            return;
        }
        
        try {
            supabase = window.supabase.createClient(config.url, config.anonKey);
            isSupabaseConnected = true;
            console.log('Supabase connected successfully!');
            console.log('Project URL:', config.url);
            
            // Load projects from Supabase if connected
            loadProjectsFromSupabase();
        } catch (error) {
            console.error('Failed to connect to Supabase:', error);
            console.log('Falling back to local functionality.');
            isSupabaseConnected = false;
        }
    } else {
        if (typeof window.supabase === 'undefined') {
            console.warn('Supabase library not loaded. Using local data.');
        }
        if (!window.SUPABASE_CONFIG) {
            console.warn('Supabase configuration not found. Using local data.');
        }
        isSupabaseConnected = false;
    }
}

// Enhanced contact form submission with Supabase
async function submitContactForm(formData) {
    if (!isSupabaseConnected) {
        // Fallback to local handling
        console.log('Contact form submitted (local):', formData);
        return { success: true, message: 'Message sent successfully!' };
    }
    
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
            ]);
        
        if (error) throw error;
        
        return { 
            success: true, 
            message: 'Your message has been sent successfully and saved to our database!' 
        };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return { 
            success: false, 
            message: 'Failed to send message. Please try again.' 
        };
    }
}

// Load projects from Supabase
async function loadProjectsFromSupabase() {
    if (!isSupabaseConnected) {
        return;
    }
    
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
            // Convert Supabase data to match existing project structure
            const supabaseProjects = data.map(project => ({
                id: project.id,
                title: project.title,
                description: project.description,
                technologies: project.technologies || [],
                image: project.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                demoLink: project.demo_link || '#',
                codeLink: project.code_link || '#'
            }));
            
            // Merge with existing projects or replace them
            window.projects = [...supabaseProjects, ...window.projects.filter(p => !supabaseProjects.find(sp => sp.id === p.id))];
            
            // Re-render projects if the render function exists
            if (typeof window.renderProjects === 'function') {
                window.renderProjects();
            }
            if (typeof window.renderAdminProjects === 'function') {
                window.renderAdminProjects();
            }
            
            console.log('Projects loaded from Supabase:', supabaseProjects.length);
        }
    } catch (error) {
        console.error('Error loading projects from Supabase:', error);
    }
}

// Add project to Supabase
async function addProjectToSupabase(projectData) {
    if (!isSupabaseConnected) {
        return { success: false, message: 'Supabase not connected' };
    }
    
    try {
        const { data, error } = await supabase
            .from('projects')
            .insert([
                {
                    title: projectData.title,
                    description: projectData.description,
                    technologies: projectData.technologies,
                    image_url: projectData.image,
                    demo_link: projectData.demoLink,
                    code_link: projectData.codeLink,
                    featured: projectData.featured || false
                }
            ])
            .select();
        
        if (error) throw error;
        
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error adding project to Supabase:', error);
        return { success: false, message: error.message };
    }
}

// Update project in Supabase
async function updateProjectInSupabase(id, projectData) {
    if (!isSupabaseConnected) {
        return { success: false, message: 'Supabase not connected' };
    }
    
    try {
        const { data, error } = await supabase
            .from('projects')
            .update({
                title: projectData.title,
                description: projectData.description,
                technologies: projectData.technologies,
                image_url: projectData.image,
                demo_link: projectData.demoLink,
                code_link: projectData.codeLink,
                featured: projectData.featured || false
            })
            .eq('id', id)
            .select();
        
        if (error) throw error;
        
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error updating project in Supabase:', error);
        return { success: false, message: error.message };
    }
}

// Delete project from Supabase
async function deleteProjectFromSupabase(id) {
    if (!isSupabaseConnected) {
        return { success: false, message: 'Supabase not connected' };
    }
    
    try {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        
        return { success: true };
    } catch (error) {
        console.error('Error deleting project from Supabase:', error);
        return { success: false, message: error.message };
    }
}

// Enhanced project management functions
window.supabaseHelpers = {
    // Initialize connection
    init: initializeSupabase,
    
    // Contact form
    submitContact: submitContactForm,
    
    // Project management
    loadProjects: loadProjectsFromSupabase,
    addProject: addProjectToSupabase,
    updateProject: updateProjectInSupabase,
    deleteProject: deleteProjectFromSupabase,
    
    // Utility functions
    isConnected: () => isSupabaseConnected,
    getClient: () => supabase
};

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSupabase);
} else {
    initializeSupabase();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.supabaseHelpers;
}