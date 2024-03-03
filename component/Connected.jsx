"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import from 'next/router' instead of 'next/navigation'

const Connect = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  // Perform routing logic only on the client-side
  if (typeof window !== "undefined" && !session) {
    router.push("/login");
    return null; // Return null if redirecting, so that children aren't rendered
  }

  return <>{children}</>;
};

export default Connect;
