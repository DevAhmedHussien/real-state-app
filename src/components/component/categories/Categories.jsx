
import NextLink from '@/components/ui/NextLink'
import EmblaCarousel from '../product-slider/EmblaCarousel'
import { SLIDES } from '@/constants/data'
  
const Categories = () => {
  return (

       <div className="mt-5 p-6">
          <h2 className="text-3xl font-bold text-primary-dark text-left mb-6">Cities of Russia
          <span className="text-xl ml-5 text-primary-hover cursor-pointer hover:text-primary-dark underline transition-all delay-100 "> 
            <NextLink href='/products' className='responsive-appbar-button'> all</NextLink> </span>
          </h2>
          <EmblaCarousel categories = {true} slides={SLIDES} />
        </div>
      
  )
}

export default Categories