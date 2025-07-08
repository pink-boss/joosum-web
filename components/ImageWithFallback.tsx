import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  useFill?: boolean;
  className?: string;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  index?: number;
  width?: number;
  height?: number;
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
  index = 0,
  width,
  height,
}: InputProps) {
  const [error, setError] = useState(false);

  const noImagePlaceholder =
    index % 2 === 0 ? "/no_img_odd.png" : "/no_img_even.png";
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
      width={width || 1600}
      height={height || 900}
      className={`${className}`}
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
