import React from 'react';
import { BrainCircuit, CheckSquare, AlertCircle, Check } from 'lucide-react';
import { SurveyFormData, FormValidationErrors } from '../types/survey';
import { AWARENESS_LEVELS, AI_PURPOSES } from '../data/constants';

interface Section2Props {
  formData: SurveyFormData;
  errors: FormValidationErrors;
  onChange: <K extends keyof SurveyFormData>(field: K, value: SurveyFormData[K]) => void;
}

export const Section2Awareness: React.FC<Section2Props> = ({
  formData,
  errors,
  onChange,
}) => {
  const toggleAiPurpose = (purpose: string) => {
    const current = formData.aiPurposes || [];
    if (current.includes(purpose)) {
      onChange(
        'aiPurposes',
        current.filter((item) => item !== purpose)
      );
    } else {
      onChange('aiPurposes', [...current, purpose]);
    }
  };

  const isOtherPurposeSelected = (formData.aiPurposes || []).includes('Mục đích khác');

  return (
    <div
      id="section-2"
      className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 mb-6 transition-all relative overflow-hidden"
    >
      {/* Visual Accent Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-600"></div>

      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-extrabold text-base sm:text-lg shadow-sm shadow-purple-500/25 shrink-0">
            02
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200/60">
                PHẦN 2
              </span>
              <span className="text-xs text-rose-600 font-semibold">* Bắt buộc điền</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Nhận Diện & Mục Đích Sử Dụng AI
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-purple-900 bg-purple-50/70 px-3 py-1.5 rounded-lg border border-purple-200/60">
          <BrainCircuit className="w-3.5 h-3.5 text-purple-600" />
          <span>Mức độ sẵn sàng công nghệ</span>
        </div>
      </div>

      <div className="space-y-7">
        {/* Câu 1: Mức độ nhận diện & hiểu biết AI (5 thẻ chọn trực quan) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              1. Đánh giá mức độ hiểu biết & nhận diện về Trí tuệ nhân tạo (AI) của Anh/Chị:{' '}
              <span className="text-rose-600 font-bold">*</span>
            </label>
            <span className="text-xs text-purple-700 font-semibold bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
              Thang điểm 1 - 5
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mb-3.5">
            Bấm chọn 1 trong 5 mức độ bên dưới phản ánh đúng nhất thực trạng hiểu biết của bản thân:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {AWARENESS_LEVELS.map((item) => {
              const isSelected = formData.awarenessLevel === item.score;
              return (
                <div
                  key={item.score}
                  onClick={() => onChange('awarenessLevel', item.score)}
                  data-field="mucDoHieuBiet"
                  data-value={item.score}
                  data-selected={isSelected ? 'true' : 'false'}
                  className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all select-none min-h-[140px] sm:min-h-[190px] ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/80 shadow-xs ring-2 ring-purple-500/20'
                      : 'border-slate-200/90 bg-white hover:border-purple-300 hover:bg-purple-50/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="mucDoHieuBiet"
                    value={item.score}
                    checked={isSelected}
                    onChange={() => onChange('awarenessLevel', item.score)}
                    className="sr-only"
                    tabIndex={-1}
                  />

                  {/* Top indicator: Score number and selection checkmark */}
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black text-base sm:text-lg transition-colors ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-purple-100/70 text-purple-800 group-hover:bg-purple-200'
                      }`}
                    >
                      {item.score}
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                      {item.label}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-4">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {errors.awarenessLevel && (
            <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.awarenessLevel}
            </p>
          )}
        </div>

        {/* Câu 2: Mục đích sử dụng AI (ĐÚNG 6 MỤC NHƯ YÊU CẦU - TUYỆT ĐỐI KHÔNG CÓ KÊNH TIẾP CẬN THÔNG TIN) */}
        <div className="pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              2. Mục đích Anh/Chị đã hoặc mong muốn sử dụng AI trong công việc:{' '}
              <span className="text-rose-600 font-bold">*</span>
            </label>
            <span className="text-xs text-slate-500 font-medium">(Chọn nhiều mục)</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mb-3.5">
            Đánh dấu tick vào các mục phù hợp với nhu cầu và nhiệm vụ thực tế của Anh/Chị:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AI_PURPOSES.map((purpose, index) => {
              const isChecked = (formData.aiPurposes || []).includes(purpose);
              return (
                <div
                  key={purpose}
                  onClick={() => toggleAiPurpose(purpose)}
                  data-field="mucDich"
                  data-value={purpose}
                  data-selected={isChecked ? 'true' : 'false'}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none ${
                    isChecked
                      ? 'bg-purple-50/90 border-purple-500 text-purple-950 font-medium shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    name="mucDich"
                    value={purpose}
                    checked={isChecked}
                    onChange={() => toggleAiPurpose(purpose)}
                    className="sr-only"
                    tabIndex={-1}
                  />

                  <div
                    className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                      isChecked
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <CheckSquare className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-xs sm:text-sm font-semibold block leading-tight text-slate-900">
                      ({index + 1}) {purpose}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ô nhập văn bản nếu chọn "Mục đích khác" */}
          {isOtherPurposeSelected && (
            <div className="mt-3.5 p-3.5 rounded-xl bg-purple-50/50 border border-purple-200 transition-all animate-fadeIn">
              <label className="block text-xs font-bold text-purple-950 mb-1.5">
                Vui lòng mô tả chi tiết mục đích khác của Anh/Chị:
              </label>
              <input
                type="text"
                name="otherAiPurpose"
                data-field="otherAiPurpose"
                value={formData.otherAiPurpose || ''}
                onChange={(e) => onChange('otherAiPurpose', e.target.value)}
                placeholder="Ví dụ: Kiểm tra chất lượng mẫu cá tự động, dự báo thời tiết vùng nuôi..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-purple-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
              />
            </div>
          )}

          {errors.aiPurposes && (
            <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.aiPurposes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
