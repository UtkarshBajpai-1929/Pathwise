import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_34%),linear-gradient(180deg,#fbfefc,#f5faf6)]">
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
}
