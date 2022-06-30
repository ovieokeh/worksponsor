import type { Document } from "@contentful/rich-text-types";

const contentful = require("contentful");
const config = {
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  space: process.env.CONTENTFUL_BLOG_SPACE_ID || "",
};
const contentfulClient = contentful.createClient(config);

export type Article = {
  slug: string;
  title: string;
  description: Document;
  categories: string[];
  previewImage: any;
  featuredImage: any;
  content: Document;
};

export const getGuideArticles = async (
  limit = 2
): Promise<Article[] | null> => {
  try {
    const articles = await contentfulClient.getEntries({
      content_type: "guide",
      limit,
    });

    const articlesData = articles.items.map(
      (item: any) => item.fields as Article
    );
    return articlesData;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getSingleGuideArticle = async (
  slug: string
): Promise<Article | null> => {
  try {
    const article = await contentfulClient.getEntries({
      content_type: "guide",
      "fields.slug": slug,
    });

    const articleData = article.items[0].fields;
    return articleData;
  } catch {
    return null;
  }
};
