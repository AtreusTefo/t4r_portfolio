-- Supabase Database Schema for Portfolio
-- Run these commands in your Supabase SQL editor

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  technologies TEXT[], -- Array of technology strings
  image_url TEXT,
  demo_link TEXT,
  code_link TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new', -- new, read, replied
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table (optional)
CREATE TABLE IF NOT EXISTS skills (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100), -- frontend, backend, tools, etc.
  proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 100),
  icon_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experiences table (optional)
CREATE TABLE IF NOT EXISTS experiences (
  id BIGSERIAL PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE, -- NULL for current position
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for projects
INSERT INTO projects (title, description, technologies, image_url, demo_link, code_link, featured) VALUES
('Interactive Data Dashboard', 'A real-time analytics dashboard with custom visualizations built with D3.js and React.', ARRAY['React', 'D3.js', 'Node.js'], 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', '#', '#', true);

-- Insert sample skills
INSERT INTO skills (name, category, proficiency) VALUES
('JavaScript', 'frontend', 90),
('React', 'frontend', 85),
('Node.js', 'backend', 80),
('MySQL', 'database', 75),
('HTML/CSS', 'frontend', 95),
('Git', 'tools', 85);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to projects and skills
CREATE POLICY "Public can view projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public can view skills" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Public can view experiences" ON experiences
  FOR SELECT USING (true);

-- Create policy for contact form submissions (anyone can insert)
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create policies for authenticated users (admin) to manage content
-- Note: You'll need to set up authentication and replace 'authenticated' with proper auth checks
CREATE POLICY "Authenticated users can manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view contact submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage skills" ON skills
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage experiences" ON experiences
  FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();