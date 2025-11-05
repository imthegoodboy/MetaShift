"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("advertiser");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    const j = await res.json();
    setLoading(false);
    if (res.ok) router.push('/dashboard');
    else alert(j.error || 'Signup failed');
  }

  return (
    <main style={{padding:20,maxWidth:600,margin:'0 auto'}}>
      <h1>Sign up — MetaShift</h1>
      <form onSubmit={submit}>
        <div style={{marginBottom:12}}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required style={{width:'100%'}} />
        </div>
        <div style={{marginBottom:12}}>
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required style={{width:'100%'}} />
        </div>
        <div style={{marginBottom:12}}>
          <label>Role</label>
          <select value={role} onChange={e=>setRole(e.target.value)} style={{width:'100%'}}>
            <option value="advertiser">Advertiser</option>
            <option value="host">Host</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
        <button disabled={loading}>{loading? 'Creating...' : 'Create account'}</button>
      </form>
    </main>
  );
}
