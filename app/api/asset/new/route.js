import { connectToDB } from "@/utils/database";
import Asset from "@/models/Asset";
export const POST = async (req) => {
  const { title, description, image, category } = await req.json();
  try {
    await connectToDB();
    const newAsset = new Asset({
      title,
      description,
      image,
      category,
    });
    await newAsset.save();
    return new Response(JSON.stringify(newAsset), {
      status: 201,
    });
  } catch (error) {
    return new Response("failed to create new asset", { status: 500 });
  }
};
