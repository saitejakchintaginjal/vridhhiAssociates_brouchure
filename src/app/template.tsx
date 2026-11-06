// Re-mounts on every navigation, which replays the water wipe and the page entrance.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="wipe wipe-navy" aria-hidden="true" />
      <div className="wipe wipe-aqua" aria-hidden="true" />
      <div className="page-in">{children}</div>
    </>
  );
}
