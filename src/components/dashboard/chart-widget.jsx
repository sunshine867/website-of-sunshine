import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

const COLORS = ['#2563EB', '#0EA5E9', '#7C3AED', '#10B981', '#F59E0B', '#EF4444'];

export default function ChartWidget({ title, type = 'line', data = [], dataKey, xKey = 'name', height = 300, colors = COLORS }) {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={xKey} fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey={dataKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={xKey} fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Area type="monotone" dataKey={dataKey} stroke={colors[0]} fill={colors[0]} fillOpacity={0.1} />
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey={dataKey} label>
              {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={xKey} fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke={colors[0]} strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        );
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-gray-400">No data available</div>
        ) : (
          <ResponsiveContainer width="100%" height={height}>{renderChart()}</ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}