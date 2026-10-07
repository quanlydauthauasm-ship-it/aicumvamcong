import React from 'react';
import { Clock, Sparkles, Building2, BrainCircuit, Wrench, Lightbulb } from 'lucide-react';

interface HeroBannerProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: number[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentStep,
  onStepClick,
  completedSteps,
}) => {
  const steps = [
    { number: 1, label: 'Thông Tin Nhân Sự', icon: Building2, desc: 'Họ tên & Đơn vị' },
    { number: 2, label: 'Nhận Diện AI', icon: BrainCircuit, desc: 'Hiểu biết & Mục đích' },
    { number: 3, label: 'Công Cụ & Chi Phí', icon: Wrench, desc: 'Tần suất & Thời gian' },
    { number: 4, label: 'Nhu Cầu Đào Tạo', icon: Lightbulb, desc: 'Đào tạo & Đề xuất' },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl p-5 sm:p-7 md:p-9 mb-6 sm:mb-8 border border-blue-900/60">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-5 sm:gap-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 px-3 py-1.5 rounded-full font-medium backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Kế hoạch Chuyển Đổi Số & Tự Động Hóa 2026</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-slate-300 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>Thời gian: <strong>~3 phút</strong></span>
          </div>
        </div>

        {/* Main Title */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-black tracking-widest text-amber-400 uppercase">
              TẬP ĐOÀN SAO MAI · CỤM CÔNG NGHIỆP VÀM CỐNG
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight font-sans">
            KHẢO SÁT NHẬN DIỆN VÀ NHU CẦU ỨNG DỤNG TRÍ TUỆ NHÂN TẠO (AI)
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-blue-100/90 leading-relaxed font-normal max-w-3xl">
            Dành cho 4 Công ty thành viên: <strong className="text-white">AFO · IDI · TRISEDCO · SPF</strong>.
            Ý kiến đóng góp của Anh/Chị là cơ sở để Ban Lãnh đạo xây dựng chương trình đào tạo thực chiến và cấp tài khoản bản quyền công nghệ phù hợp.
          </p>
        </div>

        {/* Interactive Step Navigation Bar (Step 1 -> Step 4) */}
        <div className="pt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {steps.map((step) => {
              const isCurrent = currentStep === step.number;
              const isCompleted = completedSteps.includes(step.number);
              const StepIcon = step.icon;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => onStepClick(step.number)}
                  className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-600/90 border-blue-400 shadow-md ring-2 ring-blue-400/40 text-white'
                      : isCompleted
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 hover:bg-emerald-900/30'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 ${
                      isCurrent
                        ? 'bg-white text-blue-900 shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold block text-xs sm:text-sm truncate">
                      {step.label}
                    </span>
                    <span className="text-[10px] sm:text-[11px] opacity-75 truncate block">
                      {step.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
