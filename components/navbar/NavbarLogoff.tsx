// components/NavbarLogoff/NavbarLogoff.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAuth, signOut } from "firebase/auth";
import { appFirebase } from "@/data/sdk";

const NavbarLogoff = () => {
  return (
<div className="navbar bg-base-100">
  <div className="flex-1">
    <Link href="/" className="btn btn-ghost normal-case text-xl">
      SuaMarca
    </Link>
  </div>
  <div className="flex-none gap-2">
    <Link href="/login" className="btn btn-ghost normal-case text-xl">Login
    </Link>
  </div>
</div>

  );
};

export default NavbarLogoff;
