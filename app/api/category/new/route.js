import { connectToDB } from "@/utils/database";
import Category from "@/models/Category";

export const POST = async (req) => {
  const { category } = await req.json();

  try {
    await connectToDB();
    const newCategory = new Category({ category });
    await newCategory.save();
    return new Response(JSON.stringify(newCategory), {
      status: 201,
    });
  } catch (error) {
    return new Response("failed to create new category", { status: 500 });
  }
};
