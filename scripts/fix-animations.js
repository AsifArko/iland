#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const animationsDir = path.join(__dirname, "../src/components/animations");

// Get all animation files
const animationFiles = fs
  .readdirSync(animationsDir)
  .filter(file => file.endsWith(".tsx") && file !== "index.ts");

console.log("Fixing all animation components...");

animationFiles.forEach(file => {
  const filePath = path.join(animationsDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Remove any remaining useAnimationControl imports
  content = content.replace(
    /import \{ useAnimationControl \} from "@\/hooks\/use-animation-control";\n?/g,
    ""
  );

  // Remove any remaining elementRef, isVisible, hasStarted references
  content = content.replace(
    /const \{ elementRef, isVisible, hasStarted \} = useAnimationControl\(\);/g,
    ""
  );

  // Remove hasStarted checks
  content = content.replace(
    /if \(!canvas \|\| !hasStarted\) return;/g,
    "if (!canvas) return;"
  );

  // Remove dependency on hasStarted
  content = content.replace(/}, \[size, hasStarted\]\);/g, "}, [size]);");

  // Fix ref assignments
  content = content.replace(
    /ref=\{el => \{\s*canvasRef\.current = el;\s*elementRef\.current = el;\s*\}\}/g,
    "ref={canvasRef}"
  );

  // Remove opacity transitions
  content = content.replace(
    /opacity: isVisible \? 1 : 0\.3,\s*transition: "opacity 0\.5s ease-in-out",/g,
    ""
  );

  // Remove unused successColor variables
  content = content.replace(/const successColor = "[^"]*"; \/\/ [^\n]*\n/g, "");

  // Clean up extra whitespace
  content = content.replace(/\n\s*\n\s*\n/g, "\n\n");

  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${file}`);
});

console.log("All animation components fixed!");
