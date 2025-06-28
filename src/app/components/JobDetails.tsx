"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobApplication } from "../lib/constants";
import { Button } from "./button";
import { Icons } from "./icons";

interface JobDetailsProps {
  job: JobApplication;
}

export default function JobDetails({ job }: JobDetailsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeJob = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: job.description,
        }),
      });
      const data = await response.json();
      setAiAnalysis(data.analysis);
      setShowAnalysis(true);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Section */}

      {/* Main Details */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Core Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Job Description
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {job.notes && (
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Your Notes
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {job.notes}
              </p>
            </div>
          )}

          {/* AI Analysis Section */}
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                AI Analysis
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAnalyzeJob}
                disabled={isAnalyzing}
                className="hover:bg-gray-100 text-gray-900 transition-colors"
              >
                {isAnalyzing ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.sparkles className="mr-2 h-4 w-4" />
                )}
                {aiAnalysis ? "Re-analyze" : "Analyze"}
              </Button>
            </div>
            {showAnalysis && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                {aiAnalysis ? (
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {aiAnalysis}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">No analysis yet</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Details
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Date Applied
                </h4>
                <p className="text-gray-900">
                  {new Date(job.dateApplied).toLocaleDateString()}
                </p>
              </div>

              {job.salary && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Salary Range
                  </h4>
                  <p className="text-gray-900">{job.salary}</p>
                </div>
              )}

              {job.contact && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact</h4>
                  <a
                    href={`mailto:${job.contact}`}
                    className="text-blue-600 hover:underline"
                  >
                    {job.contact}
                  </a>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Job Posting
                </h4>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {job.url}
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="destructive"
              onClick={async () => {
                setIsDeleting(true);
                await fetch(`/api/jobs/${job.id}`, {
                  method: "DELETE",
                });
                router.push("/");
                router.refresh();
              }}
              disabled={isDeleting}
              className="w-full border-black text-black sm:w-auto"
            >
              {isDeleting ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
