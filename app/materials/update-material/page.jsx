"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectForm from "@/component/ProjectForm";
import { useSession } from "next-auth/react";
import { CldVideoPlayer } from "next-cloudinary";
import Image from "next/image";
import "next-cloudinary/dist/cld-video-player.css";
const UpdateM = () => {
  const router = useRouter();

  const regex = "/video/";
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
    console.log("functio", regex.test(image));
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
    const images = result.image;
    images.splice(index, 1);
    setResult((prevForm) => ({
      ...prevForm,
      image: images,
    }));
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
              <h2>images</h2>
              <div className="flex w-full h-full flex-col gap-2 items-center justify-center">
                {result.image?.map((image, index) => (
                  <div className=" flex relative">
                    <h2
                      className="font-semibold  absolute right-2 top-0 cursor-pointer"
                      onClick={() => DeleteImage(index)}
                    >
                      X
                    </h2>
                    {checkImages(image) ? (
                      <CldVideoPlayer width="360" height="200" src={image} />
                    ) : (
                      <Image width={260} height={200} src={image} />
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
