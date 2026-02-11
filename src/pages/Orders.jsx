import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

export default function Orders() {
    const { profile } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [profile])

    const fetchOrders = async () => {
        if (!profile) return

        const { data: storeData } = await supabase
            .from('stores')
            .select('id')
            .eq('owner_id', profile.id)
            .single()

        if (storeData) {
            const { data } = await supabase
                .from('orders')
                .select('*')
                .eq('store_id', storeData.id)
                .order('created_at', { ascending: false })

            setOrders(data || [])
        }
        setLoading(false)
    }

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-amber-500/20 text-amber-500',
            confirmed: 'bg-blue-500/20 text-blue-500',
            processing: 'bg-indigo-500/20 text-indigo-500',
            shipped: 'bg-purple-500/20 text-purple-500',
            delivered: 'bg-success/20 text-success',
            cancelled: 'bg-rose-500/20 text-rose-500'
        }
        return colors[status] || 'bg-slate-500/20 text-slate-500'
    }

    if (loading) return <div className="p-10 text-center">Loading Orders...</div>

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Sales History</h2>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border bg-white/5">
                                <th className="p-4 font-semibold">Order ID</th>
                                <th className="p-4 font-semibold">Customer</th>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Total</th>
                                <th className="p-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-text-muted">No orders registered yet.</td>
                                </tr>
                            ) : orders.map(order => (
                                <tr key={order.id} className="border-b border-border hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-xs font-mono">{order.id.split('-')[0]}...</td>
                                    <td className="p-4">
                                        <p className="font-medium">{order.customer_info.name}</p>
                                        <p className="text-xs text-text-muted">{order.customer_info.location}</p>
                                    </td>
                                    <td className="p-4 text-sm">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 font-bold">${order.total_amount}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
