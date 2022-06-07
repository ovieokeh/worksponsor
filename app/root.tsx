import type { LinksFunction, MetaFunction } from "@remix-run/node";
import type { CatchBoundaryComponent } from "@remix-run/react/routeModules";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Layout from "./shared/layout";
import Navigation from "./shared/navigation";
import Footer from "./shared/footer";
import Construction from "./shared/construction";

import buttonStyles from "./shared/button/button.css";
import navigationStyles from "./shared/navigation/navigation.css";
import footerStyles from "./shared/footer/footer.css";
import layoutStyles from "./shared/layout/layout.css";
import constructionStyles from "./shared/construction/construction.css";
import styleVariables from "./styles/variables.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&family=Open+Sans:wght@300;400&display=swap",
    },
    { rel: "stylesheet", href: styleVariables },
    { rel: "stylesheet", href: layoutStyles },
    { rel: "stylesheet", href: buttonStyles },
    { rel: "stylesheet", href: navigationStyles },
    { rel: "stylesheet", href: footerStyles },
    { rel: "stylesheet", href: constructionStyles },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "WorkSponsor | Relocate to the Netherlands",
  viewport: "width=device-width,initial-scale=1",
});

export const CatchBoundary: CatchBoundaryComponent = () => {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Navigation />
        <Layout>
          <Construction />
        </Layout>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navigation />
        <Layout>
          <Outlet />
        </Layout>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
