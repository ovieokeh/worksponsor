import Button from "../button";

export default function Construction() {
  const titleText = "Hi there";
  const descriptionText = `If you're reading this, that means you're an early adopter and are just browsing around.\n
  This page is still under construction but check out the other pages and remember to join the waitlist for early access.`;

  return (
    <div className="construction">
      <h2 className="construction__title">{titleText}</h2>

      {descriptionText.split("\n").map((p) => (
        <p key={p} className="construction__description">
          {p}
        </p>
      ))}

      <div className="construction__ctas">
        <Button onClick={() => history.go(-1)} text="Previous page" />
        <Button as="link" href="/" text="Homepage" variant="secondary" />
      </div>
    </div>
  );
}
