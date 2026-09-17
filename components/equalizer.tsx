type EqualizerProps = {
  active?: boolean;
  label?: string;
  compact?: boolean;
};

export function Equalizer({ active = false, label, compact = false }: EqualizerProps) {
  return (
    <div className={`equalizer ${compact ? "equalizer--compact" : ""}`} aria-label={label}>
      <span className={active ? "is-active" : ""} />
      <span className={active ? "is-active" : ""} />
      <span className={active ? "is-active" : ""} />
      <span className={active ? "is-active" : ""} />
      <span className={active ? "is-active" : ""} />
    </div>
  );
}
