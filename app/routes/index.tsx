import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import type { Company } from "@prisma/client";
import { json } from "@remix-run/server-runtime";
import { RiFolderSettingsLine } from "react-icons/ri";
import { BiCollection } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import { AiOutlineBarChart } from "react-icons/ai";

import Button from "~/shared/button";
import Waitlist, { links as waitlistLinks } from "~/components/waitlist";
import Container from "~/shared/container";
import Animate from "~/components/animate";

import { getCompanies } from "~/model/company.server";
import { addWaitlist } from "~/model/waitlist.server";

import homepageStyles from "~/styles/pages/homepage.css";
import sleep from "utils/sleep";

const EMAIL_VALIDATION_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

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
  return [...waitlistLinks(), { rel: "stylesheet", href: homepageStyles }];
}

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
        <Animate>
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

        <Animate>
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

const FeaturesForUsers = () => {
  const features = [
    {
      icon: BiCollection,
      text: "Explore the official list of visa sponsors in the Netherlands and browse through high-paying jobs",
    },
    {
      icon: AiOutlineBarChart,
      text: "View salary ranges to find out what you're worth explore the current top skills and technologies",
    },
    {
      icon: RiFolderSettingsLine,
      text: "Create a personalised job profile with a dashboard for managing your applications through the different stages",
    },
    {
      icon: ImBooks,
      text: "Helpful articles to guide you through your job search",
    },
  ];

  return (
    <section className="home__features">
      <Container className="home__features-content">
        <Animate animation="rtl">
          <div className="home__hero-image-container">
            <img
              className="home__hero-image"
              src="https://assets.website-files.com/61f063412698c3c0331848b0/61f995f51f7aed6923418ff7_Frame%20283-min.png"
              alt="An abstract illustration"
            />
          </div>
        </Animate>

        <Animate animation="ltr">
          <div className="home__features-text">
            <h3 className="home__features-heading">
              Why job seekers choose us
            </h3>
            <ul className="home__features-list">
              {features.map(({ icon: Icon, text }) => {
                return (
                  <li key={text} className="home__feature">
                    <span className="home__feature-icon">
                      <Icon />
                    </span>
                    <span className="home__feature-text">{text}</span>
                  </li>
                );
              })}
            </ul>

            <Button
              as="link"
              href="/signup"
              className="home__features-btn"
              text="Create an account"
            />
          </div>
        </Animate>
      </Container>
    </section>
  );
};

export default function Index() {
  return (
    <main className="homepage">
      <IntroHero />
      <Waitlist />
      <FeaturesForUsers />

      <Animate>
        <hr />
      </Animate>
    </main>
  );
}
