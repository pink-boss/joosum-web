import Image, { ImageProps } from 'next/image';

import { useState } from 'react';

interface Props extends Pick<ImageProps, 'unoptimized'> {
  alt: string;
  className?: string;
  height?: number;
  index?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  src?: null | string;
  useFill?: boolean;
  width?: number;
}

export default function ImageWithFallback({
  src,
  alt,
  useFill = false,
  className = '',
  quality,
  priority,
  sizes,
  unoptimized,
  index = 0,
  width,
  height,
}: Props) {
  const [error, setError] = useState(false);

  const noImagePlaceholder = index % 2 === 0 ? '/no_img_odd.png' : '/no_img_even.png';

  const imgSrc = error || !src ? noImagePlaceholder : src;

  if (useFill) {
    return (
      <Image
        alt={alt}
        blurDataURL={noImagePlaceholder}
        className={`object-cover ${className}`}
        fill={true}
        placeholder="blur"
        priority={priority}
        quality={quality}
        sizes={sizes || '100vw'}
        src={imgSrc}
        unoptimized={!!unoptimized}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <Image
      alt={alt}
      blurDataURL={noImagePlaceholder}
      className={`${className}`}
      height={height || 900}
      placeholder="blur"
      priority={priority}
      quality={quality}
      sizes={sizes}
      src={imgSrc}
      unoptimized={!!unoptimized}
      width={width || 1600}
      onError={() => setError(true)}
    />
  );
}
