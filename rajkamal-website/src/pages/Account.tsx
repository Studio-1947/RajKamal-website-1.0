import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    User, 
    Package, 
    Heart, 
    LogOut, 
    MapPin,  
    CreditCard, 
    Bell,
    ChevronRight,
    Edit3
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type TabType = 'profile' | 'orders' | 'wishlist' | 'addresses' | 'payment' | 'notifications';

const Account: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout logic
        navigate('/login');
    };

    const sidebarItems = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'addresses', label: 'Manage Addresses', icon: MapPin },
        { id: 'payment', label: 'Payment Methods', icon: CreditCard },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                            <button className="flex items-center text-primary hover:text-red-700 font-medium transition-colors">
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">First Name</p>
                                <p className="font-medium text-gray-900">John</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">Last Name</p>
                                <p className="font-medium text-gray-900">Doe</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                                <p className="font-medium text-gray-900">john.doe@example.com</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                                <p className="font-medium text-gray-900">+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Account Security</h3>
                            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">
                                Change Password
                            </button>
                        </div>
                    </div>
                );
            case 'orders':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
                        <div className="space-y-4">
                            {[1, 2].map((order) => (
                                <div key={order} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50">
                                        <div>
                                            <p className="text-sm text-gray-500">Order #ORD-2023-{1000 + order}</p>
                                            <p className="text-sm text-gray-500">Placed on Oct {10 + order}, 2023</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">₹450.00</p>
                                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mt-1">
                                                Delivered
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-20 bg-gray-100 rounded-md flex-shrink-0"></div>
                                        <div>
                                            <p className="font-medium text-gray-900">Sample Book Title</p>
                                            <p className="text-sm text-gray-500">Author Name</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                                        <button className="text-primary font-medium text-sm hover:text-red-700">View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'wishlist':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">3 Items</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex gap-4 p-4 border border-gray-100 rounded-2xl bg-white hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="w-24 h-32 bg-gray-100 rounded-lg flex-shrink-0"></div>
                                    <div className="flex flex-col justify-between py-1 w-full">
                                        <div>
                                            <h3 className="font-bold text-gray-900 line-clamp-1">Wishlist Book Title {item}</h3>
                                            <p className="text-sm text-gray-500 mb-2">Famous Author</p>
                                            <p className="font-semibold text-primary">₹399.00</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex-1">
                                                Add to Cart
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors border border-gray-200 rounded-lg text-center flex justify-center items-center">
                                                <Heart className="w-4 h-4 fill-current" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'addresses':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                            <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                                + Add New Address
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border-2 border-primary bg-red-50/30 p-5 rounded-2xl relative">
                                <span className="absolute top-4 right-4 bg-primary text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Default</span>
                                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" /> Home
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4 mt-2">
                                    John Doe<br />
                                    123 Main Street, Apt 4B<br />
                                    New Delhi, DL 110001<br />
                                    India<br />
                                    +91 98765 43210
                                </p>
                                <div className="flex gap-3 mt-4 text-sm font-medium">
                                    <button className="text-primary hover:text-red-700">Edit</button>
                                    <span className="text-gray-300">|</span>
                                    <button className="text-gray-500 hover:text-gray-700">Remove</button>
                                </div>
                            </div>
                            <div className="border border-gray-200 p-5 rounded-2xl">
                                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-500" /> Office
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4 mt-2">
                                    John Doe<br />
                                    Tech Park, Tower C, 5th Floor<br />
                                    Gurgaon, HR 122018<br />
                                    India<br />
                                    +91 98765 43211
                                </p>
                                <div className="flex gap-3 mt-4 text-sm font-medium">
                                    <button className="text-gray-900 hover:text-primary">Set as Default</button>
                                    <span className="text-gray-300">|</span>
                                    <button className="text-primary hover:text-red-700">Edit</button>
                                    <span className="text-gray-300">|</span>
                                    <button className="text-gray-500 hover:text-gray-700">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'payment':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                            <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                                + Add Payment Method
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="border flex items-center justify-between border-gray-200 p-5 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center font-bold text-indigo-800 text-xs">VISA</div>
                                    <div>
                                        <p className="font-bold text-gray-900">Visa ending in 4242</p>
                                        <p className="text-sm text-gray-500">Expires 12/25</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">Default</span>
                                    <button className="text-gray-400 hover:text-primary p-2">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="border flex items-center justify-between border-gray-200 p-5 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center font-bold text-red-500 text-xs">MC</div>
                                    <div>
                                        <p className="font-bold text-gray-900">Mastercard ending in 8832</p>
                                        <p className="text-sm text-gray-500">Expires 08/24</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="text-sm font-medium text-gray-500 hover:text-gray-900">Make Default</button>
                                    <button className="text-gray-400 hover:text-primary p-2">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">
                                    <Package className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 mb-0.5">Order Delivered</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">Your order #ORD-2023-1001 has been delivered successfully. We hope you enjoy reading!</p>
                                    <p className="text-xs text-gray-400 mt-1.5 font-medium">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="p-2 bg-red-100 text-primary rounded-full flex-shrink-0">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 mb-0.5">New Author Release</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">A new book by one of your favorite authors is now available for pre-order.</p>
                                    <p className="text-xs text-gray-400 mt-1.5 font-medium">1 day ago</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="p-2 bg-green-100 text-green-600 rounded-full flex-shrink-0">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 mb-0.5">Price Drop Alert</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">An item in your wishlist has dropped in price. Grab it before the sale ends!</p>
                                    <p className="text-xs text-gray-400 mt-1.5 font-medium">3 days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-gray-500 hover:text-primary transition-colors">Home</Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                                <span className="text-gray-900 font-medium">My Account</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full lg:w-1/4"
                    >
                        {/* User Profile Summary Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-primary font-bold text-xl">
                                JD
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 line-clamp-1">John Doe</h3>
                                <p className="text-sm text-gray-500 line-clamp-1">john.doe@example.com</p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <ul className="flex flex-col w-full">
                                {sidebarItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeTab === item.id;
                                    return (
                                        <li key={item.id} className="w-full">
                                            <button
                                                onClick={() => setActiveTab(item.id as TabType)}
                                                className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors cursor-pointer border-l-4 ${
                                                    isActive 
                                                        ? 'border-primary bg-red-50/50 text-primary font-semibold' 
                                                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                            >
                                                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                                                {item.label}
                                                <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isActive ? 'text-primary translate-x-1' : 'text-gray-300'}`} />
                                            </button>
                                        </li>
                                    );
                                })}
                                <li className="w-full border-t border-gray-50 mt-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-6 py-4 text-left text-red-600 hover:bg-red-50 transition-colors font-medium"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Main Content Area */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full lg:w-3/4"
                    >
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[600px]">
                            {renderContent()}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Account;
