"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

type ApiImageProps = {
  base64: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function ApiImage({ base64, className, alt, width, height }: ApiImageProps) {
  const src = `data:image/jpeg;base64,${base64}`;
  return <Image src={src} alt={alt} width={width} height={height} className={cn("", className)} />;
}
