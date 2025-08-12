import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset,
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
