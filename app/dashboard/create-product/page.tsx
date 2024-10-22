import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import CreateProudctForm from "./create-product-form";

const CreateProduct = async () => {
  const session = await auth();
  if (session?.user.role !== "admin") return redirect("/dashboard/settings");
  return <CreateProudctForm />;
};
export default CreateProduct;
