// apps/web/src/components/shared/data-mode-toggle.jsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dataSource, DATA_MODE } from '@/lib/data/data-source';
import { Database, FlaskConical } from 'lucide-react';

export default function DataModeToggle() {
  const [mode, setMode] = useState(dataSource.getMode());

  const toggleMode = () => {
    dataSource.toggleMode();
    setMode(dataSource.getMode());
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleMode}
        className="shadow-lg bg-white"
      >
        {mode === DATA_MODE.PRODUCTION ? (
          <>
            <Database className="mr-2 h-4 w-4 text-green-600" />
            <span className="text-xs">Live Data</span>
          </>
        ) : (
          <>
            <FlaskConical className="mr-2 h-4 w-4 text-orange-600" />
            <span className="text-xs">Demo Data</span>
          </>
        )}
      </Button>
    </div>
  );
}