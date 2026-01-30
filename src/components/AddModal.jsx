import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

const AddModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        endDate: ''
    });
    const [preview, setPreview] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData({ ...formData, image: base64String });
                setPreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.endDate) return;
        onAdd(formData);
        setFormData({ title: '', image: '', endDate: '' });
        setPreview(null);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800 }}>New Vault</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909499' }}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>GIVEAWAY TITLE</label>
                        <input
                            type="text"
                            placeholder="e.g. Summer Tech Vault"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>UPLOAD COVER IMAGE</label>
                        <div className="file-input-wrapper">
                            {preview ? (
                                <img src={preview} alt="Preview" className="preview-thumbnail" />
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#909499' }}>
                                    <Upload size={32} />
                                    <span style={{ fontSize: '13px', fontWeight: 600 }}>Click to upload image</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>END DATE & TIME</label>
                        <input
                            type="datetime-local"
                            value={formData.endDate}
                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '12px' }}>
                        Create Giveaway
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddModal;
