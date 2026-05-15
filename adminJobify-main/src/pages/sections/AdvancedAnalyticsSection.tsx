// AdvancedAnalyticsSection.tsx
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { User, Gig } from "../AdminDashboard";
import { TrendingUp, Users, Briefcase, DollarSign, Globe, Award } from "lucide-react";

interface AdvancedAnalyticsSectionProps {
  users: User[];
  gigs: Gig[];
}

const COLORS = ["#06b6d4", "#0ea5e9", "#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b"];

const AdvancedAnalyticsSection: React.FC<AdvancedAnalyticsSectionProps> = ({
  users,
  gigs,
}) => {
  // Category Distribution
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    gigs.forEach((gig) => {
      map[gig.category] = (map[gig.category] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [gigs]);

  // Price Statistics
  const priceStats = useMemo(() => {
    if (gigs.length === 0) return [];

    const priceRanges = [
      { range: "د.إ 0-50", min: 0, max: 50, count: 0 },
      { range: "د.إ 50-100", min: 50, max: 100, count: 0 },
      { range: "د.إ 100-200", min: 100, max: 200, count: 0 },
      { range: "د.إ 200-500", min: 200, max: 500, count: 0 },
      { range: "د.إ 500+", min: 500, max: Infinity, count: 0 },
    ];

    gigs.forEach((gig) => {
      priceRanges.forEach((range) => {
        if (
          gig.package_price >= range.min &&
          gig.package_price < range.max
        ) {
          range.count++;
        }
      });
    });

    return priceRanges.filter(p => p.count > 0);
  }, [gigs]);

  // User Distribution by Country
  const countryData = useMemo(() => {
    const map: Record<string, number> = {};
    users.forEach((user) => {
      map[user.country] = (map[user.country] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [users]);

  const renderPieLabel = (entry: any) => {
    const total = categoryData.reduce((sum, item) => sum + item.value, 0);
    const percent = ((entry.value / total) * 100).toFixed(0);
    return `${percent}%`;
  };

  // Calculate Global KPIs
  const totalRevenue = gigs.reduce((sum, g) => sum + g.package_price, 0);
  const avgPrice = gigs.length ? (totalRevenue / gigs.length).toFixed(2) : "0";
  
  // Calculate Median Price correctly
  const sortedPrices = gigs.map(g => g.package_price).sort((a, b) => a - b);
  const medianPrice = gigs.length
    ? gigs.length % 2 === 0
      ? ((sortedPrices[gigs.length / 2 - 1] + sortedPrices[gigs.length / 2]) / 2).toFixed(2)
      : sortedPrices[Math.floor(gigs.length / 2)].toFixed(2)
    : "0";

  const highestPrice = gigs.length ? Math.max(...gigs.map((g) => g.package_price)) : 0;
  const lowestPrice = gigs.length ? Math.min(...gigs.map((g) => g.package_price)) : 0;
  
  const adminCount = users.filter((u) => u.isAdmin).length;
  const totalCountries = new Set(users.map((u) => u.country)).size;
  const avgGigsPerUser = gigs.length && users.length ? (gigs.length / users.length).toFixed(2) : "0";
  const avgRevenuePerUser = users.length ? (totalRevenue / users.length).toFixed(2) : "0";

  return (
    <div className="space-y-8 mb-10">
      {/* Title Section */}
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="text-cyan-400" size={32} />
        <div>
          <h2 className="text-4xl font-black from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            نظرة عامة على التحليلات
          </h2>
          <p className="text-gray-400 mt-1">إحصائيات شاملة للمنصة</p>
        </div>
      </div>

      {/* Main KPI Cards - Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5 hover:border-blue-500/60 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">إجمالي الإيرادات</p>
              <h3 className="text-3xl font-black text-blue-400 mt-2">د.إ {totalRevenue.toLocaleString()}</h3>
              <p className="text-gray-500 text-xs mt-1">إجمالي المنصة</p>
            </div>
            <DollarSign className="text-blue-400 opacity-50" size={24} />
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5 hover:border-green-500/60 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">متوسط السعر</p>
              <h3 className="text-3xl font-black text-green-400 mt-2">د.إ {avgPrice}</h3>
              <p className="text-gray-500 text-xs mt-1">عبر جميع الخدمات</p>
            </div>
            <Award className="text-green-400 opacity-50" size={24} />
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 hover:border-yellow-500/60 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">إجمالي الخدمات</p>
              <h3 className="text-3xl font-black text-yellow-400 mt-2">{gigs.length}</h3>
              <p className="text-gray-500 text-xs mt-1">قوائم نشطة</p>
            </div>
            <Briefcase className="text-yellow-400 opacity-50" size={24} />
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-5 hover:border-purple-500/60 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">إجمالي المستخدمين</p>
              <h3 className="text-3xl font-black text-purple-400 mt-2">{users.length}</h3>
              <p className="text-gray-500 text-xs mt-1">الأعضاء</p>
            </div>
            <Users className="text-purple-400 opacity-50" size={24} />
          </div>
        </div>
      </div>

      {/* Secondary KPI Cards - Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5 hover:border-cyan-500/30 transition">
          <p className="text-gray-400 text-sm mb-2">الوسيط السعري</p>
          <h3 className="text-2xl font-black text-cyan-400">د.إ {medianPrice}</h3>
          <p className="text-gray-500 text-xs mt-1">النقطة المئوية 50</p>
        </div>

        <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5 hover:border-green-500/30 transition">
          <p className="text-gray-400 text-sm mb-2">نطاق السعر</p>
          <h3 className="text-2xl font-black text-green-400">د.إ {lowestPrice} - د.إ {highestPrice}</h3>
          <p className="text-gray-500 text-xs mt-1">الحد الأدنى والأقصى</p>
        </div>

        <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5 hover:border-blue-500/30 transition">
          <p className="text-gray-400 text-sm mb-2">متوسط الإيرادات/المستخدم</p>
          <h3 className="text-2xl font-black text-blue-400">د.إ {avgRevenuePerUser}</h3>
          <p className="text-gray-500 text-xs mt-1">لكل عضو</p>
        </div>

        <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5 hover:border-purple-500/30 transition">
          <p className="text-gray-400 text-sm mb-2">المواقع العالمية</p>
          <h3 className="text-2xl font-black text-purple-400">{totalCountries}</h3>
          <p className="text-gray-500 text-xs mt-1">الدول النشطة</p>
        </div>
      </div>

      {/* Charts Grid - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution - Pie Chart */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
            <Briefcase size={20} /> توزيع الفئات
          </h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderPieLabel}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {/* تم استبدال entry بـ _ هنا لحل المشكلة */}
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                  formatter={(value: any) => [value, "العدد"]}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[350px] flex items-center justify-center text-gray-400">
              لا توجد بيانات
            </div>
          )}
        </div>

        {/* Geographic Distribution */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <Globe size={20} /> توزيع المستخدمين حسب الدول
          </h3>
          {countryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={countryData} layout="vertical" margin={{ left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={95} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                  }}
                  formatter={(value: any) => [value, "المستخدمون"]}
                />
                <Bar dataKey="value" fill="#06b6d4" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[350px] flex items-center justify-center text-gray-400">
              لا توجد بيانات
            </div>
          )}
        </div>
      </div>

      {/* Charts Grid - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Distribution */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
            <DollarSign size={20} /> توزيع الأسعار
          </h3>
          {priceStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={priceStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="range" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                  }}
                  formatter={(value: any) => [value, "العدد"]}
                />
                <Bar dataKey="count" fill="#fbbf24" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[350px] flex items-center justify-center text-gray-400">
              لا توجد بيانات
            </div>
          )}
        </div>

        {/* Category Stats Table */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-blue-400 mb-6">أفضل الفئات</h3>
          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {categoryData.length > 0 ? (
              categoryData.slice(0, 8).map((category, idx) => {
                const percent = ((category.value / (gigs.length || 1)) * 100).toFixed(1);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-[#020617] rounded-xl border border-gray-800 hover:border-gray-700 transition"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: COLORS[idx % COLORS.length] + "30" }}
                      >
                        <span style={{ color: COLORS[idx % COLORS.length] }}>#{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 font-semibold truncate">{category.name}</p>
                        <p className="text-gray-500 text-xs">{category.value} خدمة</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black" style={{ color: COLORS[idx % COLORS.length] }}>
                        {percent}%
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-[350px] flex items-center justify-center text-gray-400">
                لا توجد بيانات
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-gray-800 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-cyan-400 mb-6">ملخص المنصة</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">فريق الإدارة</p>
            <p className="text-3xl font-black text-purple-400">{adminCount} / {users.length}</p>
            <p className="text-gray-500 text-xs">
              {users.length ? ((adminCount / users.length) * 100).toFixed(1) : 0}% من المستخدمين
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-400 text-sm">متوسط الخدمات للمستخدم</p>
            <p className="text-3xl font-black text-green-400">{avgGigsPerUser}</p>
            <p className="text-gray-500 text-xs">معدل الإنتاجية</p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-400 text-sm">إجمالي فئات الخدمات</p>
            <p className="text-3xl font-black text-yellow-400">{categoryData.length}</p>
            <p className="text-gray-500 text-xs">تنوع العروض</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsSection;