import { getVocabularies } from "@/app/lib/data";
import { notFound } from "next/navigation";

export const preload = (id: string) => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  void getVocabularies(id);
};

const DetailsContent = async ({ id }: { id: string }) => {
  const vocabs = await getVocabularies(id);

  if (!Array.isArray(vocabs)) {
    notFound();
  }

  return (
    <div>
      {vocabs.map((vocab) => (
        <>{vocab.id}</>
      ))}
    </div>
  );
};
export default DetailsContent;
