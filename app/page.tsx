import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NewArrivals from "@/components/NewArrivals";
import Testimonials from "@/components/Testimonials";
import Touchs from "@/components/Touchs";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <NewArrivals />
      <Testimonials />
      <Touchs />
      <Footer />
    </div>
  );
}
