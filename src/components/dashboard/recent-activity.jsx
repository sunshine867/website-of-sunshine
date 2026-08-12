import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity } from 'lucide-react';

const activityColors = {
  enrollment: 'bg-blue-100 text-blue-700',
  exam: 'bg-green-100 text-green-700',
  payment: 'bg-yellow-100 text-yellow-700',
  application: 'bg-purple-100 text-purple-700',
  registration: 'bg-orange-100 text-orange-700',
};

export default function RecentActivity({ activities = [] }) {
  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" /> Recent Activity</CardTitle></CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="divide-y">
            {activities.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No recent activity</div>
            ) : (
              activities.map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Activity className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.user}</p>
                      <p className="text-xs text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={activityColors[activity.type] || ''}>{activity.type}</Badge>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}