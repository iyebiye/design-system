"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Foundations",
    items: [
      { label: "Colors", href: "/foundations/colors" },
      { label: "Typography", href: "/foundations/typography" },
      { label: "Spacing", href: "/foundations/spacing" },
      { label: "Themes", href: "/foundations/themes" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Button", href: "/components/button" },
      { label: "Input", href: "/components/input" },
      { label: "Textarea", href: "/components/textarea" },
      { label: "Select", href: "/components/select" },
      { label: "Checkbox", href: "/components/checkbox" },
      { label: "Radio", href: "/components/radio" },
      { label: "Switch", href: "/components/switch" },
      { label: "Avatar", href: "/components/avatar" },
      { label: "Badge", href: "/components/badge" },
      { label: "Card", href: "/components/card" },
      { label: "Alert", href: "/components/alert" },
      { label: "Table", href: "/components/table" },
      { label: "Modal", href: "/components/modal" },
      { label: "Dropdown", href: "/components/dropdown" },
      { label: "Tooltip", href: "/components/tooltip" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="docs-sidebar">
      <Link href="/" className="docs-logo">
        Design System
      </Link>

      <nav>
        {navigation.map((section) => (
          <div
            key={section.title}
            className="docs-nav-section"
          >
            <p className="docs-nav-title">
              {section.title}
            </p>

            <div className="docs-nav-items">
              {section.items.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`docs-nav-link ${
                      isActive ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}