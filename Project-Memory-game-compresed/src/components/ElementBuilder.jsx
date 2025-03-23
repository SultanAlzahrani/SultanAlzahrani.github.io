export default function Img({ src, className, alt = "Card" }) {
  return <img src={src} alt={alt} className={className} />;
}
