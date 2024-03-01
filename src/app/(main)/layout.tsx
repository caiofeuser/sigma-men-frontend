"use client";
import Footer from "@/components/Footer";

interface FooterProps {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: FooterProps) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
