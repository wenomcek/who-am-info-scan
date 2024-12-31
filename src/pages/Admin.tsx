import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface Stats {
  online: number;
  daily: number[];
  weekly: number[];
  monthly: number[];
  allTime: number;
}

export default function Admin() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<Stats>({
    online: 0,
    daily: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)),
    weekly: Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000)),
    monthly: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5000)),
    allTime: Math.floor(Math.random() * 100000)
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        online: Math.floor(Math.random() * 100)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const dailyData = stats.daily.map((value, index) => ({
    name: `${index}h`,
    value
  }));

  const weeklyData = stats.weekly.map((value, index) => ({
    name: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index],
    value
  }));

  const monthlyData = stats.monthly.map((value, index) => ({
    name: `Day ${index + 1}`,
    value
  }));

  return (
    <div className="min-h-screen bg-black/50 backdrop-blur-sm p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">{t('adminDashboard')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-6 bg-gray-800/50 border-gray-700">
          <h2 className="text-xl font-semibold mb-2 text-white">{t('currentlyOnline')}</h2>
          <p className="text-4xl font-bold text-green-400">{stats.online}</p>
        </Card>
        <Card className="p-6 bg-gray-800/50 border-gray-700">
          <h2 className="text-xl font-semibold mb-2 text-white">{t('allTimeVisits')}</h2>
          <p className="text-4xl font-bold text-blue-400">{stats.allTime.toLocaleString()}</p>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="bg-gray-800/50 border-gray-700">
          <TabsTrigger value="daily">{t('daily')}</TabsTrigger>
          <TabsTrigger value="weekly">{t('weekly')}</TabsTrigger>
          <TabsTrigger value="monthly">{t('monthly')}</TabsTrigger>
        </TabsList>

        {['daily', 'weekly', 'monthly'].map((period) => (
          <TabsContent key={period} value={period} className="mt-4">
            <Card className="p-4 bg-gray-800/50 border-gray-700">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={period === 'daily' ? dailyData : period === 'weekly' ? weeklyData : monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#888' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0F0"
                    strokeWidth={2}
                    dot={{ fill: '#0F0' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}