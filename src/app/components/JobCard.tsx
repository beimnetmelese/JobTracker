import Link from "next/link";
import { JobApplication } from "../lib/constants";
import { Icons } from "./icons";

interface JobCardProps {
  job: JobApplication;
  onDelete: (id: string) => void;
}

export default function JobCard({ job, onDelete }: JobCardProps) {
  const statusColors = {
    applied: "bg-blue-100 text-blue-800",
    interview: "bg-purple-100 text-purple-800",
    rejected: "bg-red-100 text-red-800",
    offer: "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {job.position}
            </h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusColors[job.status]
            }`}
          >
            {job.status}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            <Icons.calendar className="inline mr-1 h-4 w-4" />
            Applied: {new Date(job.dateApplied).toLocaleDateString()}
          </p>
          {job.salary && (
            <p className="text-sm text-gray-500 mt-1">
              <Icons.dollar className="inline mr-1 h-4 w-4" />
              Salary: {job.salary}
            </p>
          )}
        </div>

        {job.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700 line-clamp-2">{job.notes}</p>
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <Link
          href={`/dashboard/jobs/${job.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
        >
          View Details <Icons.chevronRight className="ml-1 h-4 w-4" />
        </Link>

        <div className="flex space-x-2">
          <button
            onClick={() => onDelete(job.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete job"
          >
            <Icons.trash className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
