import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { X, ShoppingBag } from 'lucide-react'

export default function OrderModal({ isOpen, onClose, storeId, onOrderCreated }) {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [customer, setCustomer] = useState({ name: '', location: '', phone: '' })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isOpen) fetchSelectedProducts()
    }, [isOpen])

    const fetchSelectedProducts = async () => {
        const { data } = await supabase
            .from('store_products')
            .select('products(*)')
            .eq('store_id', storeId)

        setProducts(data?.map(d => d.products) || [])
    }

    const addToCart = (product) => {
        setCart([...cart, { ...product, quantity: 1 }])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const total = cart.reduce((sum, item) => sum + (item.base_price * item.quantity), 0)

        // 1. Create order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([{
                store_id: storeId,
                customer_info: customer,
                total_amount: total,
                status: 'pending'
            }])
            .select()
            .single()

        if (order) {
            // 2. Add items
            const items = cart.map(item => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.quantity,
                unit_price: item.base_price
            }))

            await supabase.from('order_items').insert(items)
            onOrderCreated()
            onClose()
        }
        setLoading(false)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-white">
                    <X size={24} />
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <ShoppingBag className="text-primary" />
                        Register New Sale
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="input-group">
                                <label>Customer Name</label>
                                <input
                                    type="text" className="input-field" required
                                    value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Phone Number</label>
                                <input
                                    type="text" className="input-field" required
                                    value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Delivery Location (Address)</label>
                            <input
                                type="text" className="input-field" required
                                value={customer.location} onChange={e => setCustomer({ ...customer, location: e.target.value })}
                            />
                        </div>

                        <div className="border-t border-border pt-6">
                            <h3 className="font-bold mb-4">Select Products</h3>
                            {products.length === 0 ? (
                                <p className="text-sm text-text-muted">No products selected in your catalog. Please go to Catalog first.</p>
                            ) : (
                                <div className="space-y-2">
                                    {products.map(p => (
                                        <div key={p.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                            <span>{p.name} - <span className="text-primary font-bold">${p.base_price}</span></span>
                                            <button
                                                type="button"
                                                onClick={() => addToCart(p)}
                                                className="text-xs btn btn-primary py-1 px-3"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="bg-primary/10 p-4 rounded-lg">
                                <h4 className="font-bold mb-2">Cart Summary</h4>
                                {cart.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span>{item.name} x1</span>
                                        <span>${item.base_price}</span>
                                    </div>
                                ))}
                                <div className="border-t border-primary/20 mt-2 pt-2 flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${cart.reduce((sum, i) => sum + i.base_price, 0).toFixed(2)}</span>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-full justify-center"
                            disabled={loading || cart.length === 0}
                        >
                            {loading ? 'Registering...' : 'Confirm Order'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
