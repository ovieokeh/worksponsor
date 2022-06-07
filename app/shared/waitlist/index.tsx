import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

import Button from "../button";

type WaitlistProps = {
  success: boolean;
  error?: any;
};
export default function Waitlist({ success, error }: WaitlistProps) {
  const transition = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (success) {
      formRef.current?.clear();
      emailInputRef.current?.focus();
    }
  }, [success]);

  const descriptionText =
    "Join the waitlist to get first access to the platform as well as extra perks planned in the upcoming roadmap";
  const submitText = "Join waitlist";
  const placeholderText = "Your email";
  const invalidEmailText = "Invalid email. Please try again with a valid email";
  const subscribedText = "Thank you for subscribing";

  const isLoading =
    transition.state === "submitting" || transition.state === "loading";

  return (
    <div className={`waitlist ${isLoading ? "waitlist--loading" : ""}`}>
      <p className="waitlist__description">{descriptionText}</p>

      {error === "email_invalid" && (
        <p className="waitlist__error">{invalidEmailText}</p>
      )}

      {success && <p className="waitlist__success">{subscribedText}</p>}

      {!success && (
        <Form ref={formRef} className="waitlist__form" method="post">
          <input
            ref={emailInputRef}
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
        </Form>
      )}
    </div>
  );
}
