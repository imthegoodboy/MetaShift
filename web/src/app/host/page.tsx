"use client";
import { useState } from "react";
import axios from "axios";

export default function HostPage() {
  const [slotURI, setSlotURI] = useState("https://your-site.com/header-banner");
  const [slotId, setSlotId] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Host</h1>
      <div className="mt-6 grid gap-4">
        <label className="grid gap-2">
          <span>Slot Metadata (placement)</span>
          <input className="rounded border px-3 py-2" value={slotURI} onChange={(e) => setSlotURI(e.target.value)} />
        </label>
        <button
          className="w-fit rounded bg-black px-4 py-2 text-white"
          onClick={async () => {
            const res = await axios.post("/api/mintSlot", { slotURI });
            setSlotId(res.data.tokenId);
          }}
        >
          Mint Ad Slot NFT
        </button>
        {slotId && (
          <div className="rounded border p-4">
            <h2 className="mb-2 font-medium">Embed Snippet</h2>
            <pre className="overflow-x-auto rounded bg-zinc-100 p-3 text-xs text-zinc-800">
{`<script async src="${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/adserve.js?slotId=${slotId}"></script>`}
            </pre>
            <p className="mt-2 text-sm text-zinc-500">Paste this before </p>
          </div>
        )}
      </div>
    </div>
  );
}


