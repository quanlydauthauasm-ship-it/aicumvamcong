import React from 'react';
import { User, AlertCircle, Check } from 'lucide-react';
import { SurveyFormData, FormValidationErrors, CompanyId } from '../types/survey';
import { MEMBER_COMPANIES } from '../data/constants';

interface Section1Props {
  formData: SurveyFormData;
  errors: FormValidationErrors;
  onChange: <K extends keyof SurveyFormData>(field: K, value: SurveyFormData[K]) => void;
}

export const Section1PersonalInfo: React.FC<Section1Props> = ({
  formData,
  errors,
  onChange,
}) => {
  return (
    <div
      id="section-1"
      className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 mb-6 transition-all relative overflow-hidden"
    >
      {/* Top Brand Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600"></div>

      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-base sm:text-lg shadow-sm shadow-blue-500/25 shrink-0">
            01
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60">
                PHẦN 1
              </span>
              <span className="text-xs text-rose-600 font-semibold">* Bắt buộc điền</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Thông Tin Nhân Sự & Đơn Vị Công Tác
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <User className="w-3.5 h-3.5 text-blue-600" />
          <span>Thông tin bảo mật nội bộ</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Câu 1: Họ và tên */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1.5">
            1. Họ và tên của Anh/Chị <span className="text-rose-600 font-bold">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            data-field="hoTen"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn An"
            autoComplete="name"
            className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 ${
              errors.fullName
                ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500/30 focus:border-rose-500'
                : 'border-slate-300 bg-white focus:border-blue-600 focus:ring-blue-500/20'
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Câu 2: Năm sinh & Giới tính */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Năm sinh: Input text/number tự gõ */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1.5">
              2. Năm sinh <span className="text-rose-600 font-bold">*</span>
            </label>
            <input
              type="text"
              name="birthYear"
              data-field="namSinh"
              inputMode="numeric"
              maxLength={4}
              value={formData.birthYear}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                onChange('birthYear', val);
              }}
              placeholder="Nhập 4 số năm sinh (Ví dụ: 1988, 1995)"
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 ${
                errors.birthYear
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500/30 focus:border-rose-500'
                  : 'border-slate-300 bg-white focus:border-blue-600 focus:ring-blue-500/20'
              }`}
            />
            {errors.birthYear && (
              <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.birthYear}
              </p>
            )}
          </div>

          {/* Giới tính: 2 nút bấm chọn Nam / Nữ */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1.5">
              3. Giới tính <span className="text-rose-600 font-bold">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['Nam', 'Nữ'] as const).map((genderOption) => {
                const isSelected = formData.gender === genderOption;
                return (
                  <button
                    key={genderOption}
                    type="button"
                    onClick={() => onChange('gender', genderOption)}
                    data-field="gioiTinh"
                    data-value={genderOption}
                    data-selected={isSelected ? 'true' : 'false'}
                    className={`min-h-[46px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all select-none cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gioiTinh"
                      value={genderOption}
                      checked={isSelected}
                      onChange={() => onChange('gender', genderOption)}
                      className="sr-only"
                      tabIndex={-1}
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </div>
                    <span>{genderOption}</span>
                  </button>
                );
              })}
            </div>
            {errors.gender && (
              <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.gender}
              </p>
            )}
          </div>
        </div>

        {/* Câu 4: Đơn vị công tác - 4 nút chọn kèm logo đại diện: AFO, IDI, TRISEDCO, SPF */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-bold text-slate-900">
              4. Đơn vị công tác <span className="text-rose-600 font-bold">*</span>
            </label>
            <span className="text-xs text-slate-500 font-medium">(Chọn 1 trong 4 công ty)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            {MEMBER_COMPANIES.map((company) => {
              const isSelected = formData.company === company.id;

              const activeCardClasses = {
                AFO: 'border-red-500 bg-red-50/40 ring-2 ring-red-500/20',
                IDI: 'border-sky-500 bg-sky-50/40 ring-2 ring-sky-500/20',
                Trisedco: 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20',
                SPF: 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20',
              }[company.id] || 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20';

              return (
                <div
                  key={company.id}
                  onClick={() => onChange('company', company.id as CompanyId)}
                  data-field="congTy"
                  data-value={company.id}
                  data-selected={isSelected ? 'true' : 'false'}
                  className={`group relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all select-none min-h-[76px] ${
                    isSelected
                      ? `${activeCardClasses} shadow-xs`
                      : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <input
                    type="radio"
                    name="congTy"
                    value={company.id}
                    checked={isSelected}
                    onChange={() => onChange('company', company.id as CompanyId)}
                    className="sr-only"
                    tabIndex={-1}
                  />

                  {/* Logo Container */}
                  <div className="w-16 sm:w-20 h-10 sm:h-12 bg-white rounded-xl border border-slate-200/70 p-1 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-102 transition-transform">
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      style={{ maxHeight: '36px' }}
                      className="max-h-9 w-auto max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Company Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight block truncate">
                        {company.name}
                      </span>
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0"></span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                      {company.fullName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {errors.company && (
            <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.company}
            </p>
          )}
        </div>

        {/* Câu 5 & 6: Phòng ban / Bộ phận & Vị trí công tác (Input text tự gõ) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
          {/* Phòng ban / Bộ phận */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1.5">
              5. Phòng ban / Bộ phận <span className="text-rose-600 font-bold">*</span>
            </label>
            <input
              type="text"
              name="phongBan"
              data-field="phongBan"
              value={formData.department}
              onChange={(e) => onChange('department', e.target.value)}
              placeholder="Ví dụ: Phòng Kế toán, Xưởng Sản xuất, QA/QC..."
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 ${
                errors.department
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500/30 focus:border-rose-500'
                  : 'border-slate-300 bg-white focus:border-blue-600 focus:ring-blue-500/20'
              }`}
            />
            {errors.department && (
              <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.department}
              </p>
            )}
          </div>

          {/* Vị trí công tác */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1.5">
              6. Vị trí công tác <span className="text-rose-600 font-bold">*</span>
            </label>
            <input
              type="text"
              name="chucVu"
              data-field="chucVu"
              value={formData.position}
              onChange={(e) => onChange('position', e.target.value)}
              placeholder="Ví dụ: Kế toán viên, Trưởng phòng, Kỹ sư, Quản đốc..."
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 ${
                errors.position
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500/30 focus:border-rose-500'
                  : 'border-slate-300 bg-white focus:border-blue-600 focus:ring-blue-500/20'
              }`}
            />
            {errors.position && (
              <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.position}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
