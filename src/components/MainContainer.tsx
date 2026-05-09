import About from './About';
import Awards from './Awards';
import Career from './Career';
import Contact from './Contact';
import CustomCursor from './CustomCursor';
import Landing from './Landing';
import Navbar from './Navbar';
import Publications from './Publications';
import ResumeFab from './ResumeFab';
import SocialRail from './SocialRail';
import TechStack from './TechStack';
import WhatIDo from './WhatIDo';
import Work from './Work';

export default function MainContainer() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <SocialRail />
      <main>
        <Landing />
        <About />
        <WhatIDo />
        <TechStack />
        <Career />
        <Publications />
        <Work />
        <Awards />
        <Contact />
      </main>
      <ResumeFab />
    </>
  );
}
