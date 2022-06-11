import { useEffect, useRef, useState } from "react";
import { useFetcher } from "@remix-run/react";

import Button from "../button";

const render = (condition: boolean, component: any) => {
  if (condition) return component;
  return null;
};

export default function Waitlist() {
  const fetcher = useFetcher();
  const form = useRef<HTMLFormElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<string>(fetcher.type);

  useEffect(() => {
    if (fetcher.data?.result !== "ok") {
      emailInput.current?.focus();
    }

    setState(fetcher.type);
  }, [fetcher]);

  const descriptionText =
    "Join the waitlist to get first access to the platform as well as extra perks planned in the upcoming roadmap";
  const submitText = "Join waitlist";
  const placeholderText = "Your email";
  const subscribedText = "Thank you for subscribing";

  const ERROR_TEXT_MAPPING: { [x: string]: string } = {
    email_invalid: "Invalid email. Please try again with a valid email",
    conflict: "It seems like you're already subscribed with this email",
    unknown: "An error occurred. Please try again later",
  };

  const errorText = ERROR_TEXT_MAPPING[fetcher.data?.error] || "";

  const isLoading = fetcher.state === "loading";
  const isSubscribed = state === "done" && fetcher.data?.result === "ok";
  const hasError = state === "done" && fetcher.data?.result === "bad";

  return (
    <div className={`waitlist ${isLoading ? "waitlist--loading" : ""}`}>
      <p className="waitlist__description">{descriptionText}</p>

      <fetcher.Form ref={form} className="waitlist__form" method="post">
        <fieldset
          className={`waitlist__form-inputs ${isSubscribed ? "hidden" : ""}`}
        >
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
        </fieldset>

        <div>
          {render(
            isSubscribed,
            <>
              <p className="waitlist__success">{subscribedText}</p>
              <Button
                text="Subscribe another email"
                variant="secondary"
                onClick={() => {
                  setState("idle");

                  form.current?.reset();
                  emailInput.current?.focus();
                }}
              />
            </>
          )}

          {render(hasError, <p className="waitlist__error">{errorText}</p>)}
        </div>
      </fetcher.Form>
    </div>
  );
}
