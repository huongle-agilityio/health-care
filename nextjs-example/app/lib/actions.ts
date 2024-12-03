"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { AuthError } from "next-auth";
import { signIn } from "../auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export const createInvoice = async (prevState: State, formData: FormData) => {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    console.log("Test", customerId, amountInCents, status, date);
    // Call api post
  } catch (error) {
    return {
      message: `Database Error: Failed to Create Invoice. ${error}`,
    };
  }

  revalidatePath("/dashboard/invoices");
};

export const updateInvoice = async (prevState: State, formData: FormData) => {
  const validatedFields = CreateInvoice.safeParse({
    amount: Number(formData.get("amount")),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { amount } = validatedFields.data;

  try {
    const value = {
      english: `english ${amount}`,
      vietnamese: `vietnamese ${amount}`,
    };
    const response = await fetch(
      `${process.env.API_ENDPOINT}/topic/1/vocabulary/${prevState}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        body: JSON.stringify(value),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Request failed: ${errorData.message || response.statusText}`
      );
    }
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to update vocabulary");
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};

export async function deleteInvoice(id: string) {
  // throw new Error("Failed to Delete Invoice");
  try {
    const response = await fetch(
      `${process.env.API_ENDPOINT}/topic/1/vocabulary/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        body: JSON.stringify({
          id: id,
        }),
        next: {
          tags: [`${process.env.API_ENDPOINT}/topic/1/vocabulary/`],
          revalidate: 0,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Request failed: ${errorData.message || response.statusText}`
      );
    }
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to update vocabulary");
  }

  revalidatePath("/dashboard/invoices");
}
