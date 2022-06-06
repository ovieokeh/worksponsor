import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Company } from "@prisma/client";
import type { FC, ReactNode } from "react";

import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";

import { getCompanies } from "~/model/company.server";

import homepageStyles from "~/styles/homepage.css";
import styles from "~/styles/block.css";

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

const Block: FC<{ className: string; children?: ReactNode }> = ({
  className,
  children,
}) => {
  const data = useLoaderData() as LoaderData;
  return <div className={className}>{children}</div>;
};

const WaitlistForm = () => {
  const submitText = "Join waitlist";
  const placeholderText = "you@email.com";

  return (
    <form className="waitlist-form">
      <input
        className="waitlist-input"
        type="email"
        placeholder={placeholderText}
        required
      />
      <button className="waitlist-submit" type="submit">
        {submitText}
      </button>
    </form>
  );
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: homepageStyles },
  ];
}
export default function Index() {
  const headingText = "WorkSponsor is coming soon";
  const descriptionText = `We’re working hard on creating the one stop shop 
  to relocating to the Netherlands as a highly-skilled migrant.
`;
  const descriptionCtaText = `
  Join the waitlist to get updates and to gain early access
  when we launch.
  `;

  return (
    <main className="homepage">
      <Block className="block--left">
        <h2 className="explainer__heading">{headingText}</h2>
      </Block>

      <Block className="block--bottom">
        <p className="explainer__description">{descriptionText}</p>
        <p className="explainer__description">{descriptionCtaText}</p>
      </Block>

      <Block className="block--top-right" />

      <WaitlistForm />
    </main>
  );
}
