import React, { useState } from 'react';
import { X } from 'lucide-react';

const AVATAR_SEEDS = [
    'Alex', 'Maria', 'Sora', 'Felix', 'Jake',
    'Luna', 'Sam', 'Milo', 'Kira', 'Finn',
    'Aria', 'Leo', 'Zoe', 'Hugo'
];

const ProfileModal = ({ isOpen, onClose, userProfile, onUpdate }) => {
    const [name, setName] = useState(userProfile.name);
    const [selectedSeed, setSelectedSeed] = useState(userProfile.avatarSeed);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ name, avatarSeed: selectedSeed });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Edit Profile</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909499' }}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>DISPLAY NAME</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>SELECT AVATAR</label>
                        <div className="avatar-grid">
                            {AVATAR_SEEDS.map(seed => (
                                <div
                                    key={seed}
                                    className={`avatar-option ${selectedSeed === seed ? 'selected' : ''}`}
                                    onClick={() => setSelectedSeed(seed)}
                                >
                                    <img
                                        src={`https://api.dicebear.com/9.x/notionists/svg?seed=${seed}&backgroundColor=e5e7eb`}
                                        alt={seed}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '24px' }}>
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;
