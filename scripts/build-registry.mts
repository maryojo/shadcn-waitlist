import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.join(__dirname, "../src/registry");
const PUBLIC_R_PATH = path.join(__dirname, "../public/r");

// Create public/r directory if it doesn't exist
if (!fs.existsSync(PUBLIC_R_PATH)) {
  fs.mkdirSync(PUBLIC_R_PATH, { recursive: true });
}

type RegistryItem = {
  name: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; content: string; type: string; target: string }[];
};

const components = [
  {
    name: "avatar-stack",
    type: "registry:component",
    dependencies: ["framer-motion"],
    files: ["components/avatar-stack.tsx"],
  },
  {
    name: "waitlist-form",
    type: "registry:component",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "input", "label", "avatar-stack"],
    files: ["components/waitlist-form.tsx"],
  },
  {
    name: "waitlist-dialog",
    type: "registry:component",
    dependencies: ["framer-motion"],
    registryDependencies: ["button", "dialog", "waitlist-form"],
    files: ["components/waitlist-dialog.tsx"],
  },
  {
    name: "stacked-testimonials",
    type: "registry:component",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: ["components/stacked-testimonials.tsx"],
  },
];

type RegistryIndexItem = {
  name: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: string[];
};

const registryIndex: RegistryIndexItem[] = [];

for (const comp of components) {
  const item: RegistryItem = {
    name: comp.name,
    type: comp.type,
    dependencies: comp.dependencies,
    registryDependencies: comp.registryDependencies,
    files: [],
  };

  for (const file of comp.files) {
    const filePath = path.join(REGISTRY_PATH, file);
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      item.files.push({
        path: path.basename(file), // Provide just the basename or relative path depending on where it goes
        content,
        type: "registry:component",
        target: `components/${path.basename(file)}`, // This is where it will be installed in user's project
      });
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
    }
  }

  // Write individual component JSON
  const outputPath = path.join(PUBLIC_R_PATH, `${comp.name}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(item, null, 2));
  console.log(`Generated ${outputPath}`);

  // Add to index
  registryIndex.push({
    name: comp.name,
    type: comp.type,
    dependencies: comp.dependencies,
    registryDependencies: comp.registryDependencies,
    files: comp.files.map(f => path.basename(f)),
  });
}

// Write index JSON
const indexPath = path.join(PUBLIC_R_PATH, "index.json");
fs.writeFileSync(indexPath, JSON.stringify(registryIndex, null, 2));
console.log(`Generated ${indexPath}`);
