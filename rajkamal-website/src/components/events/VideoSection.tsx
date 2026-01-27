import React from 'react';
import { videos } from '../../data/events';
import { Play } from 'lucide-react';

const VideoSection: React.FC = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((video) => (
                <div key={video.id} className="group relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 cursor-pointer">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                            <Play className="h-5 w-5 fill-current text-gray-900 ml-1" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoSection;
