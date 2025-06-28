"use client"; // Converted to client component for interactivity

import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import StatsChart from "../components/StatsChart";

import { JobApplication, JobStatus } from "../lib/constants";
import { Icons } from "../components/icons";
import { toast } from "sonner";
import FilterBar from "../components/FilterBar";
import EmptyState from "../components/EmptyState";
import AddJobModal from "../components/AddJobModal";

export default function Dashboard() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    status: JobStatus | "all";
    search: string;
  }>({ status: "all", search: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        toast.error("Failed to load jobs");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = [...jobs];

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((job) => job.status === filters.status);
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (job) =>
          job.company.toLowerCase().includes(searchTerm) ||
          job.position.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredJobs(result);
  }, [filters, jobs]);

  const handleAddJob = async (newJob: Omit<JobApplication, "id">) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      const createdJob = await res.json();
      setJobs((prev) => [...prev, createdJob]);
      setIsModalOpen(false);
      toast.success("Job added successfully!");
    } catch (error) {
      toast.error("Failed to add job");
      console.error(error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error("Failed to delete job");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Icons.spinner className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Job Application Tracker
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Icons.plus className="mr-2 h-4 w-4" />
            Add Job
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats and Filters */}
        <div className="mb-12 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl text-black font-semibold mb-4">
              Your Statistics
            </h2>
            <StatsChart jobs={jobs} />
          </div>

          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            jobCount={filteredJobs.length}
          />
        </div>

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onDelete={handleDeleteJob} />
            ))}
          </div>
        ) : (
          <EmptyState
            onAddJob={() => setIsModalOpen(true)}
            hasFilters={filters.status !== "all" || !!filters.search}
            onClearFilters={() => setFilters({ status: "all", search: "" })}
          />
        )}
      </main>

      {/* Add Job Modal */}
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddJob}
      />
    </div>
  );
}
