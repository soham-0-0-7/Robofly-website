export default function HomeLayout({ children, videosection }: { children: React.ReactNode; videosection: React.ReactNode }) {
  return (
    <div>
      {videosection}
      {children}
    </div>
  );
}
