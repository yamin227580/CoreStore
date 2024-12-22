import AnalyticsCard from "@/components/analytics/analytics-card";
import AnalyticsChart from "@/components/analytics/analytics-chart";
import { analytics, WeelkyAnalytics } from "@/server/actions/analytics";
import { Box, Clock, Package, User } from "lucide-react";

const Analytics = async () => {
  const analyticsData = await analytics();
  const weeklyAnalyticsData = await WeelkyAnalytics();

  return (
    <main>
      {analyticsData && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <AnalyticsCard
            title="Pending Orders"
            count={analyticsData.pendingOrders}
            icon={<Clock size={26} />}
            href="/dashboard/orders"
          />
          <AnalyticsCard
            title="Completed Orders"
            count={analyticsData.completedOrders}
            icon={<Package size={26} />}
            href="/dashboard/orders"
          />
          <AnalyticsCard
            title="Total Customers"
            count={analyticsData.totalUsers}
            icon={<User size={26} />}
            href="/"
          />
          <AnalyticsCard
            title="Total Products"
            count={analyticsData.productCount}
            icon={<Box size={26} />}
            href="/dashboard/products"
          />
        </div>
      )}
      <AnalyticsChart data={weeklyAnalyticsData!} />
    </main>
  );
};
export default Analytics;
