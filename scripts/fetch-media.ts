/**
 * Pexels Media Fetcher for Jaspire
 * Downloads curated images for portfolio cases, gallery, and hero sections.
 *
 * Usage: npx tsx scripts/fetch-media.ts
 */

import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
if (!PEXELS_API_KEY) {
  console.error("Missing PEXELS_API_KEY in environment");
  process.exit(1);
}

const BASE_URL = "https://api.pexels.com/v1";

interface PexelsPhoto {
  id: number;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
  };
  alt: string;
  photographer: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
}

async function searchPhotos(query: string, perPage = 5): Promise<PexelsPhoto[]> {
  const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY! },
  });
  if (!res.ok) {
    console.error(`Pexels API error: ${res.status} ${res.statusText}`);
    return [];
  }
  const data: PexelsResponse = await res.json();
  return data.photos;
}

async function downloadImage(url: string, filepath: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download: ${url}`);
  const buffer = await res.arrayBuffer();
  await writeFile(filepath, Buffer.from(buffer));
  console.log(`  ✓ Downloaded: ${filepath}`);
}

async function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function main() {
  console.log("🎨 Fetching media from Pexels for Jaspire...\n");

  const publicDir = join(process.cwd(), "public");

  // --- Portfolio images ---
  console.log("📁 Portfolio images:");
  const portfolioDir = join(publicDir, "images", "portfolio");
  await ensureDir(portfolioDir);

  const portfolioQueries = [
    { query: "modern website design computer screen", filename: "web-project-1.jpg" },
    { query: "branding design mockup business", filename: "brand-project-2.jpg" },
    { query: "social media marketing mobile phone", filename: "social-project-3.jpg" },
    { query: "e-commerce website laptop shopping", filename: "ecommerce-project-4.jpg" },
  ];

  for (const { query, filename } of portfolioQueries) {
    const photos = await searchPhotos(query, 3);
    if (photos.length > 0) {
      await downloadImage(photos[0].src.large, join(portfolioDir, filename));
    }
  }

  // --- Gallery images ---
  console.log("\n📁 Gallery images:");
  const galleryDir = join(publicDir, "images", "gallery");
  await ensureDir(galleryDir);

  const galleryQueries = [
    { query: "creative agency office team working", filename: "gallery-1.jpg" },
    { query: "design studio workspace minimal", filename: "gallery-2.jpg" },
    { query: "digital marketing campaign creative", filename: "gallery-3.jpg" },
    { query: "modern architecture building exterior", filename: "gallery-4.jpg" },
    { query: "technology innovation abstract colorful", filename: "gallery-5.jpg" },
    { query: "photography studio creative lighting", filename: "gallery-6.jpg" },
  ];

  for (const { query, filename } of galleryQueries) {
    const photos = await searchPhotos(query, 3);
    if (photos.length > 0) {
      await downloadImage(photos[0].src.large, join(galleryDir, filename));
    }
  }

  // --- Hero video backgrounds ---
  console.log("\n📁 Hero video (searching Pexels videos):");
  const videoRes = await fetch(
    `https://api.pexels.com/videos/search?query=abstract+light+rays+dark+blue&per_page=3&orientation=landscape`,
    { headers: { Authorization: PEXELS_API_KEY! } }
  );
  if (videoRes.ok) {
    const videoData = await videoRes.json();
    if (videoData.videos?.length > 0) {
      const video = videoData.videos[0];
      // Find the best quality MP4 file
      const hdFile = video.video_files
        ?.filter((f: any) => f.file_type === "video/mp4" && f.width >= 1280)
        ?.sort((a: any, b: any) => b.width - a.width)[0];

      if (hdFile) {
        const videoDir = join(publicDir, "videos");
        await ensureDir(videoDir);
        await downloadImage(hdFile.link, join(videoDir, "hero-bg.mp4"));
        console.log(`  Video: ${video.url}`);
        console.log(`  Resolution: ${hdFile.width}x${hdFile.height}`);
      }
    }
  }

  console.log("\n✅ Media fetching complete!");
  console.log("📝 Remember: Pexels images are free to use with attribution optional.");
}

main().catch(console.error);
