

// src/app/exam/jft-a2/page.js
'use client';

 

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ExamPlayer from '@/components/exam/exam-player';
import { Button } from '@/components/ui/button';

// Section Data - JFT-Basic Exam 2 (JFT-A2 Stimulation Exam)
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
        image: '/images/jft3-q1.jpg',
        options: [
          { label: 'A', text: 'いれます', value: 'A' },
          { label: 'B', text: 'いのります', value: 'B' },
          { label: 'C', text: 'いわいます', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q2',
        questionNumber: 2,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft3-q2.jpg',
        options: [
          { label: 'A', text: 'がんばります', value: 'A' },
          { label: 'B', text: 'あそびます', value: 'B' },
          { label: 'C', text: 'あんないします', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q3',
        questionNumber: 3,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft3-q3.jpg',
        options: [
          { label: 'A', text: 'おきます', value: 'A' },
          { label: 'B', text: 'あらいます', value: 'B' },
          { label: 'C', text: 'あるきます', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q4',
        questionNumber: 4,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: '明日試験があることはまだ誰も (_______)ようです。',
        options: [
          { label: 'A', text: 'しらない', value: 'A' },
          { label: 'B', text: 'わかりません', value: 'B' },
          { label: 'C', text: 'しります', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q5',
        questionNumber: 5,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: 'この問題は (________) すぎで答えられません。',
        options: [
          { label: 'A', text: 'むずかし', value: 'A' },
          { label: 'B', text: 'むずかしく', value: 'B' },
          { label: 'C', text: 'むずかしい', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q6',
        questionNumber: 6,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: 'テストはあまり (________)です。',
        options: [
          { label: 'A', text: 'やさしかった', value: 'A' },
          { label: 'B', text: 'かんたん', value: 'B' },
          { label: 'C', text: 'やさしくなかった', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q7',
        questionNumber: 7,
        instruction: 'How do you write the underlined kanji word in hiragana. choose the correct one.',
        questionText: 'その (番組) はおもしろくないです。',
        options: [
          { label: 'A', text: 'ばんぐみ', value: 'A' },
          { label: 'B', text: 'ぱんぐみ', value: 'B' },
          { label: 'C', text: 'はんぐみ', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q8',
        questionNumber: 8,
        instruction: 'How do you write the underlined kanji word in hiragana. choose the correct one.',
        questionText: '何か問題があったら私に (連絡) してください',
        options: [
          { label: 'A', text: 'れんしゅう', value: 'A' },
          { label: 'B', text: 'れんらく', value: 'B' },
          { label: 'C', text: 'れきし', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q9',
        questionNumber: 9,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: 'テキストを持って来なかったので、となりの人のを(________)もらえました。',
        options: [
          { label: 'A', text: '見て', value: 'A' },
          { label: 'B', text: '見せて', value: 'B' },
          { label: 'C', text: '見ます', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q10',
        questionNumber: 10,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: 'こくばんの字が(_____)人は、前のほうに来てください。',
        options: [
          { label: 'A', text: '見えない', value: 'A' },
          { label: 'B', text: '見られない', value: 'B' },
          { label: 'C', text: '見られる', value: 'C' },
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
        instruction: 'Teacher and a mother are taking about a student. Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: それ、何ですか。おいしいそうですね。\nB: 日本のおすしです。\nA: おすしですか。韓国のぎんぱとよく(_____)ね。\nB: 味はちょっとちがいますよ。どうぞ。食べて見てください。',
        options: [
          { label: 'A', text: 'あっています', value: 'A' },
          { label: 'B', text: 'いています', value: 'B' },
          { label: 'C', text: 'にています', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's2q2',
        questionNumber: 2,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: アベさんの誕生日に何をしますか。\nB: パーティーがいいと思います。\nA: パーティーですか。\nB: ええ、あべさんはパーティーがすきなんです。\nA: いいですね。あべさん、(_______)。',
        options: [
          { label: 'A', text: 'さわぐと思います', value: 'A' },
          { label: 'B', text: 'よろこぶと思います', value: 'B' },
          { label: 'C', text: 'しかると思います', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q3',
        questionNumber: 3,
        instruction: 'Two friends are talking about weather. Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: いらっしゃいませ。\nB: このせんたくきはいくらになりますか。\nA: 二万円になります。\nB: ああ、ちょっと高いですね。(________)\nA: すみません.安いのはありません。\nB: ああ、そうですか。',
        options: [
          { label: 'A', text: 'もうちょっと高いのはありませんか', value: 'A' },
          { label: 'B', text: 'もうちょっと安いのはありませんか', value: 'B' },
          { label: 'C', text: 'いろがきらいです', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q4',
        questionNumber: 4,
        instruction: 'Two friends are talking in a restaurant. Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: 田中さん、リリーさんを知っていますか。\nB: いいえ、あったことがありません。\nA: そうですか。リリーさんは明日午前8時半の電車で東京へ行きます。駅に(______)\nB: はい、わかりました。明日8時半ですね。',
        options: [
          { label: 'A', text: 'むかえに行ってはいけません', value: 'A' },
          { label: 'B', text: 'むかえに行ってもいいですか', value: 'B' },
          { label: 'C', text: 'むかえに行ってください', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q5',
        questionNumber: 5,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'サリさん: ブラウンさんは、今、何がほしいですか。\nブラウンさん: 私は今電子辞書がほしいです。サリさんは、何がほしいですか。\nサリさん: (_________)',
        options: [
          { label: 'A', text: '私はバッドパックをほしがります', value: 'A' },
          { label: 'B', text: '私はバッドパックをほしがっています', value: 'B' },
          { label: 'C', text: '私はバッドパックがほしいです', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q6',
        questionNumber: 6,
        instruction: 'Two friends are talking in a restaurant. Read the dialog and choose the expression that fits the most.',
        questionText: 'A: ちょっといいですか。\nB: はい、何でしょうか。\nA: (_________)\nB: それはいいですね。母と一緒に来ます。',
        options: [
          { label: 'A', text: '明日ご家族と晩ご飯に私のうちに来てください。', value: 'A' },
          { label: 'B', text: '明日晩ご飯に私のうちに来てください。', value: 'B' },
          { label: 'C', text: '明日晩ご飯に私のうちに来なくてもいいです。', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's2q7',
        questionNumber: 7,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: 今週の土曜日は休みですか\nB: 土曜日ですか。大丈夫です。\nA: (__________)\nB: 動物園ですか。動物園はちょっと。。。。\nA: そうですか。ざんねんですね',
        options: [
          { label: 'A', text: 'では、いっしょに動物園を見にいきませんか', value: 'A' },
          { label: 'B', text: 'しかし、いっしょに動物園を見にいきませんか', value: 'B' },
          { label: 'C', text: 'だんだん、いっしょに動物園を見にいきませんか', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's2q8',
        questionNumber: 8,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: ちょっといいですか。\nB: はい、いいです。\nA: 昨日からねつがあるので(_______)\nB: そうですか。病院えですか。それではしかたがありませんね。',
        options: [
          { label: 'A', text: '病院へ行ってください', value: 'A' },
          { label: 'B', text: '病院へ行けなければなりません', value: 'B' },
          { label: 'C', text: '病院へ行かせていただけませんか', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q9',
        questionNumber: 9,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: 富士山に登ったことがありますか。\nB: いいえ、ありません。ぜひ(______)みたいです。',
        options: [
          { label: 'A', text: '登ります', value: 'A' },
          { label: 'B', text: '登った', value: 'B' },
          { label: 'C', text: '登って', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q10',
        questionNumber: 10,
        instruction: 'Read the dialog and choose the expression that fits the most.',
        questionText: 'A: 何を飲むか、決めましたか。\nB: 私はビルを(______)しました。',
        options: [
          { label: 'A', text: '飲むに', value: 'A' },
          { label: 'B', text: '飲みに', value: 'B' },
          { label: 'C', text: '飲みすぎ', value: 'C' },
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
        instruction: 'You will hear a man and a women are talking. Where are they going after this?',
        audio: '/audio/jft3-q1.mp3',
        image: '/images/jft3-q4.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's3q2',
        questionNumber: 2,
        instruction: 'A teacher is talking to a student. How do they go to the sea?',
        audio: '/audio/jft3-q2.mp3',
        image: '/images/jft3-q5.jpg',
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
        instruction: 'A man and a women are talking. What is the man doing on the train?',
        audio: '/audio/jft3-q3.mp3',
        image: '/images/jft3-q6.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'D',
      },
      {
        id: 's3q4',
        questionNumber: 4,
        instruction: 'Listening to the audio and choose the correct answer.',
        audio: '/audio/jft3-q4.mp3',
        image: '/images/jft3-q7.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's3q5',
        questionNumber: 5,
        instruction: 'A man and a women are talking. What is he going to do.',
        audio: '/audio/jft3-q5.mp3',
        image: '/images/jft3-q8.jpg',
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
        instruction: 'A woman is announcing instructions before start the program. What can you do during the program. Choose the correct answer.',
        audio: '/audio/jft3-q6.mp3',
        image: '/images/jft3-q9.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's3q7',
        questionNumber: 7,
        instruction: 'Where did kimusan went during the new-year holidays.',
        audio: '/audio/jft3-q7.mp3',
        image: '/images/jft3-q10.jpg',
        options: [
          { label: 'A', text: 'Option E', value: 'A' },
          { label: 'B', text: 'Option F', value: 'B' },
          { label: 'C', text: 'Option G', value: 'C' },
          { label: 'D', text: 'Option H', value: 'D' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's3q8',
        questionNumber: 8,
        instruction: 'What is the season does she like?',
        audio: '/audio/jft3-q8.mp3',
        image: '/images/jft3-q11.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's3q9',
        questionNumber: 9,
        instruction: 'What is the meeting place?',
        audio: '/audio/jft3-q9.mp3',
        image: '/images/jft3-q12.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's3q10',
        questionNumber: 10,
        instruction: 'Two women are talking about eco-friendly activities. What does she doing for protect the environment?',
        audio: '/audio/jft3-q10.mp3',
        image: '/images/jft3-q13.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'A',
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
        instruction: 'キャンプやつりにさそわれた人は誰ですか。',
        image: '/images/jft3-q14.jpg',
        options: [
          { label: 'A', text: 'たけしさん', value: 'A' },
          { label: 'B', text: 'まりさん', value: 'B' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q2',
        questionNumber: 2,
        instruction: 'ホセさんはねんまつねんしに何をしましたか。',
        image: '/images/jft3-q15.jpg',
        options: [
          { label: 'A', text: 'アルバイトをしました', value: 'A' },
          { label: 'B', text: 'メキシコへ行きました', value: 'B' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q3',
        questionNumber: 3,
        instruction: '日本人は洋服になれたのはどうしてでどうしてでしたか。',
        image: '/images/jft3-q16.jpg',
        options: [
          { label: 'A', text: '着物は洋服より高かったから', value: 'A' },
          { label: 'B', text: '着物を着るのはむずかしだったから', value: 'B' },
          { label: 'C', text: '洋服はむりょうでもらったから。', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q4',
        questionNumber: 4,
        instruction: 'マリアさんとジョゼさんとテレーザちゃんをえきまでむかえにいきます。',
        image: '/images/jft3-q17.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's4q5',
        questionNumber: 5,
        instruction: 'ファミリー･ベーカリの8月のクーポンを見て、下のもんだいに正しい答えを選んでください。今日は22日です。山田さんはファミリーベーカリーでソーセージパン、チキンラップ、チョコレートケーキとチーズサンドイッチを買いました。どのクーポンが使えますか。',
        image: '/images/jft3-q18.jpg',
        options: [
          { label: 'A', text: '(1)と(2)', value: 'A' },
          { label: 'B', text: '(4)と(7)', value: 'B' },
          { label: 'C', text: '(5)と(8)', value: 'C' },
          { label: 'D', text: '(2)と(7)', value: 'D' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q6',
        questionNumber: 6,
        instruction: '山田さんはどうしておだきゅうせん駅でおりましたか。',
        image: '/images/jft3-q19.jpg',
        options: [
          { label: 'A', text: '医者をあうために', value: 'A' },
          { label: 'B', text: 'からだのぐあいが悪くなったから', value: 'B' },
          { label: 'C', text: '人にたすけるために', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q7',
        questionNumber: 7,
        instruction: '会話の内容と合っている文は何ですか',
        image: '/images/jft3-q20.jpg',
        options: [
          { label: 'A', text: '学生は宿題ができなかった理由は先生がみとめました。', value: 'A' },
          { label: 'B', text: '先生は宿題をきちんとするように言いました。', value: 'B' },
          { label: 'C', text: '先生は今回の宿題をしなくてもいいと言いました。', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q8',
        questionNumber: 8,
        instruction: 'ぼんおどりの日にあめが降ったらどうしますか。',
        image: '/images/jft3-q21.jpg',
        options: [
          { label: 'A', text: 'ちゅうしです', value: 'A' },
          { label: 'B', text: 'ほかの日にします', value: 'B' },
          { label: 'C', text: 'ほかのところにします', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q9',
        questionNumber: 9,
        instruction: 'ワットさんの大学を選んでください。',
        image: '/images/jft3-q22.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q10',
        questionNumber: 10,
        instruction: 'くうらんにどんなことばはいりますか。',
        image: '/images/jft3-q23.jpg',
        options: [
          { label: 'A', text: 'しゅっさん', value: 'A' },
          { label: 'B', text: 'しゅうしょく', value: 'B' },
          { label: 'C', text: 'けっこん', value: 'C' },
        ],
        correctAnswer: 'A',
      },
    ],
  },
];

export default function JFTA2ExamPage() {
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


