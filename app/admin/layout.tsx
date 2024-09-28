export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full py-4 md:py-8">
      <div className="container mx-auto px-2 md:px-4">
        {children}
      </div>
    </section>
  );
}