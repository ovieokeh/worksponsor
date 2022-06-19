import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import type { Company } from "@prisma/client";
import { json } from "@remix-run/server-runtime";
import { RiFolderSettingsLine } from "react-icons/ri";
import { BiCollection } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import { AiOutlineBarChart, AiOutlineUpload } from "react-icons/ai";
import { IoMdPeople } from "react-icons/io";
import { CgTrack } from "react-icons/cg";

import Button from "~/shared/button";
import Waitlist, { links as waitlistLinks } from "~/components/waitlist";
import Container from "~/shared/container";
import Animate from "~/components/animate";

import { getCompanies } from "~/model/company.server";
import { addWaitlist } from "~/model/waitlist.server";
import sleep from "utils/sleep";
import { useIsDesktop } from "hooks";

import homepageStyles from "~/styles/pages/homepage.css";
import Image from "~/shared/image";

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

const IntroHero = ({ isDesktop }: { isDesktop: boolean }) => {
  const heroHeading = `Sponsored jobs in the Netherlands you won't find anywhere else`;
  const heroDescription = `
  Explore verified visa sponsors, browse through available jobs,
  or create a personalised profile to help you land your preferred role.`;
  const heroProfileCTA = "Coming soon";

  const content = isDesktop ? (
    <Container className="home__hero-content">
      <Animate>
        <div className="home__hero-text">
          <h2 className="home__hero-heading">{heroHeading}</h2>
          <p className="home__hero-description">{heroDescription}</p>

          <div className="home__hero-ctas">
            <Button as="link" href="/profile" text={heroProfileCTA} disabled />
          </div>
        </div>
      </Animate>
      <Animate className="home__hero-image-container" onMount>
        <Image
          className="home__hero-image--gradient"
          name="tulips"
          alt="An abstract illustration"
        />
      </Animate>
    </Container>
  ) : (
    <>
      <Animate className="home__hero-image-container" duration={0.8} onMount>
        <Image
          className="home__hero-image--gradient"
          name="tulips"
          alt="An abstract illustration"
        />
      </Animate>

      <Animate
        animation="btt"
        className="container home__hero-content"
        duration={0.5}
        end={{ y: -148 }}
      >
        <div className="home__hero-text">
          <h2 className="home__hero-heading">{heroHeading}</h2>
          <p className="home__hero-description">{heroDescription}</p>

          <div className="home__hero-ctas">
            <Button as="link" href="/profile" text={heroProfileCTA} disabled />
          </div>
        </div>
      </Animate>
    </>
  );

  return <section className="home__hero">{content}</section>;
};

const FeaturesForUsers = () => {
  const features = [
    {
      icon: BiCollection,
      text: "Explore the official list of visa sponsors in the Netherlands and browse through high-paying jobs",
    },
    {
      icon: AiOutlineBarChart,
      text: "View salary ranges to find out what you're worth and explore the current top skills and technologies",
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
            <Image
              className="home__hero-image"
              name="job-seekers"
              alt="An abstract illustration"
            />
          </div>
        </Animate>

        <Animate animation="ltr">
          <div className="home__features-text">
            <h3 className="home__features-heading">For job seekers</h3>
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
              text="Coming soon"
              disabled
            />
          </div>
        </Animate>
      </Container>
    </section>
  );
};

const FeaturesForCompanies = () => {
  const features = [
    {
      icon: IoMdPeople,
      text: "Tons of responsive and work-ready candidates with all the information you need to vet them",
    },
    {
      icon: CgTrack,
      text: "Free applicant tracking system or free integration with any existing ATS you may already use",
    },
    {
      icon: AiOutlineUpload,
      text: "Outsource the vetting to us and let us spend hundreds of hours finding the right candidate for you",
    },
  ];

  return (
    <section className="home__features">
      <Container className="home__features-content reverse">
        <Animate animation="ltr">
          <div className="home__features-text">
            <h3 className="home__features-heading">For companies</h3>
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
              href="/company-signup"
              variant="secondary"
              className="home__features-btn"
              text="Coming soon"
              disabled
            />
          </div>
        </Animate>

        <Animate animation="rtl">
          <div className="home__hero-image-container">
            <Image
              className="home__hero-image"
              name="for-companies"
              alt="An abstract illustration"
            />
          </div>
        </Animate>
      </Container>
    </section>
  );
};

export default function Index() {
  const isDesktop = useIsDesktop();

  return (
    <main className="homepage">
      <IntroHero isDesktop={isDesktop} />
      <Waitlist />
      <FeaturesForUsers />

      <Animate>
        <hr />
      </Animate>

      <FeaturesForCompanies />
      <Waitlist />
    </main>
  );
}
