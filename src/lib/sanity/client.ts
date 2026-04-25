import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Client for client-side operations (no token)
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

// Client for server-side operations (with token)
export const serverClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  token, // For server-side operations
});
