import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function GrammarCard({ pattern, meaning, level, structure, examples = [], notes }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge>{level}</Badge>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        <h3 className="text-xl font-bold mb-2">{pattern}</h3>
        <p className="text-primary-600 font-semibold mb-3">{meaning}</p>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 overflow-hidden">
              {structure && <div><p className="text-sm font-medium text-gray-500 mb-1">Structure</p><code className="bg-gray-100 p-2 rounded text-sm block">{structure}</code></div>}
              {examples.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Examples</p>
                  <div className="space-y-2">
                    {examples.map((ex, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm">{ex.japanese}</p>
                        <p className="text-xs text-gray-500">{ex.english}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {notes && <div className="bg-yellow-50 p-3 rounded-lg"><p className="text-sm text-yellow-800">{notes}</p></div>}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}