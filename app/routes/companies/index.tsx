import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Company } from "@prisma/client";

import { json } from "@remix-run/server-runtime";
import { useLoaderData, Link } from "@remix-run/react";

import { getCompanies } from "~/model/company.server";

import { useGatedContent } from "hooks/useGatedContent";

import companiesStyles from "~/styles/pages/companies.css";

type LoaderData = {
  companies: Company[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const companies = await getCompanies({});
  if (!companies) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ companies });
};

export function links() {
  return [{ rel: "stylesheet", href: companiesStyles }];
}

export default function Companies() {
  const { companies } = useLoaderData() as LoaderData;

  const renderedCompanies = companies.map(({ id, name, description }) => {
    return (
      <Link key={id} to={`/companies/${id}`} className="companies__item">
        <div className="companies__item-details">
          <p className="companies__item-name">{name}</p>
          <p className="companies__item-description">{description}</p>
        </div>
      </Link>
    );
  });

  const render = useGatedContent(
    <main className="companies">{renderedCompanies}</main>
  );

  return render;
}
