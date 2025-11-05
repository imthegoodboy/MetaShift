"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [creativeUrl, setCreativeUrl] = useState<string | null>(null);
  const [slotId, setSlotId] = useState<number>(0);
  const [pricePerView, setPricePerView] = useState<number>(10000000000000000); // 0.01 MATIC

  useEffect(()=>{
    fetch('/api/auth/me').then(r=>r.json()).then(j=>{ setUser(j.user); setLoading(false); });
  },[]);

  async function uploadCreative() {
    if (!file) return alert('Pick a file');
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const j = await res.json();
    if (res.ok) setCreativeUrl(j.url);
    else alert(j.error || 'Upload failed');
  }

  async function createCampaign() {
    if (!creativeUrl) return alert('Upload creative first');
    const res = await fetch('/api/ad/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slotId: Number(slotId), creativeURI: creativeUrl, clickURL: 'https://example.com', pricePerView })
    });
    const j = await res.json();
    if (res.ok) alert('Campaign created: ' + JSON.stringify(j));
    else alert(j.error || 'Create failed');
  }

  if (loading) return <div style={{padding:20}}>Loading...</div>;
  if (!user) return <div style={{padding:20}}>Not signed in. <a href="/signin">Sign in</a></div>;

  return (
    <main style={{padding:20}}>
      <h1>Dashboard</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {user.role === 'advertiser' && (
        <div style={{marginTop:20}}>
          <h2>Advertiser panel</h2>
          <p>Free ads remaining: {user.freeAdsRemaining ?? 0}</p>
          <div style={{marginTop:12}}>
            <label>Choose creative image</label>
            <input type="file" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
            <button onClick={uploadCreative}>Upload</button>
            {creativeUrl && <div><img src={creativeUrl} alt="creative" style={{maxWidth:300}}/></div>}
          </div>
          <div style={{marginTop:12}}>
            <label>Slot ID</label>
            <input type="number" value={slotId} onChange={e=>setSlotId(Number(e.target.value))} />
          </div>
          <div style={{marginTop:12}}>
            <label>Price per view (wei)</label>
            <input type="number" value={pricePerView} onChange={e=>setPricePerView(Number(e.target.value))} />
          </div>
          <button onClick={createCampaign} style={{marginTop:12}}>Create Campaign</button>
        </div>
      )}

      {user.role === 'host' && (
        <div style={{marginTop:20}}>
          <h2>Host panel</h2>
          <p>Embed ad slot snippet into your site to start showing ads. (See docs)</p>
        </div>
      )}

      {user.role === 'viewer' && (
        <div style={{marginTop:20}}>
          <h2>Viewer panel</h2>
          <p>Browse dApps integrated with MetaShift and earn crypto for views.</p>
        </div>
      )}
    </main>
  );
}
