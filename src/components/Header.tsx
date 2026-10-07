import React, { useState } from 'react';
import { MEMBER_COMPANIES } from '../data/constants';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Header: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Bên trái: Định danh Sao Mai Group & Tiêu đề khảo sát */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-1.5 h-8 sm:h-9 bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-800 rounded-full"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-extrabold text-blue-900 tracking-wider uppercase font-sans">
                    SAO MAI GROUP
                  </span>
                  <span className="text-slate-300 font-normal">|</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
                    Khảo Sát Nhận Diện & Nhu Cầu AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <span>Cụm Công Nghiệp Vàm Cống</span>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center font-semibold text-emerald-700">
                    <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-600 inline" />
                    Nội Bộ 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bên phải: 4 khối màu nhận diện tinh tế cho 4 thương hiệu thành viên: AFO | IDI | TRISEDCO | SPF */}
          <div className="flex items-center justify-center md:justify-end gap-2 sm:gap-2.5 w-full md:w-auto overflow-x-auto py-1 scrollbar-none">
            {MEMBER_COMPANIES.map((company) => {
              const hasError = imageErrors[company.id];

              // Color accents per brand
              const colorClasses = {
                AFO: 'border-red-200 hover:border-red-400 hover:shadow-red-500/10 focus-visible:ring-red-400',
                IDI: 'border-sky-200 hover:border-sky-400 hover:shadow-sky-500/10 focus-visible:ring-sky-400',
                Trisedco: 'border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-500/10 focus-visible:ring-indigo-400',
                SPF: 'border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-500/10 focus-visible:ring-emerald-400',
              }[company.id] || 'border-slate-200';

              const indicatorGradient = {
                AFO: 'from-red-600 to-amber-500',
                IDI: 'from-sky-500 to-blue-600',
                Trisedco: 'from-blue-700 to-indigo-800',
                SPF: 'from-emerald-500 to-teal-700',
              }[company.id] || 'from-blue-600 to-indigo-600';

              return (
                <a
                  key={company.id}
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${company.name} - ${company.fullName}`}
                  className={`group relative flex items-center justify-center px-2 sm:px-2.5 py-1.5 rounded-xl border bg-white shadow-2xs hover:shadow-sm transition-all duration-200 shrink-0 overflow-hidden ${colorClasses}`}
                >
                  {/* Subtle top indicator bar representing brand color */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${indicatorGradient}`}
                  ></div>

                  {!hasError ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      onError={() => handleImageError(company.id)}
                      style={{ height: '30px' }}
                      className="h-[30px] w-auto max-w-[80px] sm:max-w-[105px] object-contain group-hover:scale-105 transition-transform duration-200 py-0.5"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-700 group-hover:text-blue-600 h-[30px] px-1">
                      <span>{company.name}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
