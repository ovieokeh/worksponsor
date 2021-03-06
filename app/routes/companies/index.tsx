import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Company as CompanyType } from "@prisma/client";

import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";

import { getCompanies } from "~/model/company.server";
import { useGatedContent } from "hooks/useGatedContent";

import Container from "~/shared/container";
import Filter, { links as filterLinks } from "~/components/filter";
import Company, { links as companyLinks } from "~/components/company";
import Pagination from "~/components/pagination";

import companiesStyles from "~/styles/pages/companies.css";

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
    ...filterLinks(),
    ...companyLinks(),
    { rel: "stylesheet", href: companiesStyles },
  ];
}

export default function Companies() {
  const loaderData = useLoaderData() as LoaderData;

  const renderedCompanies = loaderData?.companies.map((company) => {
    return <Company key={company.id} {...company} />;
  });

  const render = useGatedContent(
    <main className="companies">
      <Filter />

      <Container className="companies__content">
        <div className="companies__list">
          <Pagination count={100} render={<>{renderedCompanies}</>} />
        </div>
      </Container>
    </main>
  );

  return render;
}
