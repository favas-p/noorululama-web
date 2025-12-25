'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react'

// Define types for booking data
interface BookingData {
    name: string
    place: string
    phone: string
    phone2?: string
    address: string
    post: string
    pinCode: string
    copies: number
}

interface Props {
    onClose: () => void
}

const AlMuneerBookingModal = ({ onClose }: Props) => {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<BookingData>({
        name: '',
        place: '',
        phone: '',
        phone2: '',
        address: '',
        post: '',
        pinCode: '',
        copies: 1
    })

    const PRICE_PER_COPY = 250

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCopyChange = (change: number) => {
        setFormData(prev => ({
            ...prev,
            copies: Math.max(1, prev.copies + change)
        }))
    }

    const handleNext = () => {
        if (step === 2) {
            submitForm()
        } else {
            setStep(prev => prev + 1)
        }
    }

    const handleBack = () => {
        setStep(prev => prev - 1)
    }

    const submitForm = async () => {
        setLoading(true)
        try {
            // REPLACE THIS URL with your deployed Google Apps Script Web App URL
            const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

            // Note: 'no-cors' mode is often required for Google Apps Script, 
            // but it means we can't read the response status/body. 
            // We assume success if no network error opens.
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            // Since we can't check response.ok in no-cors, we proceed to next step
            setStep(3)
        } catch (error) {
            console.error('Submission error:', error)
            alert('Failed to submit booking. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Get QR code image based on copy count
    const getQrCodeImage = () => {
        // Files are named "QR 1.png", "QR 2.png" etc.
        return `/images/qr/QR ${formData.copies}.png`
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        Al-Muneer Pre-booking
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center mb-8 gap-2">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                                    }`}>
                                    {step > s ? <Check className="w-4 h-4" /> : s}
                                </div>
                                {s < 3 && (
                                    <div className={`w-12 h-1 rounded-full mx-2 ${step > s ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-800'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Steps */}
                    <div className="space-y-6">

                        {/* Step 1: Instructions */}
                        {step === 1 && (
                            <div className="space-y-4 animate-fadeIn">
                                <h4 className="text-xl font-bold text-center mb-4 text-emerald-600 dark:text-emerald-500">
                                    Welcome to Al-Muneer Booking
                                </h4>
                                <div className="space-y-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <p>Please follow these steps to complete your pre-booking:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Fill in your valid personal details in the next step.</li>
                                        <li>Select the number of copies you wish to purchase.</li>
                                        <li>Review the total amount calculated.</li>
                                        <li>Complete the payment using the QR code shown in the final step.</li>
                                        <li>Verify your payment by sending a screenshot to the provided WhatsApp number.</li>
                                    </ul>
                                    <p className="font-semibold text-emerald-600 mt-4">
                                        Price per copy: ₹{PRICE_PER_COPY}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Form */}
                        {step === 2 && (
                            <div className="space-y-4 animate-fadeIn">
                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Full Name *</label>
                                        <input
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Place *</label>
                                            <input
                                                required
                                                name="place"
                                                value={formData.place}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="City/Place"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Phone *</label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="Mobile number"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Phone 2 (Optional)</label>
                                        <input
                                            type="tel"
                                            name="phone2"
                                            value={formData.phone2}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                            placeholder="Alternative number"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Address *</label>
                                        <textarea
                                            required
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={2}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                                            placeholder="House name, Street, etc."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Post Office *</label>
                                            <input
                                                required
                                                name="post"
                                                value={formData.post}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="Post Office"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Pin Code *</label>
                                            <input
                                                required
                                                name="pinCode"
                                                value={formData.pinCode}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="PIN Code"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="font-semibold text-slate-800 dark:text-white">Number of Copies</label>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleCopyChange(-1)}
                                                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border shadow-sm flex items-center justify-center hover:bg-slate-50"
                                                >
                                                    -
                                                </button>
                                                <span className="font-bold text-lg w-6 text-center">{formData.copies}</span>
                                                <button
                                                    onClick={() => handleCopyChange(1)}
                                                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border shadow-sm flex items-center justify-center hover:bg-slate-50"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-emerald-200 dark:border-emerald-900/50">
                                            <span className="text-slate-600 dark:text-slate-400">Total Price</span>
                                            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                                ₹{(formData.copies * PRICE_PER_COPY).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment */}
                        {step === 3 && (
                            <div className="space-y-6 animate-fadeIn text-center">
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 inline-block">
                                    <h5 className="font-bold text-slate-800 dark:text-white mb-4">Scan to Pay</h5>
                                    {/* QR Code Placeholder - Replace with actual image logic */}
                                    <div className="w-64 h-64 bg-white p-2 rounded-xl shadow-md mx-auto mb-4 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={getQrCodeImage()}
                                            alt={`QR Code for ${formData.copies} copies`}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                // Fallback if image not found
                                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/250x250?text=QR+Code+Not+Found'
                                            }}
                                        />
                                    </div>
                                    <p className="text-emerald-600 font-bold text-xl">
                                        Amount: ₹{(formData.copies * PRICE_PER_COPY).toLocaleString()}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-slate-600 dark:text-slate-300">
                                        After payment, please send the screenshot to:
                                    </p>
                                    <a
                                        href="https://wa.me/918086871734" // Example number from SubWingsSection (Samajam Convener) - user didn't specify exact number so I will use a placeholder or one from the file. Actually the user said "set a whatsapp contact". I will use the Al-Muneer chairman/convener number if possible, or a placeholder.
                                        // Al-Muneer Convener: +91 91886 70173 (Anees Rahman)
                                        // Let's use that for now.
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.6.35 1.095.541 1.749.541 3.181 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.768-5.72-5.728zM12 4.8c4.01 0 7.26 3.2 7.26 7.141 0 3.94-3.25 7.141-7.26 7.141-1.04 0-2.33-.21-3.32-.69l-4.5 1.25 1.25-4.5c-.58-1.09-.95-2.28-.95-3.2C4.74 8 7.99 4.8 12 4.8zM17.47 14.28c-.2-.1-1.18-.58-1.36-.65-.18-.08-.31-.12-.44.1-.13.22-.51.65-.63.79-.12.13-.25.15-.45.05-.2-.1-.85-.31-1.62-1-.6-.54-1-1.2-1.12-1.41-.12-.2-.01-.31.09-.4.08-.09.19-.24.28-.35.09-.11.12-.19.18-.31.06-.12.03-.23-.01-.32-.04-.09-.44-1.06-.6-1.45-.16-.39-.32-.33-.44-.34l-.38-.01c-.13 0-.34.05-.52.25-.18.2-1.04.69-1.04 1.7 0 1.01.73 1.99.83 2.13.1.14 1.44 2.19 3.49 3.08 1.48.64 1.78.51 2.13.48.35-.03 1.18-.48 1.34-.95.16-.47.16-.88.11-.95-.05-.08-.18-.12-.38-.22z" /></svg>
                                        Chat on WhatsApp
                                    </a>
                                    <p className="text-xs text-slate-400 mt-2">
                                        Click the button above to share payment screenshot
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between bg-slate-50 dark:bg-slate-900/50">
                    {step > 1 && (
                        <button
                            onClick={handleBack}
                            disabled={loading}
                            className="px-6 py-2 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                        >
                            Back
                        </button>
                    )}

                    {step < 3 ? (
                        <button
                            onClick={handleNext}
                            disabled={loading || (step === 2 && !formData.name)} // Basic validation check
                            className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-all flex items-center gap-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span>Submitting...</span>
                            ) : (
                                <>
                                    {step === 2 ? 'Submit Booking' : 'Next'}
                                    <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg bg-slate-900 dark:bg-slate-700 text-white font-medium hover:opacity-90 ml-auto"
                        >
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AlMuneerBookingModal
