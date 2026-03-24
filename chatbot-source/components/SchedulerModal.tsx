import React, { useState, useMemo } from 'react';
import { SchedulingConfig } from '../types';

interface SchedulerModalProps {
  config: SchedulingConfig;
  onClose: () => void;
  candidateName: string;
}

const SchedulerModal: React.FC<SchedulerModalProps> = ({ config, onClose, candidateName }) => {
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableSlots = useMemo(() => {
    const slots: Date[] = [];
    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);

    const [startH, startM] = config.startTime.split(':').map(Number);
    const [endH, endM] = config.endTime.split(':').map(Number);

    for (let i = 0; i < 14; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);
      if (config.days.includes(currentDay.getDay())) {
        let slotTime = new Date(currentDay);
        slotTime.setHours(startH, startM, 0, 0);
        const endTime = new Date(currentDay);
        endTime.setHours(endH, endM, 0, 0);

        while (slotTime < endTime) {
          slots.push(new Date(slotTime));
          slotTime.setMinutes(slotTime.getMinutes() + 30);
        }
      }
    }
    return slots;
  }, [config]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !userEmail) return;
    const subject = `Appointment Request for Ivan (via AI Assistant)`;
    const body = `Hello,\n\nI am Ivan's AI Assistant. An employer (${userEmail}) has requested a meeting on ${selectedSlot.toLocaleString()}.\n\nConfirmed Slot: ${selectedSlot.toISOString()}`;
    window.location.href = `mailto:${config.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent/80 backdrop-blur-md p-4">
        <div className="bg-burning-orange-50 rounded-2xl shadow-2xl max-w-md w-full p-10 text-center animate-scale-in border border-burning-orange-100">
          <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">Meeting Requested</h2>
          <p className="text-slate-500 mb-8 text-sm leading-relaxed">
            Ivan's AI Assistant has initiated the booking for <strong>{selectedSlot?.toLocaleString()}</strong>. Check your email client to send the final confirmation.
          </p>
          <button onClick={onClose} className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-secondary transition-all">
            Back to Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent/60 backdrop-blur-sm p-4">
      <div className="bg-burning-orange-50 rounded-3xl shadow-2xl max-w-3xl w-full flex flex-col max-h-[85vh] overflow-hidden animate-fade-in-up border border-burning-orange-100">
        <div className="bg-white px-8 py-6 border-b border-burning-orange-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-primary tracking-tight">Book a Technical Call</h2>
            <p className="text-[10px] font-bold text-burning-orange-400 uppercase tracking-widest">Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
          </div>
          <button onClick={onClose} className="text-burning-orange-300 hover:text-primary transition-colors">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">1. Select Available Time</h3>
              <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-3 custom-scroll">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.toISOString()}
                    onClick={() => setSelectedSlot(slot)}
                    className={`text-xs py-3 px-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${
                      selectedSlot?.getTime() === slot.getTime()
                        ? 'bg-primary text-white border-primary shadow-lg shadow-burning-orange-200'
                        : 'bg-white text-slate-700 border-burning-orange-100 hover:border-primary hover:bg-white'
                    }`}
                  >
                    <span className="opacity-70 font-bold mb-1">{slot.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}</span>
                    <span className="text-sm font-black uppercase tracking-tighter">{slot.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">2. Confirmation Details</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 px-1">Your Professional Email</label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="hiring@company.com"
                    className="w-full border-2 border-burning-orange-100 rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none bg-white"
                  />
                </div>

                <div className="p-6 bg-white rounded-2xl border border-burning-orange-100 shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Candidate:</span>
                    <span className="text-slate-900 font-black">{candidateName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Selected:</span>
                    <span className="text-primary font-black uppercase tracking-tighter">{selectedSlot ? selectedSlot.toLocaleString() : '---'}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedSlot || !userEmail}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-secondary disabled:opacity-30 transition-all shadow-2xl shadow-burning-orange-100 active:scale-95"
                >
                  Send Booking Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulerModal;