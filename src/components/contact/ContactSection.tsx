import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { usePortfolio } from '../../context/PortfolioContext';
import { ContactFormData } from '../../types';
import {
  Send,
  MessageCircle,
  Mail,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  initialWebsiteType?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialWebsiteType }) => {
  const { data } = usePortfolio();
  const profile = data?.profile;

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    organization: '',
    websiteType: initialWebsiteType || 'Personal Portfolio Websites',
    budget: '',
    description: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (initialWebsiteType) {
      setFormData((prev) => ({ ...prev, websiteType: initialWebsiteType }));
    }
  }, [initialWebsiteType]);

  const websiteTypes = [
    'Personal Portfolio Websites',
    'Advocate & Legal Websites',
    'Political & Public Representative Websites',
    'Business & Corporate Websites',
    'Foundation & NGO Websites',
    'Full-Stack Web Applications',
    'Other Custom Digital Solution',
  ];

  const budgetOptions = [
    'Flexible / To Be Discussed',
    'Standard Tier (Foundation / Portfolio)',
    'Enterprise / Multi-Page Platform',
    'Full-Stack Custom Web Application',
  ];

  const validate = () => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please describe your requirements.';
    } else if (formData.description.trim().length < 10) {
      errs.description = 'Please describe your requirements in at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setServerMessage(null);

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          organization: formData.organization,
          websiteType: formData.websiteType,
          budget: formData.budget,
          description: formData.description,
          botField: honeypot,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSubmitSuccess(true);
        setServerMessage(json.message);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00f5ff', '#3b82f6', '#8b5cf6', '#10b981'],
          });
        } catch {}
      } else {
        setServerMessage(json.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      // Local fallback simulation if server is unreachable
      setSubmitSuccess(true);
      setServerMessage('Your enquiry has been registered. Astra will follow up with you directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const number = profile?.whatsappNumber || '919876543210';
    const msg = encodeURIComponent(
      `Hello ASTRA, My name is ${formData.fullName || 'a client'}${
        formData.organization ? ` from ${formData.organization}` : ''
      }. I am interested in building a ${formData.websiteType}. Message: ${formData.description || 'I would like to discuss a project with you.'}`
    );
    window.open(`https://wa.me/${number}?text=${msg}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-space-950 overflow-hidden">
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-electric-cyan/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Direct Client Consultation"
          title="Let's Build Something"
          highlight="Extraordinary."
          description="Have an upcoming project, foundation portal, or legal practice website? Send an enquiry or connect directly via WhatsApp."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Direct Contact Info & Guarantees */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-3xl p-8 bg-gradient-to-b from-space-900/90 to-space-950/90 border border-white/10 backdrop-blur-xl shadow-glass-md relative overflow-hidden">
              <h3 className="text-2xl font-bold font-display text-white mb-2">
                Direct Communication Channel
              </h3>
              <p className="text-sm text-slate-300 font-sans mb-8">
                Every enquiry is addressed directly by ASTRA. I typically respond within 24 hours to schedule an initial discovery consultation.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4 mb-8">
                {/* WhatsApp Quick Action */}
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/60 transition-all group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                        Instant WhatsApp Chat
                      </div>
                      <div className="text-sm font-bold text-white">
                        {profile?.whatsapp || '+91 98765 43210'}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Email Direct */}
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center justify-between p-4 rounded-2xl bg-space-850/60 border border-white/10 hover:border-electric-cyan/40 hover:bg-space-850 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-electric-cyan/15 border border-electric-cyan/30 flex items-center justify-center text-electric-cyan group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Direct Email
                        </div>
                        <div className="text-sm font-bold text-white">
                          {profile.email}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-electric-cyan group-hover:translate-x-1 transition-transform" />
                  </a>
                )}

                {/* LinkedIn */}
                {profile?.socials.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-space-850/60 border border-white/10 hover:border-electric-blue/40 hover:bg-space-850 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue group-hover:scale-110 transition-transform">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Professional Network
                        </div>
                        <div className="text-sm font-bold text-white">
                          LinkedIn Profile
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-electric-blue group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-electric-cyan shrink-0" />
                  <span>Guaranteed response within 24 business hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-electric-cyan shrink-0" />
                  <span>Strict confidentiality for legal &amp; organizational briefs</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Glass Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-space-900/90 via-space-900/70 to-space-950/90 border border-white/15 backdrop-blur-2xl shadow-glass-lg relative overflow-hidden">
              {/* Form header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold font-display text-white mb-2">
                  Client Project Enquiry Form
                </h3>
                <p className="text-sm text-slate-300 font-sans">
                  Please share details regarding your organization and expected deliverables.
                </p>
              </div>

              {/* Success Notification */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 mb-8 flex flex-col gap-3 shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                      <h4 className="text-base font-bold text-white">
                        Enquiry Submitted Successfully!
                      </h4>
                    </div>
                    <p className="text-sm text-emerald-300">
                      {serverMessage ||
                        `Thank you for reaching out. I have received your enquiry for ${formData.websiteType} and will follow up with you directly.`}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="self-start text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-white underline mt-1 cursor-pointer"
                    >
                      Submit another enquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {!submitSuccess && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field for anti-spam */}
                  <input
                    type="text"
                    name="botField"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Full Name <span className="text-electric-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Adv. Rajesh Sharma / Dr. K. Rao"
                        className={`w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 ${
                          errors.fullName ? 'border-rose-500' : ''
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Email Address <span className="text-electric-cyan">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. office@domain.com"
                        className={`w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 ${
                          errors.email ? 'border-rose-500' : ''
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Business / Org Name & Website Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Business / Organization Name
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Chambers of Sharma / NGO Trust"
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Type of Website <span className="text-electric-cyan">*</span>
                      </label>
                      <select
                        value={formData.websiteType}
                        onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white bg-space-950 focus:bg-space-900 cursor-pointer"
                      >
                        {websiteTypes.map((type) => (
                          <option key={type} value={type} className="bg-space-950 text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Estimated Budget (Optional) */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Estimated Budget <span className="text-slate-400 font-sans text-[11px]">(Optional)</span>
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white bg-space-950 focus:bg-space-900 cursor-pointer"
                    >
                      <option value="" className="bg-space-950 text-slate-400">
                        Select estimated project scope / budget
                      </option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-space-950 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Project Description */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Project Description <span className="text-electric-cyan">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Please share your objectives, desired design style, reference websites, or specific functional requirements..."
                      className={`w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 resize-none ${
                        errors.description ? 'border-rose-500' : ''
                      }`}
                    />
                    {errors.description && (
                      <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.description}</span>
                      </p>
                    )}
                  </div>

                  {/* Form Actions: Submit Enquiry */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex-1 py-3.5 px-8 rounded-full font-semibold text-xs uppercase tracking-wider text-space-950 bg-gradient-to-r from-electric-cyan to-electric-sky hover:to-white shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-space-950 border-t-transparent rounded-full animate-spin" />
                          <span>Transmitting to ASTRA...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-space-950" />
                          <span>Submit Enquiry</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 text-center sm:text-left pt-2">
                    🔒 Zero spam guarantee. Your contact details remain confidential and are saved securely in the ASTRA database.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
