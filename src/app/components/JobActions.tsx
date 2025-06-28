"use client";

import Link from "next/link";
import { Icons } from "./icons";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./button";

export default function JobActions({ jobId }: { jobId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success("Job deleted successfully");
      router.push("/dashboard/jobs");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete job");
      console.log(error);
    }
  };

  return (
    <div className="flex space-x-2">
      <Button variant="outline" asChild>
        <Link href={`/dashboard/jobs/${jobId}/edit`}>
          <Icons.edit className="h-4 w-4 mr-2" />
          Edit
        </Link>
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        <Icons.trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
}
