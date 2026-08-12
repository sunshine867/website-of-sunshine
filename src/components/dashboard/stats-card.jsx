import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StatsCard({ icon: Icon, label, value, trend, up, color = 'bg-blue-500', className }) {
  return (
    <Card className={cn('hover:shadow-lg transition-all', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          {trend && (
            <span className={`text-xs font-medium flex items-center gap-1 ${up ? 'text-green-600' : 'text-red-600'}`}>
              {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{trend}
            </span>
          )}
        </div>
        <p className="text-2xl font-extrabold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
}