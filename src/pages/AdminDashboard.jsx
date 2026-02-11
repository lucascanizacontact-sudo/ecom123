import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminDashboard() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        const { data } = await supabase
            .from('orders')
            .select('*, stores(name)')
            .order('created_at', { ascending: false })

        setOrders(data || [])
        setLoading(false)
    }

    const updateStatus = async (orderId, newStatus) => {
        await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
        fetchOrders()
    }

    const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

    if (loading) return <div className="p-10 text-center">Loading Management Console...</div>

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Order Fulfillment</h2>
            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border bg-white/5">
                            <th className="p-4 font-semibold">Store</th>
                            <th className="p-4 font-semibold">Customer</th>
                            <th className="p-4 font-semibold">Total</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b border-border hover:bg-white/5">
                                <td className="p-4 font-medium">{order.stores?.name}</td>
                                <td className="p-4 text-sm">{order.customer_info.name}</td>
                                <td className="p-4 font-bold">${order.total_amount}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded-full text-xs font-bold uppercase bg-primary/10 text-primary">
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <select
                                        className="bg-slate-800 border-border rounded text-xs p-1"
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                    >
                                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
