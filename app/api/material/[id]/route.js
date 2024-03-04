import { connectToDB } from "@/utils/database";
import Material from "@/models/Material";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const material = await Material.findById(params.id);
    if (!material) return new Response("material not found", { status: 404 });
    return new Response(JSON.stringify(material), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch material", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { title, description, image, category } = await req.json();

  try {
    await connectToDB();
    const getMaterial = await Material.findById(params.id);
    if (!getMaterial)
      return new Response("material not found", { status: 404 });
    getMaterial.title = title;
    getMaterial.description = description;
    getMaterial.image = image;
    getMaterial.category = category;
    await getMaterial.save();
    return new Response(JSON.stringify(getMaterial), { status: 200 });
  } catch (error) {
    return new Response("failed to update material", { status: 500 });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Material.findByIdAndDelete(params.id);
    return new Response("MAterial deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("failed to delete Material", { status: 500 });
  }
};
