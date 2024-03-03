"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
const Categories = () => {
  const { data: session } = useSession();
  const [category, setCategory] = useState([]);
  const [input, setInput] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/category/new", {
        method: "POST",
        body: JSON.stringify({ category: input }),
      });

      if (response.ok) {
        setInput("");
      } else {
        console.error("Failed to add category");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("/api/category");
      const data = await response.json();

      setCategory(data);
    };
    getCategories();
  }, [input, category]);
  const handleDelete = async (catg) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this category?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/category/${catg._id.toString()}`, {
          method: "DELETE",
        });
        const filteredCategories = category.filter(
          (c) => c._id !== category._id
        );
        setCategory(filteredCategories);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {session ? (
        <div className="flex w-full  h-full flex-col gap-36 justify-center items-center">
          <h1 className="gradient-text">Categories</h1>
          <div className="flex w-80 flex-col justify-center items-start gap-2">
            {category?.map((catg) => (
              <div className=" category-card">
                <h1>{catg.category}</h1>
                <p onClick={() => handleDelete(catg)}>delete</p>
              </div>
            ))}
            <form className="flex w-full gap-10 mt-5" onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Category name"
                className="text-field"
                required
              />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Categories;
