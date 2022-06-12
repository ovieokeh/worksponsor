import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Company as CompanyType } from "@prisma/client";

import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";

import { getCompanies } from "~/model/company.server";
import { useGatedContent } from "hooks/useGatedContent";

import Filter from "~/components/filter";
import Container from "~/components/container";
import Company from "~/components/company";

import companiesStyles from "~/styles/pages/companies.css";
import companyStyles from "~/components/company/company.css";

type LoaderData = {
  companies: CompanyType[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const companies = await getCompanies({});
  if (!companies) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ companies });
};

export function links() {
  return [
    { rel: "stylesheet", href: companiesStyles },
    { rel: "stylesheet", href: companyStyles },
  ];
}

export default function Companies() {
  const { companies } = useLoaderData() as LoaderData;

  const renderedCompanies = companies.map((company) => {
    return <Company key={company.id} {...company} />;
  });

  const render = useGatedContent(
    <main className="companies">
      <Filter />

      <Container className="companies__content">
        <div className="companies__list">{renderedCompanies}</div>
      </Container>
    </main>
  );

  return render;
}
