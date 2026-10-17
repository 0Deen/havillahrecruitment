"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type Props = Omit<ImageProps, "src"> & {
  src: string;
  /** Shown automatically if `src` is missing / fails to load. */
  fallback?: string;
};

/**
 * next/image with a built-in safety net: if the primary file is not in
 * /public yet (or is misnamed), it quietly swaps to the fallback instead
 * of showing a broken picture.
 */
export function SafeImage({ src, fallback, alt, ...rest }: Props) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={current}
      alt={alt}
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
