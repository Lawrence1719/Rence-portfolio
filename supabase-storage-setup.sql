-- Create Storage Bucket for Project Images
-- Run this in your Supabase SQL Editor after running supabase-schema.sql

-- Create the project-images bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policy for project-images bucket - allow public reads
CREATE POLICY "Public Read Access for project-images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-images');

-- Create RLS policy for authenticated users to upload
CREATE POLICY "Authenticated Upload for project-images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images');

-- Create RLS policy for authenticated users to update
CREATE POLICY "Authenticated Update for project-images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'project-images');

-- Create RLS policy for authenticated users to delete
CREATE POLICY "Authenticated Delete for project-images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'project-images');
