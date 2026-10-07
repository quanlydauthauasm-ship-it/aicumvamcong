/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Send,
  Loader2,
  RotateCcw,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Eye,
  Layers,
} from 'lucide-react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { Section1PersonalInfo } from './components/Section1PersonalInfo';
import { Section2Awareness } from './components/Section2Awareness';
import { Section3ToolsAndCost } from './components/Section3ToolsAndCost';
import { Section4ImpactAndProposals } from './components/Section4ImpactAndProposals';
import { SuccessModal } from './components/SuccessModal';
import { FIXED_GOOGLE_SHEETS_WEBHOOK_URL, MEMBER_COMPANIES } from './data/constants';
import { SurveyFormData, FormValidationErrors } from './types/survey';

const DEFAULT_FORM_DATA: SurveyFormData = {
  // PHẦN 1
  fullName: '',
  birthYear: '',
  gender: '',
  company: '',
  department: '',
  position: '',

  // PHẦN 2
  awarenessLevel: 0,
  aiPurposes: [],
  otherAiPurpose: '',

  // PHẦN 3
  toolsUsed: [],
  otherTool: '',
  usageFrequency: '',
  costStatus: '',
  timeSavedDaily: '',

  // PHẦN 4
  biggestChallenges: [],
  otherChallenge: '',
  trainingWillingness: '',
  trainingFormats: [],
  proposal: '',
};

const LOCAL_SUBMISSIONS_KEY = 'SAOMAI_AI_SURVEY_SUBMISSIONS';

export default function App() {
  const [formData, setFormData] = useState<SurveyFormData>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [viewAllSections, setViewAllSections] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<SurveyFormData | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    type: 'error' | 'success' | 'info';
    text: string;
  } | null>(null);

  // Generic Field Change Handler
  const handleFieldChange = <K extends keyof SurveyFormData>(
    field: K,
    value: SurveyFormData[K]
  ) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'timeSavedDaily') {
        next.timeSavedWeekly = value as string;
      }
      if (field === 'timeSavedWeekly') {
        next.timeSavedDaily = value as string;
      }
      return next;
    });

    // Clear validation error on field modification
    if (errors[field] || (field === 'timeSavedDaily' && errors.timeSavedWeekly) || (field === 'timeSavedWeekly' && errors.timeSavedDaily)) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        if (field === 'timeSavedDaily') delete next.timeSavedWeekly;
        if (field === 'timeSavedWeekly') delete next.timeSavedDaily;
        return next;
      });
    }
  };

  // Required Fields per step
  const step1Required: (keyof SurveyFormData)[] = [
    'fullName',
    'birthYear',
    'gender',
    'company',
    'department',
    'position',
  ];
  const step2Required: (keyof SurveyFormData)[] = ['awarenessLevel', 'aiPurposes'];
  const step3Required: (keyof SurveyFormData)[] = [
    'usageFrequency',
    'costStatus',
    'timeSavedDaily',
  ];
  const step4Required: (keyof SurveyFormData)[] = ['trainingWillingness'];

  const allRequiredFields: (keyof SurveyFormData)[] = [
    ...step1Required,
    ...step2Required,
    ...step3Required,
    ...step4Required,
  ];

  // Calculation of completed steps
  const completedSteps = useMemo(() => {
    const list: number[] = [];

    const isStep1Done = step1Required.every((f) => {
      const v = formData[f];
      return v && String(v).trim() !== '';
    });
    if (isStep1Done) list.push(1);

    const isStep2Done =
      formData.awarenessLevel > 0 &&
      formData.aiPurposes &&
      formData.aiPurposes.length > 0;
    if (isStep2Done) list.push(2);

    const isStep3Done =
      Boolean(formData.usageFrequency) &&
      Boolean(formData.costStatus) &&
      Boolean(formData.timeSavedDaily || formData.timeSavedWeekly);
    if (isStep3Done) list.push(3);

    const isStep4Done = Boolean(formData.trainingWillingness);
    if (isStep4Done) list.push(4);

    return list;
  }, [formData]);

  const totalRequiredCount = allRequiredFields.length;
  const completedCount = useMemo(() => {
    return allRequiredFields.reduce((count, field) => {
      const val = formData[field];
      if (field === 'timeSavedDaily') {
        const timeVal = formData.timeSavedDaily || formData.timeSavedWeekly;
        return timeVal && timeVal.trim() !== '' ? count + 1 : count;
      }
      if (Array.isArray(val)) {
        return val.length > 0 ? count + 1 : count;
      }
      if (typeof val === 'number') {
        return val > 0 ? count + 1 : count;
      }
      return val && String(val).trim() !== '' ? count + 1 : count;
    }, 0);
  }, [formData]);

  const progressPercentage = Math.round((completedCount / totalRequiredCount) * 100);

  // Validate specific step
  const validateStep = (stepNumber: number): boolean => {
    const newErrors: FormValidationErrors = {};

    if (stepNumber === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Vui lòng nhập Họ và tên của Anh/Chị';
      }
      if (!formData.birthYear.trim()) {
        newErrors.birthYear = 'Vui lòng nhập Năm sinh (Ví dụ: 1988, 1995)';
      } else {
        const yearNum = parseInt(formData.birthYear, 10);
        const currentYear = new Date().getFullYear();
        if (isNaN(yearNum) || yearNum < 1945 || yearNum > currentYear - 16) {
          newErrors.birthYear = `Năm sinh không hợp lệ (hợp lệ từ 1945 đến ${currentYear - 16})`;
        }
      }
      if (!formData.gender) {
        newErrors.gender = 'Vui lòng chọn Giới tính (Nam hoặc Nữ)';
      }
      if (!formData.company) {
        newErrors.company = 'Vui lòng chọn Đơn vị công tác (AFO, IDI, TRISEDCO hoặc SPF)';
      }
      if (!formData.department.trim()) {
        newErrors.department = 'Vui lòng nhập Phòng ban / Bộ phận công tác';
      }
      if (!formData.position.trim()) {
        newErrors.position = 'Vui lòng nhập Vị trí công tác của Anh/Chị';
      }
    }

    if (stepNumber === 2) {
      if (!formData.awarenessLevel || formData.awarenessLevel === 0) {
        newErrors.awarenessLevel = 'Vui lòng chọn mức độ nhận diện & hiểu biết về AI từ 1 đến 5';
      }
      if (!formData.aiPurposes || formData.aiPurposes.length === 0) {
        newErrors.aiPurposes = 'Vui lòng chọn ít nhất 1 mục đích sử dụng AI';
      }
    }

    if (stepNumber === 3) {
      if (!formData.usageFrequency) {
        newErrors.usageFrequency = 'Vui lòng chọn Tần suất sử dụng AI';
      }
      if (!formData.costStatus) {
        newErrors.costStatus = 'Vui lòng chọn Tình trạng chi phí đầu tư cho AI';
      }
      if (!formData.timeSavedDaily && !formData.timeSavedWeekly) {
        newErrors.timeSavedDaily = 'Vui lòng chọn Khoảng thời gian tiết kiệm được';
        newErrors.timeSavedWeekly = 'Vui lòng chọn Khoảng thời gian tiết kiệm được';
      }
    }

    if (stepNumber === 4) {
      if (!formData.trainingWillingness) {
        newErrors.trainingWillingness = 'Vui lòng chọn Nguyện vọng tham gia đào tạo AI';
      }
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Validate entire form for submission
  const validateAll = (): boolean => {
    let isValid = true;
    for (let step = 1; step <= 4; step++) {
      if (!validateStep(step)) {
        isValid = false;
        if (!viewAllSections) {
          setCurrentStep(step);
          break;
        }
      }
    }

    if (!isValid) {
      setToastMessage({
        type: 'error',
        text: 'Vui lòng kiểm tra và điền đầy đủ các thông tin bắt buộc còn thiếu!',
      });
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }

    return isValid;
  };

  // Step navigation handlers
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 200, behavior: 'smooth' });
      }
    } else {
      // Find missing fields to provide helpful message
      const missingLabels: string[] = [];
      if (currentStep === 1) {
        if (!formData.fullName.trim()) missingLabels.push('Họ và tên');
        if (!formData.birthYear.trim()) missingLabels.push('Năm sinh');
        if (!formData.gender) missingLabels.push('Giới tính');
        if (!formData.company) missingLabels.push('Đơn vị công tác');
        if (!formData.department.trim()) missingLabels.push('Phòng ban');
        if (!formData.position.trim()) missingLabels.push('Vị trí');
      } else if (currentStep === 2) {
        if (!formData.awarenessLevel) missingLabels.push('Mức độ nhận diện (Điểm 1-5)');
        if (!formData.aiPurposes || formData.aiPurposes.length === 0) missingLabels.push('Mục đích dùng AI');
      } else if (currentStep === 3) {
        if (!formData.usageFrequency) missingLabels.push('Tần suất sử dụng');
        if (!formData.costStatus) missingLabels.push('Tình trạng chi phí');
        if (!formData.timeSavedDaily && !formData.timeSavedWeekly) missingLabels.push('Thời gian tiết kiệm');
      } else if (currentStep === 4) {
        if (!formData.trainingWillingness) missingLabels.push('Nguyện vọng đào tạo');
      }

      setToastMessage({
        type: 'error',
        text: missingLabels.length > 0 
          ? `Còn thiếu các mục: ${missingLabels.join(', ')}` 
          : 'Vui lòng hoàn thành các mục bắt buộc trước khi chuyển bước!',
      });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handleStepClick = (targetStep: number) => {
    // Allow jumping freely to any step
    setCurrentStep(targetStep);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);
    setToastMessage(null);

    // 1. Gather all selected tools including 'otherTool'
    const gatheredTools: string[] = [...(formData.toolsUsed || [])];
    if (formData.otherTool && formData.otherTool.trim()) {
      const trimmedOther = formData.otherTool.trim();
      if (!gatheredTools.includes(trimmedOther)) {
        gatheredTools.push(`Khác: ${trimmedOther}`);
      }
    }

    // 2. Gather AI Purposes including 'otherAiPurpose'
    const gatheredPurposes: string[] = [...(formData.aiPurposes || [])];
    if (formData.otherAiPurpose && formData.otherAiPurpose.trim()) {
      gatheredPurposes.push(`Khác: ${formData.otherAiPurpose.trim()}`);
    }

    // 3. Gather training needs
    const trainingList: string[] = [...(formData.trainingFormats || [])];
    const nhuCauDaoTaoStr =
      trainingList.length > 0
        ? trainingList.join(', ') +
          (formData.trainingWillingness ? ` (Nguyện vọng: ${formData.trainingWillingness})` : '')
        : formData.trainingWillingness || '';

    // 4. Resolve company information
    const companyObj = MEMBER_COMPANIES.find((c) => c.id === formData.company);
    const companyDisplayName = companyObj ? companyObj.name : formData.company || '';
    const companyFullName = companyObj ? companyObj.fullName : formData.company || '';

    // 5. Construct complete payload with exact Vietnamese keys requested
    const submissionPayload: Record<string, any> = {
      // --- CÁC TRƯỜNG CHÍNH THEO ĐÚNG YÊU CẦU GOOGLE APPS SCRIPT ---
      // PHẦN 1: THÔNG TIN NHÂN SỰ
      hoTen: formData.fullName.trim(),
      namSinh: formData.birthYear.trim(),
      gioiTinh: formData.gender,
      congTy: companyDisplayName,
      donVi: companyFullName,
      phongBan: formData.department.trim(),
      chucVu: formData.position.trim(),

      // PHẦN 2: NHẬN DIỆN & MỤC ĐÍCH SỬ DỤNG AI
      mucDoHieuBiet: formData.awarenessLevel ? Number(formData.awarenessLevel) : '',
      mucDich: gatheredPurposes.join(', '),

      // PHẦN 3: CÔNG CỤ & THỰC TRẠNG ĐẦU TƯ AI
      congCuDaDung: gatheredTools.join(', '),
      tanSuat: formData.usageFrequency || '',
      chiPhi: formData.costStatus || '',
      thoiGianTietKiem: formData.timeSavedDaily || '',

      // PHẦN 4: ĐÁNH GIÁ KHÓ KHĂN, NHU CẦU ĐÀO TẠO & ĐỀ XUẤT
      khoKhan: (formData.biggestChallenges || []).join(', '),
      nhuCauDaoTao: nhuCauDaoTaoStr,
      hinhThucDaoTao: (formData.trainingFormats || []).join(', '),
      nguyenVongDaoTao: formData.trainingWillingness || '',
      deXuat: formData.proposal.trim(),

      // --- CÁC TRƯỜNG DẠNG MẢNG (HỖ TRỢ SCRIPTS CẦN ARRAY) ---
      mucDichArray: gatheredPurposes,
      congCuDaDungArray: gatheredTools,
      khoKhanArray: formData.biggestChallenges || [],
      nhuCauDaoTaoArray: formData.trainingFormats || [],

      // --- CÁC TRƯỜNG TƯƠNG THÍCH CAMELCASE ---
      fullName: formData.fullName.trim(),
      birthYear: formData.birthYear.trim(),
      gender: formData.gender,
      company: formData.company,
      department: formData.department.trim(),
      position: formData.position.trim(),
      awarenessLevel: formData.awarenessLevel,
      aiPurposes: gatheredPurposes,
      toolsUsed: gatheredTools,
      otherTool: formData.otherTool || '',
      otherAiPurpose: formData.otherAiPurpose || '',
      usageFrequency: formData.usageFrequency,
      costStatus: formData.costStatus,
      timeSavedDaily: formData.timeSavedDaily,
      timeSavedWeekly: formData.timeSavedDaily,
      biggestChallenges: formData.biggestChallenges || [],
      trainingWillingness: formData.trainingWillingness,
      trainingFormats: formData.trainingFormats || [],
      proposal: formData.proposal.trim(),

      // Metadata
      id: `SM-AI-${Date.now().toString(36).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      thoiGianGui: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    };

    try {
      // 1. Save local backup copy in browser
      const existingSubmissions = JSON.parse(
        localStorage.getItem(LOCAL_SUBMISSIONS_KEY) || '[]'
      );
      existingSubmissions.unshift(submissionPayload);
      localStorage.setItem(
        LOCAL_SUBMISSIONS_KEY,
        JSON.stringify(existingSubmissions.slice(0, 50))
      );

      // 2. Direct transmission to fixed official Google Apps Script Webhook
      try {
        await fetch(FIXED_GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(submissionPayload),
          keepalive: true,
        });
      } catch (fetchError) {
        console.warn('Webhook POST error:', fetchError);
      }

      // 3. Immediately display success screen as no-cors mode returns opaque response
      setSubmittedData(submissionPayload as SurveyFormData);
      setIsSuccessModalOpen(true);
      setToastMessage({
        type: 'success',
        text: 'Cảm ơn Anh/Chị đã hoàn thành khảo sát!',
      });
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmittedData(submissionPayload as SurveyFormData);
      setIsSuccessModalOpen(true);
      setToastMessage({
        type: 'success',
        text: 'Cảm ơn Anh/Chị đã hoàn thành khảo sát!',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    if (window.confirm('Anh/Chị có chắc chắn muốn làm mới toàn bộ nội dung khảo sát?')) {
      setFormData(DEFAULT_FORM_DATA);
      setErrors({});
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white pb-24 md:pb-12">
      {/* 1. Header nổi bật với 4 thương hiệu AFO, IDI, TRISEDCO, SPF */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        {/* Toast Notification */}
        {toastMessage && (
          <div
            className={`mb-5 p-4 rounded-2xl border flex items-center justify-between gap-3 text-sm font-semibold shadow-md transition-all no-print animate-fadeIn ${
              toastMessage.type === 'error'
                ? 'bg-rose-50 border-rose-300 text-rose-800'
                : toastMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-blue-50 border-blue-300 text-blue-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toastMessage.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              <span>{toastMessage.text}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              type="button"
              className="text-xs font-bold underline hover:opacity-80 px-2 py-1"
            >
              Đóng
            </button>
          </div>
        )}

        {/* 2. Hero Banner với Thanh tiến trình Step 1 -> Step 4 */}
        <HeroBanner
          currentStep={currentStep}
          onStepClick={handleStepClick}
          completedSteps={completedSteps}
        />

        {/* Progress Bar & View Toggle */}
        <div className="flex items-center justify-between gap-3 mb-5 px-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-900 uppercase tracking-wide">
              {viewAllSections ? 'Toàn bộ 4 phần' : `Phần ${currentStep} / 4`}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600 font-medium">
              Hoàn thành: <strong className="text-blue-700">{progressPercentage}%</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setViewAllSections(!viewAllSections)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            {viewAllSections ? (
              <>
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Xem từng bước (1-4)</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>Xem toàn bộ khảo sát</span>
              </>
            )}
          </button>
        </div>

        {/* Progress Track */}
        <div className="w-full bg-slate-200/80 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(progressPercentage, 5)}%` }}
          ></div>
        </div>

        {/* 3. Khảo sát 4 Phần */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Chế độ từng bước (Stepper UX - Tối ưu 100% Mobile) */}
          {!viewAllSections ? (
            <div className="transition-all duration-300">
              {currentStep === 1 && (
                <div className="animate-fadeIn">
                  <Section1PersonalInfo
                    formData={formData}
                    errors={errors}
                    onChange={handleFieldChange}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-fadeIn">
                  <Section2Awareness
                    formData={formData}
                    errors={errors}
                    onChange={handleFieldChange}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-fadeIn">
                  <Section3ToolsAndCost
                    formData={formData}
                    errors={errors}
                    onChange={handleFieldChange}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="animate-fadeIn">
                  <Section4ImpactAndProposals
                    formData={formData}
                    errors={errors}
                    onChange={handleFieldChange}
                  />
                </div>
              )}

              {/* Bottom Step Navigation Control */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 sm:flex-initial py-3 px-5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Quay lại</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="py-3 px-3.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 text-sm font-semibold transition-colors cursor-pointer"
                    title="Làm mới lại từ đầu"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-3">
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full sm:w-auto min-h-[48px] py-3 px-7 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer hover:scale-101 active:scale-99"
                    >
                      <span>Tiếp tục sang Phần {currentStep + 1}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto min-h-[50px] py-3.5 px-8 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer hover:scale-101 active:scale-99 disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Đang gửi dữ liệu...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>GỬI BẢN KHẢO SÁT NGAY</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Chế độ xem toàn bộ 4 phần trên 1 trang */
            <div className="space-y-6">
              <Section1PersonalInfo
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
              />
              <Section2Awareness
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
              />
              <Section3ToolsAndCost
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
              />
              <Section4ImpactAndProposals
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
              />

              {/* Bottom Submit Card */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-lg mb-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Bảo mật dữ liệu nhân sự tuyệt đối</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Hoàn Tất & Gửi Khảo Sát
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Dữ liệu sẽ được ghi nhận trực tiếp về Ban Chỉ Đạo Chuyển Đổi Số Tập Đoàn.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="py-3 px-4 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-semibold text-sm flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Làm mới</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-initial py-3.5 px-8 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Đang gửi...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>GỬI BẢN KHẢO SÁT</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2 no-print">
        <p className="font-bold text-slate-800 tracking-tight">
          HỆ THỐNG KHẢO SÁT NHẬN DIỆN & NHU CẦU ỨNG DỤNG TRÍ TUỆ NHÂN TẠO (AI)
        </p>
        <p className="text-slate-500 text-[11px] sm:text-xs">
          Công ty CP Dầu cá Châu Á (AFO - Ranee) · IDI Seafood · TRISEDCO · Sao Mai Super Feed (SPF)
        </p>
        <p className="text-slate-400 text-[11px]">
          © {new Date().getFullYear()} Bản quyền thuộc Ban Chỉ Đạo Chuyển Đổi Số - Tập đoàn Sao Mai.
        </p>
      </footer>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        data={submittedData}
        onReset={() => {
          setFormData(DEFAULT_FORM_DATA);
          setErrors({});
          setCurrentStep(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
