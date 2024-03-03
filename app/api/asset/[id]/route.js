import Asset from "@/models/Asset";
import { connectToDB } from "@/utils/database";
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const asset = await Asset.findById(params.id);
    if (!asset) return new Response("asset not found", { status: 404 });
    return new Response(JSON.stringify(asset), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch asset", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { title, description, image, category } = await request.json();
  try {
    await connectToDB();
    const existingAsset = await Asset.findById(params.id);
    if (!existingAsset) return new Response("asset not found", { status: 404 });
    existingAsset.title = title;
    existingAsset.description = description;
    existingAsset.image = image;
    existingAsset.category = category;
    await existingAsset.save();
    return new Response(JSON.stringify(existingAsset), { status: 200 });
  } catch (error) {
    return new Response("failed to update asset", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Asset.findByIdAndDelete(params.id);
    return new Response("asset deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("failed to delete asset", { status: 500 });
  }
};
