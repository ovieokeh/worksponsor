import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import type { Company } from "@prisma/client";
import { json } from "@remix-run/server-runtime";

import Button from "~/components/button";
import Waitlist from "~/components/waitlist";
import Container from "~/components/container";
import Animate from "~/components/animate";

import { getCompanies } from "~/model/company.server";
import { addWaitlist } from "~/model/waitlist.server";

import homepageStyles from "~/styles/pages/homepage.css";
import waitlistStyles from "~/components/waitlist/waitlist.css";
import sleep from "utils/sleep";

const EMAIL_VALIDATION_REGEX = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

type LoaderData = {
  companies: Company[];
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const companies = await getCompanies({});
  if (!companies) {
    throw new Response("Not Found", { status: 404 });
  }

  await sleep(500);
  return json<LoaderData>({ companies });
};

const IntroHero = () => {
  const heroHeading = `Sponsored jobs in the Netherlands you won't find anywhere else`;
  const heroDescription = `
  Explore verified visa sponsors, browse through available jobs,
  or create a personalised profile to help you land your preferred role.`;
  const heroJobsCTA = "Browse jobs";
  const heroProfileCTA = "Create personalised profile";

  return (
    <section className="home__hero">
      <Container className="home__hero-content">
        <Animate animation="rtl">
          <div className="home__hero-text">
            <h2 className="home__hero-heading">{heroHeading}</h2>
            <p className="home__hero-description">{heroDescription}</p>

            <div className="home__hero-ctas">
              <Button
                as="link"
                href="/jobs"
                text={heroJobsCTA}
                variant="secondary"
              />
              <Button as="link" href="/profile" text={heroProfileCTA} />
            </div>
          </div>
        </Animate>

        <Animate animation="ltr">
          <div className="home__hero-image-container">
            <img
              className="home__hero-image"
              src="https://assets.website-files.com/61f063412698c3c0331848b0/61fad20cfca2df71245ce891_1.png"
              alt="An abstract illustration"
            />
          </div>
        </Animate>
      </Container>
    </section>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  if (!email) {
    return json({ result: "bad", error: "email_empty" });
  }

  if (!email.match(EMAIL_VALIDATION_REGEX)) {
    return json({ result: "bad", error: "email_invalid" });
  }

  try {
    const waitlistedEmail = await addWaitlist(email);
    return { result: "ok", data: waitlistedEmail };
  } catch (error) {
    return {
      result: "bad",
      error: (error as any).code === "P2002" ? "conflict" : "unknown",
    };
  }
};

export function links() {
  return [
    { rel: "stylesheet", href: waitlistStyles },
    { rel: "stylesheet", href: homepageStyles },
  ];
}
export default function Index() {
  return (
    <main className="homepage">
      <IntroHero />
      <Waitlist />
    </main>
  );
}
