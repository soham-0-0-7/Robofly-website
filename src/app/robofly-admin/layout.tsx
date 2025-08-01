// app/special/layout.tsx
export default function SpecialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // no layout at all
}
