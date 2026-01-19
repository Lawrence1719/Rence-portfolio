-- Projects table for portfolio management
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'Work in Progress' CHECK (status IN ('Live', 'Work in Progress', 'Hidden', 'Archived')),
  links JSONB DEFAULT '{}',
  thumbnail_url TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to visible projects
CREATE POLICY "Allow public read access to visible projects" ON projects
  FOR SELECT USING (is_visible = true);

-- Create policy for authenticated users to manage projects
CREATE POLICY "Allow authenticated users to manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Login attempts logging table
CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN NOT NULL DEFAULT false,
  error_message TEXT,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for login attempts
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read login attempts
CREATE POLICY "Allow authenticated users to read login attempts" ON login_attempts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow anyone to insert login attempts (for logging purposes)
CREATE POLICY "Allow public to insert login attempts" ON login_attempts
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to delete login attempts
CREATE POLICY "Allow authenticated users to delete login attempts" ON login_attempts
  FOR DELETE USING (auth.role() = 'authenticated');