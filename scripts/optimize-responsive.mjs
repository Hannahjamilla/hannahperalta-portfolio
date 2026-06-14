import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const optimizations = [
  {
    input: 'public/images/Hannah-casual4.webp',
    output: 'public/images/Hannah-casual4-small.webp',
    width: 118,
    height: 158,
    quality: 85
  },
  {
    input: 'public/images/cover-photo-Hannah.webp', 
    output: 'public/images/cover-photo-Hannah-small.webp',
    width: 515,
    height: 246,
    quality: 85
  }
]

async function optimizeImages() {
  console.log('🖼️ Creating responsive image variants...')
  
  for (const opt of optimizations) {
    try {
      // Check if output already exists
      try {
        await fs.access(opt.output)
        console.log(`⏭️ Skipping ${opt.output} (already exists)`)
        continue
      } catch {
        // File doesn't exist, continue with optimization
      }

      await sharp(opt.input)
        .resize(opt.width, opt.height, { 
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: opt.quality })
        .toFile(opt.output)
      
      const originalStats = await fs.stat(opt.input)
      const optimizedStats = await fs.stat(opt.output)
      const savings = Math.round(((originalStats.size - optimizedStats.size) / originalStats.size) * 100)
      
      console.log(`✅ Created ${path.basename(opt.output)} (${opt.width}x${opt.height}) - ${savings}% smaller`)
      
    } catch (error) {
      console.error(`❌ Failed to process ${opt.input}:`, error.message)
    }
  }
  
  console.log('🎉 Responsive image optimization complete!')
}

optimizeImages()