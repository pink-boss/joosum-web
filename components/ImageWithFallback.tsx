import Image, { ImageProps } from "next/image";
import { useState } from "react";

const noImagePlaceholder = `data:image/svg+xml,${encodeURIComponent(`
<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#f0f0f0"/>
  <text x="800" y="450" 
        text-anchor="middle" 
        dominant-baseline="middle"
        font-family="Arial, sans-serif" 
        font-size="160" 
        fill="#999">
    No Image
  </text>
</svg>
`)}`;

interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  useFill?: boolean;
  className?: string;
  quality?: number;
  priority?: boolean;
  sizes?: string;
}

type InputProps = ImageWithFallbackProps & Pick<ImageProps, "unoptimized">;

export default function ImageWithFallback({
  src,
  alt,
  useFill = false,
  className = "",
  quality,
  priority,
  sizes,
  unoptimized,
}: InputProps) {
  const [error, setError] = useState(false);

  const imgSrc = error || !src ? noImagePlaceholder : src;

  if (useFill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill={true}
        className={`object-cover ${className}`}
        onError={() => setError(true)}
        placeholder="blur"
        blurDataURL={noImagePlaceholder}
        quality={quality}
        priority={priority}
        sizes={sizes || "100vw"}
        unoptimized={!!unoptimized}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={1600}
      height={900}
      className={`h-auto w-full ${className}`}
      onError={() => setError(true)}
      placeholder="blur"
      blurDataURL={noImagePlaceholder}
      quality={quality}
      priority={priority}
      sizes={sizes}
      unoptimized={!!unoptimized}
    />
  );
}
