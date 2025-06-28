import JobDetails from "@/app/components/JobDetails";
import { JobApplication } from "@/app/lib/constants";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Icons } from "@/app/components/icons";
import BackButton from "@/app/components/BackButton";
import Breadcrumbs from "@/app/components/Breadcrumbs";

interface JobPageProps {
  params: { id: string };
}

// Metadata generation
export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const job = await getJob(params.id);

  if (!job) {
    return {
      title: "Job Not Found | Job Tracker",
      description: "The requested job application could not be found.",
    };
  }

  return {
    title: `${job.position} at ${job.company} | Job Tracker`,
    description: `Details for ${job.position} position at ${job.company}`,
    openGraph: {
      title: `${job.position} at ${job.company}`,
      description: job.description.substring(0, 160) + "...",
      type: "website",
    },
  };
}

// Fetch job data
async function getJob(id: string): Promise<JobApplication | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
      next: { tags: [`job-${id}`] },
      cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch job: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

// Main page component
export default async function JobPage({ params }: JobPageProps) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  // Status styling map
  const statusStyles = {
    applied: "bg-blue-100 text-blue-800",
    interview: "bg-purple-100 text-purple-800",
    offer: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
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
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {job.position}
                </h1>
                <p className="text-xl text-gray-600 mt-1">{job.company}</p>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  statusStyles[job.status]
                }`}
                aria-label={`Application status: ${job.status}`}
              >
                {job.status}
              </span>
            </div>

            <div className="mt-8">
              <JobDetails job={job} />
            </div>
          </div>

          {/* Timeline and notes section */}
          <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
              <Icons.clock className="h-5 w-5 text-gray-500 mr-2" />
              Application Timeline
            </h3>
            {/* Placeholder for timeline component */}
            <p className="text-gray-500 italic">
              Timeline feature coming soon...
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                <Icons.fileText className="h-5 w-5 text-gray-500 mr-2" />
                Your Notes
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {job.notes || "No notes added yet"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
