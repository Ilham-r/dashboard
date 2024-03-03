import Asset from "@/models/Asset";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const assets = await Asset.find({});

    return new Response(JSON.stringify(assets), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all assets", { status: 500 });
  }
};
