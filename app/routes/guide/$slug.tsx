import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Article } from "content";
import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";

import { getSingleGuideArticle } from "content";
import Container from "~/shared/container";

import guideArticleStyles from "~/styles/pages/guide-article.css";
import renderRichText from "utils/renderRichText";

export function links() {
  return [{ rel: "stylesheet", href: guideArticleStyles }];
}

type LoaderData = {
  article: Article;
};
function formatArticleData({
  slug,
  title,
  description,
  categories,
  content,
  featuredImage,
  previewImage,
}: Article) {
  return {
    slug,
    title,
    categories,
    description,
    content,
    featuredImage: {
      url: featuredImage.fields.file.url,
      name: featuredImage.fields.file.fileName,
    },
    previewImage: {
      url: previewImage.fields.file.url,
      name: previewImage.fields.file.fileName,
    },
  };
}
export const loader: LoaderFunction = async ({ params }) => {
  const article = await getSingleGuideArticle(params.slug || "");
  if (!article) throw new Response("Not Found", { status: 404 });

  return json<LoaderData>({ article: formatArticleData(article) });
};

export default function GuideArticle() {
  const data = useLoaderData<{ article: Article }>();

  if (!data || !data.article) return null;

  const { article } = data;
  console.log(article);
  return (
    <main className="article">
      <img
        className="article__featured-image"
        src={article.featuredImage.url}
        alt={article.featuredImage.name}
      />

      <div className="article__intro">
        <h2 className="article__title">{article.title}</h2>
        <p className="article__description">
          {renderRichText(article.description)}
        </p>
        <p className="article__categories">
          {article.categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </p>
      </div>

      <Container className="article__content-container">
        <div className="article__content">
          {renderRichText(article.content)}
        </div>
      </Container>
    </main>
  );
}
