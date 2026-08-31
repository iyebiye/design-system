import { Button } from "@design-system/ui";

export default function Home() {
  return (
    <main style={{ padding: "64px" }}>
      <h1>Design System</h1>

      <section style={{ marginTop: "48px" }}>
        <h2>Button</h2>

        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          <Button>Primary</Button>

          <Button variant="secondary">Secondary</Button>

          <Button variant="ghost">Ghost</Button>

          <Button variant="destructive">Destructive</Button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          <Button size="sm">Small</Button>

          <Button size="md">Medium</Button>

          <Button size="lg">Large</Button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          <Button disabled>Disabled</Button>

          <Button loading>Loading</Button>
        </div>
      </section>

      <section style={{ marginTop: "48px" }}>
        <h2>States</h2>

        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          <Button>Default</Button>

          <Button disabled>Disabled</Button>

          <Button loading>Loading</Button>
        </div>
      </section>
    </main>
  );
}
