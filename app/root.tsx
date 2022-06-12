import type {
  LinksFunction,
  MetaFunction,
  LoaderFunction,
} from "@remix-run/node";
import type { CatchBoundaryComponent } from "@remix-run/react/routeModules";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/server-runtime";

import Layout from "./components/layout";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import Construction from "./components/construction";

import buttonStyles from "./components/button/button.css";
import navigationStyles from "./components/navigation/navigation.css";
import containerStyles from "./components/container/container.css";
import footerStyles from "./components/footer/footer.css";
import layoutStyles from "./components/layout/layout.css";
import constructionStyles from "./components/construction/construction.css";
import filterStyles from "./components/filter/filter.css";
import styleVariables from "./styles/variables.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
    { rel: "stylesheet", href: containerStyles },
    { rel: "stylesheet", href: filterStyles },
    { rel: "stylesheet", href: footerStyles },
    { rel: "stylesheet", href: constructionStyles },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "WorkSponsor | Relocate to the Netherlands",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = ({ request }) => {
  return json({
    ENV: {
      URL: request.url,
      IS_DEV: process.env.IS_DEV,
    },
  });
};

export default function App() {
  const data = useLoaderData();

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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
