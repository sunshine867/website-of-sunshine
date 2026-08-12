'use client';

 

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

const faqCategories = ['All', 'Courses', 'JLPT', 'Study Abroad', 'Visa', 'Payments', 'General'];

const faqs = [
  {
    category: 'Courses',
    question: 'What Japanese courses do you offer?',
    answer: 'We offer comprehensive Japanese language courses from JLPT N5 (beginner) to N1 (advanced). Each course includes vocabulary, grammar, kanji, reading, listening, and speaking practice with native teachers.',
  },
  {
    category: 'Courses',
    question: 'How long does it take to complete each level?',
    answer: 'N5 typically takes 3-4 months, N4 takes 6-8 months, N3 takes 1 year, N2 takes 1.5-2 years, and N1 takes 2-3 years with regular study. Duration varies based on your dedication and study hours.',
  },
  {
    category: 'Courses',
    question: 'Do you offer online classes?',
    answer: 'Yes! We offer both online and physical classes. Our online platform includes live interactive sessions, recorded lectures, practice exercises, and AI-powered learning tools.',
  },
  {
    category: 'JLPT',
    question: 'What is JLPT?',
    answer: 'JLPT (Japanese Language Proficiency Test) is the official test to measure Japanese language proficiency for non-native speakers. It has 5 levels: N5 (easiest) to N1 (most difficult).',
  },
  {
    category: 'JLPT',
    question: 'How often is JLPT conducted?',
    answer: 'JLPT is conducted twice a year, usually in July and December. Registration opens about 3 months before the exam date.',
  },
  {
    category: 'Study Abroad',
    question: 'Which countries can I study in?',
    answer: 'We help students apply to universities in Japan, USA, UK, Canada, Australia, Germany, South Korea, and New Zealand.',
  },
  {
    category: 'Study Abroad',
    question: 'What is the cost of studying in Japan?',
    answer: 'Tuition fees range from ¥500,000 to ¥1,000,000 per year. Living costs are approximately ¥80,000-120,000 per month. Many scholarships are available for international students.',
  },
  {
    category: 'Visa',
    question: 'How long does visa processing take?',
    answer: 'Student visa processing typically takes 2-4 weeks depending on the country and embassy. We provide complete documentation support to ensure smooth processing.',
  },
  {
    category: 'Visa',
    question: 'Can I work while studying abroad?',
    answer: 'In Japan, international students can work up to 28 hours per week during semester and 40 hours during breaks with proper permission. Other countries have similar provisions.',
  },
  {
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept Khalti, eSewa, FonePay, IME Pay (Nepal), Stripe, PayPal, bank transfers, and QR payments.',
  },
  {
    category: 'Payments',
    question: 'Is there a refund policy?',
    answer: 'Yes, refunds are available within 7 days of enrollment if no course content has been accessed. Please check our refund policy for detailed terms.',
  },
  {
    category: 'General',
    question: 'Where is your office located?',
    answer: 'Our office is located in Putalisadak, Kathmandu, Nepal. We are open Sunday to Friday, 7:00 AM to 7:00 PM, and Saturday 7:00 AM to 1:00 PM.',
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <HelpCircle className="h-16 w-16 mx-auto mb-4 text-white/80" />
            <h1 className="text-4xl font-extrabold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-white/80">Find answers to common questions</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search FAQs..."
            className="pl-12 h-14 text-lg shadow-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {faqCategories.map(cat => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  openIndex === index ? 'shadow-lg border-primary-200' : 'hover:shadow-md'
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">{faq.category}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold">{faq.question}</h3>
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-500 mt-3 overflow-hidden"
                          >
                            {faq.answer}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
