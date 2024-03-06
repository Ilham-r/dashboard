"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectForm from "@/component/ProjectForm";
import { useSession } from "next-auth/react";

import Image from "next/image";
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
  const checkImages = (image) => {
    const regex = /video/;
    if (regex.test(image)) {
      return true;
    } else {
      return false;
    }
  };
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
  const DeleteImage = (index) => {
    const hasConfirmed = confirm("Are you sure you want to delete the image?");
    if (hasConfirmed) {
      const images = result.image;
      images.splice(index, 1);
      setResult((prevForm) => ({
        ...prevForm,
        image: images,
      }));
    }
  };
  return (
    <>
      {session ? (
        <div className="pages-padding flex-col justify-center items-start gap-8 ">
          <h1 className="head_title w-full ">Update Asset</h1>
          <div className="flex w-full h-full justify-center items-start gap-10 ">
            <ProjectForm
              type="Edit"
              form={result}
              setForm={setResult}
              handleSubmit={handleUpdate}
              handleChangeImage={handleChangeImage}
            />
            <div className="flex h-full flex-col flex-1 items-center justify-center">
              <div className="flex w-full h-full flex-col gap-2 items-center justify-center">
                {result.image?.map((image, index) => (
                  <div className=" flex relative">
                    <Image
                      src="/icons/supprimer.png"
                      width={20}
                      height={20}
                      className="font-semibold  absolute right-2 top-1 cursor-pointer z-50"
                      onClick={() => DeleteImage(index)}
                    />
                    {checkImages(image) ? (
                      <video width="360" height="240" controls>
                        <source src={image} type="video/mp4" />
                        <source src={image} type="video/webm" />
                        <source src={image} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image width={320} height={280} src={image} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UpdateM;
