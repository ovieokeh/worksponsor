import type { LinksFunction, MetaFunction } from "@remix-run/node";
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

import buttonStyles from "./shared/button/button.css";
import navigationStyles from "./shared/navigation/navigation.css";
import layoutStyles from "./shared/layout/layout.css";
import styleVariables from "./styles/variables.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&family=Open+Sans:wght@300;400&display=swap",
    },
    { rel: "stylesheet", href: styleVariables },
    { rel: "stylesheet", href: buttonStyles },
    { rel: "stylesheet", href: navigationStyles },
    { rel: "stylesheet", href: layoutStyles },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "WorkSponsor | Relocate to the Netherlands",
  viewport: "width=device-width,initial-scale=1",
});

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
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
