import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Transaction, UserStats } from '../../shared/types';
import { Filter, DollarSign, TrendingUp, ShoppingBag } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
  color: string;
  gradient: string;
  icon: React.ReactNode;
}

interface StatsProps {
  stats: Stat[];
}

type DateRangeType = 'today' | 'last30' | 'last6months' | 'allTime';

interface DateRange {
  start: string;
  end: string;
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${stat.gradient}`}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-100/90">{stat.label}</p>
              <div className="p-2 bg-white/10 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-white">
              {stat.value}
            </p>
          </div>
          <div 
            className="absolute inset-0 bg-gradient-to-br opacity-10"
            style={{ 
              backgroundImage: `radial-gradient(circle at 100% 100%, rgba(255,255,255,0.2) 0%, transparent 50%)`
            }}
          />
        </div>
      ))}
    </div>
  );
}

const sampleTransactions: Transaction[] = [
  {
    id: 'tx1',
    userId: 'user1',
    merchantName: 'Amazon',
    amount: 100.50,
    donationAmount: 1.00,
    date: '2025-01-07T12:00:00Z',
    status: 'paid',
    causeId: 'climate-action'
  },
  {
    id: 'tx2',
    userId: 'user1',
    merchantName: 'Target',
    amount: 75.25,
    donationAmount: 0.75,
    date: '2025-01-06T15:30:00Z',
    status: 'pending',
    causeId: 'climate-action'
  },
  {
    id: 'tx3',
    userId: 'user1',
    merchantName: 'Walmart',
    amount: 50.00,
    donationAmount: 0.50,
    date: '2025-01-05T10:00:00Z',
    status: 'paid',
    causeId: 'climate-action'
  },
  {
    id: 'tx4',
    userId: 'user1',
    merchantName: 'Best Buy',
    amount: 200.00,
    donationAmount: 2.00,
    date: '2025-01-04T12:00:00Z',
    status: 'paid',
    causeId: 'climate-action'
  },
  {
    id: 'tx5',
    userId: 'user1',
    merchantName: 'Home Depot',
    amount: 150.00,
    donationAmount: 1.50,
    date: '2025-01-03T15:00:00Z',
    status: 'pending',
    causeId: 'climate-action'
  }
];

export function StatsContainer() {
  const { user } = useAuth();
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>('last30');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid'>('all');
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);

  const getDateRange = (type: DateRangeType): DateRange => {
    const end = new Date('2025-01-07T13:43:41-08:00'); // Using provided current time
    const start = new Date('2025-01-07T13:43:41-08:00'); // Using provided current time

    switch (type) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        break;
      case 'last30':
        start.setDate(start.getDate() - 30);
        break;
      case 'last6months':
        start.setMonth(start.getMonth() - 6);
        break;
      case 'allTime':
        start.setFullYear(2020, 0, 1); // Company start date
        break;
    }

    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    };
  };

  // Calculate stats from transactions
  const calculateStats = (txs: Transaction[]) => {
    const total = txs.reduce((sum, tx) => sum + tx.donationAmount, 0);
    const paidTotal = txs.filter(tx => tx.status === 'paid').reduce((sum, tx) => sum + tx.donationAmount, 0);
    
    // Calculate monthly contribution (transactions from this month)
    const now = new Date('2025-01-07T13:43:41-08:00'); // Using provided current time
    const thisMonth = txs.filter(tx => {
      const txDate = new Date(tx.date);
      return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
    });
    const monthlyTotal = thisMonth.reduce((sum, tx) => sum + tx.donationAmount, 0);

    return [
      { 
        value: `$${total.toFixed(2)}`, 
        label: 'Total Contribution', 
        color: 'text-white', 
        gradient: 'bg-gradient-to-br from-rose-500 to-rose-600', 
        icon: <DollarSign className="h-5 w-5 text-white" /> 
      },
      { 
        value: `$${monthlyTotal.toFixed(2)}`, 
        label: 'Monthly Contribution', 
        color: 'text-white', 
        gradient: 'bg-gradient-to-br from-blue-500 to-blue-600', 
        icon: <TrendingUp className="h-5 w-5 text-white" /> 
      },
      { 
        value: txs.length.toString(), 
        label: 'Shopping Sessions', 
        color: 'text-white', 
        gradient: 'bg-gradient-to-br from-green-500 to-green-600', 
        icon: <ShoppingBag className="h-5 w-5 text-white" /> 
      },
    ];
  };

  React.useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'profiles', user.uid));
        const userData = userDoc.data() as { stats: UserStats } | undefined;
        
        if (userData?.stats?.transactions) {
          setTransactions(userData.stats.transactions);
        }
      }
    };

    fetchStats();
  }, [user]);

  const dateRange = getDateRange(dateRangeType);
  const filteredTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    endDate.setHours(23, 59, 59); // Include the entire end day

    const dateInRange = txDate >= startDate && txDate <= endDate;
    const statusMatch = statusFilter === 'all' || tx.status === statusFilter;

    return dateInRange && statusMatch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Stats stats={calculateStats(filteredTransactions)} />
      
      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { type: 'today', label: 'Today' },
                { type: 'last30', label: 'Last 30 Days' },
                { type: 'last6months', label: 'Last 6 Months' },
                { type: 'allTime', label: 'All Time' },
              ].map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => setDateRangeType(type as DateRangeType)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                    ${dateRangeType === type
                      ? 'bg-rose-100 text-rose-700'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'paid')}
                className="rounded-lg border-gray-300 text-sm focus:border-rose-500 focus:ring-rose-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.merchantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(tx.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-600">{formatCurrency(tx.donationAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tx.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-500 text-right">
        Last updated: {new Date('2025-01-07T13:43:41-08:00').toLocaleDateString()}
      </div>
    </div>
  );
}