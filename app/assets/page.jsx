"use client";
import ProjectCard from "@/component/ProjectCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
const Aseets = () => {
  const [result, setResult] = useState();
  const router = useRouter();
  const { data: session } = useSession();
  const handleDelete = async (asset) => {
    const hasConfirmed = confirm("Are you sure you want to delete this asset?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/asset/${asset._id.toString()}`, {
          method: "DELETE",
        });
        const filteredResults = result.filter((p) => p._id !== result._id);
        setResult(filteredResults);
      } catch (error) {}
    }
  };
  const handleEdit = async (result) => {
    router.push(`/assets/update-asset?id=${result._id}`);
  };
  useEffect(() => {
    const getAssets = async () => {
      const response = await fetch("/api/asset");
      const data = await response.json();
      setResult(data);
    };
    getAssets();
  }, [result]);
  return (
    <>
      {session ? (
        <div className="pages-padding justify-center items-center flex-col gap-4">
          <Link href="/assets/create-asset" className="btn-black">
            Create new
          </Link>
          <hr className="w-full border-t-black" />
          <div className="flex w-full h-full flex-wrap gap-3">
            {result?.map((res) => (
              <ProjectCard
                image={res.image[0]}
                title={res.title}
                handleDelete={() => handleDelete(res)}
                handleEdit={() => handleEdit(res)}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Aseets;
