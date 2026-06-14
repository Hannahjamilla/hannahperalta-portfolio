import { promises as fs } from 'fs'
import path from 'path'

// Critical path optimization
async function optimizeCriticalPath() {
  console.log('🚀 Optimizing critical rendering path...')
  
  try {
    // Check if dist exists
    const distExists = await fs.access('dist').then(() => true).catch(() => false)
    if (!distExists) {
      console.log('❌ Dist folder not found. Run build first.')
      return
    }

    // Read the built HTML file
    const htmlPath = 'dist/index.html'
    let html = await fs.readFile(htmlPath, 'utf-8')
    
    // Find and inline critical CSS
    const cssFiles = await fs.readdir('dist/assets')
    const mainCssFile = cssFiles.find(file => file.startsWith('index-') && file.endsWith('.css'))
    
    if (mainCssFile) {
      const cssPath = `dist/assets/${mainCssFile}`
      const cssContent = await fs.readFile(cssPath, 'utf-8')
      
      // Extract critical CSS (first ~10KB for above-the-fold)
      const criticalCss = cssContent.substring(0, 10000)
      
      // Inject critical CSS inline
      const criticalCssTag = `<style id="critical-css">${criticalCss}</style>`
      html = html.replace('<style>', criticalCssTag + '<style>')
      
      // Add preload for full CSS
      const cssPreload = `<link rel="preload" href="./assets/${mainCssFile}" as="style" onload="this.onload=null;this.rel='stylesheet'">`
      html = html.replace('</head>', cssPreload + '</head>')
      
      console.log('✅ Inlined critical CSS')
    }
    
    // Retain manually added resource hints instead of overwriting them
    
    // Add performance optimizations
    html = html.replace(
      '<script type="module"',
      '<script defer type="module"'
    )
    
    // Write optimized HTML
    await fs.writeFile(htmlPath, html, 'utf-8')
    
    console.log('🎉 Critical path optimization complete!')
    
  } catch (error) {
    console.error('❌ Critical path optimization failed:', error.message)
  }
}

optimizeCriticalPath()