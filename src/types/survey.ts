export type CompanyId = 'AFO' | 'IDI' | 'Trisedco' | 'SPF';

export interface CompanyInfo {
  id: CompanyId;
  name: string;
  fullName: string;
  shortDesc: string;
  logoUrl: string;
  website: string;
  badgeText: string;
  accentColor: string;
  brandGradient?: string;
  borderColor?: string;
}

export interface SurveyFormData {
  // PHẦN 1: THÔNG TIN NHÂN SỰ
  fullName: string;
  birthYear: string;
  gender: 'Nam' | 'Nữ' | '';
  company: CompanyId | '';
  department: string;
  position: string;

  // PHẦN 2: NHẬN DIỆN & MỤC ĐÍCH SỬ DỤNG AI
  awarenessLevel: number; // 1 to 5
  aiPurposes: string[];
  otherAiPurpose?: string;

  // PHẦN 3: CÔNG CỤ & THỰC TRẠNG ĐẦU TƯ AI
  toolsUsed: string[];
  otherTool?: string;
  usageFrequency: string; // Hàng ngày, Vài lần/tuần, Vài lần/tháng, Hiếm khi/Chưa bao giờ
  costStatus: string; // Hoàn toàn miễn phí, Bản thân tự trả phí, Được công ty cấp bản quyền
  timeSavedDaily: string; // Dưới 30 phút/ngày, 30-60 phút/ngày, 1-2 giờ/ngày, Trên 2 giờ/ngày, Chưa thấy tiết kiệm

  // PHẦN 4: ĐÁNH GIÁ KHÓ KHĂN, NHU CẦU ĐÀO TẠO & ĐỀ XUẤT
  biggestChallenges: string[];
  otherChallenge?: string;
  trainingWillingness: string;
  trainingFormats: string[];
  proposal: string;

  // Metadata & Timestamps
  id?: string;
  submittedAt?: string;
  timeSavedWeekly?: string; // backwards compatibility
  infoChannels?: string[]; // backwards compatibility
}

export type FormValidationErrors = Partial<Record<keyof SurveyFormData, string>>;

export interface AwarenessScaleItem {
  score: number;
  label: string;
  description: string;
  badge: string;
  subText?: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  highlight?: boolean;
}
