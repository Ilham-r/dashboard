"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div className="relative">
      {session ? (
        <div className="sidebar">
          <Link href="/">Dashboard</Link>
          <Link href="/assets">Assets</Link>
          <Link href="/materials">Materials</Link>
          <Link href="/categories">Categories</Link>
          <button type="button" onClick={signOut} className="btn-black">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="sign_page">
          <button type="button" onClick={signIn} className="btn-black">
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
