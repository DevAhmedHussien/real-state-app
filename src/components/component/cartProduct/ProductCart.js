import { Trash2 } from "lucide-react";
import { useState } from "react";

const ProductCart = ({ item, handleUpdateQuantity, handleRemoveItem, editable = true }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  // Handle Quantity Update
  const handleQuantity = (id, quantity) => {
    handleUpdateQuantity(id, quantity);
  };

  // Handle Item Removal with Animation
  const handleRemove = (id) => {
    setIsRemoving(true);
    setTimeout(() => {
      handleRemoveItem(id);
    }, 300); // Delay for transition effect
  };

  return (
    <div
      key={item.id}
      className={`flex items-center gap-4 border-b border-gray-300 pb-4 last:border-b-0 transition-all duration-300 ${
        isRemoving ? "opacity-0 scale-95 translate-x-3" : "opacity-100 scale-100"
      }`}
    >
      {/* Product Image */}
      {item.images && item.images.length > 0 && (
        <img
          src={item.images[0].url} // Display the first image
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg shadow-md border border-gray-200"
        />
      )}

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-md text-textColor-dark">{item.name}</h3>
        <h5 className="text-sm text-textColor-muted">
          {item.selectedProduct.color} / {item.selectedProduct.size}
        </h5>

        {/* Quantity Controls and Remove Button */}
        <div className="flex items-center justify-between mt-2">
          {!editable ? (
            <>
              <h5 className="text-textColor-muted">{item.quantity}</h5>
              <span className="text-textColor-dark font-semibold">
                $ {(item.price * item.quantity).toFixed(2)}
              </span>
            </>
          ) : (
            <div className="flex items-center gap-2">
              {/* Decrease Quantity Button */}
              <button
                onClick={() => handleQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center bg-background-light rounded-lg hover:bg-accent-default hover:text-white transition-all hover:scale-105"
              >
                <span className="text-lg font-semibold">−</span>
              </button>

              {/* Quantity Display */}
              <span className="w-8 text-center text-textColor-dark font-semibold">{item.quantity}</span>

              {/* Increase Quantity Button */}
              <button
                onClick={() => handleQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center bg-background-light rounded-lg hover:bg-accent-default hover:text-white transition-all hover:scale-105"
              >
                <span className="text-lg font-semibold">+</span>
              </button>
            </div>
          )}

          {/* Remove Button with Icon */}
          {editable && (
            <button
              onClick={() => handleRemove(item.id)}
              className="text-errorColor-light hover:text-errorColor-default transition-all hover:scale-110"
            >
              <Trash2 size={23} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
