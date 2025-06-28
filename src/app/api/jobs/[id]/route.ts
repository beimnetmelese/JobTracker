import { NextResponse } from "next/server";
import { JobApplication } from "@/app/lib/constants";


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
    url: 'https://example.com/job/1',
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
    url: 'https://example.com/job/1',
    salary: '$90,000 - $120,000',
    status: 'offer',
    description: 'Looking for an experienced React developer...',
    dateApplied: '2023-05-15',
    notes: 'Second interview scheduled for next week',
    contact: 'recruiter@techcorp.com',
  },
];

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const job = mockJobs.find((job) => job.id === params.id);

  if (!job) {
    return NextResponse.json({ message: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
