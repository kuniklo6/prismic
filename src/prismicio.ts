import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 */
// src/prismicio.ts

const routes: prismic.ClientConfig["routes"] = [
  {
    type: "home",
    uid: "home",
    path: "/",
  },
  {
    type: "home",
    path: "/:uid",
  },
  {
    type: "page",
    path: "/:uid",
  },
  {
    type: "videos",
    path: "/videos",
  },
  {
    type: "devotional",
    path: "/devotional",
  },
  {
    type: "blog",
    path: "/blog",
  },
  {
    type: "blog_post",
    path: "/blog/:uid",
  },
  {
    type: "links",
    path: "/links",
  },
  {
    type: "contact",
    path: "/contact",
  },
  {
    type: "navigation",
    path: "/", // Navigation usually doesn't need a path, but listing it avoids errors
  },
];

/**
 * Creates a Prismic client for the project's repository.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};