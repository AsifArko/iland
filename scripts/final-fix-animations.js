#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const animationsDir = path.join(__dirname, "../src/components/animations");

// Get all animation files
const animationFiles = fs
  .readdirSync(animationsDir)
  .filter(file => file.endsWith(".tsx") && file !== "index.ts");

console.log("Final fix for all animation components...");

animationFiles.forEach(file => {
  const filePath = path.join(animationsDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Remove all remaining references to removed variables
  content = content.replace(/successColor/g, "secondaryColor");
  content = content.replace(/elementRef\.current = el;/g, "");
  content = content.replace(
    /opacity: isVisible \? 1 : 0\.3, \/\/ Fade in when visible/g,
    ""
  );
  content = content.replace(/transition: "opacity 0\.5s ease-in-out",/g, "");

  // Fix ref assignments
  content = content.replace(
    /ref=\{el => \{\s*canvasRef\.current = el;\s*elementRef\.current = el;\s*\}\}/g,
    "ref={canvasRef}"
  );

  // Remove any remaining elementRef references
  content = content.replace(/elementRef\.current = el;/g, "");

  // Clean up style objects
  content = content.replace(
    /style=\{\{\s*imageRendering: "pixelated",\s*\}\}/g,
    'style={{\n        imageRendering: "pixelated",\n      }}'
  );

  // Remove any remaining hasStarted checks
  content = content.replace(
    /if \(!canvas \|\| !hasStarted\) return;/g,
    "if (!canvas) return;"
  );

  // Remove dependency on hasStarted
  content = content.replace(/}, \[size, hasStarted\]\);/g, "}, [size]);");

  // Clean up extra whitespace and empty lines
  content = content.replace(/\n\s*\n\s*\n/g, "\n\n");
  content = content.replace(
    /\n\s*const canvasRef = useRef<HTMLCanvasElement>\(null\);\s*\n/g,
    "\n  const canvasRef = useRef<HTMLCanvasElement>(null);\n"
  );

  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${file}`);
});

console.log("All animation components finally fixed!");
