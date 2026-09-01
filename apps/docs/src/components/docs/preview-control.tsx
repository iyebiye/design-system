interface PreviewSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function PreviewSelect({
  label,
  value,
  options,
  onChange,
}: PreviewSelectProps) {
  return (
    <label className="preview-control">
      <span className="preview-control-label">{label}</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

interface PreviewToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function PreviewToggle({
  label,
  checked,
  onChange,
}: PreviewToggleProps) {
  return (
    <label className="preview-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />

      <span>{label}</span>
    </label>
  );
}