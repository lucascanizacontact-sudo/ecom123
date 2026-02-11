import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Orders from './pages/Orders'
import AdminDashboard from './pages/AdminDashboard'
import OrderModal from './components/OrderModal'
import { supabase } from './lib/supabase'
import { LayoutDashboard, ShoppingBag, List, Settings, LogOut } from 'lucide-react'

const DashboardLayout = ({ children, isAdmin }) => {
    const { user, profile } = useAuth()
    const location = useLocation()
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
    const [storeId, setStoreId] = useState(null)

    useEffect(() => {
        if (profile) {
            supabase.from('stores').select('id').eq('owner_id', profile.id).single()
                .then(({ data }) => setStoreId(data?.id))
        }
    }, [profile])

    const navItems = isAdmin
        ? [{ label: 'Management', path: '/admin', icon: Settings }]
        : [
            { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
            { label: 'Catalog', path: '/catalog', icon: List },
            { label: 'Orders', path: '/orders', icon: ShoppingBag },
        ]

    return (
        <div className="min-h-screen flex bg-bg-main text-text-main">
            <aside className="w-64 glass-card rounded-none border-y-0 border-l-0 p-6 flex flex-col fixed h-full z-10">
                <h1 className="text-2xl font-bold mb-10 text-primary">Ecom123</h1>
                <nav className="space-y-2 flex-1">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 p-3 rounded transition-colors ${location.pathname === item.path ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto pt-6 border-t border-border">
                    <p className="text-xs text-text-muted truncate mb-3">{user?.email}</p>
                    <button
                        className="flex items-center gap-2 text-sm text-rose-500 hover:text-rose-400 transition-colors"
                        onClick={() => supabase.auth.signOut()}
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            <main className="flex-1 ml-64 p-10 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold">{isAdmin ? 'Admin Portal' : 'Seller Dashboard'}</h2>
                        <p className="text-text-muted">Control your operations from one place.</p>
                    </div>
                    {!isAdmin && (
                        <button onClick={() => setIsOrderModalOpen(true)} className="btn btn-primary">Register New Sale</button>
                    )}
                </header>
                {children}
            </main>

            <OrderModal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                storeId={storeId}
                onOrderCreated={() => window.location.reload()}
            />
        </div>
    )
}

function App() {
    const { user, profile, loading } = useAuth()
    if (loading) return <div className="min-h-screen bg-bg-main flex items-center justify-center">Loading...</div>

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

                <Route path="/dashboard" element={
                    user ? (profile?.role === 'admin' ? <Navigate to="/admin" /> : <DashboardLayout><Home /></DashboardLayout>) : <Navigate to="/login" />
                } />

                <Route path="/catalog" element={
                    user ? <DashboardLayout><Catalog /></DashboardLayout> : <Navigate to="/login" />
                } />

                <Route path="/orders" element={
                    user ? <DashboardLayout><Orders /></DashboardLayout> : <Navigate to="/login" />
                } />

                <Route path="/admin" element={
                    user && profile?.role === 'admin' ? <DashboardLayout isAdmin><AdminDashboard /></DashboardLayout> : <Navigate to="/dashboard" />
                } />

                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
