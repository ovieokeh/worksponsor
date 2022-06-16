import Container from "../container";
import Button from "../button";

import styles from "./filter.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Filter() {
  const title = "Companies sponsoring visas";
  const description =
    "Discover and browse through the official list of visa sponsors in the Netherlands. View a company’s profile to learn about its mission, age, number of employees, and available roles.";
  const descriptionCTA = {
    text: "Browse available jobs",
    link: "/jobs",
  };

  return (
    <section className="filter">
      <Container>
        <h2 className="filter__title">{title}</h2>
        <p className="filter__description">{description}</p>

        <div className="filter__cta">
          <Button
            className="filter__cta-link"
            as="link"
            href={descriptionCTA.link}
            text={descriptionCTA.text}
            variant="secondary"
          />
        </div>
      </Container>
    </section>
  );
}
