import Navbar from "@/components/organisms/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
