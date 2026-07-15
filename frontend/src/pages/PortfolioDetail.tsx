import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { ArrowLeft, Wallet, TrendingUp, Plus, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import TransactionModal from '../components/TransactionModal';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#14b8a6', '#0ea5e9'];

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPortfolio = async () => {
    try {
      const res = await api.get(`/portfolios/${id}`);
      setPortfolio(res.data);
    } catch (error) {
      console.error('Failed to fetch portfolio');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!portfolio) return null;

  const totalInvested = portfolio.assets.reduce((sum: number, asset: any) => 
    sum + (parseFloat(asset.total_quantity) * parseFloat(asset.average_purchase_price)), 0
  );

  const chartData = portfolio.assets.map((asset: any) => ({
    name: asset.ticker_symbol,
    value: parseFloat(asset.total_quantity) * parseFloat(asset.average_purchase_price)
  })).filter((data: any) => data.value > 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 pb-20">
      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        portfolioId={id!}
        onSuccess={fetchPortfolio}
      />

      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-slate-400 hover:text-white" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Wallet className="h-6 w-6 text-blue-400" />
              </div>
              <span className="font-bold text-xl tracking-tight">{portfolio.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top metrics and actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <h2 className="text-slate-400 font-medium mb-2">Total Invested</h2>
            <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              ${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-3xl flex flex-col justify-center items-center text-center hover:bg-slate-800 transition-colors cursor-pointer group" onClick={() => setIsModalOpen(true)}>
            <div className="p-4 bg-blue-500/20 rounded-full mb-3 group-hover:bg-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
              <Plus className="h-8 w-8 text-blue-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-white text-lg">Add Transaction</h3>
            <p className="text-sm text-slate-400">Buy or sell assets</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Asset List */}
          <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Holdings
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900/50 text-left text-xs uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4 font-semibold">Asset</th>
                    <th className="px-6 py-4 font-semibold text-right">Shares</th>
                    <th className="px-6 py-4 font-semibold text-right">Avg Price</th>
                    <th className="px-6 py-4 font-semibold text-right">Total Invested</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {portfolio.assets.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                        No assets in this portfolio yet. 
                        <button onClick={() => setIsModalOpen(true)} className="text-blue-400 hover:text-blue-300 ml-1">Buy your first asset.</button>
                      </td>
                    </tr>
                  ) : (
                    portfolio.assets.map((asset: any) => {
                      const qty = parseFloat(asset.total_quantity);
                      if (qty <= 0) return null;
                      const avgPrice = parseFloat(asset.average_purchase_price);
                      const total = qty * avgPrice;
                      
                      return (
                        <tr key={asset.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white shadow-inner">
                                {asset.ticker_symbol.charAt(0)}
                              </div>
                              <span className="font-bold text-white text-lg">{asset.ticker_symbol}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-slate-300 font-medium">
                            {qty.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-slate-300">
                            ${avgPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-white">
                            ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Allocation Chart */}
          <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-700 bg-slate-800/50">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-pink-500" />
                Allocation
              </h2>
            </div>
            <div className="p-6 h-[350px] flex items-center justify-center relative">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="drop-shadow-md outline-none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-slate-500 text-center">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-700/50 border-dashed mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-slate-600" />
                  </div>
                  No data to visualize
                </div>
              )}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default PortfolioDetail;
