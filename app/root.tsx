import type { LinksFunction, MetaFunction } from "@remix-run/node";
import type { CatchBoundaryComponent } from "@remix-run/react/routeModules";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useOutlet,
} from "@remix-run/react";

import Navigation, { links as navLinks } from "./shared/navigation";
import Layout, { links as layoutLinks } from "./shared/layout";
import { links as containerLinks } from "./shared/container";
import Footer, { links as footerLinks } from "./shared/footer";
import { links as buttonLinks } from "./shared/button";
import Construction, {
  links as constructionLinks,
} from "./components/construction";

import styleVariables from "./styles/variables.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&family=Nunito:wght@300;400;500&display=swap",
    },
    { rel: "stylesheet", href: styleVariables },
    ...navLinks(),
    ...layoutLinks(),
    ...containerLinks(),
    ...footerLinks(),
    ...buttonLinks(),
    ...constructionLinks(),
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "WorkSponsor | Relocate to the Netherlands",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const outlet = useOutlet();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>

      <body>
        <Navigation />
        <Layout>{outlet}</Layout>
        <Footer />

        <ScrollRestoration />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XSRVPVJCML"
        />
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-XSRVPVJCML');`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const CatchBoundary: CatchBoundaryComponent = () => {
  return (
    <html lang="en">
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
