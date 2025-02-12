'use client';

import { X, Loader2, ShoppingCart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart, updateQuantity } from '@/redux/cartSlice';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCart from '@/components/component/cartProduct/ProductCart';
import { Button } from '@/components/ui/button';

const Cart = ({ toggleCart, isCartOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast({ variant: 'danger', title: 'Product removed from cart' });
  };

  // Handle clearing the entire cart
  const handleClearCart = () => {
    dispatch(clearCart());
    toast({ variant: 'danger', title: 'Cart cleared successfully' });
  };

  // Handle updating the quantity of an item
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 1) handleRemoveItem(id);
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  // Handle checkout process
  const handleProceedToCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/checkouts');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-background-default shadow-lg transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0 z-50' : 'translate-x-full'
      }`}
    >
      {/* Cart Header */}
      <div className="p-4 border-b border-gray-300 flex justify-between items-center bg-primary-default text-white">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={toggleCart} className="hover:text-accent-light transition-all">
          <X size={20} />
        </button>
      </div>

      {/* Scrollable Product List */}
      <div className="p-4 space-y-4 h-[100%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {cart.items.length === 0 ? (
          <p className="text-center text-textColor-muted">Your cart is empty.</p>
        ) : (
          cart.items.map((item, index) => (
            <ProductCart
              key={index}
              item={item}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
            />
          ))
        )}
      </div>

      {/* Fixed Bottom Buttons */}
      {cart.items.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full bg-background-light border-t border-gray-300 p-4 shadow-md">
          {/* Cart Summary */}
          <div className="mb-3">
            <p className="font-semibold text-textColor-dark">Total Items: {cart.totalQuantity}</p>
            <p className="font-semibold text-textColor-hover text-lg">Total: ${cart.totalPrice}</p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button 
              variant="destructive"  
              className="w-full"  
              size='md'
              onClick={handleClearCart} >Clear Cart</Button>
            <Button
              size='md'
              variant="primary"
              disabled={cart.length === 0 || isLoading}
              onClick={handleProceedToCheckout}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" /> Proceed to Checkout
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
