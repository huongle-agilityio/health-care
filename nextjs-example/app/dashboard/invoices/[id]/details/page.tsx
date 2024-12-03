import { getTopics } from "@/app/lib/data";
import { notFound } from "next/navigation";
import DetailsContent, { preload } from "./detailsContent";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const topics = await getTopics();

  preload(id);

  if (!Array.isArray(topics)) {
    notFound();
  }

  return (
    <div>
      <DetailsContent id={id} />
    </div>
  );
}
