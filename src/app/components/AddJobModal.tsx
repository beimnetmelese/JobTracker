"use client";

import { useState } from "react";
import { JobStatus, JobApplication } from "../lib/constants";
import { Icons } from "./icons";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button } from "./button";

const validationSchema = yup.object({
  company: yup.string().required("Company is required"),
  position: yup.string().required("Position is required"),
  status: yup.string().required("Status is required"),
  description: yup.string().required("Description is required"),
  url: yup.string().url("Must be a valid URL").optional(),
  salary: yup.string().optional(),
  notes: yup.string().optional(),
  contact: yup.string().email("Must be a valid email").optional(),
  dateApplied: yup.string().required("Date applied is required"),
});

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: Omit<JobApplication, "id">) => void;
}

export default function AddJobModal({
  isOpen,
  onClose,
  onSubmit,
}: AddJobModalProps) {
  const formik = useFormik({
    initialValues: {
      company: "",
      position: "",
      status: "applied" as JobStatus,
      description: "",
      url: "",
      salary: "",
      notes: "",
      contact: "",
      dateApplied: new Date().toISOString().split("T")[0],
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Job Application
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <Icons.x className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 text-gray-900 transition-colors"
                aria-required="true"
              />
              {formik.touched.company && formik.errors.company && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.company}
                </p>
              )}
            </div>

            {/* Position */}
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700"
              >
                Position <span className="text-red-500">*</span>
              </label>
              <input
                id="position"
                name="position"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.position}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 text-gray-900"
                aria-required="true"
              />
              {formik.touched.position && formik.errors.position && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.position}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 text-gray-900"
                aria-required="true"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>
              {formik.touched.status && formik.errors.status && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.status}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 text-gray-900"
                aria-required="true"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.description}
                </p>
              )}
            </div>

            {/* URL */}
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                Job Posting URL
              </label>
              <input
                id="url"
                name="url"
                type="url"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.url}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 text-gray-900"
              />
              {formik.touched.url && formik.errors.url && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.url}</p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary Range
              </label>
              <input
                id="salary"
                name="salary"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salary}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 text-gray-900"
              />
              {formik.touched.salary && formik.errors.salary && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.salary}
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notes}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 text-gray-900"
              />
              {formik.touched.notes && formik.errors.notes && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.notes}
                </p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Email
              </label>
              <input
                id="contact"
                name="contact"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 text-gray-900"
              />
              {formik.touched.contact && formik.errors.contact && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.contact}
                </p>
              )}
            </div>

            {/* Date Applied */}
            <div>
              <label
                htmlFor="dateApplied"
                className="block text-sm font-medium text-gray-700"
              >
                Date Applied <span className="text-red-500">*</span>
              </label>
              <input
                id="dateApplied"
                name="dateApplied"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateApplied}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 text-gray-900"
                aria-required="true"
              />
              {formik.touched.dateApplied && formik.errors.dateApplied && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.dateApplied}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formik.isSubmitting ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.save className="mr-2 h-4 w-4" />
                )}
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
