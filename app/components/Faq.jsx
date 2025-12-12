"use client";

import { useState } from 'react';
import Wrapper from './Wrapper';
import { FaRegCircleQuestion } from "react-icons/fa6";

const FAQItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-gray-200">
        <button
            onClick={onClick}
            className="w-full py-6 text-left flex justify-between items-center"
        >
            <h3 className="text-lg font-medium ">{question}</h3>
            <span className="ml-6 shrink-0">
                {isOpen ? (
                    <span className="text-2xl  font-light">−</span>
                ) : (
                    <span className="text-2xl  font-light">+</span>
                )}
            </span>
        </button>
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
        >
            <p className="leading-relaxed">{answer}</p>
        </div>
    </div>
);

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How do I receive my purchase?",
            answer: 'Immediately after checkout, you will receive an email with a download link. This download is a PDF Instruction Guide. Open this PDF, and you will find a direct button/link that says "Access Template." Clicking that link will automatically open the design in your Canva account.'
        },
        {
            question: 'Do I need a Canva account to download and edit these templates?',
            answer: "Yes, you will need a Canva account, but don't worry—it is completely free to sign up! You can use your email, Google, or Facebook account to log in and start editing immediately."
        },
        {
            question: 'Do I need the paid version (Canva Pro) to edit these?',
            answer: 'No! Our designs are created specifically to work with the Free version of Canva. You can edit text, change colors, and upload your own photos without needing a paid subscription.'
        },
        {
            question: 'Will my template expire?',
            answer: 'No. Once you click the link in your PDF, a copy of the template is saved to your Canva account. It is yours to keep and edit forever, year after year.'
        },
        {
            question: 'Can I edit this on my phone?',
            answer: 'Yes! Canva has a great mobile app. However, for more detailed edits (like aligning text or adjusting small elements), we highly recommend using a laptop or desktop computer for the best experience.'
        },
          {
            question: 'Can I send these digitally instead of printing?',
            answer: 'Absolutely. In Canva, simply download your design as a JPG or PNG image. You can then email it, text it, or post it on social media instantly!'
        },
        {
            question: 'Can I get a refund if I change my mind?',
            answer: 'Due to the digital nature of our products (instant download), we cannot offer refunds or exchanges once the files have been purchased. However, if you have any technical trouble accessing the Canva link, please contact us and we will help you resolve it immediately!'
        }
    ];

    return (
        <Wrapper>
            <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-24">
                {/* Left column - Header */}
                <div className=" mb-8 lg:mb-0">
                    <h1 className='font-bold text-lg'><span className='inline-block mr-2'><FaRegCircleQuestion /></span>FAQs</h1>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className=" text-lg">
                        We understand that choosing the right product requires careful consideration.
                        Here are frequently asked questions to address your concerns.
                    </p>

                </div>

                {/* Right column - FAQ items */}

                <div className="space-y-1">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>

            </div>
        </Wrapper>
    );
};

export default FAQ;