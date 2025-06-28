import { JobStatus } from "../lib/constants";
import { Icons } from "./icons";

interface FilterBarProps {
  filters: {
    status: JobStatus | "all";
    search: string;
  };
  onFilterChange: (filters: {
    status: JobStatus | "all";
    search: string;
  }) => void;
  jobCount: number;
}

export default function FilterBar({
  filters,
  onFilterChange,
  jobCount,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icons.search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search jobs..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
          />
        </div>

        <div className="flex items-center space-x-2">
          <label
            htmlFor="status-filter"
            className="text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <select
            id="status-filter"
            className="block w-full text-black pl-3 pr-10 py-2 text-base border-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={filters.status}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                status: e.target.value as JobStatus | "all",
              })
            }
          >
            <option value="all">All</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="text-sm text-gray-500">
          {jobCount} {jobCount === 1 ? "job" : "jobs"} found
        </div>
      </div>
    </div>
  );
}
