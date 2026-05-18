import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';
import { adminAPI } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data.stats);
      setRecentOrders(response.data.recentOrders);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            color="bg-gradient-to-r from-sky-400 to-sky-500"
          />
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={Package}
            color="bg-gradient-to-r from-pink-400 to-pink-500"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingCart}
            color="bg-gradient-to-r from-purple-400 to-purple-500"
          />
          <StatCard
            title="Total Revenue"
            value={`Rs ${stats.totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            color="bg-gradient-to-r from-yellow-400 to-yellow-500"
          />
        </div>

        {/* Recent Orders */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <button className="flex items-center space-x-2 text-pink-500 hover:text-pink-600">
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Order ID</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-white/50">
                    <td className="py-3 px-4 text-gray-800">#{order._id.slice(-8)}</td>
                    <td className="py-3 px-4 text-gray-800">{order.user?.name || 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.orderStatus === 'delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.orderStatus === 'shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : order.orderStatus === 'processing'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      Rs {order.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card p-6 rounded-xl text-left hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Manage Products</h3>
            </div>
            <p className="text-sm text-gray-500">Add, edit, or remove products</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card p-6 rounded-xl text-left hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-pink-400 to-pink-500 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Manage Users</h3>
            </div>
            <p className="text-sm text-gray-500">View and manage user accounts</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card p-6 rounded-xl text-left hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">View Analytics</h3>
            </div>
            <p className="text-sm text-gray-500">Detailed sales and performance reports</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
