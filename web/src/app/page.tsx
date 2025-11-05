"use client";
import Layout from '../components/Layout';
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-6">
              MetaShift
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8">
              Decentralized "Ad-to-Earn" Economy for Web3 Users
            </p>
            <div className="mb-8">
              <ConnectButton />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/advertiser" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                Launch Campaign
              </Link>
              <Link href="/host" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-purple-600 bg-white shadow-sm hover:bg-gray-50 ring-1 ring-purple-600/20">
                Become a Host
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Advertisers */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">For Advertisers</h3>
              <p className="text-gray-600">Launch Web3-native ad campaigns with transparent pricing and real-time analytics. Get started with 5 free ad credits!</p>
            </div>

            {/* For Hosts */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">For Hosts</h3>
              <p className="text-gray-600">Monetize your dApp or website with Web3 ads. Get paid instantly in your preferred crypto via SideShift.</p>
            </div>

            {/* For Viewers */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">For Viewers</h3>
              <p className="text-gray-600">Earn crypto rewards for viewing ads. Auto-swap to your preferred token instantly via SideShift API.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Built With</h2>
            <p className="mt-4 text-lg text-gray-600">Powered by the latest Web3 technologies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center mb-4">
                <Image src="/images/polygon-logo.svg" alt="Polygon" width={48} height={48} />
              </div>
              <h3 className="text-lg font-semibold">Polygon Network</h3>
              <p className="text-gray-600 mt-2">Fast & low-cost transactions for ad payments</p>
            </div>

            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center mb-4">
                <Image src="/images/sideshift-logo.svg" alt="SideShift" width={48} height={48} />
              </div>
              <h3 className="text-lg font-semibold">SideShift API</h3>
              <p className="text-gray-600 mt-2">Instant crypto swaps for payouts</p>
            </div>

            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center mb-4">
                <Image src="/images/thegraph-logo.svg" alt="The Graph" width={48} height={48} />
              </div>
              <h3 className="text-lg font-semibold">The Graph</h3>
              <p className="text-gray-600 mt-2">Decentralized analytics & tracking</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
