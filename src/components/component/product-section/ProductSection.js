import ShownProductCard from '@/components/component/card/ShownProductCard';
import NextLink from '@/components/ui/NextLink';

const ProductSection = ({ title, products, link, reverseLayout = false }) => (
    <div className="p-6">
      <h2 className="text-3xl text-primary-dark mb-6 font-bold text-left">
        {title}
        <span className="text-xl ml-5 text-primary-hover cursor-pointer hover:text-primary-dark underline transition-all delay-100">
          <NextLink href={link} className="responsive-appbar-button"> all</NextLink>
        </span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Big Card */}
        <div className={`lg:col-span-3 ${reverseLayout ? 'order-2' : 'order-1'}`}>
          <NextLink key={products[0].id} href={`/look/${products[0].handlerName}`}>
            <ShownProductCard product={products[0]} />
          </NextLink>
        </div>
  
        {/* Two Smaller Cards */}
        <div className={`lg:col-span-2 flex flex-col gap-6 h-full ${reverseLayout ? 'order-1' : 'order-2'}`}>
          {products.slice(1, 3).map((product) => (
            <NextLink key={product.id} href={`/look/${product.handlerName}`}>
              <ShownProductCard product={product} />
            </NextLink>
          ))}
        </div>
      </div>
    </div>
  );
  
export default ProductSection