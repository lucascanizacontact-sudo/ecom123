import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { Check, Plus } from 'lucide-react'

export default function Catalog() {
    const { profile } = useAuth()
    const [products, setProducts] = useState([])
    const [selectedIds, setSelectedIds] = useState(new Set())
    const [loading, setLoading] = useState(true)
    const [store, setStore] = useState(null)

    useEffect(() => {
        fetchStoreAndProducts()
    }, [profile])

    const fetchStoreAndProducts = async () => {
        if (!profile) return

        // 1. Get seller's store
        const { data: storeData } = await supabase
            .from('stores')
            .select('id')
            .eq('owner_id', profile.id)
            .single()

        setStore(storeData)

        // 2. Get all active products
        const { data: productsData } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true)

        setProducts(productsData || [])

        // 3. Get existing selections
        if (storeData) {
            const { data: selectionData } = await supabase
                .from('store_products')
                .select('product_id')
                .eq('store_id', storeData.id)

            setSelectedIds(new Set(selectionData?.map(s => s.product_id) || []))
        }

        setLoading(false)
    }

    const toggleSelection = async (productId) => {
        if (!store) return

        if (selectedIds.has(productId)) {
            // Unselect
            await supabase
                .from('store_products')
                .delete()
                .eq('store_id', store.id)
                .eq('product_id', productId)

            const newSet = new Set(selectedIds)
            newSet.delete(productId)
            setSelectedIds(newSet)
        } else {
            // Select
            await supabase
                .from('store_products')
                .insert([{ store_id: store.id, product_id: productId }])

            setSelectedIds(new Set([...selectedIds, productId]))
        }
    }

    if (loading) return <div className="p-10 text-center">Loading Catalog...</div>

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Product Catalog</h2>
            <p className="text-text-muted mb-10">Select the products you want to feature in your resale operations.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                    <div key={product.id} className="glass-card overflow-hidden group">
                        <div className="aspect-video relative overflow-hidden">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            {selectedIds.has(product.id) && (
                                <div className="absolute top-2 right-2 bg-success text-white p-1 rounded-full">
                                    <Check size={16} />
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-text-muted text-sm mb-4 line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-primary">${product.base_price}</span>
                                <button
                                    onClick={() => toggleSelection(product.id)}
                                    className={`btn ${selectedIds.has(product.id) ? 'bg-white/10 text-text-muted' : 'btn-primary'}`}
                                >
                                    {selectedIds.has(product.id) ? 'Deselect' : (
                                        <>
                                            <Plus size={18} />
                                            Select Product
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
