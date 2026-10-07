import React from 'react';
import { Lightbulb, CheckSquare, AlertCircle, GraduationCap } from 'lucide-react';
import { SurveyFormData, FormValidationErrors } from '../types/survey';
import {
  BIGGEST_CHALLENGES,
  TRAINING_WILLINGNESS,
  TRAINING_FORMATS,
} from '../data/constants';

interface Section4Props {
  formData: SurveyFormData;
  errors: FormValidationErrors;
  onChange: <K extends keyof SurveyFormData>(field: K, value: SurveyFormData[K]) => void;
}

export const Section4ImpactAndProposals: React.FC<Section4Props> = ({
  formData,
  errors,
  onChange,
}) => {
  const toggleChallenge = (challenge: string) => {
    const current = formData.biggestChallenges || [];
    if (current.includes(challenge)) {
      onChange(
        'biggestChallenges',
        current.filter((c) => c !== challenge)
      );
    } else {
      onChange('biggestChallenges', [...current, challenge]);
    }
  };

  const toggleTrainingFormat = (format: string) => {
    const current = formData.trainingFormats || [];
    if (current.includes(format)) {
      onChange(
        'trainingFormats',
        current.filter((f) => f !== format)
      );
    } else {
      onChange('trainingFormats', [...current, format]);
    }
  };

  return (
    <div
      id="section-4"
      className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 mb-6 transition-all relative overflow-hidden"
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"></div>

      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-extrabold text-base sm:text-lg shadow-sm shadow-amber-500/25 shrink-0">
            04
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
                PHẦN 4
              </span>
              <span className="text-xs text-rose-600 font-semibold">* Bước cuối cùng</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Đánh Giá Khó Khăn, Nhu Cầu Đào Tạo & Đề Xuất
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50/70 px-3 py-1.5 rounded-lg border border-amber-200/60">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>Sáng kiến nâng cao năng suất</span>
        </div>
      </div>

      <div className="space-y-7">
        {/* Câu 1: Khó khăn lớn nhất khi tiếp cận AI */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              1. Khó khăn hoặc rào cản lớn nhất Anh/Chị gặp phải khi tiếp cận và ứng dụng AI:
            </label>
            <span className="text-xs text-slate-500 font-medium">(Chọn nhiều mục)</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mb-3.5">
            Đánh dấu vào những khó khăn thực tế mà Anh/Chị đang gặp phải:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {BIGGEST_CHALLENGES.map((challenge) => {
              const isChecked = (formData.biggestChallenges || []).includes(challenge);
              return (
                <div
                  key={challenge}
                  onClick={() => toggleChallenge(challenge)}
                  data-field="khoKhan"
                  data-value={challenge}
                  data-selected={isChecked ? 'true' : 'false'}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none ${
                    isChecked
                      ? 'bg-amber-50/90 border-amber-500 text-amber-950 font-medium shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    name="khoKhan"
                    value={challenge}
                    checked={isChecked}
                    onChange={() => toggleChallenge(challenge)}
                    className="sr-only"
                    tabIndex={-1}
                  />

                  <div
                    className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                      isChecked
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <CheckSquare className="w-4 h-4" />}
                  </div>

                  <span className="text-xs sm:text-sm font-semibold leading-snug">
                    {challenge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Câu 2: Nguyện vọng tham gia đào tạo AI */}
        <div className="pt-5 border-t border-slate-100">
          <label className="block text-sm sm:text-base font-bold text-slate-900 mb-1.5">
            2. Nguyện vọng tham gia các chương trình đào tạo ứng dụng AI do Tập đoàn tổ chức:{' '}
            <span className="text-rose-600 font-bold">*</span>
          </label>
          <p className="text-xs sm:text-sm text-slate-600 mb-3.5">
            Để Ban Nhân sự & Ban Đào tạo lập danh sách và sắp xếp lớp học thực chiến phù hợp:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {TRAINING_WILLINGNESS.map((item) => {
              const isSelected = formData.trainingWillingness === item.label;
              return (
                <div
                  key={item.id}
                  onClick={() => onChange('trainingWillingness', item.label)}
                  data-field="trainingWillingness"
                  data-value={item.label}
                  data-selected={isSelected ? 'true' : 'false'}
                  className={`group relative flex flex-col justify-between p-4 rounded-xl border-2 cursor-pointer transition-all select-none min-h-[96px] ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/80 shadow-2xs ring-2 ring-amber-500/20'
                      : 'border-slate-200/90 bg-white hover:border-amber-300 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="trainingWillingness"
                    value={item.label}
                    checked={isSelected}
                    onChange={() => onChange('trainingWillingness', item.label)}
                    className="sr-only"
                    tabIndex={-1}
                  />

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-amber-600" />
                      {item.label}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-amber-600 bg-amber-600' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-snug">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {errors.trainingWillingness && (
            <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.trainingWillingness}
            </p>
          )}
        </div>

        {/* Câu 3: Hình thức đào tạo mong muốn */}
        <div className="pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              3. Hình thức học tập & đào tạo Anh/Chị cảm thấy hiệu quả và thuận tiện nhất:
            </label>
            <span className="text-xs text-slate-500 font-medium">(Chọn nhiều hình thức)</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mb-3.5">
            Lựa chọn các hình thức phù hợp nhất với điều kiện làm việc của Anh/Chị:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {TRAINING_FORMATS.map((fmt) => {
              const isChecked = (formData.trainingFormats || []).includes(fmt);
              return (
                <div
                  key={fmt}
                  onClick={() => toggleTrainingFormat(fmt)}
                  data-field="nhuCauDaoTao"
                  data-value={fmt}
                  data-selected={isChecked ? 'true' : 'false'}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none ${
                    isChecked
                      ? 'bg-amber-50/90 border-amber-500 text-amber-950 font-medium shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    name="nhuCauDaoTao"
                    value={fmt}
                    checked={isChecked}
                    onChange={() => toggleTrainingFormat(fmt)}
                    className="sr-only"
                    tabIndex={-1}
                  />

                  <div
                    className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                      isChecked
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <CheckSquare className="w-4 h-4" />}
                  </div>

                  <span className="text-xs sm:text-sm font-semibold leading-snug">
                    {fmt}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Câu 4: Ô nhập đề xuất / sáng kiến */}
        <div className="pt-5 border-t border-slate-100">
          <label className="block text-sm sm:text-base font-bold text-slate-900 mb-1.5">
            4. Đề xuất / Ý tưởng sáng kiến ứng dụng AI tại đơn vị của Anh/Chị:
          </label>
          <p className="text-xs sm:text-sm text-slate-600 mb-2.5">
            Chia sẻ các bài toán thực tế trong khâu chế biến, kiểm định chất lượng, kế toán, văn thư, bán hàng hoặc kho vận mà Anh/Chị kỳ vọng AI có thể hỗ trợ giải quyết:
          </p>
          <textarea
            rows={4}
            name="deXuat"
            data-field="deXuat"
            value={formData.proposal || ''}
            onChange={(e) => onChange('proposal', e.target.value)}
            placeholder="Ví dụ: Đề xuất trang bị tài khoản ChatGPT Plus cho bộ phận R&D; hoặc ứng dụng AI đọc tự động chứng từ nhập xuất hàng hóa tại kho, rút ngắn thời gian kiểm kê..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium bg-white focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 leading-relaxed"
          ></textarea>
        </div>
      </div>
    </div>
  );
};
