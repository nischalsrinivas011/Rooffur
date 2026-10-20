import Link from "next/link";
import { primaryNavigation } from "@/config/navigation";

/** Desktop section navigation (E1 §3–§4). Server-rendered links to homepage anchors. */
export function PrimaryNavigation() {
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={
                "inline-flex min-h-10 items-center rounded-md px-2.5 text-sm font-semibold whitespace-nowrap xl:px-3 " +
                "text-neutral-600 transition-colors duration-(--duration-fast) ease-standard " +
                "hover:bg-neutral-100 hover:text-navy-600 " +
                // Light-on-dark tone while the header is over the hero.
                "group-data-[header-state=transparent]/header:text-white/85 " +
                "group-data-[header-state=transparent]/header:hover:bg-white/10 group-data-[header-state=transparent]/header:hover:text-white"
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
