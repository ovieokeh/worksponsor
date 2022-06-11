import { useEffect, useRef } from "react";
import { useFetcher } from "@remix-run/react";

import Button from "../button";

const render = (condition: boolean, component: any) => {
  if (condition) return component;
  return null;
};

export default function Waitlist() {
  const fetcher = useFetcher();
  const emailInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fetcher.data?.result !== "ok") {
      emailInput.current?.focus();
    }
  }, [fetcher]);

  const descriptionText =
    "Join the waitlist to get first access to the platform as well as extra perks planned in the upcoming roadmap";
  const submitText = "Join waitlist";
  const placeholderText = "Your email";
  const subscribedText = "Thank you for subscribing";

  const ERROR_TEXT_MAPPING: { [x: string]: string } = {
    email_invalid: "Invalid email. Please try again with a valid email",
    conflict: "It seems like you're already subscribed with this email",
  };

  const errorText = ERROR_TEXT_MAPPING[fetcher.data?.error] || "";

  const isLoading = fetcher.state === "loading";
  const isSubscribed = fetcher.type === "done" && fetcher.data?.result === "ok";
  const hasError = fetcher.type === "done" && fetcher.data?.result === "bad";

  return (
    <div className={`waitlist ${isLoading ? "waitlist--loading" : ""}`}>
      <p className="waitlist__description">{descriptionText}</p>

      {render(
        !isSubscribed,
        <fetcher.Form className="waitlist__form" method="post">
          <input
            ref={emailInput}
            className="waitlist__input"
            name="email"
            type="email"
            placeholder={placeholderText}
            disabled={isLoading}
            required
          />
          <Button
            className="waitlist__submit"
            type="submit"
            variant="secondary"
            text={submitText}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </fetcher.Form>
      )}

      {render(
        isSubscribed,
        <p className="waitlist__success">{subscribedText}</p>
      )}
      {render(hasError, <p className="waitlist__success">{errorText}</p>)}
    </div>
  );
}
