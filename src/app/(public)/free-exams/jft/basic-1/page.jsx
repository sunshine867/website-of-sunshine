// src/app/exam/jft-basic-1/page.js


'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ExamPlayer from '@/components/exam/exam-player';
import { Button } from '@/components/ui/button';

 
const sections = [
  // ============================================
  // SECTION 1: Script and Vocabulary (10 Questions)
  // ============================================
  {
    title: 'Script and Vocabulary',
    questions: [
      {
        id: 's1q1',
        questionNumber: 1,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft1-q1.jpg',
        options: [
          { label: 'A', text: 'やくそくします', value: 'A' },
          { label: 'B', text: 'よていをします', value: 'B' },
          { label: 'C', text: 'やります', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q2',
        questionNumber: 2,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft1-q2.jpg',
        options: [
          { label: 'A', text: 'しゅくだいをします', value: 'A' },
          { label: 'B', text: 'けんがくをします', value: 'B' },
          { label: 'C', text: 'けんかをします', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q3',
        questionNumber: 3,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft1-q3.jpg',
        options: [
          { label: 'A', text: 'サンドイッチ', value: 'A' },
          { label: 'B', text: 'サラダ', value: 'B' },
          { label: 'C', text: 'カレー', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q4',
        questionNumber: 4,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: '毎朝、花に水を(______)います。',
        options: [
          { label: 'A', text: '入れて', value: 'A' },
          { label: 'B', text: 'やって', value: 'B' },
          { label: 'C', text: '入って', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q5',
        questionNumber: 5,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: 'このごろはお金 (_______) 大変です。',
        options: [
          { label: 'A', text: 'ないで', value: 'A' },
          { label: 'B', text: 'なくて', value: 'B' },
          { label: 'C', text: 'なくても', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q6',
        questionNumber: 6,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: 'この肉は(________), いいです。',
        options: [
          { label: 'A', text: 'ひろくて', value: 'A' },
          { label: 'B', text: 'かたい', value: 'B' },
          { label: 'C', text: 'やわらかくて', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q7',
        questionNumber: 7,
        instruction: 'How do you write the underlined kanji word in hiragana? Choose the correct one.',
        questionText: '大きな声で呼んだのに (返事) がありません。',
        options: [
          { label: 'A', text: 'しごと', value: 'A' },
          { label: 'B', text: 'べんじ', value: 'B' },
          { label: 'C', text: 'へんじ', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q8',
        questionNumber: 8,
        instruction: 'How do you write the underlined kanji word in hiragana? Choose the correct one.',
        questionText: 'ここは木が倒れているので (通れません)。',
        options: [
          { label: 'A', text: 'とおれません', value: 'A' },
          { label: 'B', text: 'とうれません', value: 'B' },
          { label: 'C', text: 'どうれません', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q9',
        questionNumber: 9,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: '早くひらがなが(________ ) 練習をしています。',
        options: [
          { label: 'A', text: '読めるように', value: 'A' },
          { label: 'B', text: '読める', value: 'B' },
          { label: 'C', text: '読めるために', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q10',
        questionNumber: 10,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: '夜、バスがなくて、友達のうちに (_______)ことがあります。',
        options: [
          { label: 'A', text: '止まった', value: 'A' },
          { label: 'B', text: '泊まった', value: 'B' },
          { label: 'C', text: '入った', value: 'C' },
        ],
        correctAnswer: 'B',
      },
    ],
  },

  // ============================================
  // SECTION 2: Conversation and Expression (10 Questions)
  // ============================================
  {
    title: 'Conversation and Expression',
    questions: [
      {
        id: 's2q1',
        questionNumber: 1,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'ジョイ: 日本の人はどうやって食事をしますか。\n田中: はしと茶わんで食事をします。\nジョイ: 茶わんは手で(__________)。\n田中: はい、手で持ちます。',
        options: [
          { label: 'A', text: 'まちます', value: 'A' },
          { label: 'B', text: 'もちます', value: 'B' },
          { label: 'C', text: 'めします', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q2',
        questionNumber: 2,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'きゃく: すみません、メコンのカメラはあります。\n店員: はい、こちらです。\nきゃく: (_____________)\n店員: これは五万六千円です。',
        options: [
          { label: 'A', text: 'いくらになりますか', value: 'A' },
          { label: 'B', text: 'いつになりますか', value: 'B' },
          { label: 'C', text: 'いくつになりますか', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's2q3',
        questionNumber: 3,
        instruction: 'Two friends are talking about alcohol. Read the dialog and choose the phrase that fits.',
        questionText: 'リン: パクさんはお酒をよく飲みますか。\nパク: 私はお酒があまり好きではありませんが、ときどき飲みますよ。あなたはどうですか。\nリン: 私の家族は、みんなお酒が好きですから、たくさん飲みます。でも、わたしはぜんぜん(________________)',
        options: [
          { label: 'A', text: 'のみました', value: 'A' },
          { label: 'B', text: 'のみません', value: 'B' },
          { label: 'C', text: 'のみます', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q4',
        questionNumber: 4,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: すみません。田中課長いらっしゃいますか。\nB: はい、おります。少々(______________)',
        options: [
          { label: 'A', text: '持つください', value: 'A' },
          { label: 'B', text: 'お持ちください', value: 'B' },
          { label: 'C', text: 'お待ちください', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q5',
        questionNumber: 5,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: (____________). 具合が悪いそうですね。\nB: ええ、ちょっと頭がいたくて。\nA: 大丈夫ですか。\nB: すみませんが、休んでもいいですか。',
        options: [
          { label: 'A', text: 'こんにちは', value: 'A' },
          { label: 'B', text: 'どうしたんですか', value: 'B' },
          { label: 'C', text: 'はい', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q6',
        questionNumber: 6,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: 何がいいですか。\nB: ジュースがいいです。\nA: すみません。ジュースとコーラをお願いします。\nB: はい、ジュースとコーラですね。(____________).',
        options: [
          { label: 'A', text: 'どうぞよろしく', value: 'A' },
          { label: 'B', text: 'かしこまりました', value: 'B' },
          { label: 'C', text: 'はい、そうします', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q7',
        questionNumber: 7,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: 好きな季節はいつですか。\nB: 秋が一番好きです。\nA: (___________________).\nB: 食べ物がおいしいですから。',
        options: [
          { label: 'A', text: 'どうしたんですか', value: 'A' },
          { label: 'B', text: 'どうしてですか', value: 'B' },
          { label: 'C', text: 'どれですか', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q8',
        questionNumber: 8,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: もしもし、ジョイさんですか。田中です。\nB: お久しぶりです。田中さん、お元気ですか。\nA: はい、元気です。こっちは今雨が降っています。\nB: (__________________)\nA: そっちはどうですか。\nB: いい天気です。',
        options: [
          { label: 'A', text: 'だいじょうぶですか', value: 'A' },
          { label: 'B', text: 'いいです', value: 'B' },
          { label: 'C', text: 'たいへんですね', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q9',
        questionNumber: 9,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: 先生は今どちらですか。\nB: 先生は今図書館に (_____________)',
        options: [
          { label: 'A', text: 'ございます', value: 'A' },
          { label: 'B', text: 'おっしゃいます', value: 'B' },
          { label: 'C', text: 'いらっしゃいます', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q10',
        questionNumber: 10,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: 昨日から少しねつがあって頭がいたいです。\nB: それは、(_________)',
        options: [
          { label: 'A', text: 'おげんきで', value: 'A' },
          { label: 'B', text: 'いけませんね', value: 'B' },
          { label: 'C', text: 'しつれいします', value: 'C' },
        ],
        correctAnswer: 'B',
      },
    ],
  },

  // ============================================
  // SECTION 3: Listening and Comprehension (10 Questions)
  // ============================================
  {
    title: 'Listening and Comprehension',
    questions: [
      {
        id: 's3q1',
        questionNumber: 1,
        instruction: 'Listen to the audio. Two people are talking about Tokyo. What is the answer?',
        audio: '/audio/jft-q1.mp3',
        image: '/images/jft1-q4.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'D',
      },
      {
        id: 's3q2',
        questionNumber: 2,
        instruction: 'Listen to the audio about eco-friendly activities. What does she do to protect the environment?',
        audio: '/audio/jft-q2.mp3',
        image: '/images/jft1-q5.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's3q3',
        questionNumber: 3,
        instruction: '3 people are talking in the exhibition hall. What are they talking about?',
        audio: '/audio/jft-q3.mp3',
        image: '/images/jft1-q6.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's3q4',
        questionNumber: 4,
        instruction: 'What was the present given by Nodasan?',
        audio: '/audio/jft-q4.mp3',
        image: '/images/jft1-q7.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's3q5',
        questionNumber: 5,
        instruction: 'What would that person do if a hole opened and couldn\'t wear socks anymore?',
        audio: '/audio/jft-q5.mp3',
        image: '/images/jft1-q8.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's3q6',
        questionNumber: 6,
        instruction: 'Listen to the audio about Kimusan. What kind of child is he?',
        audio: '/audio/jft-q6.mp3',
        image: '/images/jft1-q9.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's3q7',
        questionNumber: 7,
        instruction: 'What kind of food manners are in France? Choose the correct answer.',
        audio: '/audio/jft-q7.mp3',
        image: '/images/jft1-q10.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's3q8',
        questionNumber: 8,
        instruction: 'Listen to the audio about food order in a restaurant. Choose order number 02.',
        audio: '/audio/jft-q8.mp3',
        image: '/images/jft1-q11.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's3q9',
        questionNumber: 9,
        instruction: 'According to the audio, how did Saito san become a fan of Yamashita Senshu?',
        audio: '/audio/jft-q9.mp3',
        image: '/images/jft1-q12.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's3q10',
        questionNumber: 10,
        instruction: 'According to the audio, what is this person doing during the year?',
        audio: '/audio/jft-q10.mp3',
        image: '/images/jft1-q13.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
        ],
        correctAnswer: 'B',
      },
    ],
  },

  // ============================================
  // SECTION 4: Reading Comprehension (10 Questions)
  // ============================================
  {
    title: 'Reading Comprehension',
    questions: [
      {
        id: 's4q1',
        questionNumber: 1,
        instruction: 'カーラさんはどのときまで自分で日本語をならいましたか。',
        image: '/images/jft1-q14.jpg',
        options: [
          { label: 'A', text: '大学を卒業するまで', value: 'A' },
          { label: 'B', text: '専門学校を卒業するまで', value: 'B' },
          { label: 'C', text: '高校を卒業するまで', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q2',
        questionNumber: 2,
        instruction: '正しいものはどれか。',
        image: '/images/jft1-q15.jpg',
        options: [
          { label: 'A', text: 'なかむらさんは10回以上京都へ来ました。', value: 'A' },
          { label: 'B', text: 'ルさんはしょかい京都へきました。', value: 'B' },
          { label: 'C', text: 'キムさんは1回も京都へ来たことがありません。', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q3',
        questionNumber: 3,
        instruction: '説明にあうのはどれか。',
        image: '/images/jft1-q16.jpg',
        options: [
          { label: 'A', text: '私は去年父に青いネクタイをあげました。', value: 'A' },
          { label: 'B', text: '私は今年父の日に青いシャツをあげます。', value: 'B' },
          { label: 'C', text: '私は去年より今年も父にプレゼントをあげたいです。', value: 'C' },
          { label: 'D', text: '赤いは父の好きないろです。', value: 'D' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q4',
        questionNumber: 4,
        instruction: '正しいものはどれか。',
        image: '/images/jft1-q17.jpg',
        options: [
          { label: 'A', text: 'この人は漢字がとてもじょうずです。', value: 'A' },
          { label: 'B', text: 'この人は日本語は何でも読めます。', value: 'B' },
          { label: 'C', text: 'この人は日本語と日本文化が好きです。', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q5',
        questionNumber: 5,
        instruction: 'メロスはどうして町に来ましたか。',
        image: '/images/jft1-q18.jpg',
        options: [
          { label: 'A', text: 'おうさまを会うために', value: 'A' },
          { label: 'B', text: '妹の結婚式の買い物のために', value: 'B' },
          { label: 'C', text: 'メロスのしんせきを会うために', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q6',
        questionNumber: 6,
        instruction: 'どうしてこの男の人は30分おくれますか。',
        image: '/images/jft1-q19.jpg',
        options: [
          { label: 'A', text: '病気ですから', value: 'A' },
          { label: 'B', text: 'バスがこなかったから', value: 'B' },
          { label: 'C', text: '事故があったから', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q7',
        questionNumber: 7,
        instruction: 'レストラン「ハンナ」はどんなレストランですか。',
        image: '/images/jft1-q20.jpg',
        options: [
          { label: 'A', text: 'ファミリーレストランです', value: 'A' },
          { label: 'B', text: 'ようしょくのレストランです', value: 'B' },
          { label: 'C', text: 'アメリカのレストランです', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q8',
        questionNumber: 8,
        instruction: '一番目の男の子と言うのは何の意味ですか。',
        image: '/images/jft1-q21.jpg',
        options: [
          { label: 'A', text: '家族ではじめにうまれた女の子', value: 'A' },
          { label: 'B', text: '家族ではじめにうまれた男の子', value: 'B' },
          { label: 'C', text: '家族の一人っ子', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q9',
        questionNumber: 9,
        instruction: '女の人はどうやってほっかいどうへ行きますか。',
        image: '/images/jft1-q22.jpg',
        options: [
          { label: 'A', text: 'ふね', value: 'A' },
          { label: 'B', text: 'バスで', value: 'B' },
          { label: 'C', text: 'ひこうきで', value: 'C' },
          { label: 'D', text: '車で', value: 'D' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q10',
        questionNumber: 10,
        instruction: '日本語を学びたいです。どこへ行きますか。',
        image: '/images/jft1-q23.jpg',
        options: [
          { label: 'A', text: '7のストール', value: 'A' },
          { label: 'B', text: '2時にステージの前', value: 'B' },
          { label: 'C', text: '10時にステージの前', value: 'C' },
        ],
        correctAnswer: 'B',
      },
    ],
  },
];

export default function JFTBasic1Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-4">
          <Link href="/free-exams" className="inline-flex items-center">
            <Button variant="outline" size="sm" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Exams
            </Button>
          </Link>
        </div>

        {/* Exam Player */}
        <ExamPlayer
          title="JFT-Basic Sample Exam 1"
          level="A2"
          type="FREE"
          sections={sections}
          totalMarks={250}
          passingMarks={200}
          durationMinutes={60}
        />
      </div>
    </div>
  );
}
