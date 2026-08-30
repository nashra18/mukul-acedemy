import Image from "next/image";
import SchoolHero from "../components/clients/SchoolHero"
import FeaturesScroll from "@/components/clients/FeaturesScroll";
import About from "../components/clients/About"
import AreasOfExpertise from "@/components/clients/AreasOfExpertise";

export default function Home() {
  return (
  <div>
    <SchoolHero />
    <FeaturesScroll />
    <About />
    <AreasOfExpertise />
    
  </div>
  );
}
