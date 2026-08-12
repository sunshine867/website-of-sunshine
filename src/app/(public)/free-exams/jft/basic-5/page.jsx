// src/app/exam/jft-basic-5/page.js
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
        image: '/images/jft5-q1.jpg',
        options: [
          { label: 'A', text: 'てつだいます', value: 'A' },
          { label: 'B', text: 'わらいます', value: 'B' },
          { label: 'C', text: 'よびます', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q2',
        questionNumber: 2,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft5-q2.jpg',
        options: [
          { label: 'A', text: 'りょうりをおしえます', value: 'A' },
          { label: 'B', text: 'りょうりをつくります', value: 'B' },
          { label: 'C', text: 'りょうりをつかれます', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q3',
        questionNumber: 3,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft5-q3.jpg',
        options: [
          { label: 'A', text: 'スピーチをします', value: 'A' },
          { label: 'B', text: 'おどります', value: 'B' },
          { label: 'C', text: 'うたいます', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q4',
        questionNumber: 4,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: 'このとおりは夜(_______) あぶないです。',
        options: [
          { label: 'A', text: 'あかるくて', value: 'A' },
          { label: 'B', text: 'くろくて', value: 'B' },
          { label: 'C', text: 'くらくて', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q5',
        questionNumber: 5,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: '会社を ( _______)から、アジアを旅行します。',
        options: [
          { label: 'A', text: 'やめて', value: 'A' },
          { label: 'B', text: 'やめる', value: 'B' },
          { label: 'C', text: 'やめない', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q6',
        questionNumber: 6,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: 'もう9時ですね。(_______)しつれいします。',
        options: [
          { label: 'A', text: 'そろそろ', value: 'A' },
          { label: 'B', text: 'ゆっくり', value: 'B' },
          { label: 'C', text: 'すぐ', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q7',
        questionNumber: 7,
        instruction: 'How do you write the underlined kanji word in hiragana. choose the correct one.',
        questionText: 'この (工場) は特別なきかいを作っています。',
        options: [
          { label: 'A', text: 'こじょう', value: 'A' },
          { label: 'B', text: 'こうじょう', value: 'B' },
          { label: 'C', text: 'こうじょ', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q8',
        questionNumber: 8,
        instruction: 'How do you write the underlined kanji word in hiragana. choose the correct one.',
        questionText: '世界のれきしをあまり (知らない) のでもっと勉強したい。',
        options: [
          { label: 'A', text: 'わからない', value: 'A' },
          { label: 'B', text: 'ちらない', value: 'B' },
          { label: 'C', text: 'しらない', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q9',
        questionNumber: 9,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: 'あのショップに(______) ませんか。',
        options: [
          { label: 'A', text: '入り', value: 'A' },
          { label: 'B', text: '入る', value: 'B' },
          { label: 'C', text: '入って', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q10',
        questionNumber: 10,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: 'シャツを (______)に行きます。',
        options: [
          { label: 'A', text: '買い', value: 'A' },
          { label: 'B', text: '買う', value: 'B' },
          { label: 'C', text: '買って', value: 'C' },
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
        questionText: 'みちこ: リンさんはどこへ行きたいです。\nリン: きょうとへ行きたいんです。\nみちこ: あ、京都ですか。(_________)\nリン: ええ、古いお寺やじんじゃを見たいです。',
        options: [
          { label: 'A', text: 'きれいな町ですね', value: 'A' },
          { label: 'B', text: 'ふべんな町ですね', value: 'B' },
          { label: 'C', text: 'うるさい町ですね', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's2q2',
        questionNumber: 2,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: ここにスリッパが(________)ありますか。\nB: はっそくあります。',
        options: [
          { label: 'A', text: 'なんそく', value: 'A' },
          { label: 'B', text: 'なにそく', value: 'B' },
          { label: 'C', text: 'なんぞく', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q3',
        questionNumber: 3,
        instruction: 'Two friends are talking about weather. Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: 頭色が悪いですね。どうしますか。\nB: ちょっと(_________)悪いんです。\nA: それはいけませんね。お大事に。',
        options: [
          { label: 'A', text: 'あたま', value: 'A' },
          { label: 'B', text: 'きぶん', value: 'B' },
          { label: 'C', text: 'かお', value: 'C' },
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
        questionText: 'A: 今日からここでアルバイトをすることになりました。田中です。どうぞよろしく。\nB: はい、田中さんですね。じゃこれから仕事につして説明しますから、分からない事があったら、(_______)質問してください。',
        options: [
          { label: 'A', text: 'どんなに', value: 'A' },
          { label: 'B', text: 'どんな', value: 'B' },
          { label: 'C', text: 'どんなことでも', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q6',
        questionNumber: 6,
        instruction: 'Two friends are talking in a restaurant. Read the dialog and choose the expression that fits the most.',
        questionText: 'A: シンさん、どうしたんですか。\nB: 朝から、あたまがいたいんです \nA: そうですか。(______)\nB: そうですね。そうします。',
        options: [
          { label: 'A', text: '病院へ行かないでください。', value: 'A' },
          { label: 'B', text: '病院へ行きたいんです。', value: 'B' },
          { label: 'C', text: '病院へ行ったほうがいいですね。', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q7',
        questionNumber: 7,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: ただいま\nB: (__________)\nA: これ、京都のおみやげです。\nB: どうもありがとうございます。ぎおんまつりはどうでしたか。\nA: とてもおもしろかったです。外国人も多かったですよ。',
        options: [
          { label: 'A', text: 'またあいましょう', value: 'A' },
          { label: 'B', text: 'おじゃまします', value: 'B' },
          { label: 'C', text: 'おかえりなさい', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q8',
        questionNumber: 8,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: この映画のクラスはどうでしたか。\nB: 大変でした。イギリス人の先生は毎日文法のテストをしました。\nA: それは(_______)テストはむずかしかったですか。\nB: いいえ、あまりむずかしくなかったです。問題は面白かったです。',
        options: [
          { label: 'A', text: 'だいじょうぶでしたね', value: 'A' },
          { label: 'B', text: 'たいへんでしたね', value: 'B' },
          { label: 'C', text: 'よかったでしたね', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q9',
        questionNumber: 9,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: あつ、ホテルの部屋に時計を(__________)\nB: それは大変。田中さん、すぐにホテルに電話をしたほうがいいですよ。',
        options: [
          { label: 'A', text: '忘れるかもしれません', value: 'A' },
          { label: 'B', text: '忘れないでください', value: 'B' },
          { label: 'C', text: '忘れてしまいました', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q10',
        questionNumber: 10,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: (__________)。こんいちは。\nB: あ、こんいちは。じゃ、行きましょう。',
        options: [
          { label: 'A', text: 'しょうしょうお待ちください。', value: 'A' },
          { label: 'B', text: 'お待たせしました。', value: 'B' },
          { label: 'C', text: '待っていました。', value: 'C' },
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
        instruction: 'A man and a women are talking. What time and where will they meet?',
        audio: '/audio/jft5-q1.mp3',
        image: '/images/jft5-q4.jpg',
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
        audio: '/audio/jft5-q2.mp3',
        image: '/images/jft5-q5.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's3q3',
        questionNumber: 3,
        instruction: 'Students are talking. What will man do from now on?',
        audio: '/audio/jft5-q3.mp3',
        image: '/images/jft5-q6.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's3q4',
        questionNumber: 4,
        instruction: 'A man and a women are talking. What will women do now on?',
        audio: '/audio/jft5-q4.mp3',
        image: '/images/jft5-q7.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'D',
      },
      {
        id: 's3q5',
        questionNumber: 5,
        instruction: 'A man and a women are talking. What is he going to do.',
        audio: '/audio/jft5-q5.mp3',
        image: '/images/jft5-q8.jpg',
        options: [
          { label: 'A', text: 'Option E', value: 'A' },
          { label: 'B', text: 'Option F', value: 'B' },
          { label: 'C', text: 'Option G', value: 'C' },
          { label: 'D', text: 'Option H', value: 'D' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's3q6',
        questionNumber: 6,
        instruction: 'A man and a women are talking. What will women do now on?',
        audio: '/audio/jft5-q6.mp3',
        image: '/images/jft5-q9.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'D',
      },
      {
        id: 's3q7',
        questionNumber: 7,
        instruction: 'Students are talking. What will female student do now on?',
        audio: '/audio/jft5-q7.mp3',
        image: '/images/jft5-q10.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'D',
      },
      {
        id: 's3q8',
        questionNumber: 8,
        instruction: 'Doctor is talking. What does sick person do first?',
        audio: '/audio/jft5-q8.mp3',
        image: '/images/jft5-q11.jpg',
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
        instruction: 'A girl and a boy are talking in the class. What will girl buy?',
        audio: '/audio/jft5-q9.mp3',
        image: '/images/jft5-q12.jpg',
        options: [
          { label: 'A', text: 'Option 1', value: 'A' },
          { label: 'B', text: 'Option 2', value: 'B' },
          { label: 'C', text: 'Option 3', value: 'C' },
          { label: 'D', text: 'Option 4', value: 'D' },
        ],
        correctAnswer: 'D',
      },
      {
        id: 's3q10',
        questionNumber: 10,
        instruction: 'A person from a travel agency is talking to the students. What will students do first?',
        audio: '/audio/jft5-q10.mp3',
        image: '/images/jft5-q13.jpg',
        options: [
          { label: 'A', text: 'Option 1', value: 'A' },
          { label: 'B', text: 'Option 2', value: 'B' },
          { label: 'C', text: 'Option 3', value: 'C' },
          { label: 'D', text: 'Option 4', value: 'D' },
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
        instruction: '私はどうして 「英語で話し会話」 と言うクラスへ行っていますか。',
        image: '/images/jft5-q14.jpg',
        options: [
          { label: 'A', text: 'クラスでみんなしんせつでたのしいから', value: 'A' },
          { label: 'B', text: 'クラスはお金ははらわないから', value: 'B' },
          { label: 'C', text: 'クラスでみんな英語をおしえるから', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's4q2',
        questionNumber: 2,
        instruction: 'この人は新しい家にひっこす前にどこに住んでいましたか。',
        image: '/images/jft5-q15.jpg',
        options: [
          { label: 'A', text: '男の人の両親と', value: 'A' },
          { label: 'B', text: '女の人の両親と', value: 'B' },
          { label: 'C', text: 'ホテル', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's4q3',
        questionNumber: 3,
        instruction: '私は何がおもしろいですか。',
        image: '/images/jft5-q16.jpg',
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
        instruction: '母はどうして大きな町で住みますか。',
        image: '/images/jft5-q17.jpg',
        options: [
          { label: 'A', text: '病院は近いからです', value: 'A' },
          { label: 'B', text: '買い物が便利からです', value: 'B' },
          { label: 'C', text: '子供といっしょに住みたいからです', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's4q5',
        questionNumber: 5,
        instruction: '正しいものはどれか。',
        image: '/images/jft5-q18.jpg',
        options: [
          { label: 'A', text: 'この二人はサラダを食べた後で紅茶を飲みました', value: 'A' },
          { label: 'B', text: 'この二人はサラダー人に二つちゅうもんしました', value: 'B' },
          { label: 'C', text: 'この二人はサラダは一つだけちゅうもんしました', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q6',
        questionNumber: 6,
        instruction: 'みちこさんはさいふをおとす前にどこへ行きましたか。',
        image: '/images/jft5-q19.jpg',
        options: [
          { label: 'A', text: 'けいさつ', value: 'A' },
          { label: 'B', text: 'こうばん', value: 'B' },
          { label: 'C', text: 'ゆうびんきょく', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q7',
        questionNumber: 7,
        instruction: 'この人はどうして和室がすきですか。',
        image: '/images/jft5-q20.jpg',
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
        image: '/images/jft5-q21.jpg',
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
        instruction: '明日やまに行くときはどれがいいですか。',
        image: '/images/jft5-q22.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q10',
        questionNumber: 10,
        instruction: 'カラオケコンテストはいつですか。',
        image: '/images/jft5-q23.jpg',
        options: [
          { label: 'A', text: 'よっか', value: 'A' },
          { label: 'B', text: 'よちか', value: 'B' },
          { label: 'C', text: 'よつか', value: 'C' },
        ],
        correctAnswer: 'A',
      },
    ],
  },
];

export default function JFTBasic5Page() {
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
