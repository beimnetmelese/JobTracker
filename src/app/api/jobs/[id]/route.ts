import { NextResponse } from "next/server";
import { JobApplication } from "@/app/lib/constants";

// Mock data
const mockJobs: JobApplication[] = [
  {
    id: '1',
    company: 'TechCorp',
    position: 'Frontend Developer',
    url: 'https://example.com/job/1',
    salary: '$90,000 - $120,000',
    status: 'interview',
    description: 'Looking for an experienced React developer...',
    dateApplied: '2023-05-15',
    notes: 'Second interview scheduled for next week',
    contact: 'recruiter@techcorp.com',
  },
  {
    id: '2',
    company: 'TechCorp',
    position: 'Frontend Developer',
    url: 'https://example.com/job/2',
    salary: '$90,000 - $120,000',
    status: 'applied',
    description: 'Looking for an experienced React developer...',
    dateApplied: '2023-05-15',
    notes: 'Second interview scheduled for next week',
    contact: 'recruiter@techcorp.com',
  },
  {
    id: '3',
    company: 'TechCorp',
    position: 'Frontend Developer',
    url: 'https://example.com/job/3',
    salary: '$90,000 - $120,000',
    status: 'offer',
    description: 'Looking for an experienced React developer...',
    dateApplied: '2023-05-15',
    notes: 'Second interview scheduled for next week',
    contact: 'recruiter@techcorp.com',
  },
];

export async function GET(req: Request, { params }: { params: Record<string, string> }) {
  const id = params.id;
  const job = mockJobs.find((job) => job.id === id);

  if (!job) {
    return NextResponse.json({ message: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
