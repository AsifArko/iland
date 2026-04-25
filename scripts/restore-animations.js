#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const animationsDir = path.join(__dirname, "../src/components/animations");

// Get all animation files
const animationFiles = fs
  .readdirSync(animationsDir)
  .filter(file => file.endsWith(".tsx") && file !== "index.ts");

console.log("Restoring animation components to original simple behavior...");

animationFiles.forEach(file => {
  const filePath = path.join(animationsDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Remove all useAnimationControl imports and usage
  content = content.replace(
    /import \{ useAnimationControl \} from "@\/hooks\/use-animation-control";\n?/g,
    ""
  );

  // Remove delay prop from interface
  content = content.replace(
    /interface (\w+)Props \{([^}]*)\}/,
    (match, componentName, props) => {
      const cleanedProps = props.replace(/delay\?: number;.*\n?/g, "");
      return `interface ${componentName}Props {${cleanedProps}}`;
    }
  );

  // Remove delay parameter from function
  content = content.replace(
    /export function (\w+)\(\{([^}]*)\}: (\w+)Props\) \{/,
    (match, componentName, params, propsName) => {
      const cleanedParams = params.replace(/delay = \d+,?.*\n?/g, "");
      return `export function ${componentName}({${cleanedParams}}: ${propsName}Props) {`;
    }
  );

  // Remove useAnimationControl hook usage
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

  // Restore simple ref
  content = content.replace(
    /ref=\{el => \{\s*canvasRef\.current = el;\s*elementRef\.current = el;\s*\}\}/g,
    "ref={canvasRef}"
  );

  // Remove opacity transitions
  content = content.replace(
    /style=\{\{\s*imageRendering: "pixelated",\s*opacity: isVisible \? 1 : 0\.3,\s*transition: "opacity 0\.5s ease-in-out",\s*\}\}/g,
    'style={{\n        imageRendering: "pixelated",\n      }}'
  );

  // Restore simple className
  content = content.replace(
    /className=\{`block \$\{className\}`\}/g,
    "className={`block ${className}`}"
  );

  fs.writeFileSync(filePath, content);
  console.log(`Restored ${file}`);
});

console.log("All animation components restored to original behavior!");
