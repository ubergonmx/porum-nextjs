"use client";

import Image from "next/image";

export default function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative min-h-60 w-full">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  );
}
