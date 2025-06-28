import Link from "next/link";
import { Icons } from "./icons";

export default function BackButton() {
  return (
    <Link
      href="/dashboard"
      className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      <Icons.chevronLeft className="h-5 w-5 mr-1" />
      Back
    </Link>
  );
}
