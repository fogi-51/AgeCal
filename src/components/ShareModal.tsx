import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Twitter, Facebook, Mail, Share2 } from 'lucide-react';
import { AgeResult } from '../utils/ageCalculator';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  ageResult: AgeResult;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, ageResult }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { years, months, days } = ageResult;
  const shareText = `I am ${years} years, ${months} months and ${days} days old. Calculated with AgeCalc.`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://agecalc.app';

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = shareText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = [
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: MessageSquare,
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: Twitter,
      color: 'bg-black hover:bg-slate-900 text-white dark:bg-slate-800 dark:hover:bg-slate-700',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodeURIComponent('My Exact Age Calculation')}&body=${encodedText}%0A%0A${encodedUrl}`,
      icon: Mail,
      color: 'bg-slate-600 hover:bg-slate-700 text-white',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <Share2 className="w-5 h-5 text-blue-600" />
            <h3 id="share-modal-title">Share Your Age Result</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview snippet */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-sm text-slate-700 dark:text-slate-300 font-medium">
          "{shareText}"
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-150 cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-xs'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Result Text'}</span>
        </button>

        {/* Quick Social Links */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-500">Or share directly via:</span>
          <div className="grid grid-cols-2 gap-2.5">
            {shareLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold ${link.color} transition-all`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
