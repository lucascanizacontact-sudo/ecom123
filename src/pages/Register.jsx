import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [storeName, setStoreName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // 1. Sign up user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
            return
        }

        if (authData.user) {
            // 2. Create store
            const { error: storeError } = await supabase
                .from('stores')
                .insert([{ name: storeName, owner_id: authData.user.id }])

            if (storeError) {
                setError("Account created, but store setup failed: " + storeError.message)
            } else {
                setSuccess(true)
            }
        }

        setLoading(false)
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-card p-8 w-full max-w-md text-center">
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Registration Successful</h2>
                    <p className="text-text-muted mb-6">Please check your email to verify your account before logging in.</p>
                    <a href="/login" className="btn btn-primary w-full justify-center">Go to Login</a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card p-8 w-full max-w-md animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 text-center">Join Ecom123</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label>Store Name</label>
                        <input
                            type="text"
                            className="input-field"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            placeholder="e.g. My Awesome Shop"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-rose-500 text-sm mb-4">{error}</p>}
                    <button className="btn btn-primary w-full justify-center" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Get Started'}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-text-muted">
                    Already have an account? <a href="/login" className="text-primary hover:underline">Login</a>
                </p>
            </div>
        </div>
    )
}
