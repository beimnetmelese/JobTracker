import { Icons } from "./icons";

interface EmptyStateProps {
  onAddJob: () => void;
  hasFilters: boolean;
  onClearFilters: () => void;
}

export default function EmptyState({
  onAddJob,
  hasFilters,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="text-center bg-white rounded-lg shadow p-12">
      {hasFilters ? (
        <>
          <Icons.search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No jobs match your filters
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
          <div className="mt-6">
            <button
              onClick={onClearFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear filters
            </button>
          </div>
        </>
      ) : (
        <>
          <Icons.briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No job applications yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first job application.
          </p>
          <div className="mt-6">
            <button
              onClick={onAddJob}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Icons.plus className="mr-2 h-5 w-5" />
              Add Job
            </button>
          </div>
        </>
      )}
    </div>
  );
}
