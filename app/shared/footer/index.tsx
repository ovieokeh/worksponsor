import { Link } from "@remix-run/react";

const footerLinks = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Roadmap",
    href: "/roadmap",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "FAQ",
    href: "/faq",
  },
  {
    name: "For companies",
    href: "/for-companies",
  },
  {
    name: "Privacy policy",
    href: "/privacy-policy",
  },
  {
    name: "Contact us",
    href: "/contact",
  },
];
export default function Footer() {
  const copyrightText = `WorkSponsor © ${new Date().getFullYear()}`;
  const renderedLinks = footerLinks.map(({ name, href }) => {
    return (
      <Link key={href} to={href} className="footer__link">
        {name}
      </Link>
    );
  });

  return (
    <section className="footer">
      <div className="footer__links">{renderedLinks}</div>
      <p className="footer__copyright">{copyrightText}</p>
    </section>
  );
}
