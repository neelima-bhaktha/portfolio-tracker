import { useState } from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import StockSearch from './StockSearch';
import api from '../api/axios';

interface TransactionModalProps {
  portfolioId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TransactionModal = ({ portfolioId, isOpen, onClose, onSuccess }: TransactionModalProps) => {
  const [type, setType] = useState<'buy' | 'sell'>('buy');
  const [symbol, setSymbol] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol || !quantity || !price) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/transactions', {
        portfolio_id: portfolioId,
        ticker_symbol: symbol,
        quantity: parseFloat(quantity),
        price_per_share: parseFloat(price),
        type
      });
      onSuccess();
      onClose();
      // Reset form
      setSymbol('');
      setCompanyName('');
      setQuantity('');
      setPrice('');
      setType('buy');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to process transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-blue-500" />
            New Transaction
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex rounded-lg bg-slate-800 p-1">
            <button
              type="button"
              onClick={() => setType('buy')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${type === 'buy' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => setType('sell')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${type === 'sell' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Sell
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Asset Symbol</label>
            {symbol ? (
              <div className="flex justify-between items-center p-3 bg-slate-800 border border-slate-700 rounded-lg">
                <div>
                  <div className="font-bold text-white">{symbol}</div>
                  <div className="text-xs text-slate-400">{companyName}</div>
                </div>
                <button
                  type="button"
                  onClick={() => { setSymbol(''); setCompanyName(''); }}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Change
                </button>
              </div>
            ) : (
              <StockSearch onSelect={(sym, name) => { setSymbol(sym); setCompanyName(name); }} />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Quantity</label>
              <input
                type="number"
                step="any"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Price per share</label>
              <input
                type="number"
                step="any"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="$ 0.00"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : `Confirm ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
