"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
const Materials = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <div className="pages-padding justify-center items-center flex-col gap-4">
          <Link href="/assets/create-asset" className="btn-black">
            Create new
          </Link>
          <hr className="w-full border-t-black" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Materials;
