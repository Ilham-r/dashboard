"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProjectCard from "@/component/ProjectCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const Materials = () => {
  const { data: session } = useSession();
  const [result, setResult] = useState([]);
  const router = useRouter();
  const handleDelete = async (material) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this material?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/material/${material._id.toString()}`, {
          method: "DELETE",
        });
        const filteredResults = result.filter((p) => p._id !== result._id);
        setResult(filteredResults);
      } catch (error) {}
    }
  };
  const handleEdit = async (result) => {
    router.push(`/materials/update-material?id=${result._id}`);
  };
  useEffect(() => {
    const getMaterials = async () => {
      const response = await fetch("/api/material");
      const data = await response.json();

      setResult(data);
    };
    getMaterials();
  }, [result]);
  return (
    <>
      {session ? (
        <div className="pages-padding justify-center items-center flex-col gap-4">
          <Link href="/materials/create-material" className="btn-black">
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

export default Materials;
