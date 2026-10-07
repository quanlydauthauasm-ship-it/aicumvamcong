import { CompanyInfo, AwarenessScaleItem, ToolItem } from '../types/survey';
import { AFO_LOGO_BASE64 } from './afoLogo';
import { IDI_LOGO_BASE64 } from './idiLogo';
import { SPF_LOGO_BASE64 } from './spfLogo';

export const MEMBER_COMPANIES: CompanyInfo[] = [
  {
    id: 'AFO',
    name: 'AFO (Ranee)',
    fullName: 'Công ty Cổ phần Dầu cá Châu Á',
    shortDesc: 'Tinh dầu cá tự nhiên Ranee & sản phẩm giá trị gia tăng dinh dưỡng',
    logoUrl: AFO_LOGO_BASE64,
    website: 'https://ranee.com.vn/',
    badgeText: 'AFO · Ranee',
    accentColor: 'red',
    brandGradient: 'from-red-600 via-rose-600 to-amber-500',
    borderColor: 'border-red-500',
  },
  {
    id: 'IDI',
    name: 'IDI Seafood',
    fullName: 'Công ty Cổ phần Đầu tư & Phát triển Đa Quốc Gia',
    shortDesc: 'Tập đoàn chế biến & xuất khẩu cá tra hàng đầu Việt Nam',
    logoUrl: IDI_LOGO_BASE64,
    website: 'https://idiseafood.com/',
    badgeText: 'IDI Seafood',
    accentColor: 'sky',
    brandGradient: 'from-sky-600 via-blue-600 to-cyan-500',
    borderColor: 'border-sky-500',
  },
  {
    id: 'Trisedco',
    name: 'TRISEDCO',
    fullName: 'Công ty Cổ phần Đầu tư Du lịch và Phát triển Thủy sản',
    shortDesc: 'Bột cá, mỡ cá & phụ phẩm thủy sản giá trị gia tăng',
    logoUrl: 'https://trisedco.com/vnt_upload/weblink/logo_1.png',
    website: 'https://trisedco.com/',
    badgeText: 'Trisedco',
    accentColor: 'indigo',
    brandGradient: 'from-blue-800 via-indigo-700 to-blue-900',
    borderColor: 'border-indigo-600',
  },
  {
    id: 'SPF',
    name: 'SPF (Sao Mai Super Feed)',
    fullName: 'Công ty TNHH Sao Mai Super Feed',
    shortDesc: 'Nhà máy sản xuất thức ăn thủy sản công nghệ cao đạt chuẩn quốc tế',
    logoUrl: SPF_LOGO_BASE64,
    website: 'https://saomaisuperfeed.com/',
    badgeText: 'Sao Mai Super Feed',
    accentColor: 'emerald',
    brandGradient: 'from-emerald-600 via-teal-600 to-green-500',
    borderColor: 'border-emerald-500',
  },
];

export const DEPARTMENTS = [
  'Ban Giám đốc / Lãnh đạo điều hành',
  'Phòng Kế toán - Tài chính',
  'Phòng Hành chính - Nhân sự & Pháp chế',
  'Phòng Kinh doanh nội địa & Tiếp thị',
  'Phòng Xuất nhập khẩu & Thương mại quốc tế',
  'Phòng Kỹ thuật & Nghiên cứu phát triển (R&D)',
  'Phân xưởng Sản xuất & Chế biến',
  'Phòng Quản lý Chất lượng (QA/QC/KCS)',
  'Phòng Thu mua & Cung ứng nguyên liệu',
  'Phòng Kế hoạch & Điều độ sản xuất',
  'Phòng Cơ điện, Vận hành máy & Bảo trì',
  'Bộ phận Kho vận, Giao nhận & Logistics',
  'Bộ phận Công nghệ thông tin (IT) & Chuyển đổi số',
  'Ban Quản lý vùng nuôi thủy sản',
  'Bộ phận / Phòng ban khác',
];

export const POSITIONS = [
  'Cán bộ Quản lý (Ban Giám đốc / Trưởng - Phó phòng ban / Quản đốc xưởng)',
  'Chuyên viên / Nhân viên văn phòng',
  'Kỹ sư / Giám sát kỹ thuật / R&D',
  'Tổ trưởng / Trưởng ca sản xuất',
  'Công nhân / Nhân viên vận hành kỹ thuật trực tiếp',
  'Vị trí chuyên môn khác',
];

export const AI_PURPOSES = [
  'Hỏi đáp',
  'Soạn thảo văn bản, email, biên bản',
  'Phân tích số liệu',
  'Thiết kế hình ảnh, slide thuyết trình',
  'Lập trình, tự động hóa tác vụ',
  'Dịch thuật tài liệu',
];

export const AWARENESS_LEVELS: AwarenessScaleItem[] = [
  {
    score: 1,
    label: 'Chưa từng nghe / Rất ít',
    description: 'Chỉ mới nghe thoáng qua thuật ngữ AI, chưa từng tìm hiểu hoặc sử dụng thực tế.',
    badge: 'Mức độ 1/5',
  },
  {
    score: 2,
    label: 'Biết sơ qua',
    description: 'Biết AI có thể hỗ trợ viết lách, làm ảnh nhưng chưa hình dung rõ ứng dụng trong công việc.',
    badge: 'Mức độ 2/5',
  },
  {
    score: 3,
    label: 'Hiểu cơ bản',
    description: 'Đã nắm nguyên lý cơ bản, từng thử qua một số công cụ AI phổ biến (ChatGPT, Gemini...).',
    badge: 'Mức độ 3/5',
  },
  {
    score: 4,
    label: 'Thường xuyên sử dụng',
    description: 'Tích cực ứng dụng AI vào tác vụ thường nhật, chủ động cập nhật tin tức, xu hướng công nghệ.',
    badge: 'Mức độ 4/5',
  },
  {
    score: 5,
    label: 'Am hiểu sâu & Thành thạo',
    description: 'Thành thạo kỹ thuật prompt, kết hợp nhiều công cụ AI và có khả năng hướng dẫn đồng nghiệp.',
    badge: 'Mức độ 5/5',
  },
];

export const INFO_CHANNELS = [
  'Mạng xã hội (Facebook, LinkedIn, TikTok, YouTube)',
  'Báo chí, trang tin công nghệ (VnExpress, Cafebiz, GenK, Tinh tế...)',
  'Đồng nghiệp, bạn bè hoặc đối tác chia sẻ trong công việc',
  'Chương trình đào tạo, hội thảo chuyên đề nội bộ công ty',
  'Khóa học trực tuyến (Coursera, Udemy, YouTube hướng dẫn...)',
  'Chủ động tự tra cứu, đọc tài liệu chuyên ngành & thử nghiệm cá nhân',
  'Kênh thông tin khác',
];

export const POPULAR_AI_TOOLS: ToolItem[] = [
  { id: 'chatgpt', name: 'ChatGPT', category: 'Soạn thảo & Hỏi đáp', iconName: 'MessageSquareText', highlight: true },
  { id: 'gemini', name: 'Google Gemini', category: 'Trợ lý AI đa năng', iconName: 'Sparkles', highlight: true },
  { id: 'copilot', name: 'Microsoft Copilot', category: 'Tích hợp Office 365', iconName: 'FileSpreadsheet', highlight: true },
  { id: 'claude', name: 'Claude (Anthropic)', category: 'Phân tích tài liệu & Viết', iconName: 'FileText' },
  { id: 'canva', name: 'Canva Magic AI', category: 'Thiết kế đồ họa nhanh', iconName: 'Palette' },
  { id: 'midjourney', name: 'Midjourney / DALL-E', category: 'Tạo hình ảnh chất lượng cao', iconName: 'Image' },
  { id: 'deepl', name: 'DeepL / Google Translate AI', category: 'Dịch thuật chính xác', iconName: 'Languages' },
  { id: 'github_copilot', name: 'GitHub Copilot / Cursor', category: 'Hỗ trợ lập trình CNTT', iconName: 'Code2' },
  { id: 'grammarly', name: 'Grammarly / QuillBot', category: 'Kiểm tra ngữ pháp & văn phong', iconName: 'CheckCheck' },
  { id: 'suno', name: 'Suno / Udio AI', category: 'Sáng tạo âm thanh & âm nhạc', iconName: 'Music' },
];

export const USAGE_FREQUENCIES = [
  { id: 'daily', label: 'Hàng ngày', desc: 'Công cụ không thể thiếu trong ngày làm việc' },
  { id: 'weekly', label: 'Vài lần một tuần', desc: 'Thường xuyên sử dụng cho các nhiệm vụ cụ thể' },
  { id: 'monthly', label: 'Thỉnh thoảng (Vài lần/tháng)', desc: 'Chỉ dùng khi gặp vấn đề khó hoặc công việc phát sinh' },
  { id: 'rarely', label: 'Hiếm khi / Đã từng dùng thử', desc: 'Chỉ mới thử nghiệm 1-2 lần rồi dừng' },
  { id: 'never', label: 'Chưa từng dùng bao giờ', desc: 'Chưa có cơ hội hoặc chưa biết cách tiếp cận' },
];

export const COST_STATUSES = [
  { id: 'free', label: 'Hoàn toàn miễn phí', desc: 'Chỉ dùng phiên bản Free tier sẵn có (ChatGPT 3.5/4o-mini, Gemini Free...)' },
  { id: 'personal_paid', label: 'Bản thân tự trả phí', desc: 'Tự đầu tư gói Pro/Plus cá nhân (khoảng 20$/tháng) để nâng cao hiệu suất' },
  { id: 'company_paid', label: 'Được công ty cấp bản quyền', desc: 'Đang được công ty/bộ phận trang bị tài khoản bản quyền chính thức' },
];

export const TIME_SAVED_OPTIONS = [
  { id: 'none', label: 'Chưa tiết kiệm được / Không áp dụng', desc: 'Chưa thấy rõ tác động về mặt thời gian' },
  { id: 'under_2h', label: 'Dưới 2 giờ / tuần', desc: 'Tương đương tiết kiệm ~15-20 phút mỗi ngày' },
  { id: '2_to_5h', label: '2 đến 5 giờ / tuần', desc: 'Tiết kiệm ~30-60 phút mỗi ngày cho các tác vụ lặp lại' },
  { id: '5_to_10h', label: '5 đến 10 giờ / tuần', desc: 'Tương đương giải phóng nguyên 1 ngày làm việc/tuần' },
  { id: 'over_10h', label: 'Trên 10 giờ / tuần', desc: 'Tạo bước đột phá lớn về hiệu suất và tốc độ hoàn thành việc' },
];

export const BIGGEST_CHALLENGES = [
  'Thiếu kiến thức nền tảng và kỹ năng viết câu lệnh (Prompting)',
  'Rào cản về tiếng Anh và các thuật ngữ công nghệ phức tạp',
  'Chi phí đăng ký bản quyền các công cụ AI cao cấp còn khá đắt',
  'Lo ngại về bảo mật dữ liệu nội bộ và quy định an toàn thông tin',
  'Chưa biết cách áp dụng cụ thể vào quy trình chuyên môn hàng ngày',
  'Quỹ thời gian eo hẹp, không có thời gian tự nghiên cứu thực hành',
  'Cơ sở vật chất, máy tính hoặc đường truyền mạng tại nơi làm việc',
];

export const TRAINING_WILLINGNESS = [
  { id: 'very_eager', label: 'Rất sẵn sàng & Hào hứng', desc: 'Muốn học ngay để nâng cấp kỹ năng và gia tăng năng suất' },
  { id: 'consider', label: 'Cần cân nhắc theo lịch trình', desc: 'Sẵn sàng nếu thời gian học hợp lý, không ảnh hưởng ca làm' },
  { id: 'mandatory_only', label: 'Chỉ học nếu công ty bắt buộc', desc: 'Chưa thấy thực sự cấp thiết cho bản thân' },
  { id: 'no_need', label: 'Hiện tại chưa có nhu cầu', desc: 'Chưa có dự định tiếp cận AI trong thời gian tới' },
];

export const TRAINING_FORMATS = [
  'Workshop thực chiến tại công ty (Cầm tay chỉ việc trực tiếp)',
  'Khóa học video ngắn (Microlearning 5-10 phút) để chủ động tự học',
  'Hội thảo chuyên đề trực tuyến qua Zoom/Teams định kỳ',
  'Bộ cẩm nang nội bộ & Thư viện Prompt chuẩn cho từng phòng ban',
  'Các buổi chia sẻ kinh nghiệm nội bộ giữa các đồng nghiệp đi trước',
];

// Fixed official Google Apps Script Webhook URL for Cụm Công Nghiệp Vàm Cống
export const FIXED_GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbwkbIUklIRxzxyTnpGmWqg4g4fTpfP7HOkB2aiZJvN0BmDZJT8u4YbmTIo2F77WKy39/exec';

// Sample Google Apps Script template for one-click setup
export const SAMPLE_APPS_SCRIPT_CODE = `/**
 * GOOGLE APPS SCRIPT - KHẢO SÁT NĂNG LỰC & NHẬN DIỆN AI
 * Hướng dẫn triển khai:
 * 1. Mở Google Sheet mới -> Vào menu Tiện ích mở rộng (Extensions) -> Apps Script
 * 2. Dán toàn bộ mã nguồn này vào tệp Code.gs
 * 3. Bấm "Triển khai" (Deploy) -> "Quản lý bản triển khai mới" (New deployment)
 * 4. Loại: "Ứng dụng web" (Web app)
 *    - Thực thi dưới dạng: "Tôi" (Me)
 *    - Ai có quyền truy cập: "Bất kỳ ai" (Anyone)
 * 5. Bấm Triển khai và sao chép URL Ứng dụng web thu được để dán vào Webhook URL trên website!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Nếu sheet mới hoàn toàn, khởi tạo dòng tiêu đề chuẩn
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời gian gửi",
        "Họ và tên",
        "Năm sinh",
        "Giới tính",
        "Đơn vị công tác",
        "Phòng ban",
        "Vị trí công tác",
        "Mục đích dùng AI",
        "Mức độ nhận diện AI (1-5)",
        "Kênh tiếp cận thông tin",
        "Công cụ AI đã dùng",
        "Tần suất sử dụng",
        "Chi phí đầu tư",
        "Thời gian tiết kiệm/tuần",
        "Khó khăn lớn nhất",
        "Mong muốn đào tạo",
        "Hình thức đào tạo mong muốn",
        "Đề xuất & Sáng kiến",
        "Mã phản hồi"
      ]);
      // Định dạng dòng tiêu đề
      sheet.getRange(1, 1, 1, 19).setFontWeight("bold").setBackground("#1E40AF").setFontColor("#FFFFFF");
    }
    
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      data.hoTen || data.fullName || "",
      data.namSinh || data.birthYear || "",
      data.gioiTinh || data.gender || "",
      data.donVi || data.congTy || data.company || "",
      data.phongBan || data.department || "",
      data.chucVu || data.position || "",
      data.mucDich || (Array.isArray(data.aiPurposes) ? data.aiPurposes.join("; ") : (data.aiPurposes || "")),
      data.mucDoHieuBiet || data.awarenessLevel || "",
      data.kenhTiepCan || (Array.isArray(data.infoChannels) ? data.infoChannels.join("; ") : (data.infoChannels || "")),
      data.congCuDaDung || (Array.isArray(data.toolsUsed) ? (data.toolsUsed.join("; ") + (data.otherTool ? "; Khác: " + data.otherTool : "")) : (data.toolsUsed || "")),
      data.tanSuat || data.usageFrequency || "",
      data.chiPhi || data.costStatus || "",
      data.thoiGianTietKiem || data.timeSavedWeekly || "",
      data.khoKhan || (Array.isArray(data.biggestChallenges) ? data.biggestChallenges.join("; ") : (data.biggestChallenges || "")),
      data.nguyenVongDaoTao || data.trainingWillingness || "",
      data.nhuCauDaoTao || data.hinhThucDaoTao || (Array.isArray(data.trainingFormats) ? data.trainingFormats.join("; ") : (data.trainingFormats || "")),
      data.deXuat || data.proposal || "",
      data.id || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Dữ liệu khảo sát đã được ghi nhận thành công!",
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Hệ Thống Thu Thập Khảo Sát AI - Sao Mai Group",
    time: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
`;
