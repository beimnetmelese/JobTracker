import Link from "next/link";
import { Button } from "./components/button";
import { Icons } from "./components/icons";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      {/* Hero Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Smarter Job Hunting
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Track applications, analyze job postings with AI, and land your dream
          role faster.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="shadow-lg">
            <Link href="/dashboard">
              <Icons.rocket className="mr-2 h-5 w-5" />
              Get Started
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">
              <Icons.info className="mr-2 h-5 w-5" />
              Learn More
            </Link>
          </Button>
        </div>

        {/* Animated App Preview */}
        <div className="mt-20 relative shadow-xl rounded-2xl overflow-hidden border border-gray-200 bg-white">
          <img
            src="/app-preview.png"
            alt="App Dashboard Preview"
            className="w-full h-auto animate-fade-in"
          />
          <div className="absolute top-0 left-0 bg-gradient-to-br from-white/60 to-transparent w-full h-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Powerful Features
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Icons.ai className="h-10 w-10 text-blue-600" />,
                title: "AI Job Analysis",
                description:
                  "Get instant insights on skills needed and potential red flags in job descriptions.",
              },
              {
                icon: <Icons.track className="h-10 w-10 text-purple-600" />,
                title: "Application Tracking",
                description:
                  "Visual dashboard to track all your applications in one place.",
              },
              {
                icon: <Icons.insights className="h-10 w-10 text-indigo-600" />,
                title: "Smart Analytics",
                description:
                  "Stats on your application success rates and response times.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl border hover:shadow-xl transition-all"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "Helped me land my dream job in just 3 weeks!",
              "The AI analysis saved me hours.",
              "I feel more confident applying now.",
            ].map((quote, i) => (
              <blockquote
                key={i}
                className="bg-white shadow p-6 rounded-xl text-gray-700"
              >
                “{quote}”
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to transform your job search?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of users who found their dream jobs faster with our
            tools.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
          >
            <Link href="/dashboard">
              Start Tracking Now - It's Free
              <Icons.arrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
