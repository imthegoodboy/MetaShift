'use client';
import Layout from '../../components/Layout';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';

export default function HostPage() {
  const { isConnected } = useAccount();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minPrice, setMinPrice] = useState('1000000000000000'); // 0.001 MATIC
  const [slotId, setSlotId] = useState<number | null>(null);
  const [minting, setMinting] = useState(false);

  async function handleMint(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !description) return;

    try {
      setMinting(true);
      const res = await axios.post('/api/mintSlot', {
        name,
        description,
        minPrice
      });
      
      setSlotId(res.data.tokenId);
      alert('Ad slot NFT minted successfully! ID: ' + res.data.tokenId);

      // Reset form
      setName('');
      setDescription('');
      setMinPrice('1000000000000000');
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    } finally {
      setMinting(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Become a Host</h1>
            <p className="text-lg text-gray-600">
              Monetize your dApp or website with Web3 ads and earn crypto instantly
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
            <form onSubmit={handleMint} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-6">Create Ad Slot</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slot Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., Homepage Banner"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe where this ad slot will appear and any requirements"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Price Per View (wei)
                  </label>
                  <input
                    type="text"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="1000000000000000"
                  />
                  <p className="mt-1 text-sm text-gray-500">Default: 0.001 MATIC per view</p>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={minting}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {minting ? 'Minting...' : 'Mint Ad Slot NFT'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {slotId && (
            <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Integration Code</h2>
              <p className="text-sm text-gray-600 mb-4">
                Add this code to your website or dApp where you want the ad to appear:
              </p>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                <code>{`<script src="${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/adserve.js"></script>
<div 
  class="metashift-ad" 
  data-slot-id="${slotId}"
  style="width: 300px; height: 250px;"
></div>`}</code>
              </pre>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}



