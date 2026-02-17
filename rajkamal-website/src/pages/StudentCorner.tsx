import { GraduationCap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentCorner = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-16">
            <div className="max-w-2xl w-full text-center">
                <div className="bg-white rounded-2xl shadow-xl p-12 space-y-6">
                    <div className="flex justify-center">
                        <div className="bg-primary/10 p-6 rounded-full">
                            <GraduationCap className="h-16 w-16 text-primary" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900">Student Corner</h1>

                    <div className="space-y-3">
                        <p className="text-xl text-gray-600">
                            Coming Soon
                        </p>
                        <p className="text-gray-500">
                            A dedicated space for students with special offers, study materials, and resources.
                            We're building something special for you!
                        </p>
                    </div>

                    <div className="pt-6">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors shadow-md"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentCorner;
