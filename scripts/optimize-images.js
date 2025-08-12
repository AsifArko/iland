#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Compresses and optimizes images for better performance
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class ImageOptimizer {
  constructor(config = {}) {
    this.config = {
      inputDir: config.inputDir || "./public",
      outputDir: config.outputDir || "./public/optimized",
      quality: config.quality || 80,
      formats: config.formats || ["webp", "avif"],
      maxWidth: config.maxWidth || 1920,
      maxHeight: config.maxHeight || 1080,
      ...config,
    };

    this.stats = {
      processed: 0,
      optimized: 0,
      skipped: 0,
      errors: 0,
      totalSizeBefore: 0,
      totalSizeAfter: 0,
    };
  }

  /**
   * Check if required tools are installed
   */
  checkDependencies() {
    const requiredTools = ["convert", "cwebp", "avifenc"];
    const missingTools = [];

    for (const tool of requiredTools) {
      try {
        execSync(`which ${tool}`, { stdio: "ignore" });
      } catch (error) {
        missingTools.push(tool);
      }
    }

    if (missingTools.length > 0) {
      console.log("⚠️  Missing required tools:", missingTools.join(", "));
      console.log("Please install ImageMagick and libwebp tools:");
      console.log("  brew install imagemagick webp (macOS)");
      console.log("  apt-get install imagemagick webp (Ubuntu)");
      return false;
    }

    return true;
  }

  /**
   * Get file size in bytes
   */
  getFileSize(filePath) {
    try {
      const stats = fs.statSync(filePath);
      return stats.size;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Get image dimensions
   */
  getImageDimensions(filePath) {
    try {
      const output = execSync(`identify -format "%wx%h" "${filePath}"`, {
        encoding: "utf8",
      });
      const [width, height] = output.trim().split("x").map(Number);
      return { width, height };
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if image needs optimization
   */
  needsOptimization(filePath) {
    const size = this.getFileSize(filePath);
    const dimensions = this.getImageDimensions(filePath);

    if (!dimensions) {
      return false;
    }

    // Check if image is too large
    if (
      dimensions.width > this.config.maxWidth ||
      dimensions.height > this.config.maxHeight
    ) {
      return true;
    }

    // Check if file size is too large (more than 500KB)
    if (size > 500 * 1024) {
      return true;
    }

    return false;
  }

  /**
   * Optimize image with ImageMagick
   */
  optimizeImage(inputPath, outputPath, format = "webp") {
    try {
      const quality = this.config.quality;
      let command;

      if (format === "webp") {
        command = `cwebp -q ${quality} -m 6 -af -f 50 -sharpness 0 -mt -v "${inputPath}" -o "${outputPath}"`;
      } else if (format === "avif") {
        command = `avifenc --min 0 --max 63 --minalpha 0 --maxalpha 63 --codec aom --jobs 8 --speed 6 --quality ${quality} "${inputPath}" "${outputPath}"`;
      } else {
        command = `convert "${inputPath}" -strip -quality ${quality} -resize ${this.config.maxWidth}x${this.config.maxHeight}\\> "${outputPath}"`;
      }

      execSync(command, { stdio: "ignore" });
      return true;
    } catch (error) {
      console.error(`Failed to optimize ${inputPath}:`, error.message);
      return false;
    }
  }

  /**
   * Process single image
   */
  processImage(filePath) {
    const relativePath = path.relative(this.config.inputDir, filePath);
    const fileName = path.basename(filePath, path.extname(filePath));
    const ext = path.extname(filePath).toLowerCase();

    // Skip non-image files
    if (![".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff"].includes(ext)) {
      return;
    }

    this.stats.processed++;

    // Check if optimization is needed
    if (!this.needsOptimization(filePath)) {
      this.stats.skipped++;
      console.log(`⏭️  Skipped ${relativePath} (already optimized)`);
      return;
    }

    const sizeBefore = this.getFileSize(filePath);
    this.stats.totalSizeBefore += sizeBefore;

    // Create output directory
    const outputDir = path.dirname(
      path.join(this.config.outputDir, relativePath)
    );
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let optimized = false;

    // Generate optimized versions
    for (const format of this.config.formats) {
      const outputPath = path.join(outputDir, `${fileName}.${format}`);

      if (this.optimizeImage(filePath, outputPath, format)) {
        const sizeAfter = this.getFileSize(outputPath);
        const savings = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(
          1
        );

        console.log(
          `✅ Optimized ${relativePath} -> ${format} (${savings}% smaller)`
        );

        this.stats.totalSizeAfter += sizeAfter;
        optimized = true;
      } else {
        this.stats.errors++;
      }
    }

    if (optimized) {
      this.stats.optimized++;
    }
  }

  /**
   * Find all images in directory
   */
  findImages(dir) {
    const images = [];

    if (!fs.existsSync(dir)) {
      return images;
    }

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        images.push(...this.findImages(itemPath));
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if ([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff"].includes(ext)) {
          images.push(itemPath);
        }
      }
    }

    return images;
  }

  /**
   * Generate optimization report
   */
  generateReport() {
    const totalSavings = this.stats.totalSizeBefore - this.stats.totalSizeAfter;
    const savingsPercent =
      this.stats.totalSizeBefore > 0
        ? ((totalSavings / this.stats.totalSizeBefore) * 100).toFixed(1)
        : 0;

    const report = {
      timestamp: new Date().toISOString(),
      configuration: this.config,
      stats: {
        ...this.stats,
        totalSavings: totalSavings,
        savingsPercent: parseFloat(savingsPercent),
      },
      summary: {
        processed: this.stats.processed,
        optimized: this.stats.optimized,
        skipped: this.stats.skipped,
        errors: this.stats.errors,
        totalSizeBefore: this.formatBytes(this.stats.totalSizeBefore),
        totalSizeAfter: this.formatBytes(this.stats.totalSizeAfter),
        totalSavings: this.formatBytes(totalSavings),
        savingsPercent: `${savingsPercent}%`,
      },
    };

    return report;
  }

  /**
   * Format bytes to human readable format
   */
  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  /**
   * Save report to file
   */
  saveReport(report) {
    const reportPath = path.join(
      this.config.outputDir,
      "optimization-report.json"
    );

    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`📊 Optimization report saved to ${reportPath}`);
    } catch (error) {
      console.error("Failed to save optimization report:", error.message);
    }
  }

  /**
   * Print summary to console
   */
  printSummary(summary) {
    console.log("\n🖼️  Image Optimization Summary:");
    console.log("================================");
    console.log(`Processed: ${summary.processed}`);
    console.log(`Optimized: ${summary.optimized}`);
    console.log(`Skipped: ${summary.skipped}`);
    console.log(`Errors: ${summary.errors}`);
    console.log(`Total Size Before: ${summary.totalSizeBefore}`);
    console.log(`Total Size After: ${summary.totalSizeAfter}`);
    console.log(
      `Total Savings: ${summary.totalSavings} (${summary.savingsPercent})`
    );
  }

  /**
   * Run image optimization
   */
  async run() {
    console.log("🚀 Starting image optimization...\n");

    // Check dependencies
    if (!this.checkDependencies()) {
      console.log(
        "❌ Missing required dependencies. Please install them and try again."
      );
      process.exit(1);
    }

    // Create output directory
    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true });
    }

    // Find all images
    const images = this.findImages(this.config.inputDir);

    if (images.length === 0) {
      console.log("No images found to optimize.");
      return;
    }

    console.log(`Found ${images.length} images to process...\n`);

    // Process images
    for (const image of images) {
      this.processImage(image);
    }

    console.log("\n🛑 Image optimization completed");

    const report = this.generateReport();
    this.printSummary(report.summary);

    this.saveReport(report);

    return report;
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const config = {};

  // Parse command line arguments
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace("--", "");
    const value = args[i + 1];

    switch (key) {
      case "input":
        config.inputDir = value;
        break;
      case "output":
        config.outputDir = value;
        break;
      case "quality":
        config.quality = parseInt(value);
        break;
      case "formats":
        config.formats = value.split(",");
        break;
      case "max-width":
        config.maxWidth = parseInt(value);
        break;
      case "max-height":
        config.maxHeight = parseInt(value);
        break;
    }
  }

  const optimizer = new ImageOptimizer(config);

  // Handle graceful shutdown
  process.on("SIGINT", () => {
    console.log("\n🛑 Received SIGINT, stopping image optimization...");
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    console.log("\n🛑 Received SIGTERM, stopping image optimization...");
    process.exit(0);
  });

  optimizer
    .run()
    .then(() => {
      process.exit(0);
    })
    .catch(error => {
      console.error("Image optimization failed:", error);
      process.exit(1);
    });
}

module.exports = ImageOptimizer;
