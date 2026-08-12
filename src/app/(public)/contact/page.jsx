
'use client';

 

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, MapPin, Phone, Mail, Clock,
  ChevronDown, HelpCircle, Search
} from 'lucide-react';
import Link from 'next/link';

const faqCategories = ['All', 'Courses', 'JLPT', 'Study Abroad', 'Visa', 'Payments', 'General'];

const faqs = [
  { category: 'Courses', question: 'What Japanese courses do you offer?', answer: 'We offer comprehensive Japanese language courses from JLPT N5 (beginner) to N1 (advanced).' },
  { category: 'Courses', question: 'How long does it take to complete each level?', answer: 'N5: 3-4 months, N4: 6-8 months, N3: 1 year, N2: 1.5-2 years, N1: 2-3 years.' },
  { category: 'Courses', question: 'Do you offer online classes?', answer: 'Yes! Both online and physical classes with AI-powered tools.' },
  { category: 'JLPT', question: 'What is JLPT?', answer: 'Japanese Language Proficiency Test - 5 levels from N5 to N1.' },
  { category: 'Study Abroad', question: 'Which countries can I study in?', answer: 'Japan, USA, UK, Canada, Australia, Germany, South Korea, New Zealand.' },
  { category: 'Visa', question: 'How long does visa processing take?', answer: '2-4 weeks with complete documentation support.' },
  { category: 'Payments', question: 'What payment methods do you accept?', answer: 'Khalti, eSewa, FonePay, IME Pay, Stripe, PayPal, bank transfers.' },
  { category: 'General', question: 'Where is your office located?', answer: 'Gatthaghar -3, Madhyapur Thimi, 44600, Nepal.' },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Course Inquiry',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const [faqSearch, setFaqSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const contactInfo = [
    { icon: '📍', title: 'Visit Us', details: ['Gatthaghar -3, Madhyapur Thimi, 44600, Nepal'] },
    { icon: '📞', title: 'Call Us', details: ['+977-01-5928989', '+977-9765141231', 'Sun-Fri, 6am-6pm'] },
    { icon: '✉️', title: 'Email Us', details: ['info@sunshine.com.np', 'admissions@sunshine.com.np', 'support@sunshine.com.np'] },
    { icon: '🕒', title: 'Working Hours', details: ['Sunday-Friday: 6:00 AM - 6:00 PM', 'Saturday: Closed'] },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // FIXED: Send with snake_case keys
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    
    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          inquiry_type: formData.subject || 'GENERAL',
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast({ title: 'Message sent!', description: 'We will get back to you soon.' });
        setFormData({ fullName: '', email: '', phone: '', subject: 'Course Inquiry', message: '' });
      } else {
        toast({ title: 'Error', description: data.message || 'Failed to send', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Network Error', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
            <p className="text-xl text-white/80">Have questions? We'd love to hear from you</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Info Cards */}
        <section className="grid md:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{info.icon}</div>
              <h3 className="text-lg font-bold mb-3">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-sm">{detail}</p>
              ))}
            </motion.div>
          ))}
        </section>

        {/* Form + FAQ Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div className="lg:col-span-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Full Name <span className="text-red-500">*</span></label>
                      <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" className={errors.fullName ? 'border-red-500' : ''} />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email <span className="text-red-500">*</span></label>
                      <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={errors.email ? 'border-red-500' : ''} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Phone</label>
                      <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Your phone number" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Subject</label>
                      <select name="subject" value={formData.subject} onChange={handleChange}
                        className="w-full h-11 rounded-lg border-2 border-gray-300 px-4 text-sm focus:border-blue-500 focus:outline-none">
                        <option value="Course Inquiry">Course Inquiry</option>
                        <option value="Study Abroad">Study Abroad</option>
                        <option value="Visa Assistance">Visa Assistance</option>
                        <option value="Admission">Admission</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Message <span className="text-red-500">*</span></label>
                    <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here..."
                      className={`min-h-[150px] ${errors.message ? 'border-red-500' : ''}`} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" size="lg" loading={loading} className="w-full md:w-auto">
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Sidebar */}
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 text-blue-600" />Quick FAQs
              </h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search FAQs..." className="pl-9 h-10 text-sm" value={faqSearch} onChange={(e) => setFaqSearch(e.target.value)} />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {faqCategories.map(cat => (
                  <Badge key={cat} variant={activeCategory === cat ? 'default' : 'outline'}
                    className="cursor-pointer text-xs px-3 py-1" onClick={() => setActiveCategory(cat)}>{cat}</Badge>
                ))}
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {filteredFAQs.map((faq, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                    <div className={`rounded-lg border cursor-pointer transition-all ${openIndex === index ? 'border-blue-200 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                      <div className="p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <Badge variant="secondary" className="text-xs px-2 py-0.5 mb-1">{faq.category}</Badge>
                            <p className="text-sm font-medium">{faq.question}</p>
                            <AnimatePresence>
                              {openIndex === index && (
                                <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                                  className="text-gray-600 text-sm mt-2 overflow-hidden">{faq.answer}</motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                          <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-1">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/faq"><Button variant="outline" size="sm">View All FAQs →</Button></Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Map */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold flex items-center">
                <MapPin className="mr-2 h-6 w-6 text-blue-600" />Find Us Here
              </h3>
              <p className="text-gray-500 text-sm mt-1">Sunshine International Education Center</p>
            </div>
            <div className="w-full h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2691.464530230944!2d85.37100907405163!3d27.673725026976072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1bbd8571a169%3A0xe4656979a7949a5f!2sSUNSHINE%20INTERNATIONAL%20EDUCATION%20CENTER!5e1!3m2!1sen!2snp!4v1776838574095!5m2!1sen!2snp"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Sunshine International Education Center Location">
              </iframe>
            </div>
            <div className="p-4 bg-gray-50 border-t">
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                <span>Gatthaghar -3, Madhyapur Thimi, 44600, Nepal</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
