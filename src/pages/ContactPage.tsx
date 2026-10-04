import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Send, Check, Mail } from 'lucide-react';
import { RestaurantSettings } from '../types';

interface ContactPageProps {
  settings: RestaurantSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in your name, phone, and inquiry details.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit message');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setErrorMsg('Failed to send message. Please try calling us directly at ' + settings.phone);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#faf6ee] tracking-tight">
          Contact Fork & Flame
        </h1>
        <p className="text-xs sm:text-sm text-[#9e907e]">
          We are here to answer questions, take event & catering reservations, or deliver food to your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#14100d] border border-[#2b2118] rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl">
            <h2 className="font-serif text-2xl font-bold text-[#faf6ee]">
              Get in Touch
            </h2>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#241a13] text-[#d4a343] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-[#8c7d6b] font-semibold">
                  Location & Address
                </div>
                <div className="text-sm font-medium text-[#f5ecd8]">
                  {settings.address}
                </div>
                <div className="text-xs font-serif text-[#d4af37]">
                  {settings.addressUrdu}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#241a13] text-[#d4a343] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-[#8c7d6b] font-semibold">
                  Phone Numbers & Delivery
                </div>
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="block text-base font-bold text-[#e5b85c] hover:underline"
                >
                  {settings.phone}
                </a>
                <div className="text-xs text-emerald-400">
                  Home & Office Delivery Available
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-[#8c7d6b] font-semibold">
                  WhatsApp Support
                </div>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-emerald-200"
                >
                  <span>Chat on WhatsApp (+{settings.whatsappNumber})</span>
                </a>
                <div className="text-[11px] text-[#8c7d6b]">
                  Instant response for orders & party catering inquiries
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#241a13] text-[#d4a343] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-[#8c7d6b] font-semibold">
                  Operating Timings
                </div>
                <div className="text-xs text-[#cfc1af] leading-relaxed">
                  <div><strong>Lunch & High Tea:</strong> 12:00 PM – 5:00 PM</div>
                  <div><strong>Dinner Service:</strong> 6:00 PM – 1:00 AM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Call & WhatsApp Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="py-3 px-4 rounded-xl bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>

            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Form & Map Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#14100d] border border-[#2b2118] rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="font-serif text-2xl font-bold text-[#faf6ee] mb-1">
              Send a Message or Catering Request
            </h2>
            <p className="text-xs text-[#8c7d6b] mb-6">
              Fill out the form below and our team will get back to you promptly.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#1a1410] border border-[#2e2319] rounded-xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#faf6ee]">
                  Message Received!
                </h3>
                <p className="text-xs text-[#a89680] max-w-sm mx-auto">
                  Thank you for reaching out. We have logged your inquiry and will reach out to you via phone or WhatsApp shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-3 rounded bg-red-950/50 border border-red-800 text-red-300">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Soomro"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0300-1234567"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. tariq@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] focus:outline-none focus:border-[#d4a343] transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Table / Hall Reservation">Table / Family Hall Reservation</option>
                      <option value="Catering & Party Order">Catering & Event Food Packs</option>
                      <option value="Delivery Order Inquiry">Delivery Order Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e907e] font-semibold mb-1">
                    Your Message / Event Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query, estimated guests, or special requirements..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1511] border border-[#2e2319] text-[#f5ecd8] placeholder-[#5c5042] focus:outline-none focus:border-[#d4a343] transition-colors text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 text-xs font-bold uppercase tracking-wider bg-[#c9922c] hover:bg-[#d4a343] text-[#0f0c0a] rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Interactive Google Map of Badin, Sindh */}
          <div className="bg-[#14100d] border border-[#2b2118] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[#241c16] flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#d4a343] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Restaurant Location on Thar Coal Road, Badin</span>
              </span>
              <a
                href="https://maps.google.com/?q=Badin+Sindh+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#a39480] hover:text-white transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="h-64 w-full bg-[#1c1511]">
              <iframe
                title="Fork & Flame Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115456.98394985226!2d68.76922998632814!3d24.654760599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c8b0e7a27eb27%3A0xe54eec2f87db73e1!2sBadin%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="w-full h-full border-0 grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
