import Material from "@/models/Material";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const materials = await Material.find({});

    return new Response(JSON.stringify(materials), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all materials", { status: 500 });
  }
};
