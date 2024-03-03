import Category from "@/models/Category";
import { connectToDB } from "@/utils/database";
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Category.findByIdAndDelete(params.id);
    return new Response("category deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("failed to delete catrgory", { status: 500 });
  }
};
