"use client";

import { useState } from "react";

import { Button, type ButtonSize, type ButtonVariant } from "@design-system/ui";

import { ComponentPreview } from "@/components/docs/component-preview";
import {
  PreviewSelect,
  PreviewToggle,
} from "@/components/docs/preview-control";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsLayout } from "@/components/docs/docs-layout";

export default function ButtonPage() {
  const [variant, setVariant] = useState<ButtonVariant>("primary");

  const [size, setSize] = useState<ButtonSize>("md");

  const [loading, setLoading] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const buttonCode = `<Button${variant !== "primary" ? ` variant="${variant}"` : ""}${size !== "md" ? ` size="${size}"` : ""}${loading ? " loading" : ""}${disabled ? " disabled" : ""}>
  Continue
</Button>`;

  function resetPlayground() {
    setVariant("primary");
    setSize("md");
    setLoading(false);
    setDisabled(false);
  }

  return (
    <DocsLayout>
      <DocsHeader
        eyebrow="Components"
        title="Button"
        description="Buttons allow users to perform actions and make choices."
      />

      <section className="docs-section">
        <div className="docs-section-header">
          <h2>Try it</h2>

          <p>Explore the different Button variants, sizes, and states.</p>
        </div>

        <ComponentPreview
          code={buttonCode}
          controls={
            <>
              <PreviewSelect
                label="Variant"
                value={variant}
                options={["primary", "secondary", "ghost", "destructive"]}
                onChange={(value) => setVariant(value as ButtonVariant)}
              />

              <PreviewSelect
                label="Size"
                value={size}
                options={["sm", "md", "lg"]}
                onChange={(value) => setSize(value as ButtonSize)}
              />

              <PreviewToggle
                label="Loading"
                checked={loading}
                onChange={setLoading}
              />

              <PreviewToggle
                label="Disabled"
                checked={disabled}
                onChange={setDisabled}
              />

              <button
                type="button"
                className="preview-reset-button"
                onClick={resetPlayground}
              >
                Reset
              </button>
            </>
          }
        >
          <Button
            variant={variant}
            size={size}
            loading={loading}
            disabled={disabled}
          >
            Continue
          </Button>
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
    <Button>
      Continue
    </Button>
  );
}`}
        >
          <Button>Continue</Button>
        </ComponentPreview>
      </section>
    </DocsLayout>
  );
}
