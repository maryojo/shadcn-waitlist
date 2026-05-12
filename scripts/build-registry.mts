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
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; content: string; type: string; target: string }[];
};

const components = [
  {
    name: "avatar-stack",
    type: "registry:component",
    title: "Avatar Stack",
    description: "A stack of user avatars with an overlap effect.",
    dependencies: ["framer-motion"],
    files: ["components/avatar-stack.tsx"],
  },
  {
    name: "waitlist-form",
    type: "registry:block",
    title: "Waitlist Form",
    description: "A premium waitlist signup form with validation and success states.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "input", "label", "avatar-stack"],
    files: ["components/waitlist-form.tsx"],
  },
  {
    name: "waitlist-dialog",
    type: "registry:component",
    title: "Waitlist Dialog",
    description: "A dialog-based waitlist signup component.",
    dependencies: ["framer-motion"],
    registryDependencies: ["button", "dialog", "waitlist-form"],
    files: ["components/waitlist-dialog.tsx"],
  },
  {
    name: "waitlist-progress",
    type: "registry:component",
    title: "Waitlist Progress",
    description: "A visual progress bar showing waitlist signups and milestones.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: ["components/waitlist-progress.tsx"],
  },
  {
    name: "stacked-testimonials",
    type: "registry:block",
    title: "Stacked Testimonials",
    description: "A clean, stacked layout for displaying user testimonials.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: ["components/stacked-testimonials.tsx"],
  },
  {
    name: "faq-section",
    type: "registry:block",
    title: "FAQ Section",
    description: "An animated FAQ section with accordion-style interactions.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: ["components/faq-section.tsx"],
  },
];

type RegistryIndexItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; type: string }[];
};

const registryIndex: RegistryIndexItem[] = [];

for (const comp of components) {
  const item: RegistryItem = {
    name: comp.name,
    type: comp.type,
    title: comp.title,
    description: comp.description,
    dependencies: comp.dependencies,
    registryDependencies: comp.registryDependencies,
    files: [],
  };

  for (const file of comp.files) {
    const filePath = path.join(REGISTRY_PATH, file);
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      item.files.push({
        path: path.basename(file),
        content,
        type: "registry:component",
        target: `components/${path.basename(file)}`,
      });
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
    }
  }

  // Write individual component JSON (this one has content)
  const outputPath = path.join(PUBLIC_R_PATH, `${comp.name}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(item, null, 2));
  console.log(`Generated ${outputPath}`);

  // Add to index (this one has NO content in files)
  registryIndex.push({
    name: comp.name,
    type: comp.type,
    title: comp.title,
    description: comp.description,
    dependencies: comp.dependencies,
    registryDependencies: comp.registryDependencies,
    files: comp.files.map(f => ({
      path: path.basename(f),
      type: "registry:component",
    })),
  });
}

// Write index JSON with registry wrapper
const fullRegistry = {
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "shadcn-waitlist",
  "homepage": "https://shadcn-waitlist.netlify.app",
  "items": registryIndex,
};

const indexPath = path.join(PUBLIC_R_PATH, "index.json");
fs.writeFileSync(indexPath, JSON.stringify(fullRegistry, null, 2));
console.log(`Generated ${indexPath}`);
