import React, { useEffect, useState } from 'react';

interface Order {
  id: string;
  amount: number;
  currency: string;
  item_name: string;
  payer_email?: string;
  status: 'COMPLETE' | 'PENDING' | 'FAILED' | 'CANCELLED' | 'UNKNOWN';
  created_at: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/orders/list');
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setOrders(Array.isArray(data?.orders) ? data.orders : []);
      } catch (e: any) {
        setError(e?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="py-24 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">Pre-Orders</h1>
        {loading && <p className="text-slate-400">Loading…</p>}
        {error && <p className="text-red-400">Error: {error}</p>}
        {!loading && !error && (
          <div className="glass-panel rounded-2xl p-6">
            {orders.length === 0 ? (
              <p className="text-slate-400">No orders yet.</p>
            ) : (
              <div className="grid gap-4">
                {orders.map((o) => (
                  <div key={o.id} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold">{o.item_name}</div>
                      <div className="text-slate-400 text-sm">
                        {o.currency}{o.amount.toFixed(2)} • {o.payer_email || 'no email'} • {new Date(o.created_at).toLocaleString()}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-sm font-bold ${
                      o.status === 'COMPLETE' ? 'bg-green-500 text-black' :
                      o.status === 'PENDING' ? 'bg-yellow-300 text-black' :
                      o.status === 'CANCELLED' ? 'bg-slate-300 text-black' :
                      o.status === 'FAILED' ? 'bg-red-500 text-white' :
                      'bg-slate-500 text-white'
                    }`}>
                      {o.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrdersPage;
