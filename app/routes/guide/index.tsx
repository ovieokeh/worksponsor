import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Article } from "content";
import { json } from "@remix-run/server-runtime";
import { useMemo, useState } from "react";

import { getGuideArticles } from "content";
import Markdown from "~/shared/markdown";
import Container from "~/shared/container";
import Button from "~/shared/button";

import guideStyles from "~/styles/pages/guide.css";
// import { useLoaderData } from "@remix-run/react";

export function links() {
  return [{ rel: "stylesheet", href: guideStyles }];
}

const sections = [
  {
    name: "Working in the Netherlands",
    pages: [
      {
        name: "What do you need to work in the Netherlands?",
        link: "/guide/work-in-nl-requirements",
      },
      {
        name: "What is the work environment generally like in Dutch companies?",
        link: "/guide/work-in-nl/work-environment",
      },
      {
        name: "Important information that you need to know about working in the Netherlands",
        link: "/guide/work-in-nl/important-information",
      },
      {
        name: "Life in the Netherlands",
        link: "/guide/work-in-nl/life-in-nl",
      },
      {
        name: "Relocation guide and checklist",
        link: "/guide/work-in-nl/relocation-guide",
      },
    ],
  },
  {
    name: "Top 5 skills in the Dutch job market",
    useIndex: true,
    pages: [
      {
        name: "Backend Developer",
        link: "/guide/top-skills/backend-developer",
      },
      {
        name: "Fullstack Developer",
        link: "/guide/top-skills/fullstack-developer",
      },
      {
        name: "Frontend Developer",
        link: "/guide/top-skills/frontend-developer",
      },
      {
        name: "UI/UX Designer",
        link: "/guide/top-skills/ui-ux-designer",
      },
      {
        name: "Software Developer",
        link: "/guide/top-skills/software-developer",
      },
    ],
  },
  {
    name: "Tutorials",
    description:
      "Learn how to use the different pages on this site to supercharge your job search",
    pages: [
      {
        name: "Companies Page",
        link: "/guide/tutorials/companies-page",
      },
      {
        name: "Jobs Page",
        link: "/guide/tutorials/jobs-page",
      },
      {
        name: "Dashboard Page",
        link: "/guide/tutorials/dashboard-page",
      },
    ],
  },
];

type SectionPage = {
  name: string;
  link: string;
};

type Section = {
  name: string;
  description?: string | undefined;
  useIndex?: boolean | undefined;
  pages: SectionPage[];
};

type LoaderData = {
  articles: Article[];
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const articles = await getGuideArticles();
  if (!articles) {
    console.log("error");
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ articles });
};

export default function Guide() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const introText = `We've compiled a list of resources we think you'll find valuable.
  Topics ranging from the top skills in the job market, to what living in the Netherlands is like.
  \n
  Use the filters below to browse through the content.
  `;

  const handleFilterClick = (name: string) => {
    setSelectedFilters((prevFilters) => {
      let newPrevFilters = [...prevFilters];
      const filterIndex = prevFilters.findIndex((f) => f === name);
      console.log(filterIndex, newPrevFilters);
      if (filterIndex >= 0) {
        newPrevFilters.splice(filterIndex, 1);
      } else {
        newPrevFilters.push(name);
      }

      console.log(filterIndex, newPrevFilters);
      return newPrevFilters;
    });
  };

  const filters = sections.map(({ name }) => {
    return (
      <Button
        key={name}
        type="button"
        className="guide-filter"
        text={name}
        onClick={() => handleFilterClick(name)}
        isActive={selectedFilters.includes(name)}
        variant="secondary"
        size="small"
      />
    );
  });

  let pageSections = useMemo(() => {
    let result: Section[] = [];
    if (selectedFilters.length) {
      selectedFilters.forEach((filter) => {
        result.push(...sections.filter((section) => section.name === filter));
      });
    } else {
      result = sections;
    }
    return result;
  }, [selectedFilters]);

  const articless = pageSections.map((section) => {
    return (
      <div key={section.name} className="guide__section">
        <p>{section.name}</p>
        {section.description ? (
          <p className="guide__section-description">{section.description}</p>
        ) : null}

        <div className="guide__section-pages">
          {section.pages.map((page, index) => {
            return (
              <div key={page.link} className="guide__section-link">
                <Button
                  as="link"
                  href={page.link}
                  text={
                    section.useIndex ? `${index + 1}. ${page.name}` : page.name
                  }
                  variant="lean"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <main className="guide">
      <Container className="guide__content">
        <h2 className="guide__title">
          WorkSponsor's guide to working in the Netherlands
        </h2>

        <Markdown.Paragraph
          wrapperClassname="guide__intro"
          className="guide__text"
          content={introText}
        />

        <div className="guide-filters">{filters}</div>

        <div className="guide__sections">{articless}</div>
      </Container>
    </main>
  );
}
