import { useState } from "react";
import { NavLink } from "@remix-run/react";

import MenuIcon from "./MenuIcon";

import { useIsDesktop, useIsomorphicLayoutEffect } from "hooks";
import throttle from "utils/throttle";

import styles from "./navigation.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const navLinks = [
  { name: "Browse companies", href: "/companies" },
  { name: "View jobs", href: "/jobs" },
  { name: "Life in NL", href: "/life-in-the-netherlands" },
];

export default function Navigation() {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("none");
  const [, setLastScrollTop] = useState(0);
  const [menuStyles, setMenuStyles] = useState({});
  const isDesktop = useIsDesktop();

  useIsomorphicLayoutEffect(() => {
    setMenuStyles({
      boxShadow:
        scrollDirection === "up"
          ? "0 10px 30px -10px rgba(0, 0, 0, 0.2)"
          : "none",
      transform: scrollDirection === "down" ? "translateY(-100%)" : "none",
    });
  }, [scrollDirection]);

  function handleScroll() {
    if (isMenuToggled) return;

    const MINIMUM_SCROLL_LENGTH = 10;
    const currentScrollTop = window.scrollY;

    setLastScrollTop((prevScrollTop) => {
      if (!isMenuToggled) {
        if (currentScrollTop > MINIMUM_SCROLL_LENGTH) {
          if (currentScrollTop > prevScrollTop) {
            setScrollDirection("down");
          } else if (currentScrollTop < prevScrollTop) {
            setScrollDirection("up");
          }
        } else {
          setScrollDirection("none");
        }
      }

      return currentScrollTop;
    });
  }

  useIsomorphicLayoutEffect(() => {
    const handleScrollThrottled = throttle(handleScroll, 500);
    window.addEventListener("scroll", handleScrollThrottled);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottled);
    };
  }, [isMenuToggled]);

  function handleMenuToggle() {
    if (isDesktop) return;

    setScrollDirection(() => {
      setIsMenuToggled((prevToggleState) => {
        const newToggleState = !prevToggleState;
        newToggleState
          ? document.documentElement.classList.add("no-scroll")
          : document.documentElement.classList.remove("no-scroll");

        return newToggleState;
      });

      return "up";
    });
  }

  let pathname: string = "";
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }

  const NavLinks = navLinks.map((link) => {
    const isActive = pathname === link.href;
    const linkClassname = `nav__link ${
      isActive ? "nav__link--active" : ""
    }`.trim();

    return (
      <NavLink
        key={link.href}
        to={link.href}
        onClick={handleMenuToggle}
        className={linkClassname}
        prefetch="intent"
      >
        {link.name}
      </NavLink>
    );
  });

  const navLinksClassname = `nav__links ${
    isMenuToggled ? "nav__links--toggled" : ""
  }`.trim();

  return (
    <nav className="nav" style={menuStyles}>
      <div className="nav__content">
        <NavLink
          to="/"
          className={`nav__brand ${
            pathname === "/" ? "nav__brand--active" : ""
          }`}
          aria-label="Homepage link"
          prefetch="intent"
        >
          <img src="/logo.svg" alt="WorkSponsor logo" />
        </NavLink>

        <MenuIcon isToggled={isMenuToggled} onToggle={handleMenuToggle} />

        <section className={navLinksClassname}>{NavLinks}</section>
      </div>
    </nav>
  );
}
