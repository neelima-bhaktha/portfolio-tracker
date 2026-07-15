import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { LogOut, Plus, Wallet, TrendingUp, Activity } from 'lucide-react';


const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPortfolioName, setNewPortfolioName] = useState('');

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const res = await api.get('/portfolios');
      setPortfolios(res.data);
    } catch (error) {
      console.error('Failed to fetch portfolios');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreatePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioName.trim()) return;
    try {
      await api.post('/portfolios', { name: newPortfolioName });
      setNewPortfolioName('');
      fetchPortfolios();
    } catch (error) {
      console.error('Error creating portfolio');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
              <span className="font-bold text-xl tracking-tight">Portfolify</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-slate-400">Welcome, {user?.email}</span>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Your Portfolios</h1>
            <p className="text-slate-400 mt-1">Manage and track your investments</p>
          </div>
          
          <form onSubmit={handleCreatePortfolio} className="flex space-x-3 w-full md:w-auto">
            <input
              type="text"
              value={newPortfolioName}
              onChange={(e) => setNewPortfolioName(e.target.value)}
              placeholder="New Portfolio Name..."
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Create</span>
            </button>
          </form>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-slate-700/50 border-dashed">
            <Wallet className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No portfolios yet</h3>
            <p className="text-slate-400">Create your first portfolio to start tracking assets.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <div key={portfolio.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-700/50 rounded-xl group-hover:bg-blue-500/10 transition-colors">
                    <TrendingUp className="h-6 w-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                    Active
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{portfolio.name}</h3>
                <p className="text-sm text-slate-400">
                  Created {new Date(portfolio.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
