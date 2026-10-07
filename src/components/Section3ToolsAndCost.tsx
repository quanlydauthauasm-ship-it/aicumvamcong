import React from 'react';
import {
  Wrench,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  MessageSquareText,
  FileSpreadsheet,
  FileText,
  Palette,
  Image,
} from 'lucide-react';
import { SurveyFormData, FormValidationErrors } from '../types/survey';
import {
  POPULAR_AI_TOOLS,
  USAGE_FREQUENCIES,
  COST_STATUSES,
  TIME_SAVED_OPTIONS,
} from '../data/constants';

interface Section3Props {
  formData: SurveyFormData;
  errors: FormValidationErrors;
  onChange: <K extends keyof SurveyFormData>(field: K, value: SurveyFormData[K]) => void;
}

export const Section3ToolsAndCost: React.FC<Section3Props> = ({
  formData,
  errors,
  onChange,
}) => {
  const toggleTool = (toolName: string) => {
    const current = formData.toolsUsed || [];
    if (current.includes(toolName)) {
      onChange(
        'toolsUsed',
        current.filter((t) => t !== toolName)
      );
    } else {
      onChange('toolsUsed', [...current, toolName]);
    }
  };

  const isOtherToolSelected = (formData.toolsUsed || []).includes('Khác');

  const getToolIcon = (name: string) => {
    switch (name) {
      case 'ChatGPT':
        return <MessageSquareText className="w-4 h-4 text-emerald-600" />;
      case 'Copilot':
        return <FileSpreadsheet className="w-4 h-4 text-sky-600" />;
      case 'Gemini':
        return <Sparkles className="w-4 h-4 text-blue-600" />;
      case 'Midjourney':
        return <Image className="w-4 h-4 text-purple-600" />;
      case 'Canva':
        return <Palette className="w-4 h-4 text-cyan-600" />;
      case 'Claude':
        return <FileText className="w-4 h-4 text-amber-600" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div
      id="section-3"
      className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 mb-6 transition-all relative overflow-hidden"
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600"></div>

      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-base sm:text-lg shadow-sm shadow-emerald-500/25 shrink-0">
            03
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                PHẦN 3
              </span>
              <span className="text-xs text-rose-600 font-semibold">* Bắt buộc điền</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Công Cụ & Thực Trạng Đầu Tư AI
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-900 bg-emerald-50/70 px-3 py-1.5 rounded-lg border border-emerald-200/60">
          <Wrench className="w-3.5 h-3.5 text-emerald-600" />
          <span>Hệ sinh thái phần mềm & hiệu quả</span>
        </div>
      </div>

      <div className="space-y-7">
        {/* Câu 1: Công cụ AI đã dùng */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              1. Các công cụ AI Anh/Chị đã từng trải nghiệm hoặc sử dụng:
            </label>
            <span className="text-xs text-slate-500 font-medium">(Chọn nhiều mục)</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mb-3.5">
            Bấm chọn các công cụ Anh/Chị từng dùng (để trống nếu chưa từng dùng công cụ nào):
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
            {POPULAR_AI_TOOLS.map((tool) => {
              const isSelected = (formData.toolsUsed || []).includes(tool.name);
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => toggleTool(tool.name)}
                  data-field="congCuDaDung"
                  data-value={tool.name}
                  data-selected={isSelected ? 'true' : 'false'}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all select-none cursor-pointer text-left ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/90 text-emerald-950 shadow-2xs ring-2 ring-emerald-500/20'
                      : 'border-slate-200/90 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    name="congCuDaDung"
                    value={tool.name}
                    checked={isSelected}
                    onChange={() => toggleTool(tool.name)}
                    className="sr-only"
                    tabIndex={-1}
                  />

                  <div className="p-1 rounded-lg bg-slate-100/80 shrink-0">
                    {getToolIcon(tool.name)}
                  </div>

                  <span className="flex-1 truncate">{tool.name}</span>

                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Ô nhập công cụ khác nếu chọn Khác */}
          {isOtherToolSelected && (
            <div className="mt-3 p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200 animate-fadeIn">
              <label className="block text-xs font-bold text-emerald-950 mb-1.5">
                Vui lòng nhập tên công cụ AI khác Anh/Chị đã dùng:
              </label>
              <input
                type="text"
                name="otherTool"
                data-field="otherTool"
                value={formData.otherTool || ''}
                onChange={(e) => onChange('otherTool', e.target.value)}
                placeholder="Ví dụ: Perplexity, Notion AI, DeepL, Suno..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-emerald-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          )}
        </div>

        {/* Câu 2: Tần suất sử dụng AI (Đúng 4 lựa chọn) */}
        <div className="pt-5 border-t border-slate-100">
          <label className="block text-sm sm:text-base font-bold text-slate-900 mb-1.5">
            2. Tần suất Anh/Chị sử dụng công cụ AI hiện nay:{' '}
            <span className="text-rose-600 font-bold">*</span>
          </label>
          <p className="text-xs sm:text-sm text-slate-600 mb-3.5">
            Chọn 1 phương án phản ánh đúng nhất mức độ sử dụng trong công việc thực tế:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {USAGE_FREQUENCIES.map((freq) => {
              const isSelected = formData.usageFrequency === freq.label;
              return (
                <div
                  key={freq.id}
                  onClick={() => onChange('usageFrequency', freq.label)}
                  data-field="tanSuat"
                  data-value={freq.label}
                  data-selected={isSelected ? 'true' : 'false'}
                  className={`group relative flex flex-col justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none min-h-[96px] ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-2xs ring-2 ring-emerald-500/20'
                      : 'border-slate-200/90 bg-white hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="tanSuat"
                    value={freq.label}
                    checked={isSelected}
                    onChange={() => onChange('usageFrequency', freq.label)}
                    className="sr-only"
                    tabIndex={-1}
                  />

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-extrabold text-sm text-slate-900">
                      {freq.label}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-600 leading-snug mt-1">
                    {freq.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {errors.usageFrequency && (
            <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.usageFrequency}
            </p>
          )}
        </div>

        {/* Câu 3: Tình trạng chi phí đầu tư AI (Đúng 3 lựa chọn - Tuyệt đối không có "Chưa phát sinh chi phí") */}
        <div className="pt-5 border-t border-slate-100">
          <label className="block text-sm sm:text-base font-bold text-slate-900 mb-1.5">
            3. Tình trạng chi phí đầu tư cho các công cụ AI của Anh/Chị:{' '}
            <span className="text-rose-600 font-bold">*</span>
          </label>
          <p className="text-xs sm:text-sm text-slate-600 mb-3.5">
            Thông tin giúp Ban Lãnh đạo xây dựng phương án cấp tài khoản bản quyền phù hợp:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {COST_STATUSES.map((cost) => {
              const isSelected = formData.costStatus === cost.label;
              return (
                <div
                  key={cost.id}
                  onClick={() => onChange('costStatus', cost.label)}
                  data-field="chiPhi"
                  data-value={cost.label}
                  data-selected={isSelected ? 'true' : 'false'}
                  className={`group relative flex flex-col justify-between p-4 rounded-xl border-2 cursor-pointer transition-all select-none min-h-[110px] ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-2xs ring-2 ring-emerald-500/20'
                      : 'border-slate-200/90 bg-white hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="chiPhi"
                    value={cost.label}
                    checked={isSelected}
                    onChange={() => onChange('costStatus', cost.label)}
                    className="sr-only"
                    tabIndex={-1}
                  />

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-extrabold text-sm sm:text-base text-slate-900">
                      {cost.label}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cost.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {errors.costStatus && (
            <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.costStatus}
            </p>
          )}
        </div>

        {/* Câu 4: Thời gian tiết kiệm được (Theo ngày: Dưới 30 phút/ngày, 30-60 phút/ngày, 1-2 giờ/ngày, Trên 2 giờ/ngày, Chưa thấy tiết kiệm) */}
        <div className="pt-5 border-t border-slate-100">
          <label className="block text-sm sm:text-base font-bold text-slate-900 mb-1.5">
            4. Ước tính khoảng thời gian AI giúp Anh/Chị tiết kiệm được:{' '}
            <span className="text-rose-600 font-bold">*</span>
          </label>
          <p className="text-xs sm:text-sm text-slate-600 mb-3.5">
            Ước lượng thời gian giảm bớt được từ các công việc lặp lại, xử lý văn bản, tìm kiếm hoặc phân tích số liệu:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TIME_SAVED_OPTIONS.map((opt) => {
              const isSelected =
                formData.timeSavedDaily === opt.label || formData.timeSavedWeekly === opt.label;
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    onChange('timeSavedDaily', opt.label);
                    onChange('timeSavedWeekly', opt.label);
                  }}
                  data-field="thoiGianTietKiem"
                  data-value={opt.label}
                  data-selected={isSelected ? 'true' : 'false'}
                  className={`group relative flex flex-col justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none min-h-[96px] ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-2xs ring-2 ring-emerald-500/20'
                      : 'border-slate-200/90 bg-white hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="thoiGianTietKiem"
                    value={opt.label}
                    checked={isSelected}
                    onChange={() => {
                      onChange('timeSavedDaily', opt.label);
                      onChange('timeSavedWeekly', opt.label);
                    }}
                    className="sr-only"
                    tabIndex={-1}
                  />

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {opt.label}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                    {opt.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {(errors.timeSavedDaily || errors.timeSavedWeekly) && (
            <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.timeSavedDaily || errors.timeSavedWeekly}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
