"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

export default function AdvertiserPage() {
  const { address, isConnected } = useAccount();
  const [slotId, setSlotId] = useState(0);
  const [creativeURI, setCreativeURI] = useState("");
  const [clickURL, setClickURL] = useState("");
  const [pricePerView, setPricePerView] = useState("1000000000000000"); // 0.001 MATIC
  const [campaignId, setCampaignId] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Advertiser</h1>
      {!isConnected ? (
        <p className="mt-4 text-zinc-500">Connect your wallet to continue.</p>
      ) : (
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span>Target Slot ID</span>
            <input className="rounded border px-3 py-2" type="number" value={slotId} onChange={(e) => setSlotId(Number(e.target.value))} />
          </label>
          <label className="grid gap-2">
            <span>Creative URL (image/video)</span>
            <input className="rounded border px-3 py-2" value={creativeURI} onChange={(e) => setCreativeURI(e.target.value)} />
          </label>
          <label className="grid gap-2">
            <span>Click-through URL</span>
            <input className="rounded border px-3 py-2" value={clickURL} onChange={(e) => setClickURL(e.target.value)} />
          </label>
          <label className="grid gap-2">
            <span>Price Per View (wei)</span>
            <input className="rounded border px-3 py-2" value={pricePerView} onChange={(e) => setPricePerView(e.target.value)} />
          </label>

          <div className="flex gap-3">
            <button
              className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
              onClick={async () => {
                const res = await axios.post("/api/createCampaign", {
                  slotId,
                  creativeURI,
                  clickURL,
                  pricePerView,
                });
                setCampaignId(res.data.id);
              }}
            >
              Create Campaign
            </button>
            {campaignId && <span className="self-center text-sm text-zinc-600">Created: {campaignId}</span>}
          </div>

          {campaignId && (
            <div className="mt-4">
              <FundWidget id={campaignId} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FundWidget({ id }: { id: number }) {
  const [amount, setAmount] = useState("100000000000000000"); // 0.1 MATIC
  return (
    <div className="rounded border p-4">
      <h2 className="mb-2 font-medium">Fund Campaign</h2>
      <div className="flex gap-2">
        <input className="flex-1 rounded border px-3 py-2" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button
          className="rounded bg-black px-4 py-2 text-white"
          onClick={async () => {
            await axios.post("/api/fundCampaign", { id, amount });
            alert("Funded");
          }}
        >
          Fund (MATIC)
        </button>
      </div>
    </div>
  );
}


