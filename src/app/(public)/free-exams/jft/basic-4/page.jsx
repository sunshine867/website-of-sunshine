// src/app/exam/jft-basic-4/page.js
'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ExamPlayer from '@/components/exam/exam-player';
import { Button } from '@/components/ui/button';

 

const sections = [
  // ============================================
  // SECTION 1: Script and Vocabulary (14 Questions)
  // ============================================
  {
    title: 'Script and Vocabulary',
    questions: [
      {
        id: 's1q1',
        questionNumber: 1,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft4-q1.jpg',
        options: [
          { label: 'A', text: 'きます', value: 'A' },
          { label: 'B', text: 'つきます', value: 'B' },
          { label: 'C', text: 'かえります', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q2',
        questionNumber: 2,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft4-q2.jpg',
        options: [
          { label: 'A', text: 'うります', value: 'A' },
          { label: 'B', text: 'かいものをします', value: 'B' },
          { label: 'C', text: 'けんがくします', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q3',
        questionNumber: 3,
        instruction: 'Look at the illustration and choose the correct word.',
        image: '/images/jft4-q3.jpg',
        options: [
          { label: 'A', text: 'しょうかいします', value: 'A' },
          { label: 'B', text: 'しゅくだいします', value: 'B' },
          { label: 'C', text: 'しゅっちょうします', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's1q4',
        questionNumber: 4,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        image: '/images/jft4-q3-1.jpg',
        options: [
          { label: 'A', text: 'しつもんをします', value: 'A' },
          { label: 'B', text: 'うたをうたいます', value: 'B' },
          { label: 'C', text: 'おけしょうをします', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q5',
        questionNumber: 5,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: '冬休みにスキーをしに (_________)と思っています。',
        options: [
          { label: 'A', text: '行って', value: 'A' },
          { label: 'B', text: '行こう', value: 'B' },
          { label: 'C', text: '行き', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q6',
        questionNumber: 6,
        instruction: 'Read the sentence and choose the word that fits in () most.',
        questionText: 'こうさてん (_________)が赤いときは、人も車もとまなければなりません。',
        options: [
          { label: 'A', text: 'しごうき', value: 'A' },
          { label: 'B', text: 'しんこうき', value: 'B' },
          { label: 'C', text: 'しんごうき', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q7',
        questionNumber: 7,
        instruction: 'How do you write the underlined kanji word in hiragana. choose the correct one.',
        questionText: '昨日の映画は (________)映画でした。',
        options: [
          { label: 'A', text: 'おもしろかった', value: 'A' },
          { label: 'B', text: 'おもしろ', value: 'B' },
          { label: 'C', text: 'おもしろい', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q8',
        questionNumber: 8,
        instruction: 'How do you write the underlined kanji word in hiragana. choose the correct one.',
        questionText: '写真を見ると、むかしの (生活) がよくわかます。',
        options: [
          { label: 'A', text: 'かつどう', value: 'A' },
          { label: 'B', text: 'せいかつ', value: 'B' },
          { label: 'C', text: 'せいどう', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q9',
        questionNumber: 9,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: '昔は車の代わりに (ばしゃ) が使われました。',
        options: [
          { label: 'A', text: '場所', value: 'A' },
          { label: 'B', text: '馬車', value: 'B' },
          { label: 'C', text: '鳥車', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q10',
        questionNumber: 10,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: '私は日本の文学に (きょうみ) があります。',
        options: [
          { label: 'A', text: '好味', value: 'A' },
          { label: 'B', text: '姉味', value: 'B' },
          { label: 'C', text: '興味', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q11',
        questionNumber: 11,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: '私の趣味は外国のコインを(_____)。兄と一緒に集まっています。',
        options: [
          { label: 'A', text: '集めています', value: 'A' },
          { label: 'B', text: '集めます', value: 'B' },
          { label: 'C', text: '集めることです', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's1q12',
        questionNumber: 12,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: 'インドネシア (_______) あついです。',
        options: [
          { label: 'A', text: '一か月', value: 'A' },
          { label: 'B', text: '一年中', value: 'B' },
          { label: 'C', text: 'ーか年', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q13',
        questionNumber: 13,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: 'このあたりは店が(_______) 便利です。',
        options: [
          { label: 'A', text: '少なくて', value: 'A' },
          { label: 'B', text: '多くて', value: 'B' },
          { label: 'C', text: '大きくて', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's1q14',
        questionNumber: 14,
        instruction: 'Read the sentence and choose the kanji word that fits in ( ) most.',
        questionText: 'かぜがひいたんでしょう。今晩は早く(_______)ほうがいいですよう。',
        options: [
          { label: 'A', text: '寝た', value: 'A' },
          { label: 'B', text: '寝ほう', value: 'B' },
          { label: 'C', text: '寝て', value: 'C' },
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
        questionText: '山田: こちらはひしょのキャシーさんです。\n田中: 田中です。どうぞよろしく\nキャシー: こちらこそ。どうぞよろしく。\n山田: キャシーさんは日本語、(_______)です。\n田中: そうですか。',
        options: [
          { label: 'A', text: 'へらへら', value: 'A' },
          { label: 'B', text: 'ぺらぺら', value: 'B' },
          { label: 'C', text: 'べらべら', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q2',
        questionNumber: 2,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: (_______), 田中さん。\nB: おまたせしました。でむかえ、ありがとうございます。\nA: フライトはどうですか。\nB: まあまあでした。\nA: そうですか。',
        options: [
          { label: 'A', text: 'いらっしゃる', value: 'A' },
          { label: 'B', text: 'ようこそ', value: 'B' },
          { label: 'C', text: 'こちらこそ', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's2q3',
        questionNumber: 3,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'A: 山田さん、よかったら、サラダどうぞ。\nB: はい、いただきます。このサラダちょっと辛くておいしいです。\nA: そうですか。もう少しどうですか。\nB: ありがとうございます。(_________)',
        options: [
          { label: 'A', text: 'まだおなかがいたいです', value: 'A' },
          { label: 'B', text: 'まだおなかがいっぱいです', value: 'B' },
          { label: 'C', text: 'もうおなかがいっぱいです', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q4',
        questionNumber: 4,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: '学生: 先生、ちょっといいですか\n先生: はい 何でしょうか。\n学生: 今朝からねつがあってので早く(__________)\n先生: いいですよ。おだいじに。',
        options: [
          { label: 'A', text: 'かえらせていただけませんか', value: 'A' },
          { label: 'B', text: 'かえりますか', value: 'B' },
          { label: 'C', text: 'かえらなければなりませんか', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's2q5',
        questionNumber: 5,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: 'サリさん: 日曜日一緒にてんたんかい見に行きませんか。\nブラウンさん: てんたんかいですか。(_________)ちょっと。。。。\nサリさん: そうですか。ざんねんですね',
        options: [
          { label: 'A', text: '家族とりょこうに行ったら', value: 'A' },
          { label: 'B', text: '家族とりょこうに行きます', value: 'B' },
          { label: 'C', text: '家族とりょこうに行くので', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's2q6',
        questionNumber: 6,
        instruction: 'Read the dialog and choose the phrase that fits the most.',
        questionText: '田中: 課長、ちょっといいですか。\n課長: はい、何でしょうか。\n田中: じつは、(_________)\n課長: おそうしきですか。しかたがありませんね。',
        options: [
          { label: 'A', text: 'おそうしきがありますから、明日休んでください', value: 'A' },
          { label: 'B', text: 'おそうしきがありますから、明日休んではいけない', value: 'B' },
          { label: 'C', text: 'おそうしきがありますから、明日休んでもいいですか', value: 'C' },
        ],
        correctAnswer: 'C',
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
        instruction: 'You will hear a conversation in a museum. What are they talking about?',
        audio: '/audio/jft4-q1.mp3',
        image: '/images/jft4-q4.jpg',
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
        instruction: 'You will hear a conversation in a museum. What are they talking about?',
        audio: '/audio/jft4-q2.mp3',
        image: '/images/jft4-q5.jpg',
        options: [
          { label: 'A', text: 'Option D', value: 'A' },
          { label: 'B', text: 'Option E', value: 'B' },
          { label: 'C', text: 'Option F', value: 'C' },
          { label: 'D', text: 'Option G', value: 'D' },
        ],
        correctAnswer: 'D',
      },
      {
        id: 's3q3',
        questionNumber: 3,
        instruction: 'What is the 4th step of this recipe?',
        audio: '/audio/jft4-q3.mp3',
        image: '/images/jft4-q6.jpg',
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
        audio: '/audio/jft4-q4.mp3',
        image: '/images/jft4-q7.jpg',
        options: [
          { label: 'A', text: 'Option A', value: 'A' },
          { label: 'B', text: 'Option B', value: 'B' },
          { label: 'C', text: 'Option C', value: 'C' },
          { label: 'D', text: 'Option D', value: 'D' },
          { label: 'E', text: 'Option E', value: 'E' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's3q5',
        questionNumber: 5,
        instruction: 'A man and a women are talking. What is he looking for?',
        audio: '/audio/jft4-q5.mp3',
        image: '/images/jft4-q8.jpg',
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
        instruction: 'What is the reason that she likes online shopping? Choose the correct answer.',
        audio: '/audio/jft4-q6.mp3',
        image: '/images/jft4-q9.jpg',
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
        instruction: 'What is the word that use instead of "arigatogozaimasu" in Kyoto?',
        audio: '/audio/jft4-q7.mp3',
        image: '/images/jft4-q10.jpg',
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
        instruction: 'What is he doing before new year?',
        audio: '/audio/jft4-q8.mp3',
        image: '/images/jft4-q11.jpg',
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
        instruction: 'What is the reason that she doesn\'t like new-year festival?',
        audio: '/audio/jft4-q9.mp3',
        image: '/images/jft4-q12.jpg',
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
        instruction: 'Listening to the audio and choose the correct answer.',
        audio: '/audio/jft4-q10.mp3',
        image: '/images/jft4-q13.jpg',
        options: [
          { label: 'A', text: 'Option E', value: 'A' },
          { label: 'B', text: 'Option F', value: 'B' },
          { label: 'C', text: 'Option G', value: 'C' },
          { label: 'D', text: 'Option H', value: 'D' },
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
        instruction: '今日やんさんはどこに行きますか。',
        image: '/images/jft4-q14.jpg',
        options: [
          { label: 'A', text: 'にくや、さかなや、ゆうびんきょく', value: 'A' },
          { label: 'B', text: 'パンや、くすりや、ゆうびんきょく', value: 'B' },
          { label: 'C', text: 'びょういん、はなや、さかなや', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's4q2',
        questionNumber: 2,
        instruction: '写真は何まいいれることができますか。',
        image: '/images/jft4-q15.jpg',
        options: [
          { label: 'A', text: '1まい', value: 'A' },
          { label: 'B', text: '2まい', value: 'B' },
          { label: 'C', text: '3まい', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q3',
        questionNumber: 3,
        instruction: '日本は02月にどうなりますか。',
        image: '/images/jft4-q16.jpg',
        options: [
          { label: 'A', text: 'あつくなります', value: 'A' },
          { label: 'B', text: 'さむくなります', value: 'B' },
          { label: 'C', text: '雨がふります', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q4',
        questionNumber: 4,
        instruction: '何について書いたメールですか。',
        image: '/images/jft4-q17.jpg',
        options: [
          { label: 'A', text: '誕生日だったこと', value: 'A' },
          { label: 'B', text: 'プレゼントをもらったこと', value: 'B' },
          { label: 'C', text: 'ケーキを食べたこと', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's4q5',
        questionNumber: 5,
        instruction: 'ここにあっていないものはどれか。',
        image: '/images/jft4-q18.jpg',
        options: [
          { label: 'A', text: '富士山は日本でいちばん高いやまです。', value: 'A' },
          { label: 'B', text: '七月と九月だけ富士山にのぼることができます。', value: 'B' },
          { label: 'C', text: '富士山は冬でも夏でも山のちょうじょうに雪があります。', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q6',
        questionNumber: 6,
        instruction: '山田さんはどうしておだきゅうせん駅でおりましたか。',
        image: '/images/jft4-q19.jpg',
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
        instruction: 'おばあちゃんは天気が悪いときどこへも行きません。どうしてですか。',
        image: '/images/jft4-q20.jpg',
        options: [
          { label: 'A', text: 'かぜがひくかもしれないので', value: 'A' },
          { label: 'B', text: 'その時友達が病院にいないので', value: 'B' },
          { label: 'C', text: 'あしのちょうしぎがよくないので', value: 'C' },
        ],
        correctAnswer: 'C',
      },
      {
        id: 's4q8',
        questionNumber: 8,
        instruction: 'カンガルーと言うのはオーストラリアの言葉でどう言う意味ですか。',
        image: '/images/jft4-q21.jpg',
        options: [
          { label: 'A', text: '私はしっています', value: 'A' },
          { label: 'B', text: '私は知っていません', value: 'B' },
          { label: 'C', text: '私はつくります', value: 'C' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 's4q9',
        questionNumber: 9,
        instruction: 'タローのことを正しい説明しているのはどれか。',
        image: '/images/jft4-q22.jpg',
        options: [
          { label: 'A', text: '友達がタローをくれました', value: 'A' },
          { label: 'B', text: '友達にタローあげました', value: 'B' },
          { label: 'C', text: '友達にタローをくれました', value: 'C' },
        ],
        correctAnswer: 'A',
      },
      {
        id: 's4q10',
        questionNumber: 10,
        instruction: 'よしこさんは困っていることはどれですか。',
        image: '/images/jft4-q23.jpg',
        options: [
          { label: 'A', text: '大学の授業をはじまったんから', value: 'A' },
          { label: 'B', text: '大学のりょうきんは高いから', value: 'B' },
          { label: 'C', text: '地理学の勉強がきらいだから', value: 'C' },
        ],
        correctAnswer: 'B',
      },
    ],
  },
];

export default function JFTBasic4Page() {
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