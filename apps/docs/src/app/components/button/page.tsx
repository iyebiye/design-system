"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import {
  Button,
  type ButtonSize,
  type ButtonVariant,
} from "@design-system/ui";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PreviewSelect, PreviewToggle } from "@/components/docs/preview-control";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsLayout } from "@/components/docs/docs-layout";

type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type ButtonStateProps = {
  disabled?: boolean;
  loading?: boolean;
};

const variants: ButtonVariant[] = [
  "primary",
  "secondary",
  "ghost",
  "destructive",
];

const sizes: ButtonSize[] = ["sm", "md", "lg"];

function DocsAccordion({
                         title,
                         description,
                         children,
                         defaultOpen = false,
                       }: {
  title: string;
  description: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
      <details className="docs-accordion" open={defaultOpen || undefined}>
        <summary className="docs-accordion-summary">
        <span className="docs-accordion-copy">
          <span className="docs-accordion-title">{title}</span>
          <span className="docs-accordion-description">{description}</span>
        </span>

          <span className="docs-accordion-chevron" aria-hidden="true">
          <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
          >
            <path d="m7 10 5 5 5-5" />
          </svg>
        </span>
        </summary>

        <div className="docs-accordion-content">{children}</div>
      </details>
  );
}

function DocsTabs({
                    label,
                    tabs,
                  }: {
  label: string;
  tabs: TabItem[];
}) {
  const id = useId();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  }

  return (
      <section className="docs-tab-section" aria-label={label}>
        <div className="docs-tabs" role="tablist" aria-label={label}>
          {tabs.map((tab) => (
              <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[tab.id] = node;
                  }}
                  id={`${id}-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${id}-panel-${tab.id}`}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  className="docs-tab"
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={handleKeyDown}
              >
                {tab.label}
              </button>
          ))}
        </div>

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
              <div
                  key={tab.id}
                  id={`${id}-panel-${tab.id}`}
                  role="tabpanel"
                  aria-labelledby={`${id}-tab-${tab.id}`}
                  className="docs-tab-panel"
                  tabIndex={0}
                  hidden={!isActive}
              >
                {tab.content}
              </div>
          );
        })}
      </section>
  );
}

function SectionHeading({
                          title,
                          description,
                        }: {
  title: string;
  description: string;
}) {
  return (
      <div className="docs-section-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
  );
}


function ExampleRow({
                      title,
                      description,
                      code,
                      children,
                    }: {
  title: string;
  description: string;
  code: string;
  children: ReactNode;
}) {
  return (
      <article className="button-example-card">
        <div className="button-example-heading">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div className="button-example-preview">
          {children}
        </div>

        <details className="button-example-code">
          <summary>Show code</summary>
          <pre>
          <code>{code}</code>
        </pre>
        </details>
      </article>
  );
}


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

  const introTabs: TabItem[] = [
    {
      id: "preview",
      label: "Interactive preview",
      content: (
          <section className="docs-section">
            <SectionHeading
                title="Interactive preview"
                description="Change the properties to explore the Button component. The code updates with your selections."
            />
            <ComponentPreview
                code={buttonCode}
                controls={
                  <>
                    <PreviewSelect
                        label="Variant"
                        value={variant}
                        options={variants}
                        onChange={(value) => setVariant(value as ButtonVariant)}
                    />
                    <PreviewSelect
                        label="Size"
                        value={size}
                        options={sizes}
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
      ),
    },
    {
      id: "props",
      label: "Props",
      content: (
          <section className="docs-section">
            <SectionHeading
                title="Props"
                description="Properties supported by the current implementation. Native HTML button attributes are also supported."
            />
            <div className="docs-table-wrap">
              <table className="docs-table docs-props-table">
                <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td colSpan={4}><strong>Required</strong></td>
                </tr>
                <tr>
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td>Required</td>
                  <td>
                    Visible button content, usually an action label such as
                    “Save changes”. This provides the accessible name by default.
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}><strong>Optional</strong></td>
                </tr>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>"primary" | "secondary" | "ghost" | "destructive"</code></td>
                  <td><code>"primary"</code></td>
                  <td>Visual treatment based on the importance and intent of the action.</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>"sm" | "md" | "lg"</code></td>
                  <td><code>"md"</code></td>
                  <td>Controls button height, padding, and text size.</td>
                </tr>
                <tr>
                  <td><code>loading</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Displays a spinner, sets <code>aria-busy</code>, and disables the button while loading.</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Applies the native disabled state and prevents activation.</td>
                </tr>
                <tr>
                  <td><code>startIcon</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>undefined</code></td>
                  <td>Optional content before the label. Hidden while loading.</td>
                </tr>
                <tr>
                  <td><code>endIcon</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>undefined</code></td>
                  <td>Optional content after the label. Hidden while loading.</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Adds a CSS class alongside the component styles.</td>
                </tr>
                <tr>
                  <td colSpan={4}><strong>Native button attributes</strong></td>
                </tr>
                <tr>
                  <td><code>onClick</code></td>
                  <td><code>MouseEventHandler</code></td>
                  <td><code>undefined</code></td>
                  <td>Handles click events.</td>
                </tr>
                <tr>
                  <td><code>type</code></td>
                  <td><code>"button" | "submit" | "reset"</code></td>
                  <td><code>"button"</code></td>
                  <td>Specifies form behavior.</td>
                </tr>
                <tr>
                  <td><code>form</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Associates the button with a form by its ID.</td>
                </tr>
                <tr>
                  <td><code>name</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Name submitted with a form, when applicable.</td>
                </tr>
                <tr>
                  <td><code>value</code></td>
                  <td><code>string | number | readonly string[]</code></td>
                  <td><code>undefined</code></td>
                  <td>Value submitted with a form, when applicable.</td>
                </tr>
                <tr>
                  <td><code>aria-*</code> / <code>data-*</code></td>
                  <td>Applicable HTML attributes</td>
                  <td>Varies</td>
                  <td>Supports accessibility metadata and custom data attributes.</td>
                </tr>
                </tbody>
              </table>
            </div>
          </section>
      ),
    },
    {
      id: "accessibility",
      label: "Accessibility",
      content: (
          <section className="docs-section">
            <SectionHeading
                title="Accessibility"
                description="Validate the rendered button against WCAG 2.2 Level AA across variants, states, and themes."
            />

            <section className="docs-subsection">
              <h3>Color contrast</h3>
              <p className="docs-body-copy">
                Measure the final rendered colors in default, hover, and pressed
                states. Do not rely on token values alone if opacity or overlays
                affect the result.
              </p>
              <div className="docs-table-wrap">
                <table className="docs-table">
                  <thead>
                  <tr>
                    <th>Requirement</th>
                    <th>Minimum</th>
                    <th>Guidance</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td><strong>Text label</strong></td>
                    <td>4.5:1</td>
                    <td>
                      Normal-sized button text must contrast with its background
                      in every applicable state. Large text has a 3:1 minimum.{" "}
                      <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" target="_blank" rel="noreferrer">
                        WCAG 1.4.3, Contrast (Minimum)
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Essential graphical content</strong></td>
                    <td>3:1</td>
                    <td>
                      Meaningful icons, graphical indicators, and necessary
                      control boundaries must contrast with adjacent colors.
                      Decorative icons do not need a separate contrast check.{" "}
                      <a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" target="_blank" rel="noreferrer">
                        WCAG 1.4.11, Non-text Contrast
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Keyboard focus indicator</strong></td>
                    <td>Verify visibility and contrast</td>
                    <td>
                      Focus must be visible. WCAG 2.2 also defines a minimum
                      focus appearance criterion at Level AA. Test the indicator
                      against adjacent colors and ensure it is not obscured.{" "}
                      <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html" target="_blank" rel="noreferrer">
                        WCAG 2.4.7, Focus Visible
                      </a>
                      {" · "}
                      <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html" target="_blank" rel="noreferrer">
                        WCAG 2.4.11, Focus Appearance
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Disabled appearance</strong></td>
                    <td>Contrast exemption applies</td>
                    <td>
                      Inactive controls are exempt from the cited text and
                      non-text contrast requirements. Keep disabled and enabled
                      states distinguishable, and use the native disabled
                      attribute when the action is unavailable.
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <p className="docs-body-copy">
                Check every variant and state. In particular, verify the
                destructive hover color and the focus outline against both the
                button and the surrounding page.
              </p>
            </section>

            <section className="docs-subsection">
              <h3>Keyboard and interaction</h3>
              <ul className="docs-guidance-list">
                <li>Native buttons must be reachable with Tab and activated with Enter or Space.</li>
                <li>Keep a visible focus indicator. Do not remove the outline without an accessible replacement.</li>
                <li>Use the native <code>disabled</code> attribute when an action is unavailable. Disabled buttons are skipped in the normal tab order.</li>
                <li>Loading disables this component while the action is in progress. For important asynchronous actions, announce success or errors separately.</li>
                <li>Do not use a button for navigation when a link is the appropriate semantic element.</li>
              </ul>
            </section>

            <section className="docs-subsection">
              <h3>Accessible names and icons</h3>
              <ul className="docs-guidance-list">
                <li>Use concise labels that explain the action, such as “Save changes” or “Delete account”.</li>
                <li>Keep decorative icons hidden from assistive technology when they add no information beyond the label.</li>
                <li>The current component uses <code>children</code> as its visible content. It does not provide a dedicated icon-only mode or a separate accessible-label prop.</li>
                <li>Keep the button’s accessible name stable while loading. The spinner is marked decorative and the visible label remains present.</li>
              </ul>
            </section>
          </section>
      ),
    },
  ];

  const visualTabs: TabItem[] = [
    {
      id: "variants",
      label: "Variants",
      content: (
          <section className="docs-section">
            <SectionHeading
                title="Variants"
                description="Compare all four variants across default, disabled, and loading states. Use each style according to the action's importance."
            />

            <ComponentPreview
                code={`{/* Default */}
<Button variant="primary">Continue</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Learn more</Button>
<Button variant="destructive">Delete</Button>

{/* Disabled */}
<Button variant="primary" disabled>Continue</Button>
<Button variant="secondary" disabled>Cancel</Button>
<Button variant="ghost" disabled>Learn more</Button>
<Button variant="destructive" disabled>Delete</Button>

{/* Loading */}
<Button variant="primary" loading>Continue</Button>
<Button variant="secondary" loading>Cancel</Button>
<Button variant="ghost" loading>Learn more</Button>
<Button variant="destructive" loading>Delete</Button>`}
            >
              <div className="button-state-comparison">
                {(
                    [
                      {
                        label: "Default",
                        description: "Ready to use",
                        props: {},
                      },
                      {
                        label: "Disabled",
                        description: "Unavailable",
                        props: { disabled: true },
                      },
                      {
                        label: "Loading",
                        description: "In progress",
                        props: { loading: true },
                      },
                    ] satisfies {
                      label: string;
                      description: string;
                      props: ButtonStateProps;
                    }[]
                ).map((state) => (
                    <div className="button-state-row" key={state.label}>
                      <div className="button-state-label">
                        <strong>{state.label}</strong>
                        <span>{state.description}</span>
                      </div>
                      <div className="button-state-options">
                        {variants.map((item) => (
                            <div className="button-state-option" key={item}>
                              <Button variant={item} {...state.props}>
                                {item === "destructive"
                                    ? "Delete"
                                    : item === "secondary"
                                        ? "Cancel"
                                        : item === "ghost"
                                            ? "Learn more"
                                            : "Continue"}
                              </Button>
                              <span>{item}</span>
                            </div>
                        ))}
                      </div>
                    </div>
                ))}
              </div>
            </ComponentPreview>

            <ul className="docs-guidance-list">
              <li><strong>Primary:</strong> the main action in a section or flow.</li>
              <li><strong>Secondary:</strong> a supporting action.</li>
              <li><strong>Ghost:</strong> a lower-emphasis action.</li>
              <li><strong>Destructive:</strong> an action that deletes or significantly changes information.</li>
            </ul>
          </section>
      ),
    },
    {
      id: "sizes",
      label: "Sizes",
      content: (
          <section className="docs-section">
            <SectionHeading
                title="Sizes"
                description="Choose a size that fits the context while keeping labels readable and controls comfortable to interact with."
            />
            <ComponentPreview
                code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
            >
              <div className="button-size-row">
                {sizes.map((item) => (
                    <div className="button-variant-item" key={item}>
                      <Button size={item}>
                        {item === "sm" ? "Small" : item === "lg" ? "Large" : "Medium"}
                      </Button>
                      <span>{item}</span>
                    </div>
                ))}
              </div>
            </ComponentPreview>
            <p className="docs-body-copy">
              Choose sizes based on hierarchy and context. Check the actual
              interactive target size in the product where the button will appear.
            </p>
          </section>
      ),
    },

    {
      id: "examples",
      label: "Examples",
      content: (
          <section className="docs-section">
            <SectionHeading
                title="Examples"
                description="Explore common button patterns. Each example has its own preview and expandable code."
            />

            <div className="button-example-grid">
              <ExampleRow
                  title="Button with an icon"
                  description="Use an icon to reinforce a clear action label."
                  code={`<Button startIcon={<PlusIcon />}>
  Create project
</Button>`}
              >
                <Button startIcon={<span aria-hidden="true">＋</span>}>
                  Create project
                </Button>
              </ExampleRow>

              <ExampleRow
                  title="Messages"
                  description="Use a trailing count badge to show unread messages."
                  code={`<Button
  variant="primary"
  endIcon={<span className="docs-count-badge docs-badge-info">3</span>}
>
  Messages
</Button>`}
              >
                <Button
                    variant="primary"
                    endIcon={
                      <span className="docs-count-badge docs-badge-info">3</span>
                    }
                >
                  Messages
                </Button>
              </ExampleRow>

              <ExampleRow
                  title="Notifications"
                  description="Use a contrasting badge when a notification count needs attention."
                  code={`<Button
  variant="secondary"
  endIcon={<span className="docs-count-badge docs-badge-warning">12</span>}
>
  Notifications
</Button>`}
              >
                <Button
                    variant="secondary"
                    endIcon={
                      <span className="docs-count-badge docs-badge-warning">12</span>
                    }
                >
                  Notifications
                </Button>
              </ExampleRow>

              <ExampleRow
                  title="Updates"
                  description="Use a neutral status badge to highlight new content."
                  code={`<Button
  variant="ghost"
  endIcon={<span className="docs-status-badge docs-badge-neutral">New</span>}
>
  Updates
</Button>`}
              >
                <Button
                    variant="ghost"
                    endIcon={
                      <span className="docs-status-badge docs-badge-neutral">
                New
              </span>
                    }
                >
                  Updates
                </Button>
              </ExampleRow>

              <ExampleRow
                  title="Floating action buttons"
                  description="Use a compact, circular button for a frequent action. Elevation is applied through CSS in this example."
                  code={`<Button
  variant="primary"
  className="docs-floating-action-button docs-floating-button"
  aria-label="Create new item"
>
  <PlusIcon />
</Button>

<Button
  variant="secondary"
  className="docs-floating-action-button docs-floating-button"
  aria-label="Create new item"
>
  <PlusIcon />
</Button>

<Button
  variant="ghost"
  className="docs-floating-action-button docs-floating-button"
  aria-label="Create new item"
>
  <PlusIcon />
</Button>

<Button
  variant="destructive"
  className="docs-floating-action-button docs-floating-button"
  aria-label="Create new item"
>
  <PlusIcon />
</Button>`}
              >
                <div className="button-example-actions">
                  <Button
                      variant="primary"
                      className="docs-floating-action-button docs-floating-button"
                      aria-label="Create new item"
                  >
                    <span aria-hidden="true">+</span>
                  </Button>
                  <Button
                      variant="secondary"
                      className="docs-floating-action-button docs-floating-button"
                      aria-label="Create new item"
                  >
                    <span aria-hidden="true">+</span>
                  </Button>
                  <Button
                      variant="ghost"
                      className="docs-floating-action-button docs-floating-button"
                      aria-label="Create new item"
                  >
                    <span aria-hidden="true">+</span>
                  </Button>
                  <Button
                      variant="destructive"
                      className="docs-floating-action-button docs-floating-button"
                      aria-label="Create new item"
                  >
                    <span aria-hidden="true">+</span>
                  </Button>
                </div>
              </ExampleRow>

              <ExampleRow
                  title="Icon actions"
                  description="Use a familiar icon for compact actions. Each icon-only button needs an accessible name."
                  code={`<Button variant="primary" aria-label="Create new item">
  <PlusIcon />
</Button>

<Button variant="secondary" aria-label="Edit item">
  <EditIcon />
</Button>

<Button variant="ghost" aria-label="Download item">
  <DownloadIcon />
</Button>

<Button variant="destructive" aria-label="Delete item">
  <TrashIcon />
</Button>`}
              >
                <div className="button-example-actions">
                  <Button variant="primary" aria-label="Create new item">
                    <span aria-hidden="true">＋</span>
                  </Button>
                  <Button variant="secondary" aria-label="Edit item">
                    <span aria-hidden="true">✎</span>
                  </Button>
                  <Button variant="ghost" aria-label="Download item">
                    <span aria-hidden="true">↓</span>
                  </Button>
                  <Button variant="destructive" aria-label="Delete item">
                    <span aria-hidden="true">×</span>
                  </Button>
                </div>
              </ExampleRow>

              <ExampleRow
                  title="Full-width action"
                  description="Use a full-width button for a prominent action in a narrow layout or form."
                  code={`<Button className="docs-full-width-button">
  Continue
</Button>`}
              >
                <Button className="docs-full-width-button">Continue</Button>
              </ExampleRow>

              <ExampleRow
                  title="Form submission"
                  description="Use the submit type when the button submits a form."
                  code={`<form onSubmit={handleSubmit}>
  <Button type="submit">Save changes</Button>
</form>`}
              >
                <form
                    className="button-example-form"
                    onSubmit={(event) => event.preventDefault()}
                >
                  <Button type="submit">Save changes</Button>
                </form>
              </ExampleRow>

              <ExampleRow
                  title="Loading state"
                  description="Show progress during an operation. The component disables itself while loading."
                  code={`<Button loading>Saving changes</Button>`}
              >
                <Button loading>Saving changes</Button>
              </ExampleRow>

              <ExampleRow
                  title="Destructive action"
                  description="Reserve this variant for actions with significant consequences."
                  code={`<Button variant="destructive">
  Delete project
</Button>`}
              >
                <Button variant="destructive">Delete project</Button>
              </ExampleRow>
            </div>
          </section>
      ),
    },
  ];

  const guidanceTabs: TabItem[] = [
    {
      id: "anatomy",
      label: "Anatomy",
      content: (
          <section className="docs-section">
            <SectionHeading
                title="Anatomy"
                description="The elements that make up a button."
            />
            <div className="docs-table-wrap">
              <table className="docs-table">
                <thead>
                <tr>
                  <th>Element</th>
                  <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Icon</td>
                  <td>A leading icon that reinforces the label, like a trash icon on a Delete button.</td>
                </tr>
                <tr>
                  <td>Label</td>
                  <td><strong>Required:</strong> The visible text describing the action. Also used as the accessible name.</td>
                </tr>
                <tr>
                  <td>End content</td>
                  <td>A trailing badge or icon after the label, like a notification count or dropdown arrow.</td>
                </tr>
                <tr>
                  <td>Spinner</td>
                  <td>Replaces the icon during loading to show the action is in progress.</td>
                </tr>
                </tbody>
              </table>
            </div>
          </section>
      ),
    },
    {
      id: "usage",
      label: "Usage",
      content: (
          <section className="docs-section">
            <SectionHeading
                title="Usage"
                description="Import Button from the UI package and connect it to an action."
            />
            <ComponentPreview
                code={`import { Button } from "@design-system/ui";

export function SaveButton() {
  return (
    <Button onClick={() => console.log("Saved")}>
      Save changes
    </Button>
  );
}`}
            >
              <Button onClick={() => {}}>Save changes</Button>
            </ComponentPreview>
            <p className="docs-body-copy">
              Use native button attributes such as <code>onClick</code> and
              <code> type</code> to connect the component to the surrounding flow.
            </p>
          </section>
      ),
    },
    {
      id: "best-practices",
      label: "Best practices",
      content: (
          <section className="docs-section">
            <SectionHeading
                title="Best practices"
                description="Make actions clear, predictable, and accessible."
            />
            <div className="docs-table-wrap">
              <table className="docs-table docs-best-practices-table">
                <thead>
                <tr>
                  <th>Guidance</th>
                  <th>Practices</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td><span className="docs-guidance-badge is-do">Do</span></td>
                  <td>Reserve primary for the single most important action in the view. Use secondary or ghost for everything else based on emphasis.</td>
                </tr>
                <tr>
                  <td><span className="docs-guidance-badge is-do">Do</span></td>
                  <td>Write labels that describe the action (“Save changes”, “Delete account”, “Send invite”), not vague labels like “OK” or “Click here”.</td>
                </tr>
                <tr>
                  <td><span className="docs-guidance-badge is-do">Do</span></td>
                  <td>Show a loading state for actions that take time, like saving or submitting, so the user knows it is working.</td>
                </tr>
                <tr>
                  <td><span className="docs-guidance-badge is-do">Do</span></td>
                  <td>Always provide a label for icon-only buttons so screen readers can announce what the button does. Add a tooltip for sighted users.</td>
                </tr>
                <tr>
                  <td><span className="docs-guidance-badge is-do">Do</span></td>
                  <td>Use a dedicated icon-only button component if your design system provides one. It should be documented separately from Button.</td>
                </tr>
                <tr>
                  <td><span className="docs-guidance-badge is-dont">Don't</span></td>
                  <td>Place more than one primary button in the same view when doing so dilutes the visual hierarchy.</td>
                </tr>
                <tr>
                  <td><span className="docs-guidance-badge is-dont">Don't</span></td>
                  <td>Use the destructive variant without an appropriate confirmation or safeguard for irreversible actions like deleting data.</td>
                </tr>
                <tr>
                  <td><span className="docs-guidance-badge is-dont">Don't</span></td>
                  <td>Use a button for navigation. If it only takes the user to another page, use a link instead. Buttons are for actions like saving, deleting, or submitting.</td>
                </tr>
                </tbody>
              </table>
            </div>
          </section>
      ),
    },
  ];

  return (
      <DocsLayout>
        <DocsHeader
            eyebrow="Components"
            title="Button"
            description="Buttons allow users to perform actions and make choices. Use them to trigger an action, submit information, or move a user through a flow."
        />

        <section className="docs-section" id="overview">
          <SectionHeading
              title="Overview"
              description="Choose a button style based on the importance of the action. Keep labels clear, concise, and focused on what happens next."
          />
        </section>

        <DocsAccordion
            title="Explore the component"
            description="Interactive preview, properties, and accessibility."
            defaultOpen
        >
          <DocsTabs label="Explore the component" tabs={introTabs} />
        </DocsAccordion>

        <DocsAccordion
            title="Variants and examples"
            description="Compare variants, sizes, and practical button patterns."
        >
          <DocsTabs label="Variants and examples" tabs={visualTabs} />
        </DocsAccordion>

        <DocsAccordion
            title="Usage guidelines"
            description="Understand the component anatomy, usage, and best practices."
        >
          <DocsTabs label="Usage guidelines" tabs={guidanceTabs} />
        </DocsAccordion>
      </DocsLayout>
  );
}
