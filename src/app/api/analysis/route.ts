import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: "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",  // Get from https://console.groq.com
});

export async function POST(request: Request) {
  const { jobDescription } = await request.json();

  try {
    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192",  // Groq's fastest model
      messages: [
        {
          role: "system",
          content: "You are a career advisor. Analyze job descriptions with: 1. Key skills 2. Red flags 3. Salary negotiation tips"
        },
        {
          role: "user",
          content: `Analyze this job description:\n\n${jobDescription}`
        }
      ],
      temperature: 0.7,
      max_tokens: 512,  // Higher limit than OpenAI
    });

    return NextResponse.json({
      analysis: response.choices[0].message.content
    });

  } catch (error) {
    console.error('Groq API error:', error);
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}