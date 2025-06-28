import JobDetails from "@/app/components/JobDetails";
import { JobApplication } from "@/app/lib/constants";
import { notFound } from "next/navigation";
import { Icons } from "@/app/components/icons";
import BackButton from "@/app/components/BackButton";
import Breadcrumbs from "@/app/components/Breadcrumbs";

async function getJob(id: string): Promise<JobApplication | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
      next: { tags: [`job-${id}`] },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch job");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BackButton />
              <Breadcrumbs
                items={[
                  { name: "Dashboard", href: "/dashboard" },
                  { name: "Jobs", href: "/dashboard/jobs" },
                  { name: job.position, href: "#" },
                ]}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {job.position}
                </h1>
                <p className="text-xl text-gray-600 mt-1">{job.company}</p>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  job.status === "applied"
                    ? "bg-blue-100 text-blue-800"
                    : job.status === "interview"
                    ? "bg-purple-100 text-purple-800"
                    : job.status === "offer"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>

            <div className="mt-8">
              <JobDetails job={job} />
            </div>
          </div>

          {/* Timeline and notes section */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              Application Timeline
            </h3>
            {/* Timeline component would go here */}

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Icons.fileText className="h-5 w-5 text-gray-500 mr-2" />
                Your Notes
              </h3>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                {job.notes || "No notes added yet"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
