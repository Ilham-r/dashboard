"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectForm from "@/component/ProjectForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
const UpdateA = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const SearchParams = useSearchParams();
  const checkImages = (image) => {
    const regex = /video/;

    if (regex.test(image)) {
      return true;
    } else {
      return false;
    }
  };
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
                      <video width="320" height="240" controls>
                        <source src={image} type="video/mp4" />
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

export default UpdateA;
