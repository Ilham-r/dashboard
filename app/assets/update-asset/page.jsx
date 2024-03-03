"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectForm from "@/component/ProjectForm";
import { useSession } from "next-auth/react";
const UpdateA = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const SearchParams = useSearchParams();
  const AssetId = SearchParams.get("id");
  const [result, setResult] = useState({
    title: "",
    description: "",
    image: [],
    category: "",
  });
  useEffect(() => {
    const getAssetDetails = async () => {
      const response = await fetch(`/api/asset/${AssetId}`);

      const data = await response.json();
      setResult({
        title: data.title,
        description: data.description,
        image: data.image,
        category: data.category,
      });
    };
    getAssetDetails();
  }, [AssetId]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!AssetId) return "Asset ID not found";
    try {
      const response = await fetch(`/api/asset/${AssetId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: result.title,
          description: result.description,
          image: result.image,
          category: result.category,
        }),
      });
      if (response.ok) {
        router.push("/assets");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeImage = (result) => {
    const imageUrl = result.info.secure_url;
    setResult((prevForm) => ({
      ...prevForm,
      image: [...prevForm.image, imageUrl],
    }));
  };
  return (
    <>
      {session ? (
        <div className="pages-padding flex-col justify-center items-start gap-8 ">
          <h1 className="head_title w-full ">Update Asset</h1>
          <ProjectForm
            form={result}
            setForm={setResult}
            handleSubmit={handleUpdate}
            handleChangeImage={handleChangeImage}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UpdateA;
