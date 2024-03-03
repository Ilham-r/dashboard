"use client";
import ProjectForm from "@/component/ProjectForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const CreateA = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: [],
    category: "",
  });

  const handleChangeImage = (result) => {
    const imageUrl = result.info.secure_url;
    setForm((prevForm) => ({
      ...prevForm,
      image: [...prevForm.image, imageUrl],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    console.log("form after updating", form);
    try {
      const response = await fetch("/api/asset/new", {
        method: "POST",
        body: JSON.stringify(form),
      });
      console.log(response);
      if (response.ok) {
        router.push("/assets");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {session ? (
        <div className="pages-padding flex-col justify-center items-start gap-8 ">
          <h1 className="head_title w-full ">Create Asset</h1>
          <ProjectForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            handleChangeImage={handleChangeImage}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CreateA;
