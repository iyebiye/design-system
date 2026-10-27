
import Link from "next/link";
import { DocsLayout } from "@/components/docs/docs-layout";
import { Button } from "@design-system/ui";
import "./components.css";

const componentGroups = [
    {
        title: "Actions",
        description: "Components that help users perform actions.",
        components: [
            {
                name: "Button",
                description: "Trigger actions and submit decisions.",
                href: "/components/button",
                status: "Available",
            },
        ],
    },
    {
        title: "Forms and inputs",
        description: "Components for collecting user information.",
        components: [
            {
                name: "Input",
                description: "Allow users to enter and edit text.",
                href: "#",
                status: "Planned",
            },
        ],
    },
    {
        title: "Data display",
        description: "Components for presenting information.",
        components: [
            {
                name: "Avatar",
                description: "Represent a user or account.",
                href: "#",
                status: "Planned",
            },
            {
                name: "Table",
                description: "Display structured data in rows and columns.",
                href: "#",
                status: "Planned",
            },
        ],
    },
];

export default function ComponentsPage() {
    return (
        <DocsLayout>
            <div className="components-page">
                <p className="components-eyebrow">Design system</p>

                <h1 className="components-title">Components</h1>

                <p className="components-description">
                    Explore reusable components, learn how to use them, and access the
                    resources you need to build consistent interfaces.
                </p>

                <section className="components-resource-grid">
                    <article className="components-resource-card">
                        <span className="components-resource-label">DEVELOPERS</span>
                        <h2>Install the library</h2>
                        <p>
                            Get started with the core library and use the components in your
                            application.
                        </p>
                        <Link href="/getting-started">
                            Installation guide <span aria-hidden="true">→</span>
                        </Link>
                    </article>

                    <article className="components-resource-card">
                        <span className="components-resource-label">DESIGNERS</span>
                        <h2>Figma design system</h2>
                        <p>
                            Explore the design library, components, and design resources in
                            Figma.
                        </p>
                        <a
                            href="https://www.figma.com/design/REPLACE_WITH_FILE_ID"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open Figma library <span aria-hidden="true">↗</span>
                        </a>
                    </article>
                </section>

                <section className="components-library">
                    <div className="components-library-heading">
                        <h2>Component library</h2>
                        <p>Browse components by category.</p>
                    </div>

                    {componentGroups.map((group) => (
                        <section className="components-group" key={group.title}>
                            <div className="components-group-heading">
                                <h3>{group.title}</h3>
                                <p>{group.description}</p>
                            </div>

                            <div className="components-grid">
                                {group.components.map((component) => {
                                    const available = component.status === "Available";


                                    const content = (
                                        <>
                                            {component.name === "Button" && (
                                                <div
                                                    className="components-card-preview"
                                                    aria-label="Button variant preview"
                                                >
                                                    <Button variant="primary" size="sm">
                                                        Primary
                                                    </Button>
                                                    <Button variant="secondary" size="sm">
                                                        Secondary
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        Ghost
                                                    </Button>
                                                    <Button variant="destructive" size="sm">
                                                        Destructive
                                                    </Button>
                                                </div>
                                            )}

                                            <h4>{component.name}</h4>
                                            <p>{component.description}</p>

                                            <span className="components-card-link">
      {available ? "View documentation" : "Coming soon"}
                                                {available && <span aria-hidden="true"> →</span>}
    </span>
                                        </>
                                    );


                                    return available ? (
                                        <Link
                                            className="components-card"
                                            href={component.href}
                                            key={component.name}
                                        >
                                            {content}
                                        </Link>
                                    ) : (
                                        <div
                                            className="components-card is-disabled"
                                            key={component.name}
                                        >
                                            {content}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </section>

                <section className="components-plugin-card">
                    <div>
                        <span className="components-resource-label">DESIGN WORKFLOW</span>
                        <h2>Figma plugin</h2>
                        <p>
                            We're building a plugin to make working with the design system in
                            Figma easier. It will be available here when ready.
                        </p>
                    </div>

                    <span className="components-status is-planned">
            In development
          </span>
                </section>
            </div>
        </DocsLayout>
    );
}
