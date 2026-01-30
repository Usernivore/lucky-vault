import React, { useState, useEffect } from 'react';
import { Plus, Users, Zap, LayoutGrid, Search } from 'lucide-react';
import GiveawayCard from './components/GiveawayCard';
import AddModal from './components/AddModal';
import ProfileModal from './components/ProfileModal';

/**
 * CUSTOM HOOK: useGiveaways
 * Handles CRUD operations and localStorage sync
 */
function useGiveaways() {
    const [giveaways, setGiveaways] = useState(() => {
        const saved = localStorage.getItem('antigravity_giveaways');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('antigravity_giveaways', JSON.stringify(giveaways));
    }, [giveaways]);

    const addGiveaway = (data) => {
        const newGiveaway = {
            id: crypto.randomUUID(),
            status: 'ACTIVE',
            ...data
        };
        setGiveaways(prev => [newGiveaway, ...prev]);
    };

    const deleteGiveaway = (id) => {
        setGiveaways(prev => prev.filter(g => g.id !== id));
    };

    const updateStatus = (id, status) => {
        setGiveaways(prev => prev.map(g =>
            g.id === id ? { ...g, status } : g
        ));
    };

    return { giveaways, addGiveaway, deleteGiveaway, updateStatus };
}

export default function App() {
    const { giveaways, addGiveaway, deleteGiveaway, updateStatus } = useGiveaways();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Profile State & Persistence
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : { name: 'Guest', avatarSeed: 'Felix' };
    });

    useEffect(() => {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }, [userProfile]);

    const activeCount = giveaways.filter(g => g.status === 'ACTIVE').length;
    const wonCount = giveaways.filter(g => g.status === 'WON').length;

    return (
        <div className="app-container">
            <header className="header">
                <div className="logo-group">
                    <p>MANAGER</p>
                    <h1>Lucky Vault</h1>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ padding: '10px', background: 'white', borderRadius: '50%', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>
                        <Search size={20} color="#909499" />
                    </div>

                    {/* User Profile Trigger */}
                    <div className="profile-trigger" onClick={() => setIsProfileModalOpen(true)}>
                        <img
                            src={`https://api.dicebear.com/9.x/notionists/svg?seed=${userProfile.avatarSeed}&backgroundColor=e5e7eb`}
                            alt="avatar"
                        />
                        <span className="profile-name">{userProfile.name}</span>
                    </div>
                </div>
            </header>

            <main className="bento-grid">
                {/* Stats Card */}
                <div className="bento-card stat-card">
                    <div className="stat-icon blue-icon">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="stat-val">{giveaways.length}</div>
                        <div className="stat-lab">TOTAL VAULTS</div>
                    </div>
                </div>

                {/* Add Action Card */}
                <div className="bento-card action-card" onClick={() => setIsAddModalOpen(true)}>
                    <div className="plus-icon">
                        <Plus size={32} />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '18px' }}>New Vault</div>
                </div>

                {/* Second Stat Card */}
                <div className="bento-card stat-card">
                    <div className="stat-icon" style={{ background: '#FFF7ED', color: '#F59E0B' }}>
                        <Zap size={24} />
                    </div>
                    <div>
                        <div className="stat-val">{activeCount}</div>
                        <div className="stat-lab">ACTIVE CAMPAIGNS</div>
                    </div>
                </div>

                {/* Giveaway List */}
                {giveaways.map(g => (
                    <GiveawayCard
                        key={g.id}
                        giveaway={g}
                        onDelete={deleteGiveaway}
                        onUpdateStatus={updateStatus}
                    />
                ))}

                {giveaways.length === 0 && (
                    <div className="span-2 bento-card" style={{ textAlign: 'center', padding: '60px', color: '#909499' }}>
                        <LayoutGrid size={48} style={{ margin: '0 auto 16px', opacity: 0.2 }} />
                        <p style={{ fontWeight: 600 }}>Your vault is empty</p>
                        <p style={{ fontSize: '14px', opacity: 0.7 }}>Click "New Vault" to start tracking your luck.</p>
                    </div>
                )}
            </main>

            <AddModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={addGiveaway}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                userProfile={userProfile}
                onUpdate={setUserProfile}
            />
        </div>
    );
}
