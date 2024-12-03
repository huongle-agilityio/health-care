"use client";

import { Label } from "@/app/ui/Test/Label";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Form = dynamic(() => import("./Form"));
const WithCustomLoading = dynamic(() => import("@/app/ui/search"), {
  loading: () => <p>Loading...</p>,
});

const ViewCount = ({ initialViews }: { initialViews: number }) => {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    const updateViews = async () => {
      // Call api to get views after updated
      //   const updatedViews = await incrementViews()
      setViews(2);
    };

    updateViews();
  }, []);

  return (
    <p>
      <WithCustomLoading placeholder="Search invoices..." />
      <Form />
      <Label>Label test</Label>
      Total Views: {views}
    </p>
  );
};

export default ViewCount;
