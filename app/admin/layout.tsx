export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full py-8 md:py-10">
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}