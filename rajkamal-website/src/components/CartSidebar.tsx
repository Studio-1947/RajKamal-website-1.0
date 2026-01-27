import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartSidebar: React.FC = () => {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, cartTotal } = useCart();

    return (
        <>
            {/* Overlay */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity"
                    onClick={toggleCart}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-50 p-2 rounded-lg">
                                <ShoppingBag className="h-5 w-5 text-red-500" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                        </div>
                        <button
                            onClick={toggleCart}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="bg-gray-50 p-6 rounded-full">
                                    <ShoppingBag className="h-12 w-12 text-gray-300" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                                    <p className="text-gray-500 text-sm mt-1">Looks like you haven't added any books yet.</p>
                                </div>
                                <button
                                    onClick={toggleCart}
                                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3 className="line-clamp-1" title={item.title}>{item.title}</h3>
                                                <p className="ml-4">₹{item.price * item.quantity}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.author}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                                                <span>Qty {item.quantity}</span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-gray-100 p-6 bg-gray-50">
                            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                <p>Subtotal</p>
                                <p>₹{cartTotal}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500 mb-6">
                                Shipping and taxes calculated at checkout.
                            </p>
                            <button
                                className="w-full flex items-center justify-center rounded-xl border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 transition-all hover:shadow-lg"
                            >
                                Checkout
                            </button>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{' '}
                                    <button
                                        type="button"
                                        className="font-medium text-red-600 hover:text-red-500"
                                        onClick={toggleCart}
                                    >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartSidebar;
