"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
const Profile = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <div className="pages-padding  justify-center items-center gap-20 flex-col">
          <h1 className="gradient-text ">Dashboard</h1>
          <div className="flex w-full h-full flex-wrap justify-center items-center gap-8">
            <Link href="/assets">
              <div className="dash-card">Assets</div>
            </Link>
            <Link href="/materials">
              <div className="dash-card gradient1">Materials</div>
            </Link>
            <Link href="/categories">
              <div className="dash-card gradient2">Categories</div>
            </Link>
            <div className="dash-card ">Categories</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
