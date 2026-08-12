import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Volume2, Eye, EyeOff } from 'lucide-react';

export default function VocabularyCard({ word, reading, meaning, meaningNepali, example, level, partOfSpeech }) {
  const [showMeaning, setShowMeaning] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="perspective-1000">
      <Card className={`cursor-pointer transition-all duration-500 ${flipped ? 'rotate-y-180' : ''}`} onClick={() => setFlipped(!flipped)}>
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-between mb-3">
            <Badge>{level}</Badge>
            <Badge variant="outline">{partOfSpeech}</Badge>
          </div>
          <p className="text-3xl font-bold mb-2">{word}</p>
          <p className="text-lg text-gray-500 mb-3">{reading}</p>
          {showMeaning ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-lg font-semibold text-primary-600">{meaning}</p>
              <p className="text-sm text-gray-500">{meaningNepali}</p>
              {example && <p className="text-sm text-gray-400 mt-2 italic">"{example}"</p>}
            </motion.div>
          ) : (
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setShowMeaning(true); }}>
              <Eye className="mr-1 h-4 w-4" /> Show Meaning
            </Button>
          )}
          <Button variant="ghost" size="icon" className="mt-2" onClick={(e) => e.stopPropagation()}>
            <Volume2 className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}