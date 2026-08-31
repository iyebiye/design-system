import { Button } from "@design-system/ui";
import { DocsLayout } from "@/components/docs/docs-layout";

export default function Home() {
  return (
    <DocsLayout>
      <div>
        <p
          style={{
            margin: 0,
            color: "var(--ds-color-text-muted)",
            fontSize: "14px",
          }}
        >
          Design System
        </p>

        <h1
          style={{
            marginTop: "12px",
            marginBottom: "16px",
            fontSize: "48px",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Build better interfaces.
        </h1>

        <p
          style={{
            maxWidth: "600px",
            margin: 0,
            color: "var(--ds-color-text-secondary)",
            fontSize: "18px",
            lineHeight: 1.6,
          }}
        >
          A flexible design system for designers and
          developers. Use the components in Figma,
          install them in your application, or copy
          the source directly.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          <Button>
            Explore components
          </Button>

          <Button variant="secondary">
            Get started
          </Button>
        </div>
      </div>
    </DocsLayout>
  );
}