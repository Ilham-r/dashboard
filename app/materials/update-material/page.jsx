"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectForm from "@/component/ProjectForm";
import { useSession } from "next-auth/react";
const UpdateM = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const SearchParams = useSearchParams();
  const MaterialId = SearchParams.get("id");
  const [result, setResult] = useState({
    title: "",
    description: "",
    image: [],
    category: "",
  });
  useEffect(() => {
    const getMaterialDetails = async () => {
      const response = await fetch(`/api/material/${MaterialId}`);

      const data = await response.json();
      setResult({
        title: data.title,
        description: data.description,
        image: data.image,
        category: data.category,
      });
    };
    getMaterialDetails();
  }, [MaterialId]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!MaterialId) return "Material ID not found";
    try {
      const response = await fetch(`/api/material/${MaterialId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: result.title,
          description: result.description,
          image: result.image,
          category: result.category,
        }),
      });
      if (response.ok) {
        router.push("/materials");
      }
    } catch (error) {
      console.log(error);
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
            type="Edit"
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

export default UpdateM;
