// 'use client';

// import { useParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent } from '@/components/ui/card';
// import { useAuth } from '@/components/providers/auth-provider';
// import { 
//   ArrowLeft, Clock, FileText, BookOpen,
//   Star, Lock, Unlock, CheckCircle, Sparkles
// } from 'lucide-react';

// // Exam database - maps slug to HTML file
// const examDatabase = {
//   // FREE EXAMS
//   'jft-basic-1': { title: 'JFT-Basic Sample Exam 1', type: 'FREE', level: 'A2', questions: 40, duration: '60 minutes', htmlFile: '/exams/jft1.html', thumbnail: '📝' },
//   'jft-basic-2': { title: 'JFT-Basic Sample Exam 2', type: 'FREE', level: 'A2', questions: 40, duration: '60 minutes', htmlFile: '/exams/jft2.html', thumbnail: '📝' },
//   'jlpt-n5-sample-2': { title: 'JLPT N5 Sample Exam 2', type: 'FREE', level: 'N5', questions: 35, duration: '50 minutes', htmlFile: '/exams/jft3.html', thumbnail: '📚' },
//   'jlpt-n5-sample-1': { title: 'JLPT N5 Sample Exam 1', type: 'FREE', level: 'N5', questions: 35, duration: '50 minutes', htmlFile: '/exams/jft4.html', thumbnail: '📚' },
//   'jlpt-n4-sample-1': { title: 'JLPT N4 Sample Exam 1', type: 'FREE', level: 'N4', questions: 35, duration: '60 minutes', htmlFile: '/exams/jft5.html', thumbnail: '📖' },
//   'jlpt-n4-sample-2': { title: 'JLPT N4 Sample Exam 2', type: 'FREE', level: 'N4', questions: 35, duration: '60 minutes', htmlFile: '/exams/jft6.html', thumbnail: '📖' },
  
//   // Also support .html slugs directly
//   'jft1': { title: 'JFT-Basic Sample Exam 1', type: 'FREE', level: 'A2', questions: 40, duration: '60 minutes', htmlFile: '/exams/jft1.html', thumbnail: '📝' },
//   'jft1.html': { title: 'JFT-Basic Sample Exam 1', type: 'FREE', level: 'A2', questions: 40, duration: '60 minutes', htmlFile: '/exams/jft1.html', thumbnail: '📝' },
  
//   // PREMIUM EXAMS
//   'jlpt-n3-mock-1': { title: 'JLPT N3 Mock Exam 1', type: 'PREMIUM', level: 'N3', questions: 40, duration: '90 minutes', htmlFile: '/exams/jlpt-n3-mock-1.html', thumbnail: '📕' },
//   'jlpt-n3-mock-2': { title: 'JLPT N3 Mock Exam 2', type: 'PREMIUM', level: 'N3', questions: 40, duration: '90 minutes', htmlFile: '/exams/jlpt-n3-mock-2.html', thumbnail: '📕' },
//   'jlpt-n2-mock-1': { title: 'JLPT N2 Mock Exam 1', type: 'PREMIUM', level: 'N2', questions: 45, duration: '105 minutes', htmlFile: '/exams/jlpt-n2-mock-1.html', thumbnail: '📗' },
//   'jlpt-n2-mock-2': { title: 'JLPT N2 Mock Exam 2', type: 'PREMIUM', level: 'N2', questions: 45, duration: '105 minutes', htmlFile: '/exams/jlpt-n2-mock-2.html', thumbnail: '📗' },
//   'jlpt-n1-mock-1': { title: 'JLPT N1 Mock Exam 1', type: 'PREMIUM', level: 'N1', questions: 50, duration: '120 minutes', htmlFile: '/exams/jlpt-n1-mock-1.html', thumbnail: '📙' },
//   'jlpt-n1-mock-2': { title: 'JLPT N1 Mock Exam 2', type: 'PREMIUM', level: 'N1', questions: 50, duration: '120 minutes', htmlFile: '/exams/jlpt-n1-mock-2.html', thumbnail: '📙' },
// };

// export default function FreeExamDetailPage() {
//   const { slug } = useParams();
//   const { user } = useAuth();
//   const [examContent, setExamContent] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Clean the slug - remove .html if present for lookup, but keep original for file path
//   const cleanSlug = slug?.replace('.html', '');
//   const exam = examDatabase[slug] || examDatabase[cleanSlug];

//   useEffect(() => {
//     if (exam?.htmlFile) {
//       loadExamHTML(exam.htmlFile);
//     } else {
//       setIsLoading(false);
//       setError('Exam not found in database');
//     }
//   }, [slug]);

//   const loadExamHTML = async (url) => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       console.log('Loading exam from:', url); // Debug log
      
//       const response = await fetch(url);
      
//       if (!response.ok) {
//         throw new Error(`Failed to load exam: ${response.status} ${response.statusText}`);
//       }
      
//       const html = await response.text();
      
//       // Replace Myanmar text with English
//       let modifiedHtml = html
//         .replace(/မှတ်ချက်-စာမေးပွဲတွင် အချိန်မှီ section မEnd ပါက Auto failed ဖြစ်နိုင်ပါသည်/g, 
//           'Note: If you do not complete all sections before the time runs out, you may automatically fail.')
//         .replace(/ပြန်သွားမည်/g, 'Back to Main Menu')
//         .replace(/အချိန်ပြည့်သွားပါပြီ/g, 'Time is up!');
      
//       // Fix image paths - make sure they work from /public
//       modifiedHtml = modifiedHtml.replace(/src="(?!http|\/|https)/g, 'src="/images/');
//       modifiedHtml = modifiedHtml.replace(/src="images\//g, 'src="/images/');
      
//       // Fix audio paths
//       modifiedHtml = modifiedHtml.replace(/src="(?!http|\/|https)([^"]*\.mp3)/g, 'src="/audio/$1');
//       modifiedHtml = modifiedHtml.replace(/src="audio\//g, 'src="/audio/');
      
//       setExamContent(modifiedHtml);
//     } catch (err) {
//       console.error('Failed to load exam:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading exam...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !exam) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="text-center max-w-md">
//           <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-500 mb-2">
//             {error ? 'Error Loading Exam' : 'Exam Not Found'}
//           </h2>
//           <p className="text-gray-400 mb-2">
//             {error || `The exam "${slug}" was not found.`}
//           </p>
//           <p className="text-xs text-gray-400 mb-4">
//             Check that the HTML file exists in: public/exams/
//           </p>
//           <div className="flex gap-3 justify-center">
//             <Link href="/free-exams">
//               <Button variant="gradient">View All Exams</Button>
//             </Link>
//             <Button variant="outline" onClick={() => loadExamHTML(exam?.htmlFile || `/exams/${slug}`)}>
//               Retry
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Premium exam - not logged in
//   if (exam.type === 'PREMIUM' && !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full text-center">
//           <Card>
//             <CardContent className="p-8">
//               <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Star className="h-8 w-8 text-yellow-600" />
//               </div>
//               <Badge variant="warning" className="mb-2">{exam.level} Level</Badge>
//               <h2 className="text-2xl font-bold mb-2">{exam.title}</h2>
//               <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
//                 <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> {exam.questions} Qs</span>
//                 <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {exam.duration}</span>
//               </div>
//               <div className="bg-yellow-50 rounded-lg p-4 mb-6">
//                 <Lock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
//                 <p className="text-sm text-gray-600">This is a premium exam. Create a free account to access.</p>
//               </div>
//               <div className="flex gap-3 justify-center">
//                 <Link href={`/login?callbackUrl=/free-exams/${slug}`}>
//                   <Button variant="gradient">Login</Button>
//                 </Link>
//                 <Link href="/register">
//                   <Button variant="outline">Register Free</Button>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     );
//   }

//   // Show exam
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//           <Link href="/free-exams" className="flex items-center text-gray-500 hover:text-gray-700">
//             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exams
//           </Link>
//           <div className="flex items-center gap-3">
//             <Badge variant={exam.type === 'FREE' ? 'success' : 'warning'}>
//               {exam.type === 'FREE' ? <Unlock className="h-3 w-3 mr-1" /> : <Star className="h-3 w-3 mr-1" />}
//               {exam.type === 'FREE' ? 'Free' : 'Premium'}
//             </Badge>
//             <Badge variant="outline">{exam.level}</Badge>
//             <span className="text-sm text-gray-500 flex items-center gap-1">
//               <Clock className="h-4 w-4" /> {exam.duration}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Exam HTML Content */}
//       <div 
//         className="exam-content-wrapper"
//         dangerouslySetInnerHTML={{ __html: examContent }} 
//       />

//       {/* After Exam CTA - for free exams when not logged in */}
//       {exam.type === 'FREE' && !user && (
//         <div className="max-w-2xl mx-auto px-4 pb-12">
//           <Card className="bg-gradient-to-r from-blue-50 to-sky-50 border-2 border-blue-200 mt-8">
//             <CardContent className="p-8 text-center">
//               <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
//               <h3 className="text-xl font-bold mb-2">Want to Track Your Progress?</h3>
//               <p className="text-gray-600 mb-6">
//                 Create a free account to save scores, access 20+ premium exams, and track your learning!
//               </p>
//               <div className="flex gap-3 justify-center">
//                 <Link href="/register">
//                   <Button variant="gradient" size="lg">
//                     <Sparkles className="mr-2 h-5 w-5" /> Create Free Account
//                   </Button>
//                 </Link>
//                 <Link href="/login">
//                   <Button variant="outline" size="lg">Login</Button>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );

// }





'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/components/providers/auth-provider';
import { ArrowLeft, Clock, FileText, Star, Lock, Unlock, CheckCircle, Sparkles } from 'lucide-react';

const examDatabase = {
  'jft-basic-1': { title: 'JFT-Basic Sample Exam 1', type: 'FREE', level: 'A2', questions: 40, duration: '60 minutes', htmlFile: '/exams/jft1.html', thumbnail: '📝' },
  'jft-basic-2': { title: 'JFT-Basic Sample Exam 2', type: 'FREE', level: 'A2', questions: 40, duration: '60 minutes', htmlFile: '/exams/jft2.html', thumbnail: '📝' },
  'jlpt-n5-sample-1': { title: 'JLPT N5 Sample Exam 1', type: 'FREE', level: 'N5', questions: 35, duration: '50 minutes', htmlFile: '/exams/jft4.html', thumbnail: '📚' },
  'jlpt-n5-sample-2': { title: 'JLPT N5 Sample Exam 2', type: 'FREE', level: 'N5', questions: 35, duration: '50 minutes', htmlFile: '/exams/jft3.html', thumbnail: '📚' },
  'jlpt-n4-sample-1': { title: 'JLPT N4 Sample Exam 1', type: 'FREE', level: 'N4', questions: 35, duration: '60 minutes', htmlFile: '/exams/jft5.html', thumbnail: '📖' },
  'jlpt-n4-sample-2': { title: 'JLPT N4 Sample Exam 2', type: 'FREE', level: 'N4', questions: 35, duration: '60 minutes', htmlFile: '/exams/jft6.html', thumbnail: '📖' },
  'jft1': { title: 'JFT-Basic Sample Exam 1', type: 'FREE', level: 'A2', questions: 40, duration: '60 minutes', htmlFile: '/exams/jft1.html', thumbnail: '📝' },
  'jft1.html': { title: 'JFT-Basic Sample Exam 1', type: 'FREE', level: 'A2', questions: 40, duration: '60 minutes', htmlFile: '/exams/jft1.html', thumbnail: '📝' },
  'jlpt-n3-mock-1': { title: 'JLPT N3 Mock Exam 1', type: 'PREMIUM', level: 'N3', questions: 40, duration: '90 minutes', htmlFile: '/exams/jlpt-n3-mock-1.html', thumbnail: '📕' },
  'jlpt-n3-mock-2': { title: 'JLPT N3 Mock Exam 2', type: 'PREMIUM', level: 'N3', questions: 40, duration: '90 minutes', htmlFile: '/exams/jlpt-n3-mock-2.html', thumbnail: '📕' },
  'jlpt-n2-mock-1': { title: 'JLPT N2 Mock Exam 1', type: 'PREMIUM', level: 'N2', questions: 45, duration: '105 minutes', htmlFile: '/exams/jlpt-n2-mock-1.html', thumbnail: '📗' },
  'jlpt-n2-mock-2': { title: 'JLPT N2 Mock Exam 2', type: 'PREMIUM', level: 'N2', questions: 45, duration: '105 minutes', htmlFile: '/exams/jlpt-n2-mock-2.html', thumbnail: '📗' },
  'jlpt-n1-mock-1': { title: 'JLPT N1 Mock Exam 1', type: 'PREMIUM', level: 'N1', questions: 50, duration: '120 minutes', htmlFile: '/exams/jlpt-n1-mock-1.html', thumbnail: '📙' },
  'jlpt-n1-mock-2': { title: 'JLPT N1 Mock Exam 2', type: 'PREMIUM', level: 'N1', questions: 50, duration: '120 minutes', htmlFile: '/exams/jlpt-n1-mock-2.html', thumbnail: '📙' },
};

export default function FreeExamDetailPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [examContent, setExamContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  const cleanSlug = slug?.replace('.html', '');
  const exam = examDatabase[slug] || examDatabase[cleanSlug];

  useEffect(() => {
    if (exam?.htmlFile) {
      loadExamHTML(exam.htmlFile);
    } else {
      setIsLoading(false);
      setError(`Exam "${slug}" not found`);
    }
  }, [slug]);

  const loadExamHTML = async (url) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`404 Not Found: ${url}`);
      
      let html = await response.text();
      
      // COMPLETELY REMOVE all script tags
      html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      
      // Remove onclick handlers that reference undefined functions
      html = html.replace(/onclick="goToNextQuestion\(.*?\)"/gi, 'class="next-btn-click"');
      html = html.replace(/onclick="finishSection\(.*?\)"/gi, 'class="finish-section-btn"');
      html = html.replace(/onclick="window\.location\.href='index\.html'"/gi, 'class="back-to-menu-btn"');
      
      // Fix image paths
      html = html.replace(/src="(?!http|\/|https)([^"]*\.(jpg|png|jpeg|gif|webp))"/gi, 'src="/images/$1"');
      
      // Fix audio paths
      html = html.replace(/src="(?!http|\/|https)([^"]*\.mp3)"/gi, 'src="/audio/$1"');
      
      setExamContent(html);
    } catch (err) {
      console.error('Failed to load exam:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Inject JavaScript after HTML is rendered
  useEffect(() => {
    if (!examContent || !containerRef.current) return;

    const container = containerRef.current;
    
    // ============================================
    // GLOBAL FUNCTIONS for exam
    // ============================================
    let sectionScores = [];
    const playCounts = {};
    let timeLeft = 60 * 60;
    let timerInterval;
    let isTimeout = false;
    let currentSection = 1;
    let currentQuestion = 0;

    // Init audio play counts
    for (let i = 1; i <= 10; i++) playCounts[`audio${i}`] = 2;

    // Timer
    function startTimer() {
      clearInterval(timerInterval);
      timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
      timeLeft--;
      const timerEl = container.querySelector('#timer');
      if (!timerEl) return;
      timerEl.classList.remove('warning', 'danger');
      if (timeLeft <= 300) timerEl.classList.add('danger');
      else if (timeLeft <= 600) timerEl.classList.add('warning');
      if (timeLeft <= 0) { clearInterval(timerInterval); timeLeft = 0; isTimeout = true; autoSubmitExam(); }
      const m = Math.floor(timeLeft / 60);
      const s = timeLeft % 60;
      timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    function autoSubmitExam() {
      for (let i = 1; i <= 4; i++) forceFinishSection(i);
      showFinalScore();
    }

    // Audio limits
    for (let i = 1; i <= 10; i++) {
      const audio = container.querySelector(`#audio${i}`);
      if (audio) {
        audio.addEventListener('play', function() {
          if (playCounts[`audio${i}`] > 0) {
            playCounts[`audio${i}`]--;
            const pc = container.querySelector(`#playCount${i}`);
            if (pc) pc.textContent = playCounts[`audio${i}`];
            if (playCounts[`audio${i}`] === 0) audio.onended = () => { audio.controls = false; };
          } else {
            audio.pause();
            alert("You've used all your plays for this audio.");
          }
        });
      }
    }

    // Question navigation
    function showQuestion(index, secNum) {
      const section = container.querySelector(`#section${secNum}`);
      if (!section) return;
      const questions = section.querySelectorAll('.question-block');
      const navBtns = section.querySelectorAll('.question-btn');
      questions.forEach(q => q.style.display = 'none');
      if (questions[index]) questions[index].style.display = 'block';
      navBtns.forEach(b => b.classList.remove('active'));
      if (navBtns[index]) navBtns[index].classList.add('active');
      currentQuestion = index;
      currentSection = secNum;
    }

    function goToNextQuestion() {
      const section = container.querySelector(`#section${currentSection}`);
      if (!section) return;
      const questions = section.querySelectorAll('.question-block');
      if (currentQuestion + 1 < questions.length) showQuestion(currentQuestion + 1, currentSection);
    }

    function finishSection(sectionNum) {
      const section = container.querySelector(`#section${sectionNum}`);
      if (!section) return;
      const questions = section.querySelectorAll('.question-block');
      const warningBox = container.querySelector(`#warning${sectionNum}`);
      let allAnswered = true;
      questions.forEach(q => {
        const radios = q.querySelectorAll('input[type=radio]');
        let answered = false;
        radios.forEach(r => { if (r.checked) answered = true; });
        if (!answered) allAnswered = false;
      });
      if (!allAnswered) { if (warningBox) warningBox.style.display = 'block'; return; }
      if (warningBox) warningBox.style.display = 'none';
      calculateScore(sectionNum, questions);
    }

    function forceFinishSection(sectionNum) {
      const section = container.querySelector(`#section${sectionNum}`);
      if (!section) return;
      const questions = section.querySelectorAll('.question-block');
      questions.forEach(q => {
        const radios = q.querySelectorAll('input[type=radio]');
        let answered = false;
        radios.forEach(r => { if (r.checked) answered = true; });
        if (!answered && radios.length > 0) radios[0].checked = true;
      });
      calculateScore(sectionNum, questions);
    }

    function calculateScore(sectionNum, questions) {
      let correct = 0;
      questions.forEach(q => {
        const radios = q.querySelectorAll('input[type=radio]');
        radios.forEach(r => { if (r.checked && r.value === '1') correct++; });
      });
      const percent = (correct / questions.length) * 100;
      sectionScores.push({ section: sectionNum, score: percent });
      const sectionEl = container.querySelector(`#section${sectionNum}`);
      if (sectionEl) sectionEl.style.display = 'none';
      if (sectionNum < 4) {
        currentSection = sectionNum + 1;
        const nextSection = container.querySelector(`#section${currentSection}`);
        if (nextSection) nextSection.style.display = 'block';
        showQuestion(0, currentSection);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        showFinalScore();
      }
    }

    function showFinalScore() {
      clearInterval(timerInterval);
      const tc = container.querySelector('#timerContainer');
      if (tc) tc.style.display = 'none';
      const sectionNames = { 1: "Script and Vocabulary", 2: "Conversation and Expression", 3: "Listening and Comprehension", 4: "Reading Comprehension" };
      const totalAvg = sectionScores.reduce((s, sec) => s + sec.score, 0) / 4;
      const totalScore = Math.round(totalAvg * 2.5);
      const pass = totalScore >= 200;
      const fs = container.querySelector('#final-score');
      if (fs) fs.style.display = 'block';
      const ts = container.querySelector('#total-score');
      if (ts) ts.innerHTML = `<div class="total-score-container"><h2>Exam Results</h2><div class="final-score-display ${pass ? 'pass' : 'fail'}">${totalScore} / 250<div class="result-label">${pass ? '🎉 PASSED' : '❌ FAILED'}</div></div></div>`;
      const ss = container.querySelector('#section-scores');
      if (ss) ss.innerHTML = `<h3>Section Breakdown</h3><div class="section-scores-container">${sectionScores.map(s => `<div class="section-score"><div class="section-header"><span>${sectionNames[s.section]}</span><span>${s.score.toFixed(1)}%</span></div><div class="progress-bar"><div class="progress-fill" style="width:${s.score}%"></div></div></div>`).join('')}</div>`;
    }

    // Attach event listeners to buttons
    container.querySelectorAll('.next-btn-click').forEach(btn => {
      btn.addEventListener('click', goToNextQuestion);
    });

    container.querySelectorAll('.finish-section-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => finishSection(i + 1));
    });

    container.querySelectorAll('.back-to-menu-btn').forEach(btn => {
      btn.addEventListener('click', () => { window.location.href = '/free-exams'; });
    });

    // Create question navigation
    for (let s = 1; s <= 4; s++) {
      const section = container.querySelector(`#section${s}`);
      if (!section) continue;
      const questions = section.querySelectorAll('.question-block');
      const existingNav = section.querySelector('.top-question-nav');
      if (existingNav) existingNav.remove();
      const nav = document.createElement('div');
      nav.className = 'top-question-nav';
      for (let i = 0; i < questions.length; i++) {
        const btn = document.createElement('button');
        btn.className = 'question-btn';
        btn.textContent = i + 1;
        btn.addEventListener('click', (() => { const idx = i; const sec = s; return () => showQuestion(idx, sec); })());
        nav.appendChild(btn);
      }
      section.insertBefore(nav, section.firstChild);
    }

    // Show first question
    const firstSection = container.querySelector('#section1');
    const firstQuestions = firstSection?.querySelectorAll('.question-block');
    if (firstQuestions) firstQuestions.forEach((q, i) => q.style.display = i === 0 ? 'block' : 'none');

    // Start timer
    startTimer();

    return () => clearInterval(timerInterval);
  }, [examContent]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading exam...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-500">Exam Not Available</h2>
          <p className="text-gray-400 text-sm mb-4">{error || 'Exam not found'}</p>
          <div className="flex gap-3 justify-center">
            <Link href="/free-exams"><Button variant="gradient">Back to Exams</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  // Premium check
  if (exam.type === 'PREMIUM' && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card><CardContent className="p-8 text-center">
          <Lock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <Badge variant="warning" className="mb-2">{exam.level}</Badge>
          <h2 className="text-xl font-bold mb-2">{exam.title}</h2>
          <p className="text-gray-500 mb-6">Login to access this premium exam.</p>
          <div className="flex gap-3 justify-center">
            <Link href={`/login?callbackUrl=/free-exams/${slug}`}><Button variant="gradient">Login</Button></Link>
            <Link href="/register"><Button variant="outline">Register Free</Button></Link>
          </div>
        </CardContent></Card>
      </div>
    );
  }

  // Show exam
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/free-exams" className="flex items-center text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exams
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="success">🆓 Free</Badge>
            <Badge variant="outline">{exam.level}</Badge>
            <span className="text-sm text-gray-500"><Clock className="inline h-4 w-4 mr-1" />{exam.duration}</span>
          </div>
        </div>
      </div>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: examContent }} />
    </div>
  );
}