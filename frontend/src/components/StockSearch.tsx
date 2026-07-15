import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Search, Loader2 } from 'lucide-react';

interface StockSearchProps {
  onSelect: (symbol: string, name: string) => void;
}

const StockSearch = ({ onSelect }: StockSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const res = await api.get(`/market/search?q=${query}`);
          setResults(res.data || []);
          setIsOpen(true);
        } catch (error) {
          console.error("Search error", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search symbols or companies..."
          className="block w-full pl-10 pr-10 py-2.5 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
          <ul className="py-2">
            {results.map((result: any, idx: number) => (
              <li
                key={idx}
                onClick={() => {
                  onSelect(result.symbol, result.description);
                  setIsOpen(false);
                  setQuery('');
                }}
                className="px-4 py-3 hover:bg-slate-700 cursor-pointer flex justify-between items-center transition-colors"
              >
                <div>
                  <div className="font-semibold text-white">{result.symbol}</div>
                  <div className="text-sm text-slate-400 truncate max-w-[200px]">{result.description}</div>
                </div>
                <div className="text-xs text-slate-500 px-2 py-1 bg-slate-900 rounded">{result.type}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
