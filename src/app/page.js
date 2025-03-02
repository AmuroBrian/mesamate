"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/foods");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center cursor-pointer"
      style={{ backgroundImage: "url(/images/background.png)" }}
      onClick={handleRedirect}
    >
      <Image src="/images/logo.png" alt="Mesa Mate Logo" width={300} height={300} />
      <h1 className="text-black text-4xl font-bold mt-4">Mesa Mate</h1>
      <div className="text-black text-3xl font-bold italic mt-4">Click Anywhere to Start</div>
    </div>
  );
}
