"use client";

import { useState, type ReactNode } from "react";

interface ComponentPreviewProps {
  children: ReactNode;
  code?: string;
}

export function ComponentPreview({
  children,
  code,
}: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    if (!code) return;

    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="component-preview">
      <div className="component-preview-canvas">
        {children}
      </div>

      {code && (
        <div className="component-preview-code">
          <div className="component-preview-code-header">
            <span>Code</span>

            <button
              type="button"
              onClick={copyCode}
              className="component-copy-button"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <pre>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}