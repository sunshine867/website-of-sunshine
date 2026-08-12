'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/auth-provider';
import { 
  Search, FileText, Clock, Lock, Unlock, 
  BookOpen, ArrowRight, Star, Sparkles, Crown
} from 'lucide-react';

 

const freeExams = [
  { slug: 'jft/basic-1', title: 'JFT-Basic Sample Exam 1', description: 'Script & Vocabulary, Conversation, Listening, Reading', sections: 4, questions: 40, duration: '60 minutes', level: 'A2', thumbnail: '📝', tags: ['JFT', 'Basic', 'Free'], color: 'from-green-500 to-emerald-600' },
  { slug: 'jft/basic-2', title: 'JFT-Basic Sample Exam 2', description: 'Complete mock test with all sections', sections: 4, questions: 40, duration: '60 minutes', level: 'A2', thumbnail: '📝', tags: ['JFT', 'Basic', 'Free'], color: 'from-green-500 to-emerald-600' },
  { slug: 'jft/basic-3', title: 'JLPT N5 Sample Exam 1', description: 'Vocabulary, Grammar, Reading, Listening', sections: 3, questions: 35, duration: '50 minutes', level: 'N5', thumbnail: '📚', tags: ['JLPT', 'N5', 'Free'], color: 'from-blue-500 to-sky-600' },
  { slug: 'jft/basic-4', title: 'JLPT N5 Sample Exam 2', description: 'Vocabulary, Grammar, Reading, Listening', sections: 3, questions: 35, duration: '50 minutes', level: 'N5', thumbnail: '📚', tags: ['JLPT', 'N5', 'Free'], color: 'from-blue-500 to-sky-600' },
  { slug: 'jft/basic-5', title: 'JLPT N4 Sample Exam 1', description: 'Vocabulary, Grammar, Reading, Listening', sections: 3, questions: 35, duration: '60 minutes', level: 'N4', thumbnail: '📖', tags: ['JLPT', 'N4', 'Free'], color: 'from-purple-500 to-violet-600' },
  { slug: 'jft/basic-6', title: 'JLPT N4 Sample Exam 2', description: 'Vocabulary, Grammar, Reading, Listening', sections: 3, questions: 35, duration: '60 minutes', level: 'N4', thumbnail: '📖', tags: ['JLPT', 'N4', 'Free'], color: 'from-purple-500 to-violet-600' },
];

const premiumExams = [
  { slug: 'premium/n3-1', title: 'JLPT N3 Mock Exam 1', description: 'Full mock exam with all sections', sections: 3, questions: 40, duration: '90 minutes', level: 'N3', thumbnail: '📕', tags: ['JLPT', 'N3', 'Premium'], color: 'from-orange-500 to-amber-600' },
  { slug: 'premium/n3-2', title: 'JLPT N3 Mock Exam 2', description: 'Advanced mock examination', sections: 3, questions: 40, duration: '90 minutes', level: 'N3', thumbnail: '📕', tags: ['JLPT', 'N3', 'Premium'], color: 'from-orange-500 to-amber-600' },
  { slug: 'premium/n2-1', title: 'JLPT N2 Mock Exam 1', description: 'Advanced level mock examination', sections: 3, questions: 45, duration: '105 minutes', level: 'N2', thumbnail: '📗', tags: ['JLPT', 'N2', 'Premium'], color: 'from-red-500 to-rose-600' },
  { slug: 'premium/n2-2', title: 'JLPT N2 Mock Exam 2', description: 'Advanced level mock examination', sections: 3, questions: 45, duration: '105 minutes', level: 'N2', thumbnail: '📗', tags: ['JLPT', 'N2', 'Premium'], color: 'from-red-500 to-rose-600' },
  { slug: 'premium/n1-1', title: 'JLPT N1 Mock Exam 1', description: 'Master level examination', sections: 3, questions: 50, duration: '120 minutes', level: 'N1', thumbnail: '📙', tags: ['JLPT', 'N1', 'Premium'], color: 'from-pink-500 to-fuchsia-600' },
  { slug: 'premium/n1-2', title: 'JLPT N1 Mock Exam 2', description: 'Master level examination', sections: 3, questions: 50, duration: '120 minutes', level: 'N1', thumbnail: '📙', tags: ['JLPT', 'N1', 'Premium'], color: 'from-pink-500 to-fuchsia-600' },
];

export default function FreeExamsPage() {
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  const filteredFree = freeExams.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.level.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-white/20 text-white border-white/30 text-base px-4 py-1">🆓 Free Practice Exams</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Japanese Language Practice Exams</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              6 free sample exams. No login required. Unlock premium exams by creating a free account.
            </p>
            <div className="max-w-md mx-auto mt-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input placeholder="Search exams..." className="pl-12 h-14 text-gray-900 text-lg" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* FREE EXAMS */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <Unlock className="h-6 w-6 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">Free Sample Exams</h2>
            <Badge variant="success" className="text-sm">No Login Required</Badge>
          </div>
          <p className="text-gray-500 mb-6">Start practicing immediately. No account needed.</p>

          {filteredFree.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No exams match your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFree.map((exam, i) => (
                <motion.div key={exam.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={`/free-exams/${exam.slug}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all group h-full cursor-pointer border-2 border-green-200 hover:border-green-400">
                      <div className={`h-36 bg-gradient-to-br ${exam.color} flex items-center justify-center relative`}>
                        <span className="text-6xl">{exam.thumbnail}</span>
                        <Badge className="absolute top-3 left-3 bg-white text-green-700 font-bold shadow"><Unlock className="h-3 w-3 mr-1" /> FREE</Badge>
                        <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700 font-bold">{exam.level}</Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {exam.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-green-600 transition-colors line-clamp-2">{exam.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{exam.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> {exam.questions} Qs</span>
                          <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {exam.sections} Sections</span>
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {exam.duration}</span>
                        </div>
                        <Button variant="gradient" size="sm" className="w-full bg-green-600 hover:bg-green-700">
                          <Unlock className="mr-2 h-4 w-4" /> Start Free Exam
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-50 px-6 text-sm text-gray-400 font-medium">
              {user ? '✓ Premium Unlocked' : '🔒 Premium Section'}
            </span>
          </div>
        </div>

        {/* PREMIUM EXAMS */}
        {!user ? (
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="border-2 border-yellow-300 shadow-xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500" />
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">Unlock Premium Exams</h3>
                  <p className="text-gray-600 mb-2">N3 • N2 • N1 Level Exams</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {['N3 Mock Tests', 'N2 Mock Tests', 'N1 Mock Tests', 'Detailed Answers', 'Score Tracking', 'Unlimited Attempts'].map((f, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{f}</Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Create a free account to access all premium exams.</p>
                  <div className="flex gap-3 justify-center">
                    <Link href="/register">
                      <Button variant="gradient" size="lg"><Sparkles className="mr-2 h-5 w-5" /> Create Free Account</Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="outline" size="lg"><Lock className="mr-2 h-4 w-4" /> Login</Button>
                    </Link>
                  </div>
                  <p className="text-xs text-gray-400 mt-4">No credit card required.</p>
                </CardContent>
              </Card>
            </motion.div>
            <div className="mt-8 opacity-30 pointer-events-none select-none">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-bold text-gray-400">Premium Exams Preview</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {premiumExams.slice(0, 3).map((exam) => (
                  <div key={exam.slug} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className={`h-20 bg-gradient-to-br ${exam.color} rounded-lg flex items-center justify-center mb-3`}>
                      <span className="text-3xl">{exam.thumbnail}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-400">{exam.title}</p>
                    <p className="text-xs text-gray-400">{exam.level} • {exam.questions} Questions</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Premium Exams</h2>
              <Badge variant="success" className="text-sm">Unlocked ✓</Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumExams.map((exam, i) => (
                <motion.div key={exam.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                  <Link href={`/free-exams/${exam.slug}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all group h-full cursor-pointer border-2 border-yellow-200 hover:border-yellow-400">
                      <div className={`h-36 bg-gradient-to-br ${exam.color} flex items-center justify-center relative`}>
                        <span className="text-6xl">{exam.thumbnail}</span>
                        <Badge className="absolute top-3 left-3 bg-yellow-500 text-white font-bold shadow"><Star className="h-3 w-3 mr-1" /> PREMIUM</Badge>
                        <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700 font-bold">{exam.level}</Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {exam.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">{exam.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{exam.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> {exam.questions} Qs</span>
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {exam.duration}</span>
                        </div>
                        <Button variant="gradient" size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700">
                          <Star className="mr-2 h-4 w-4" /> Start Premium Exam
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}