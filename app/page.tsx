import Image from "next/image";
import SchoolHero from "../components/clients/SchoolHero"
import FeaturesScroll from "@/components/clients/FeaturesScroll";
import About from "../components/clients/About"
import AreasOfExpertise from "@/components/clients/AreasOfExpertise";
import Navbar from "@/components/clients/Navbar";
import Intro from "@/components/clients/Intro";
import Imagesgallery from "@/components/clients/Images-gallery";
import StudentLife from "@/components/clients/Studentlife";
import YourSchool from "@/components/clients/YourSchool";
import Achievements from "@/components/clients/Achievements";

import Faqs from "@/components/clients/Faqs";




export default function Home() {
  return (
  <div>
    {/* <Navbar /> */}
    <SchoolHero />
    <Intro />
     <YourSchool />
    <StudentLife />
    
    
     
    <About />
    <AreasOfExpertise />
    <Achievements />
    <Faqs />

    
  </div>
  );
}
