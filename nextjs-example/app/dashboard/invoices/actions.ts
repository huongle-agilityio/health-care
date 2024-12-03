"use server";

export const handleCreate = async (
  additionalArgument: string,
  data: FormData
) => {
  try {
    // Mutate data
    console.log("data", data, additionalArgument);
  } catch (e) {
    throw new Error("Failed to create task");
  }
};

export const saveDraft = async (formData: FormData) => {
  const customer = formData.get("customer");
  console.log(`Saving draft: ${customer}`);
};

export const publishPost = async (formData: FormData) => {
  const customer = formData.get("customer");
  console.log(`Publishing post: ${customer}`);
};
