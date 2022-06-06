import type { LoaderFunction } from "@remix-run/server-runtime";
import type { Company } from "@prisma/client";
// import type { FC, ReactNode } from "react";

import { json } from "@remix-run/server-runtime";
// import { useLoaderData } from "@remix-run/react";

import { getCompanies } from "~/model/company.server";

import homepageStyles from "~/styles/pages/homepage.css";
import styles from "~/styles/block.css";
import Button from "~/shared/button";

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

const IntroHero = () => {
  const heroHeading = `Sponsored jobs in the Netherlands you won't find anywhere else`;
  const heroDescription = `
  Join the #1 job platform specialized in visa-sponsored opportunities in the Netherlands
  & gain access to useful content to help you relocate`;
  const heroCompaniesCTA = "Browse companies";
  const heroJobsCTA = "View sponsored jobs";

  return (
    <section className="home__hero">
      <div className="home__hero-text">
        <h2 className="home__hero-heading">{heroHeading}</h2>
        <p className="home__hero-description">{heroDescription}</p>

        <div className="home__hero-ctas">
          <Button as="link" href="/jobs" text={heroJobsCTA} />
          <Button
            as="link"
            href="/companies"
            text={heroCompaniesCTA}
            variant="secondary"
          />
        </div>
      </div>

      <div className="home__hero-image-container">
        <img
          className="home__hero-image"
          src="https://assets.website-files.com/61f063412698c3c0331848b0/61fad20cfca2df71245ce891_1.png"
          alt="An abstract illustration"
        />
      </div>
    </section>
  );
};

// const WaitlistForm = () => {
//   const submitText = "Join waitlist";
//   const placeholderText = "you@email.com";

//   return (
//     <form className="waitlist-form">
//       <input
//         className="waitlist-input"
//         type="email"
//         placeholder={placeholderText}
//         required
//       />
//       <button className="waitlist-submit" type="submit">
//         {submitText}
//       </button>
//     </form>
//   );
// };

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: homepageStyles },
  ];
}
export default function Index() {
  return (
    <main className="homepage">
      <IntroHero />
    </main>
  );
}
