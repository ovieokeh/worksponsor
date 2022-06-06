import type { LoaderFunction } from "@remix-run/server-runtime";
import type { CompanyWithContactsAndSocials } from "~/model/company.server";

import { json } from "@remix-run/server-runtime";
import { useCatch, useLoaderData } from "@remix-run/react";

import { getCompany } from "~/model/company.server";

import companyStyles from "~/styles/company.css";

type LoaderData = {
  company: CompanyWithContactsAndSocials;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const company = await getCompany({ id: params.companyId as string });
  if (!company || !company.details) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ company });
};

export function links() {
  return [{ rel: "stylesheet", href: companyStyles }];
}
export default function Company() {
  const { company } = useLoaderData() as LoaderData;
  const {
    details: { name, description, category },
  } = company;

  return (
    <main className="companies">
      <div className="companies__item-details">
        <p className="companies__item-name">{name}</p>
        <p className="companies__item-description">{description}</p>
      </div>
      <p className="companies__item-category">{category}</p>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Company not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
