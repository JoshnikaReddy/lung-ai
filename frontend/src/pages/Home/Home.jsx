import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/common/Hero";
import Features from "../../components/common/Features";
import Workflow from "../../components/common/Workflow";
import Footer from "../../components/layout/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <Footer />
    </>
  );
}

export default Home;