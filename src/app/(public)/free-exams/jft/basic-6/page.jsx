// src/app/exam/jft-basic-6/page.js
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
        image: '/images/jft6-q1.jpg',
        options: [
          { label: 'A', text: 'りょうしん', value: 'A' },
          { label: 'B', text: 'りょしん', value: 'B' },
          { label: 'C', text: 'りょうじん', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q2',
        questionNumber: 2,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft6-q2.jpg',
        options: [
          { label: 'A', text: 'ジャム', value: 'A' },
          { label: 'B', text: 'ミルク', value: 'B' },
          { label: 'C', text: 'ライス', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q3',
        questionNumber: 3,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft6-q3.jpg',
        options: [
          { label: 'A', text: 'おけしょおをします', value: 'A' },
          { label: 'B', text: 'ひげそります', value: 'B' },
          { label: 'C', text: 'ふくをぬぎます', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q4',
        questionNumber: 4,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: '田中さんはまだ(_____)します。待ちましょう。',
        options: [
          { label: 'A', text: 'きがえて', value: 'A' },
          { label: 'B', text: 'きがえます', value: 'B' },
          { label: 'C', text: 'きがえる', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q5',
        questionNumber: 5,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: '雨がやんだら、母と(_______) と思っています。',
        options: [
          { label: 'A', text: '出かけた', value: 'A' },
          { label: 'B', text: '出かけない', value: 'B' },
          { label: 'C', text: '出かけてる', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q6',
        questionNumber: 6,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: '手にけがを(________)しまいました。',
        options: [
          { label: 'A', text: 'しに', value: 'A' },
          { label: 'B', text: 'して', value: 'B' },
          { label: 'C', text: 'した', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q7',
        questionNumber: 7,
        instruction: 'How do you write the underlined kanji word in hiragana. choose the correct one.',
        questionText: 'このしまには電気も (水道) もなくて、生活はとても便利です。',
        options: [
          { label: 'A', text: 'みずみち', value: 'A' },
          { label: 'B', text: 'すいどう', value: 'B' },
          { label: 'C', text: 'すいみち', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q8',
        questionNumber: 8,
        instruction: 'How do you write the underlined kanji word in hiragana. choose the correct one.',
        questionText: '(病院) はどこですか。',
        options: [
          { label: 'A', text: 'びょういん', value: 'A' },
          { label: 'B', text: 'びよういん', value: 'B' },
          { label: 'C', text: 'びよいん', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q9',
        questionNumber: 9,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: '田中さんは今日とても(________) そうですね。何かいいことがあったんです。',
        options: [
          { label: 'A', text: 'たのしく', value: 'A' },
          { label: 'B', text: 'たのしがる', value: 'B' },
          { label: 'C', text: 'たのし', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q10',
        questionNumber: 10,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: '私の国は(________) 暑いです。',
        options: [
          { label: 'A', text: '一年中', value: 'A' },
          { label: 'B', text: '一年間', value: 'B' },
          { label: 'C', text: '一年', value: 'C' },
        ],
        correctAnswer: 'A',
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
        questionText: 'みちこ: リンさんはどこへ行きたいです。\nリン: (___________)\nみちこ: あ、京都ですか。きれいな町ですね。\nリン: ええ、古いお寺やじんじゃを見たいです。',
        options: [
          { label: 'A', text: '京都へ行きます。', value: 'A' },
          { label: 'B', text: '京都へ行けなければなりません。', value: 'B' },
          { label: 'C', text: '京都へ行きたいんです。', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q2',
        questionNumber: 2,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: くつうりばは(________)ですか。\nB: にかいです。',
        options: [
          { label: 'A', text: 'なんかい', value: 'A' },
          { label: 'B', text: 'なにがい', value: 'B' },
          { label: 'C', text: 'なにかい', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q3',
        questionNumber: 3,
        instruction: 'Two friends are talking about weather. Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: 土曜日、10時(________)どうですか。\nB: すみません。10じはちょっと。。。10時半(________)いいですか。\nA: ええ、いいですよ。',
        options: [
          { label: 'A', text: 'が、では', value: 'A' },
          { label: 'B', text: 'は、でも', value: 'B' },
          { label: 'C', text: 'も、でわ', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q4',
        questionNumber: 4,
        instruction: 'Two friends are talking in a restaurant. Read the dialog and choose the phrase that fits the most.',
        questionText: '田中: リンさん、ちょっといいですか。\nリン: はい。\n田中: 今週の日曜日に映画を見に行きませんか。\nリン: はいいいですね。行きましょう。\n田中: では、映画館で(__________)\nリン: 10時ですね。分かりました。',
        options: [
          { label: 'A', text: '午前10時に会いたいです', value: 'A' },
          { label: 'B', text: '午前10時に会わなければなりません', value: 'B' },
          { label: 'C', text: '午前10時に会いましょう', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q5',
        questionNumber: 5,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: 山川さんの誕生日にこのさいふをあげる(____________)\nB: そうですか。きっとよろこんで使って(_________)でしょう。',
        options: [
          { label: 'A', text: 'ほしいです、あげる', value: 'A' },
          { label: 'B', text: 'たいです、つくる', value: 'B' },
          { label: 'C', text: 'つもりです、くれる', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q6',
        questionNumber: 6,
        instruction: 'Two friends are talking in a restaurant. Read the dialog and choose the expression that fits the most.',
        questionText: 'A: (________)。具合が悪いそうですね。\nB: ええ、ちょっとあたまがいたくて。\nA: 大丈夫ですか。\nB: すみませんが、休んでもいいですか。',
        options: [
          { label: 'A', text: 'どうもうありがとう', value: 'A' },
          { label: 'B', text: 'はじめまして', value: 'B' },
          { label: 'C', text: 'どうしたんですか', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q7',
        questionNumber: 7,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: この時計すてきですね。\nB: ありがとうございます。\nA: どこで買ったんですか。\nB: 父が誕生日に(___________)',
        options: [
          { label: 'A', text: 'あげました', value: 'A' },
          { label: 'B', text: 'くれました', value: 'B' },
          { label: 'C', text: 'もらいました', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q8',
        questionNumber: 8,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: 昨日シャツを買いました。\nB: 何まい買いましたか。\nA: 2まい買いました。\nB: (____________)\nA: 2まいで5000円でした。',
        options: [
          { label: 'A', text: 'いつでしたか', value: 'A' },
          { label: 'B', text: 'いくらになりましたか', value: 'B' },
          { label: 'C', text: 'なんまいでしたか', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q9',
        questionNumber: 9,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: 毎日朝ごはんを食べますか。\nB: ええ、どんなに(_________), きちんと食べます。',
        options: [
          { label: 'A', text: 'いそがしなくても', value: 'A' },
          { label: 'B', text: 'いそがしいのに', value: 'B' },
          { label: 'C', text: 'いそがしいと', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's2q10',
        questionNumber: 10,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: あたらしいかばんね。たかったでしょう。\nB: いいえ、(_______)よ。',
        options: [
          { label: 'A', text: 'とてもたかかったです。', value: 'A' },
          { label: 'B', text: 'たいへんたかいです。', value: 'B' },
          { label: 'C', text: 'あまりたかくありませんでした', value: 'C' },
        ],
        correctAnswer: 'C',
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
        instruction: '2 men are talking. where will they enter?',
        audio: '/audio/jft6-q1.mp3',
        image: '/images/jft6-q4.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's3q2',
        questionNumber: 2,
        instruction: 'A man and a women are talking. What does women do first?',
        audio: '/audio/jft6-q2.mp3',
        image: '/images/jft6-q5.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's3q3',
        questionNumber: 3,
        instruction: 'Students are talking. What are they talking about?',
        audio: '/audio/jft6-q3.mp3',
        image: '/images/jft6-q6.jpg',
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
        instruction: 'A man and a women are talking. What man do?',
        audio: '/audio/jft6-q4.mp3',
        image: '/images/jft6-q7.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's3q5',
        questionNumber: 5,
        instruction: 'A man and a women are talking. What is she like to do?',
        audio: '/audio/jft6-q5.mp3',
        image: '/images/jft6-q8.jpg',
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
        instruction: 'A man and a women are talking. What has happened?',
        audio: '/audio/jft6-q6.mp3',
        image: '/images/jft6-q9.jpg',
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
        instruction: 'A man and a women are talking. What women is doing?',
        audio: '/audio/jft6-q7.mp3',
        image: '/images/jft6-q10.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's3q8',
        questionNumber: 8,
        instruction: 'Doctor is talking. What does sick person do first?',
        audio: '/audio/jft6-q8.mp3',
        image: '/images/jft6-q11.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's3q9',
        questionNumber: 9,
        instruction: 'A man and a women are talking. What will man do?',
        audio: '/audio/jft6-q9.mp3',
        image: '/images/jft6-q12.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's3q10',
        questionNumber: 10,
        instruction: 'A man and a women are talking. What will student do?',
        audio: '/audio/jft6-q10.mp3',
        image: '/images/jft6-q13.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'C',
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
        instruction: 'ここにあっているものはどれか。',
        image: '/images/jft6-q14.jpg',
        options: [
          { label: 'A', text: '私は英語がじょうずで、みんなとじょうずに英語を話しています', value: 'A' },
          { label: 'B', text: 'このクラスでは先生がおしえています。', value: 'B' },
          { label: 'C', text: '人が10人このクラスにいます。', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q2',
        questionNumber: 2,
        instruction: 'どうして明日父と母の家に行きますか。',
        image: '/images/jft6-q15.jpg',
        options: [
          { label: 'A', text: '子供は父と母に会いたいからです。', value: 'A' },
          { label: 'B', text: 'つまが仕事に行くからです。', value: 'B' },
          { label: 'C', text: '父と母は「明日来てください」と言ったからです。', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's4q3',
        questionNumber: 3,
        instruction: '私は何がおもしろいですか。',
        image: '/images/jft6-q16.jpg',
        options: [
          { label: 'A', text: '自分がきょうだいがいないが、母にはきょうだいがいること', value: 'A' },
          { label: 'B', text: '母とおばはにていないが、私といとこはにていること', value: 'B' },
          { label: 'C', text: 'いとこはおばにはにていないが、自分ににていること', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q4',
        questionNumber: 4,
        instruction: 'ここにあっているものはどれか。',
        image: '/images/jft6-q17.jpg',
        options: [
          { label: 'A', text: 'この人は小さいとき、町に住んでいました。', value: 'A' },
          { label: 'B', text: '今、この人は小さな田舎の会社で働いています。', value: 'B' },
          { label: 'C', text: '小さいとき、学校から家まで帰るとおそくなるので母はおこりました。', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q5',
        questionNumber: 5,
        instruction: 'メロスはどこですんでいましたか。',
        image: '/images/jft6-q18.jpg',
        options: [
          { label: 'A', text: 'むら', value: 'A' },
          { label: 'B', text: '町', value: 'B' },
          { label: 'C', text: 'シクラス', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's4q6',
        questionNumber: 6,
        instruction: '母はどうして大きな町で住みますか。',
        image: '/images/jft6-q19.jpg',
        options: [
          { label: 'A', text: '病院は近いからです', value: 'A' },
          { label: 'B', text: '買い物が便利からです', value: 'B' },
          { label: 'C', text: '子供といっしょに住みたいからです', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's4q7',
        questionNumber: 7,
        instruction: 'この人はどうして和室がすきですか。',
        image: '/images/jft6-q20.jpg',
        options: [
          { label: 'A', text: '日本家が好きだから', value: 'A' },
          { label: 'B', text: 'ふとんをしいたりたたんだりするのがめんどうから', value: 'B' },
          { label: 'C', text: '寝ないとき部屋が広く使うことができるから', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q8',
        questionNumber: 8,
        instruction: 'この人は先生になりたい一番主な理由は何ですか。',
        image: '/images/jft6-q21.jpg',
        options: [
          { label: 'A', text: '先生になるのは自分の夢だからです。', value: 'A' },
          { label: 'B', text: '山田先生と同じ先生になりたいからです。', value: 'B' },
          { label: 'C', text: '子供が好きで、教えることも好きだからです', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q9',
        questionNumber: 9,
        instruction: '二人はどこであいますか。',
        image: '/images/jft6-q22.jpg',
        options: [
          { label: 'A', text: 'みどり駅の北口で', value: 'A' },
          { label: 'B', text: 'さくら駅の北口で', value: 'B' },
          { label: 'C', text: 'レストランで', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q10',
        questionNumber: 10,
        instruction: 'ここにあっているものはどれか。',
        image: '/images/jft6-q23.jpg',
        options: [
          { label: 'A', text: 'おじいさんの誕生日のために家族といっしょにパーティーをしました。', value: 'A' },
          { label: 'B', text: 'まごの誕生日パーティーはおじいさんのうちにしました。', value: 'B' },
          { label: 'C', text: '家族といっしょにりょこうをしました。', value: 'C' },
        ],
        correctAnswer: 'A',
      },
    ],
  },
];

export default function JFTBasic6Page() {
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
          title="JFT-A2 Stimulation Exam"
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
