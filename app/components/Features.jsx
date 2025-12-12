import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
import { FaRocket, FaPaintBrush, FaUsers } from "react-icons/fa";
import Wrapper from './Wrapper';

export default function Features() {
    const services = [
        {
            name: "Instant Festive Gratification",
            content: "No shipping delays, no postage stamps. Purchase your games and cards and download them immediately. The party starts the moment you click \"buy.\"",
            icon: <FaRocket color='white'size={40} />
        },
        {
            name: "Uniquely Crafted Designs",
            content: "You won't find these templates anywhere else. Our digital greetings and games are lovingly designed by artists who capture the true magic of the season.",
            icon:<FaPaintBrush color='white'size={40} />
        },
        {
            name: "Fun for the Whole Family",
            content: "From interactive trivia games to heartwarming e-cards, our library is curated to bring generations together—whether you're in the same room or miles apart.",
            icon: <FaUsers color='white'size={40} />
        },

    ];

    return (
        <>
            <Wrapper >
                <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-red-700  rounded-3xl
                         overflow-hidden transform transition-all duration-300 
                         hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="p-8 space-y-4 relative z-10">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-4">
                                        {service.icon}
                                        <h5 className="text-xl font-medium text-white transition-colors">
                                            {service.name}
                                        </h5>
                                    </div>
                                    <GoArrowUpRight
                                        className="w-6 h-6 text-white 
                               group-hover:translate-x-1 group-hover:-translate-y-1 
                               transition-all duration-300 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                                <p className="text-white leading-relaxed">
                                    {service.content}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </Wrapper>
        </>
    )
}