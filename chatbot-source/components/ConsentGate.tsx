import React, { useState } from 'react';

interface ConsentGateProps {
  onConsent: () => void;
}

const ConsentGate: React.FC<ConsentGateProps> = ({ onConsent }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-accent/95 backdrop-blur-md p-4">
      <div className="bg-burning-orange-50 rounded-2xl shadow-2xl max-w-lg w-full p-8 space-y-6 border border-burning-orange-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Privacy Confirmation</h1>
          <p className="text-slate-500 text-sm font-medium">GDPR & DSGVO Compliant Interaction</p>
        </div>

        <div className="bg-white/50 p-5 rounded-xl border border-burning-orange-100 text-sm text-slate-700 space-y-3 leading-relaxed">
          <p>
            <strong>Ivan's AI Assistant</strong> operates in full compliance with European and German data protection laws (DSGVO).
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 text-xs">
            <li><strong>Persona:</strong> This AI assists Ivan and speaks about his career in the third person.</li>
            <li><strong>Data Processor:</strong> Your inputs are handled by Google AI Studio's Paid Service Tier (Zero Training on User Data).</li>
            <li><strong>User Rights:</strong> You have the right to access, export, or delete your chat data via the Privacy Menu.</li>
            <li><strong>Sensitive Data:</strong> Do not share private health or personal identification details.</li>
          </ul>
        </div>

        <div className="flex items-start space-x-3 p-2 group cursor-pointer" onClick={() => setAgreed(!agreed)}>
          <div className={`mt-1 h-5 w-5 flex items-center justify-center rounded border transition-all ${agreed ? 'bg-primary border-primary' : 'border-slate-300 bg-white group-hover:border-primary'}`}>
            {agreed && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
          </div>
          <label className="text-sm text-slate-700 select-none cursor-pointer leading-tight">
            I explicitly consent to the processing of my inputs by Ivan's AI Assistant for professional assessment.
          </label>
        </div>

        <button
          onClick={() => agreed && onConsent()}
          disabled={!agreed}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 ${
            agreed
              ? 'bg-primary hover:bg-secondary shadow-lg shadow-burning-orange-200 transform hover:-translate-y-1'
              : 'bg-slate-300 cursor-not-allowed opacity-50'
          }`}
        >
          Enter Assistant Workspace
        </button>
      </div>
    </div>
  );
};

export default ConsentGate;