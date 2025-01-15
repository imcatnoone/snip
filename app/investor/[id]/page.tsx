'use client'

import { Sidebar } from "@/components/ui/sidebar";
import mockInvestorData from '@/app/mockData';
import { notFound } from 'next/navigation';

export default function InvestorProfile({ params }: { params: { id: string } }) {
    const investor = mockInvestorData.find(inv => inv.id === params.id);

    if (!investor) {
        notFound();
    }

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar className="w-52 border-r" />
            <div className="flex-1">
                <header className="border-b">
                    <div className="container mx-auto px-4 py-4">
                        <h1 className="text-2xl font-bold text-primary">Investor Profile</h1>
                    </div>
                </header>
                <main className="container mx-auto px-4 py-8">
                    <h1>{investor.name}</h1>
                    <p>Stage: {investor.stage}</p>
                    <p>Status: {investor.status}</p>
                    <p>Type: {investor.type}</p>
                    <p>Check Size: {investor.checkSize}</p>
                    <p>Sector: {investor.sector}</p>
                    <p>Co-Investors: {investor.coInvestors}</p>
                    <p>Red Flags: {investor.redFlags.join(', ')}</p>
                </main>
            </div>
        </div>
    );
}
