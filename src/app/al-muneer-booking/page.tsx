'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check, Home } from 'lucide-react'
import Link from 'next/link'

// Define types for booking data
interface BookingData {
    name: string
    place: string
    phone: string
    phone2?: string
    address: string
    post: string
    pinCode: string
    pinCode: string
    copies: number
    paymentMethod: 'online' | 'offline' | ''
}

const AlMuneerBookingPage = () => {
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
        pinCode: '',
        copies: 1,
        paymentMethod: ''
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
        if (step === 4) {
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
            const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

            if (!GOOGLE_SCRIPT_URL) {
                alert("Configuration Error: Google Script URL is missing.")
                return;
            }

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            setStep(5)
        } catch (error) {
            console.error('Submission error:', error)
            alert('Failed to submit booking. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Get QR code image based on copy count
    const getQrCodeImage = () => {
        return `/images/qr/QR ${formData.copies}.png`
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors" title="Back to Home">
                            <Home className="w-5 h-5 text-slate-500" />
                        </Link>
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                            Al-Muneer Pre-booking
                        </h1>
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                        Step {step} of 3
                    </div>
                </div>

                {/* content */}
                <div className="p-6 md:p-8">
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center mb-10 gap-2">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s
                                    ? 'bg-emerald-600 text-white shadow-lg scale-110'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                                    }`}>
                                    {step > s ? <Check className="w-5 h-5" /> : s}
                                </div>
                                {s < 4 && (
                                    <div className={`w-16 h-1 rounded-full mx-3 transition-colors duration-300 ${step > s ? 'bg-emerald-600' : 'bg-slate-100 dark:bg-slate-800'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Steps */}
                    <div className="min-h-[400px]">

                        {/* Step 1: Instructions */}
                        {step === 1 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Please read the instructions carefully before proceeding</p>
                                </div>
                                <div className="space-y-4 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
                                    <ul className="space-y-4">
                                        <li className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                                            <span>Fill in your valid personal details in the next step.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                                            <span>Select the number of copies you wish to purchase from the counter.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                                            <span>Verify the total amount calculated.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                                            <span>Complete payment using the QR code in the final step.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">5</div>
                                            <span>Send the payment screenshot to the WhatsApp number provided.</span>
                                        </li>
                                    </ul>
                                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                        <span className="font-medium text-slate-500">Price per copy</span>
                                        <span className="text-xl font-bold text-emerald-600">₹{PRICE_PER_COPY}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Form */}
                        {step === 2 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="grid gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Full Name *</label>
                                        <input
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Place *</label>
                                            <input
                                                required
                                                name="place"
                                                value={formData.place}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="City/Town"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Phone *</label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="Mobile number"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Phone 2 (Optional)</label>
                                        <input
                                            type="tel"
                                            name="phone2"
                                            value={formData.phone2}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                            placeholder="Alternative number"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Address *</label>
                                        <textarea
                                            required
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                                            placeholder="House name, Street, Landmark etc."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Post Office *</label>
                                            <input
                                                required
                                                name="post"
                                                value={formData.post}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="PO Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Pin Code *</label>
                                            <input
                                                required
                                                name="pinCode"
                                                value={formData.pinCode}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="PIN"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mt-2">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="font-semibold text-slate-800 dark:text-white">Number of Copies</label>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleCopyChange(-1)}
                                                    className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="font-bold text-xl w-6 text-center tabular-nums">{formData.copies}</span>
                                                <button
                                                    onClick={() => handleCopyChange(1)}
                                                    className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                                            <span className="text-slate-600 dark:text-slate-400 font-medium">Total Amount</span>
                                            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                                ₹{(formData.copies * PRICE_PER_COPY).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment Method */}
                        {step === 3 && (
                            <div className="space-y-6 animate-fadeIn py-4">
                                <h4 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-8">
                                    Choose Payment Method
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'online' }))}
                                        className={`p-8 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 group ${formData.paymentMethod === 'online'
                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 ring-4 ring-emerald-500/10'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md'
                                            }`}
                                    >
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${formData.paymentMethod === 'online' ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-emerald-600 group-hover:bg-emerald-50'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                                        </div>
                                        <div className="text-center">
                                            <h5 className="font-bold text-lg text-slate-800 dark:text-white mb-1">Online Payment</h5>
                                            <p className="text-sm text-slate-500">Google Pay, PhonePe, UPI</p>
                                        </div>
                                        {formData.paymentMethod === 'online' && (
                                            <div className="absolute top-4 right-4 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/50 rounded-full p-1">
                                                <Check className="w-5 h-5" />
                                            </div>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'offline' }))}
                                        className={`p-8 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 group ${formData.paymentMethod === 'offline'
                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 ring-4 ring-emerald-500/10'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md'
                                            }`}
                                    >
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${formData.paymentMethod === 'offline' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-50'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                        </div>
                                        <div className="text-center">
                                            <h5 className="font-bold text-lg text-slate-800 dark:text-white mb-1">Offline Payment</h5>
                                            <p className="text-sm text-slate-500">Cash, Direct Transfer</p>
                                        </div>
                                        {formData.paymentMethod === 'offline' && (
                                            <div className="absolute top-4 right-4 text-emerald-500 bg-emerald-100 dark:bg-emerald-900/50 rounded-full p-1">
                                                <Check className="w-5 h-5" />
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Payment Details */}
                        {step === 4 && (
                            <div className="space-y-8 animate-fadeIn text-center py-4">
                                {formData.paymentMethod === 'online' ? (
                                    <div className="space-y-8 animate-fadeIn text-center py-4">
                                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 inline-block max-w-sm w-full mx-auto relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
                                            <h5 className="font-bold text-2xl text-slate-800 dark:text-white mb-6">Scan to Pay</h5>
                                            <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-2xl mb-6">
                                                <div className="aspect-square bg-white rounded-xl flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={getQrCodeImage()}
                                                        alt={`QR Code for ${formData.copies} copies`}
                                                        className="w-full h-full object-contain"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/250x250?text=QR+Code+Not+Found'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-slate-500 text-sm mb-1">Total Amount</div>
                                            <div className="text-4xl font-black text-emerald-600 mb-2">
                                                ₹{(formData.copies * PRICE_PER_COPY).toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="space-y-6 max-w-md mx-auto">
                                            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-900/20 text-amber-800 dark:text-amber-200 text-sm">
                                                Important: After making the payment, please take a screenshot and send it to our official WhatsApp identifier for verification.
                                            </div>

                                            <a
                                                href="https://wa.me/918086871734"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full block bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
                                            >
                                                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.6.35 1.095.541 1.749.541 3.181 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.768-5.72-5.728zM12 4.8c4.01 0 7.26 3.2 7.26 7.141 0 3.94-3.25 7.141-7.26 7.141-1.04 0-2.33-.21-3.32-.69l-4.5 1.25 1.25-4.5c-.58-1.09-.95-2.28-.95-3.2C4.74 8 7.99 4.8 12 4.8zM17.47 14.28c-.2-.1-1.18-.58-1.36-.65-.18-.08-.31-.12-.44.1-.13.22-.51.65-.63.79-.12.13-.25.15-.45.05-.2-.1-.85-.31-1.62-1-.6-.54-1-1.2-1.12-1.41-.12-.2-.01-.31.09-.4.08-.09.19-.24.28-.35.09-.11.12-.19.18-.31.06-.12.03-.23-.01-.32-.04-.09-.44-1.06-.6-1.45-.16-.39-.32-.33-.44-.34l-.38-.01c-.13 0-.34.05-.52.25-.18.2-1.04.69-1.04 1.7 0 1.01.73 1.99.83 2.13.1.14 1.44 2.19 3.49 3.08 1.48.64 1.78.51 2.13.48.35-.03 1.18-.48 1.34-.95.16-.47.16-.88.11-.95-.05-.08-.18-.12-.38-.22z" /></svg>
                                                Share Payment Screenshot
                                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-8 animate-fadeIn text-center py-4">
                                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 inline-block w-full max-w-2xl mx-auto text-left">
                                            <h5 className="font-bold text-2xl text-slate-800 dark:text-white mb-6 border-b pb-4 border-slate-100 dark:border-slate-700">Payment Information</h5>
                                            <div className="space-y-6">
                                                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6">
                                                    <div>
                                                        <p className="text-slate-800 dark:text-white text-lg leading-relaxed">
                                                            Payments are accepted directly at the <span className="font-bold text-emerald-600">Almuneer Counter</span>.
                                                            <br />
                                                            You may also visit the Almuneer Office to make the payment in person.
                                                        </p>
                                                    </div>

                                                    <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                                                        <h6 className="font-bold text-lg text-slate-800 dark:text-white mb-2">പേയ്മെന്റ് വിവരങ്ങൾ</h6>
                                                        <p className="text-slate-800 dark:text-white text-lg leading-relaxed">
                                                            പേയ്മെന്റ് അൽമുനീർ കൗണ്ടറിൽ നേരിട്ട് സ്വീകരിക്കുന്നതാണ്.
                                                            <br />
                                                            അതേസമയം, അൽമുനീർ ഓഫീസിൽ എത്തിയും നേരിട്ടുള്ള പേയ്മെന്റ് നടത്താവുന്നതാണ്.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                                    <div className="mb-3">
                                                        <h6 className="font-semibold text-blue-800 dark:text-blue-300 uppercase text-xs tracking-wider mb-1">For assistance, please contact</h6>
                                                        <h6 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">സഹായത്തിനായി ബന്ധപ്പെടുക</h6>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-3 text-xl font-bold text-slate-800 dark:text-white">
                                                        <span>📞</span>
                                                        <a href="tel:9847395758" className="hover:text-emerald-600 transition-colors">9847395758</a>
                                                        <span className="text-slate-300">|</span>
                                                        <a href="tel:9947420289" className="hover:text-emerald-600 transition-colors">9947420289</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 5: Success */}
                        {step === 5 && (
                            <div className="space-y-6 animate-fadeIn text-center py-12">
                                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                                    <Check className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Booking Submitted!</h2>
                                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                                    Thank you for your booking.
                                    {formData.paymentMethod === 'online'
                                        ? " Please ensure you've shared the payment screenshot for verification."
                                        : " Please visit the counter to complete your payment."}
                                </p>
                            </div>
                        )}

                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex justify-between bg-slate-50 dark:bg-slate-900">
                    {step > 1 && step < 5 && (
                        <button
                            onClick={handleBack}
                            disabled={loading}
                            className="px-8 py-3 rounded-xl text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Back
                        </button>
                    )}

                    {step === 1 && (
                        <div className="flex-1"></div> // spacer
                    )}

                    {step < 5 ? (
                        <button
                            onClick={handleNext}
                            disabled={loading || (step === 2 && !formData.name) || (step === 3 && !formData.paymentMethod)}
                            className="px-10 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ml-auto"
                        >
                            {loading ? (
                                <span>Processing...</span>
                            ) : (
                                <>
                                    {step === 4 ? 'Confirm Booking' : 'Continue'}
                                    <ChevronRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    ) : (
                        <Link
                            href="/"
                            className="w-full px-8 py-4 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold hover:opacity-90 text-center transition-all"
                        >
                            Back to Home
                        </Link>
                    )}
                </div>
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    )
}

export default AlMuneerBookingPage
