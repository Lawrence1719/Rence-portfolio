"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadProjectImage(file: File, projectId: string, oldImageUrl?: string) {
  const supabase = await createClient();

  try {
    // Delete old image if provided
    if (oldImageUrl) {
      // Extract the path from the full URL
      // URL format: https://[bucket-url]/storage/v1/object/public/project-images/[path]
      const pathMatch = oldImageUrl.match(/project-images\/(.+)$/);
      if (pathMatch) {
        const oldPath = pathMatch[1];
        // Delete old file (ignore errors if file doesn't exist)
        await supabase.storage
          .from("project-images")
          .remove([oldPath])
          .catch(() => null);
      }
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${projectId}/${timestamp}-${file.name}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("project-images")
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("project-images").getPublicUrl(filename);

    return {
      success: true,
      url: publicUrl,
      path: data.path,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
