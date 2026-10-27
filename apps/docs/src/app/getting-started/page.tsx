
import { DocsLayout } from "@/components/docs/docs-layout";
import "./getting-started.css";
import Link from "next/link";

export default function GettingStartedPage() {
    return (
        <DocsLayout>
            <div className="components-page">
                <p className="components-eyebrow">Documentation</p>

                <h1 className="components-title">Get started</h1>

                <p className="components-description">
                    Install the core UI library and start building
                    with reusable design system components.
                </p>

                <section className="components-group">
                    <h2>1. Install the package</h2>
                    <p className="components-description">
                        From your application workspace, install the UI
                        package using pnpm.
                    </p>

                    <pre className="installation-code">
            <code>pnpm add @design-system/ui</code>
          </pre>
                </section>

                <section className="components-group">
                    <h2>2. Import a component</h2>
                    <pre className="installation-code">
            <code>{`import { Button } from "@design-system/ui";

export function Example() {
  return <Button>Continue</Button>;
}`}</code>
          </pre>
                </section>

                <section className="components-group">
                    <h2>3. Explore the components</h2>
                    <p className="components-description">
                        Browse the component overview to see available
                        components, examples, and usage guidance.
                    </p>
                    <Link className="installation-link" href="/components">
                        Explore components →
                    </Link>
                </section>

                <section className="components-group">
                    <h2>4. Open the Figma design system</h2>
                    <p className="components-description">
                        Use the Figma library to explore design resources.
                        Replace this placeholder with the actual library URL
                        when it is available.
                    </p>
                    <a
                        className="installation-link"
                        href="https://www.figma.com/design/REPLACE_WITH_FILE_ID"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Open Figma library ↗
                    </a>
                </section>
            </div>
        </DocsLayout>
    );
}
