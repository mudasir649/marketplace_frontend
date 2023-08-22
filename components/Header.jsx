import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="py-6 border-b bg-[#e52320]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="https://eidcarosse.ch/wp-content/uploads/2023/07/test-white-logo.png"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/login" className="hover:text-[#e52320] transition" to=''>Login</Link>
          <Link href="/signup" className="bg-white hover:bg-red-300 hover:text-white  px-4 py-2 transition rounded-lg">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}
