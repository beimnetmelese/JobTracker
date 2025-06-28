import { JobApplication } from '@/app/lib/constants';
import { NextResponse } from 'next/server';


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
    contact: 'recruiter@techcorp.com'
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
    contact: 'recruiter@techcorp.com'
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
    contact: 'recruiter@techcorp.com'
  },
  
];

export async function GET() {
  return NextResponse.json(mockJobs);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newJob = {
    id: (mockJobs.length + 1).toString(),
    ...data,
    dateApplied: new Date().toISOString().split('T')[0]
  };
  mockJobs.push(newJob);
  return NextResponse.json(newJob);
}