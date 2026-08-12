import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Eye } from 'lucide-react';

export default function KanjiCard({ kanji, onyomi, kunyomi, meaning, meaningNepali, strokeCount, level, words = [] }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showStrokeOrder, setShowStrokeOrder] = useState(false);

  return (
    <Card className="hover:shadow-lg transition-all">
      <CardContent className="p-6 text-center">
        <div className="flex justify-between mb-3">
          <Badge>{level}</Badge>
          <Badge variant="outline">{strokeCount} strokes</Badge>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} className="text-7xl font-bold mb-4 text-gray-800">{kanji}</motion.div>
        <p className="text-lg font-semibold text-primary-600 mb-1">{meaning}</p>
        <p className="text-sm text-gray-500 mb-3">{meaningNepali}</p>
        <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)} className="w-full">
          <Eye className="mr-1 h-4 w-4" /> {showDetails ? 'Hide' : 'Show'} Details
        </Button>
        {showDetails && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 space-y-3 text-left">
            <div><p className="text-xs text-gray-500">On'yomi</p><p className="font-medium">{onyomi}</p></div>
            <div><p className="text-xs text-gray-500">Kun'yomi</p><p className="font-medium">{kunyomi}</p></div>
            {words.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Common Words</p>
                <div className="space-y-1">
                  {words.map((w, i) => (
                    <div key={i} className="flex justify-between text-sm"><span>{w.word}</span><span className="text-gray-500">{w.reading} - {w.meaning}</span></div>
                  ))}
                </div>
              </div>
            )}
            <Button variant="ghost" size="sm" className="w-full" onClick={() => setShowStrokeOrder(!showStrokeOrder)}>
              <Pencil className="mr-1 h-4 w-4" /> Stroke Order
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}