import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="mb-6 rounded-full bg-blue-100 p-6">
        <FileQuestion className="h-12 w-12 text-blue-600" />
      </div>
      
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
        Page Not Found
      </h1>
      
      <p className="mb-8 max-w-md text-gray-600">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}