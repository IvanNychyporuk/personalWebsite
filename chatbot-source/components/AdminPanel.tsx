import React, { useState } from 'react';
import { CandidateProfile } from '../types';

interface AdminPanelProps {
  profile: CandidateProfile;
  onUpdateProfile: (p: CandidateProfile) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ profile, onUpdateProfile, onClose }) => {
  const [formData, setFormData] = useState<CandidateProfile>(profile);
  const [jsonInput, setJsonInput] = useState(JSON.stringify(profile, null, 2));
  const [activeTab, setActiveTab] = useState<'form' | 'json'>('form');

  const handleChange = (field: keyof CandidateProfile, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setJsonInput(JSON.stringify(updated, null, 2));
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setFormData(parsed);
    } catch (err) {}
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-burning-orange-50 flex flex-col overflow-hidden">
      <div className="bg-accent text-white p-5 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold">A</div>
          <h2 className="text-xl font-bold tracking-tight">Portfolio Admin</h2>
        </div>
        <button onClick={onClose} className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
          Exit Admin
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
        <div className="mb-8 flex space-x-6 border-b border-burning-orange-100 pb-2">
          <button
            onClick={() => setActiveTab('form')}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'form' ? 'border-b-4 border-primary text-primary' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Structure
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'json' ? 'border-b-4 border-primary text-primary' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Raw JSON
          </button>
        </div>

        {activeTab === 'form' ? (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Candidate Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full border border-burning-orange-100 rounded-xl p-3 outline-none bg-white focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Primary Specialization</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full border border-burning-orange-100 rounded-xl p-3 outline-none bg-white focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={formData.linkedIn || ''}
                  onChange={(e) => handleChange('linkedIn', e.target.value)}
                  className="w-full border border-burning-orange-100 rounded-xl p-3 outline-none bg-white focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Contact Email (for internal notifications)</label>
                <input
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  className="w-full border border-burning-orange-100 rounded-xl p-3 outline-none bg-white focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Experience / Project List (Markdown)</label>
              <textarea
                value={formData.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                rows={10}
                className="w-full border border-burning-orange-100 rounded-xl p-4 font-mono text-sm outline-none bg-white focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <textarea
              value={jsonInput}
              onChange={handleJsonChange}
              rows={25}
              className="w-full border border-burning-orange-200 rounded-xl p-6 font-mono text-sm bg-slate-900 text-burning-orange-100 outline-none"
            />
          </div>
        )}

        <div className="mt-12 flex justify-end pb-12">
          <button
            onClick={handleSave}
            className="bg-primary text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-secondary shadow-xl transition-all"
          >
            Deploy Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;