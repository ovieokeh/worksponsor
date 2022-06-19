export default function Image({
  className,
  alt,
  name,
}: {
  className: string;
  alt: string;
  name: string;
}) {
  return (
    <img
      className={className}
      src={`/images/${name}.webp`}
      srcSet={`
        images/sizes/${name}-480.webp 480w,
        images/sizes/${name}-1080.webp 1080w
      `}
      sizes="(max-width: 420px) 480px, 1080px"
      alt={alt}
    />
  );
}
