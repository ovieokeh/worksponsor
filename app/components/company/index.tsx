import type { Company as CompanyType } from "@prisma/client";
import { Link } from "@remix-run/react";
import { RiBuilding4Line } from "react-icons/ri";

import styles from "./company.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const trim = (text: string) => {
  return `${text.slice(0, 150)}...`;
};

export default function Company({ id, name, description }: CompanyType) {
  return (
    <section className="company">
      <Link className="company__link" to={`companies/${id}`}>
        <div className="company__meta">
          <div className="company__icon">
            <RiBuilding4Line />
          </div>
          <p className="company__name">{name}</p>
        </div>

        <div className="company__details">
          <p className="company__description">{trim(description)}</p>
        </div>
      </Link>
    </section>
  );
}
