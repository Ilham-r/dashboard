import Material from "@/models/Material";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  const { title, description, image, category } = await req.json();
  try {
    await connectToDB();
    const newMaterial = new Material({
      title,
      description,
      image,
      category,
    });
    await newMaterial.save();
    return new Response(JSON.stringify(newMaterial), {
      status: 201,
    });
  } catch (error) {
    return new Response("failed to create new material", { status: 500 });
  }
};
