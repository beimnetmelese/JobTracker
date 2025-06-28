import Link from "next/link";
import { Icons } from "./icons";

interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.href}>
            <div className="flex items-center">
              {index > 0 && (
                <Icons.chevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
              <Link
                href={item.href}
                className={`text-sm font-medium ${
                  index === items.length - 1
                    ? "text-gray-500 pointer-events-none"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
