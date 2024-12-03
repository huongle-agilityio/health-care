"use client";

import { useFormStatus } from "react-dom";
import { handleCreate, publishPost, saveDraft } from "./actions";
import clsx from "clsx";
import { useState } from "react";

const Form = () => {
  const [likes, setLikes] = useState(0);
  const { pending } = useFormStatus();
  const additionalArgument = "Some extra data";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key, ctrlKey, metaKey, currentTarget } = e;

    if ((ctrlKey || metaKey) && (key === "Enter" || key === "NumpadEnter")) {
      e.preventDefault();
      currentTarget.form?.requestSubmit();
    }
  };

  const handleLikes = async () => {
    // Call api to get likes after updated
    // const updatedLikes = await incrementLike();
    setLikes(2);
  };

  return (
    <>
      <>
        <p>Total Likes: {likes}</p>
        <button onClick={handleLikes}>Like</button>
      </>

      <form>
        <textarea
          className="w-40 h-40"
          name="entry"
          rows={20}
          required
          onKeyDown={handleKeyDown}
        />
      </form>
      <form action={handleCreate.bind(null, additionalArgument)}>
        <input name="customer" type="text" />
        <div className="flex gap-2">
          <button
            type="submit"
            className={clsx("bg-blue-500", { "opacity-50": pending })}
            disabled={pending}
          >
            submit
          </button>
          <button formAction={publishPost} className="bg-blue-500">
            public
          </button>
          <button formAction={saveDraft} className="bg-blue-500">
            draft
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
