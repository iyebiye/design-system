import { Button } from "@design-system/ui";
import { ComponentPreview } from "@/components/docs/component-preview";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsLayout } from "@/components/docs/docs-layout";

export default function ButtonPage() {
  return (
    <DocsLayout>
      <DocsHeader
        eyebrow="Components"
        title="Button"
        description="Buttons allow users to perform actions and make choices."
      />

      <section className="docs-section">
        <div className="docs-section-header">
          <h2>Variants</h2>
          <p>
            Use different variants to communicate the
            importance and context of an action.
          </p>
        </div>

        <ComponentPreview
          code={`<Button variant="primary">
  Primary
</Button>

<Button variant="secondary">
  Secondary
</Button>

<Button variant="ghost">
  Ghost
</Button>

<Button variant="destructive">
  Destructive
</Button>`}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button variant="primary">
              Primary
            </Button>

            <Button variant="secondary">
              Secondary
            </Button>

            <Button variant="ghost">
              Ghost
            </Button>

            <Button variant="destructive">
              Destructive
            </Button>
          </div>
        </ComponentPreview>
      </section>

      <section className="docs-section">
        <div className="docs-section-header">
          <h2>Sizes</h2>
          <p>
            Choose a button size based on the surrounding
            interface and hierarchy.
          </p>
        </div>

        <ComponentPreview
          code={`<Button size="sm">
  Small
</Button>

<Button size="md">
  Medium
</Button>

<Button size="lg">
  Large
</Button>`}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button size="sm">
              Small
            </Button>

            <Button size="md">
              Medium
            </Button>

            <Button size="lg">
              Large
            </Button>
          </div>
        </ComponentPreview>
      </section>

      <section className="docs-section">
        <div className="docs-section-header">
          <h2>States</h2>
          <p>
            Buttons support disabled and loading states.
          </p>
        </div>

        <ComponentPreview
          code={`<Button disabled>
  Disabled
</Button>

<Button loading>
  Loading
</Button>`}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button disabled>
              Disabled
            </Button>

            <Button loading>
              Loading
            </Button>
          </div>
        </ComponentPreview>
      </section>

      <section className="docs-section">
        <div className="docs-section-header">
          <h2>Usage</h2>
        </div>

        <ComponentPreview
          code={`import { Button } from "@design-system/ui";

export function Example() {
  return (
    <Button variant="primary">
      Continue
    </Button>
  );
}`}
        >
          <Button>
            Continue
          </Button>
        </ComponentPreview>
      </section>
    </DocsLayout>
  );
}