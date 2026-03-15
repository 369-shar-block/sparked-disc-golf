import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import FeaturedCourses from '../components/FeaturedCourses'
import CourseCatalog from '../components/CourseCatalog'
import Instructors from '../components/Instructors'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
}

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />
      <StatsBar />
      <FeaturedCourses />
      <CourseCatalog />
      <Instructors />
      <Testimonials />
      <Pricing />
      <FAQ />
    </motion.div>
  )
}
