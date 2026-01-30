import React, { useState, useEffect } from 'react';
import { Calendar, Timer, Trash2, CheckCircle } from 'lucide-react';

const GiveawayCard = ({ giveaway, onDelete, onUpdateStatus }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(giveaway.endDate) - +new Date();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);

                setTimeLeft(`${days}d : ${hours}h : ${minutes}m`);
            } else {
                setTimeLeft('EXPIRED');
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
        return () => clearInterval(timer);
    }, [giveaway.endDate]);

    return (
        <div className="bento-card giveaway-card">
            <div className="card-media">
                <img
                    src={giveaway.image || 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800'}
                    alt={giveaway.title}
                />
                <div className="card-badges">
                    <div className="badge badge-live">LIVE NOW</div>
                    <div className="badge badge-timer">
                        <span className="timer-dot"></span>
                        {timeLeft}
                    </div>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(giveaway.id); }}
                    className="delete-btn"
                    style={{ position: 'absolute', bottom: '12px', right: '12px', zIndex: 10 }}
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <div className="card-body">
                <h3 className="card-title">{giveaway.title}</h3>
                <div className="card-meta">
                    <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Ends {new Date(giveaway.endDate).toLocaleDateString()}
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                    {giveaway.status === 'ACTIVE' ? (
                        <>
                            <button
                                onClick={() => onUpdateStatus(giveaway.id, 'WON')}
                                className="badge"
                                style={{ flex: 1, background: '#F0FDF4', color: '#10B981', border: 'none', cursor: 'pointer' }}
                            >
                                WINNER
                            </button>
                            <button
                                onClick={() => onUpdateStatus(giveaway.id, 'LOST')}
                                className="badge"
                                style={{ flex: 1, background: '#FEF2F2', color: '#EF4444', border: 'none', cursor: 'pointer' }}
                            >
                                MISSED
                            </button>
                        </>
                    ) : (
                        <div className={`badge ${giveaway.status === 'WON' ? 'status-won' : 'status-lost'}`} style={{ width: '100%', textAlign: 'center' }}>
                            {giveaway.status}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GiveawayCard;
