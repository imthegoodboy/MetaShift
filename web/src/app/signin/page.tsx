"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const j = await res.json();
    setLoading(false);
    if (res.ok) router.push('/dashboard');
    else alert(j.error || 'Sign in failed');
  }

  return (
    <main style={{padding:20,maxWidth:600,margin:'0 auto'}}>
      <h1>Sign in — MetaShift</h1>
      <form onSubmit={submit}>
        <div style={{marginBottom:12}}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required style={{width:'100%'}} />
        </div>
        <div style={{marginBottom:12}}>
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required style={{width:'100%'}} />
        </div>
        <button disabled={loading}>{loading? 'Signing in...' : 'Sign in'}</button>
      </form>
    </main>
  );
}
