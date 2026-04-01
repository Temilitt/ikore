import Hero from '../components/home/Hero'
import HowItWorks from '../components/home/HowItWorks'
import FeaturedProduce from '../components/home/FeaturedProduce'
import WhyAgroLink from '../components/home/WhyAgroLink'
import Testimonials from '../components/home/Testimonials'

const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <FeaturedProduce />
      <WhyAgroLink />
      <Testimonials/>
    </div>
  )
}

export default Home