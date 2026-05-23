export default function CustomImage({
  src,
  alt,
  className = "",
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
    />
  );
}