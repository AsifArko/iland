#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const animationsDir = path.join(__dirname, "../src/components/animations");
const hookPath = path.join(__dirname, "../src/hooks/use-animation-control.ts");

// Check if the hook exists
if (!fs.existsSync(hookPath)) {
  console.error("useAnimationControl hook not found!");
  process.exit(1);
}

// Get all animation files
const animationFiles = fs
  .readdirSync(animationsDir)
  .filter(file => file.endsWith(".tsx") && file !== "index.ts");

console.log("Updating animation components to use useAnimationControl hook...");

animationFiles.forEach(file => {
  const filePath = path.join(animationsDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Skip if already updated
  if (content.includes("useAnimationControl")) {
    console.log(`Skipping ${file} - already updated`);
    return;
  }

  // Remove delay prop from interface
  content = content.replace(
    /interface (\w+)Props \{([^}]*)\}/,
    (match, componentName, props) => {
      // Remove delay line if it exists
      const cleanedProps = props.replace(/delay\?: number;.*\n?/, "");
      return `interface ${componentName}Props {${cleanedProps}}`;
    }
  );

  // Update function parameters to remove delay
  content = content.replace(
    /export function (\w+)\(\{([^}]*)\}: (\w+)Props\) \{/,
    (match, componentName, params, propsName) => {
      // Remove delay parameter if it exists
      const cleanedParams = params.replace(/delay = \d+,?.*\n?/, "");
      return `export function ${componentName}({${cleanedParams}}: ${propsName}Props) {`;
    }
  );

  // Replace useState and useEffect imports with useAnimationControl
  content = content.replace(
    /import \{ useEffect, useRef, useState \} from "react";/,
    'import { useEffect, useRef } from "react";\nimport { useAnimationControl } from "@/hooks/use-animation-control";'
  );

  // Replace the state management with the hook
  content = content.replace(
    /const canvasRef = useRef<HTMLCanvasElement>\(null\);\s+const \[isVisible, setIsVisible\] = useState\(false\);\s+const \[hasStarted, setHasStarted\] = useState\(false\);/,
    "const canvasRef = useRef<HTMLCanvasElement>(null);\n  const { elementRef, isVisible, hasStarted } = useAnimationControl();"
  );

  // Remove the old intersection observer and delay effects
  content = content.replace(
    /\/\/ Intersection Observer to detect when animation is visible[\s\S]*?}, \[\]\);/,
    ""
  );

  content = content.replace(
    /\/\/ Animation effect with delay[\s\S]*?}, \[isVisible, delay\]\);/,
    ""
  );

  // Update the main useEffect dependency
  content = content.replace(
    /useEffect\(\(\) => \{[\s\S]*?const canvas = canvasRef\.current;[\s\S]*?if \(!canvas\) return;/,
    match => {
      return match.replace(
        /const canvas = canvasRef\.current;[\s\S]*?if \(!canvas\) return;/,
        "const canvas = canvasRef.current;\n    if (!canvas || !hasStarted) return;"
      );
    }
  );

  // Update the dependency array
  content = content.replace(/}, \[size\]\);/, "}, [size, hasStarted]);");

  // Update the ref assignment
  content = content.replace(
    /ref=\{canvasRef\}/,
    "ref={el => {\n        canvasRef.current = el;\n        elementRef.current = el;\n      }}"
  );

  // Add opacity transition
  content = content.replace(
    /style=\{\{[\s\S]*?imageRendering: "pixelated",[\s\S]*?\}\}/,
    'style={{\n        imageRendering: "pixelated",\n        opacity: isVisible ? 1 : 0.3, // Fade in when visible\n        transition: "opacity 0.5s ease-in-out",\n      }}'
  );

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});

console.log("All animation components updated successfully!");
