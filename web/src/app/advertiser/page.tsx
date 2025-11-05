'use client';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import axios from 'axios';

export default function AdvertiserPage() {
  const { isConnected } = useAccount();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [slotId, setSlotId] = useState(0);
  const [clickURL, setClickURL] = useState('https://example.com');
  const [pricePerView, setPricePerView] = useState('1000000000000000'); // 0.001 MATIC
  const [campaignId, setCampaignId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function handleCreateCampaign(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!uploadRes.ok) throw new Error('Upload failed');
      const { url: creativeURI } = await uploadRes.json();

      setCreating(true);
      const res = await axios.post('/api/ad/create', {
        slotId,
        creativeURI,
        clickURL,
        pricePerView
      });
      
      setCampaignId(res.data.id);
      alert('Campaign created successfully! ID: ' + res.data.id);
      
      // Reset form
      setFile(null);
      setPreviewUrl(null);
      setClickURL('https://example.com');
      setPricePerView('1000000000000000');
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    } finally {
      setUploading(false);
      setCreating(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Launch Your Campaign</h1>
            <p className="text-lg text-gray-600">
              Create Web3-native ad campaigns with transparent pricing and real-time analytics
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-lg font-semibold">Connect Wallet</h2>
              <ConnectButton />
            </div>
          </div>

          {!isConnected ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Connect your wallet to continue</p>
            </div>
          ) : (
            <form onSubmit={handleCreateCampaign} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-6">Campaign Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Creative
                  </label>
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      {previewUrl ? (
                        <div className="relative">
                          <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto" />
                          <button
                            type="button"
                            onClick={() => { setFile(null); setPreviewUrl(null); }}
                            className="mt-2 text-sm text-red-600 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="text-gray-600">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex justify-center text-sm text-gray-600">
                            <label className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500">
                              <span>Upload a file</span>
                              <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Slot ID
                  </label>
                  <input
                    type="number"
                    value={slotId}
                    onChange={(e) => setSlotId(Number(e.target.value))}
                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Click-through URL
                  </label>
                  <input
                    type="url"
                    value={clickURL}
                    onChange={(e) => setClickURL(e.target.value)}
                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per View (wei)
                  </label>
                  <input
                    type="text"
                    value={pricePerView}
                    onChange={(e) => setPricePerView(e.target.value)}
                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="1000000000000000"
                  />
                  <p className="mt-1 text-sm text-gray-500">Default: 0.001 MATIC per view</p>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={!file || uploading || creating}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Uploading...' : creating ? 'Creating...' : 'Create Campaign'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {campaignId && (
            <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
              <FundWidget id={campaignId} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function FundWidget({ id }: { id: number }) {
  const [amount, setAmount] = useState("100000000000000000"); // 0.1 MATIC
  const [funding, setFunding] = useState(false);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Fund Campaign #{id}</h2>
      <div className="flex gap-4">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="100000000000000000"
        />
        <button
          disabled={funding}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={async () => {
            try {
              setFunding(true);
              await axios.post("/api/fundCampaign", { id, amount });
              alert("Campaign funded successfully!");
            } catch (err) {
              alert("Error: " + (err as Error).message);
            } finally {
              setFunding(false);
            }
          }}
        >
          {funding ? 'Funding...' : 'Fund Campaign'}
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-500">Default: 0.1 MATIC</p>
    </div>
  );
}



