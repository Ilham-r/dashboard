"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const logIn = () => {
  const { data: session } = useSession();
  const handleClick = () => {
    signIn();
    returntrue;
  };

  return (
    <div className="pages-padding">
      <button className="btn-black" onClick={() => handleClick}>
        Sign in
      </button>
    </div>
  );
};

export default logIn;
