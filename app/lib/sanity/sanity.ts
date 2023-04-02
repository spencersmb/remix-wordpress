import { createClient } from "@sanity/client";
import { definePreview } from "@sanity/preview-kit";

// copy these from your Studio's sanity.config.ts
export const projectId = "pl2opd7f";
export const dataset = "production";
export const apiVersion = "2023-01-01";

export const client = createClient({ projectId, 
  apiVersion,
  dataset,
  useCdn: true,
 });
export const usePreview = definePreview({ projectId, 
  dataset
 });