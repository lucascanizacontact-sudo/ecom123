import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
    const { profile } = useAuth()
    const [stats, setStats] = useState({ sales: 0, orders: 0, products: 0 })

    useEffect(() => {
        if (profile) fetchStats()
    }, [profile])

    const fetchStats = async () => {
        const { data: store } = await supabase
            .from('stores')
            .select('id')
            .eq('owner_id', profile.id)
            .single()

        if (store) {
            const { data: orders } = await supabase
                .from('orders')
                .select('total_amount')
                .eq('store_id', store.id)

            const { count: productsCount } = await supabase
                .from('store_products')
                .select('*', { count: 'exact' })
                .eq('store_id', store.id)

            setStats({
                sales: orders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0,
                orders: orders?.length || 0,
                products: productsCount || 0
            })
        }
    }

    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                    <p className="text-sm text-text-muted uppercase tracking-wider mb-1">Total Sales</p>
                    <p className="text-3xl font-bold">${stats.sales.toFixed(2)}</p>
                </div>
                <div className="glass-card p-6">
                    <p className="text-sm text-text-muted uppercase tracking-wider mb-1">Active Orders</p>
                    <p className="text-3xl font-bold">{stats.orders}</p>
                </div>
                <div className="glass-card p-6">
                    <p className="text-sm text-text-muted uppercase tracking-wider mb-1">Products Selected</p>
                    <p className="text-3xl font-bold">{stats.products}</p>
                </div>
            </div>

            <div className="mt-10 glass-card p-10 text-center">
                <h3 className="text-2xl font-bold mb-4">Start Selling Today</h3>
                <p className="text-text-muted mb-6">Browse the catalog to select products and start registering your sales.</p>
                <div className="flex justify-center gap-4">
                    <a href="/catalog" className="btn btn-primary">Browse Catalog</a>
                </div>
            </div>
        </div>
    )
}
