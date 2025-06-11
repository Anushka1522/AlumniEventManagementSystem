// import React from 'react';
// import Hero from '../components/Common/Hero';
// import WorkFlowSection from '../components/Common/WorkFlowSection';
// import Footer from '../components/Common/Footer'
// import AlumniImageSlider from '../components/Common/AlumniImageSlider'
// // import Header from '../components/Common/Header'
// // import LoginSelector from '../components/Common/LoginSelector'; // NEW component
// import './css/Home.css';
// import About from '../components/Common/About'

// const Home = () => {
//   return (
//     <div id='home'>   
//         {/* <Header />       */}
//         <Hero />          
//         <WorkFlowSection />        
//         <About/>
//         <AlumniImageSlider/>
//         <Footer/>
//     </div>
     
//   );
// };

// export default Home;

// import React from 'react';
// import Hero from '../components/Common/Hero';
// import WorkFlowSection from '../components/Common/WorkFlowSection';
// import Footer from '../components/Common/Footer';
// import AlumniImageSlider from '../components/Common/AlumniImageSlider';
// import About from '../components/Common/About';
// import './css/Home.css';

// const Home = () => {
//   return (
//     <div id='home'>
//       <section id="hero"><Hero /></section>
//       <section id="workflow"><WorkFlowSection /></section>
//       <section id="about"><About /></section>
//       <section id="gallery"><AlumniImageSlider /></section>
//       <section id="contact"><Footer /></section>
//     </div>
//   );
// };

// export default Home;




import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Common/Hero';
import WorkFlowSection from '../components/Common/WorkFlowSection';
import Footer from '../components/Common/Footer';
import AlumniImageSlider from '../components/Common/AlumniImageSlider';
import About from '../components/Common/About';
import './css/Home.css';

// Smooth transition config
const smoothTransition = {
  duration: 1,
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for easeInOut
};

// Animation Variants
const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: smoothTransition,
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: smoothTransition,
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: smoothTransition,
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: smoothTransition,
    },
  },
};

const Home = () => {
  return (
    <div id="home">
      {/* Hero Section with Zoom In */}
      <motion.section
        id="hero"
        variants={variants.scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <Hero />
      </motion.section>

      {/* Workflow Section with Slide Left */}
      <motion.section
        id="workflow"
        variants={variants.slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <WorkFlowSection />
      </motion.section>

      {/* About Section with Fade Up */}
      <motion.section
        id="about"
        variants={variants.fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <About />
      </motion.section>

      {/* Alumni Gallery with Slide Right */}
      <motion.section
        id="gallery"
        variants={variants.slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <AlumniImageSlider />
      </motion.section>

      {/* Footer / Contact with Fade + Delay */}
      <motion.section
        id="contact"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { ...smoothTransition, delay: 0.3 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <Footer />
      </motion.section>
    </div>
  );
};

export default Home;
