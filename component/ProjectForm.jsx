"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
const ProjectForm = ({
  handleSubmit,
  form,
  setForm,
  handleChangeImage,
  type,
}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("/api/category");
      const data = await response.json();

      setCategories(data);
    };
    getCategories();
  }, []);
  const handleCancel = () => {
    const hasConfirmed = confirm("Are you sure you want to cancel");
    if (hasConfirmed) {
      Router.push("/");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        className="text-field"
        placeholder="Title of the asset"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
      />
      <textarea
        value={form.description}
        className="w-96 h-80"
        placeholder="give a desc to the project"
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <CldUploadWidget
        uploadPreset="sndschta"
        onSuccess={handleChangeImage}
        onFailure={(error) => console.error("Image upload failed:", error)}
        resourceType="image"
      >
        {({ open }) => {
          return (
            <button
              type="button"
              className="btn-black justify-self-start"
              onClick={() => open()}
            >
              Upload Images
            </button>
          );
        }}
      </CldUploadWidget>

      <select
        className="text-field"
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value,
          })
        }
      >
        <option value="" disabled>
          None
        </option>

        {categories?.map((cat) => (
          <option value={cat._id}>{cat.category}</option>
        ))}
      </select>

      <div className="btn-black">
        <button type="submit">{type}</button>
      </div>
    </form>
  );
};

export default ProjectForm;
