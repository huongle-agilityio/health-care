export default function Layout({
  children,
  test,
}: {
  children: React.ReactNode;
  test: React.ReactNode;
}) {
  return (
    <>
      {children}
      {test}
    </>
  );
}
