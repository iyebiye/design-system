interface DocsHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function DocsHeader({
  eyebrow,
  title,
  description,
}: DocsHeaderProps) {
  return (
    <header className="docs-page-header">
      {eyebrow && (
        <p className="docs-page-eyebrow">
          {eyebrow}
        </p>
      )}

      <h1>{title}</h1>

      <p>{description}</p>
    </header>
  );
}