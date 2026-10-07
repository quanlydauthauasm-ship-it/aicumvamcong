import React from 'react';
import {
  CheckCircle,
  RotateCcw,
  X,
  Building2,
  BrainCircuit,
  Wrench,
  Clock,
  Check,
} from 'lucide-react';
import { SurveyFormData } from '../types/survey';
import { MEMBER_COMPANIES, AWARENESS_LEVELS } from '../data/constants';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SurveyFormData | null;
  onReset: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  data,
  onReset,
}) => {
  if (!isOpen || !data) return null;

  const companyInfo = MEMBER_COMPANIES.find((c) => c.id === data.company);
  const awarenessLevelInfo = AWARENESS_LEVELS.find((l) => l.score === data.awarenessLevel);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8 overflow-hidden">
        {/* Top celebratory decorative band */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Header */}
        <div className="text-center pt-2 pb-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            <Check className="w-3.5 h-3.5" />
            GỬI THÀNH CÔNG · ĐÃ GHI NHẬN VÀO HỆ THỐNG
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 font-sans">
            Cảm ơn Anh/Chị đã hoàn thành khảo sát!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
            Ý kiến đóng góp quý báu của Anh/Chị đã được đồng bộ an toàn. Ban Chỉ Đạo Chuyển Đổi Số
            sẽ tổng hợp để xây dựng lộ trình đào tạo và cấp bản quyền phù hợp nhất!
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/90 space-y-3 mb-6 text-sm">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70">
            <span className="text-xs text-slate-500 font-medium">Người gửi:</span>
            <span className="font-bold text-slate-900">{data.fullName}</span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              Đơn vị:
            </span>
            <span className="font-semibold text-blue-800 text-right">
              {companyInfo?.name || data.company} {data.department ? `· ${data.department}` : ''}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-purple-600" />
              Nhận diện AI:
            </span>
            <span className="font-bold text-purple-700">
              Điểm {data.awarenessLevel}/5 ({awarenessLevelInfo?.label || 'Đã ghi nhận'})
            </span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-emerald-600" />
              Công cụ đã dùng:
            </span>
            <span className="font-medium text-slate-800 text-right truncate max-w-[200px] sm:max-w-[240px]">
              {data.toolsUsed && data.toolsUsed.length > 0
                ? data.toolsUsed.slice(0, 3).join(', ') +
                  (data.toolsUsed.length > 3 ? ` +${data.toolsUsed.length - 3}` : '')
                : 'Chưa dùng'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Thời gian tiết kiệm:
            </span>
            <span className="font-bold text-amber-700">
              {data.timeSavedDaily || data.timeSavedWeekly || 'Đã ghi nhận'}
            </span>
          </div>
        </div>

        {/* Actions: Removed "Tải JSON" and "In Bản Khảo Sát", kept clean single/dual actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onClose}
            type="button"
            className="w-full sm:flex-1 py-3 px-5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Hoàn tất & Đóng</span>
          </button>

          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            type="button"
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Khảo Sát Mới</span>
          </button>
        </div>
      </div>
    </div>
  );
};
