import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flag, Image as ImageIcon, Volume2 } from 'lucide-react';

export default function QuestionCard({ question, selectedAnswer, onSelectAnswer, onFlag, isFlagged, showExplanation }) {
  if (!question) return null;

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline">{question.question_type?.replace('_', ' ')}</Badge>
        <Badge variant="secondary">{question.difficulty_level || 'MEDIUM'}</Badge>
        {question.points && <Badge>{question.points} pt{question.points > 1 ? 's' : ''}</Badge>}
        <div className="flex-1" />
        <Button variant="ghost" size="sm" onClick={onFlag} className={isFlagged ? 'text-yellow-600 bg-yellow-50' : ''}>
          <Flag className={`h-4 w-4 ${isFlagged ? 'fill-yellow-500' : ''}`} />
        </Button>
      </div>

      {/* Question Text */}
      <h3 className="text-lg font-semibold leading-relaxed">{question.question_text}</h3>

      {/* Media */}
      {question.image_url && (
        <div className="rounded-xl overflow-hidden bg-gray-50">
          <img src={question.image_url} alt="Question" className="max-h-64 w-full object-contain" />
        </div>
      )}
      {question.audio_url && (
        <Button variant="outline"><Volume2 className="mr-2 h-4 w-4" /> Play Audio</Button>
      )}

      {/* Options */}
      {question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const letter = String.fromCharCode(65 + index);
            const isSelected = Array.isArray(selectedAnswer) 
              ? selectedAnswer.includes(option)
              : selectedAnswer === option;

            return (
              <button
                key={index}
                onClick={() => onSelectAnswer(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    isSelected ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>{letter}</div>
                  <span className="flex-1">{option}</span>
                  {isSelected && <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full" /></div>}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}