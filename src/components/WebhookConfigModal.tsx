import React, { useState } from 'react';
import {
  X,
  FileCode2,
  Copy,
  Check,
  ExternalLink,
  Save,
  RotateCcw,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { SAMPLE_APPS_SCRIPT_CODE } from '../data/constants';

interface WebhookConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl: string;
  onSaveWebhookUrl: (url: string) => void;
}

export const WebhookConfigModal: React.FC<WebhookConfigModalProps> = ({
  isOpen,
  onClose,
  webhookUrl,
  onSaveWebhookUrl,
}) => {
  const [inputUrl, setInputUrl] = useState(webhookUrl);
  const [copiedCode, setCopiedCode] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'url' | 'script'>('url');

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SAMPLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSave = () => {
    onSaveWebhookUrl(inputUrl.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-fadeIn no-print">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Decorative Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Cấu Hình Google Apps Script Webhook
              </h3>
              <p className="text-xs text-slate-500">
                Đồng bộ dữ liệu khảo sát trực tiếp vào bảng tính Google Sheets
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 pt-4 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
              activeTab === 'url'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            1. Thiết lập Webhook URL
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('script')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
              activeTab === 'script'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>2. Mã nguồn Google Apps Script (Code.gs)</span>
          </button>
        </div>

        {/* Tab 1: Webhook URL Input */}
        {activeTab === 'url' && (
          <div className="space-y-4 pt-2 overflow-y-auto flex-1">
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 leading-relaxed">
              <strong>💡 Cơ chế hoạt động:</strong> Khi người dùng bấm <em>“GỬI BẢN KHẢO SÁT”</em>,
              toàn bộ dữ liệu JSON sẽ được gửi qua phương thức <code>POST</code> đến địa chỉ Webhook
              này để ghi trực tiếp thành một dòng mới trên Google Sheets của Anh/Chị.
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Google Apps Script Web App URL:
              </label>
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1.5">
                * URL phải có dạng kết thúc bằng <code>/exec</code> (được cấp khi chọn Deploy -&gt; New deployment -&gt; Web app).
              </p>
            </div>

            {/* Quick 3 steps guide */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block text-sm">
                3 Bước Triển Khai Nhanh Google Sheets:
              </span>
              <p>
                <strong>Bước 1:</strong> Mở <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold inline-flex items-center gap-0.5">Google Sheets mới <ExternalLink className="w-3 h-3" /></a>, đặt tên bảng tính ví dụ <em>&quot;Khao_Sat_AI_Sao_Mai&quot;</em>.
              </p>
              <p>
                <strong>Bước 2:</strong> Vào menu <em>Tiện ích mở rộng (Extensions)</em> &rarr; <em>Apps Script</em>.
              </p>
              <p>
                <strong>Bước 3:</strong> Chuyển sang tab <strong>&quot;2. Mã nguồn Code.gs&quot;</strong> bên trên, copy đoạn mã và dán vào Apps Script, sau đó bấm <em>Triển khai (Deploy)</em> &rarr; <em>Ứng dụng web (Web app)</em>, chọn quyền truy cập <em>&quot;Bất kỳ ai&quot;</em> (Anyone) và dán link vào ô trên.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInputUrl('')}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Xóa URL
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Đã Lưu!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Lưu Cấu Hình</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Sample Apps Script Code */}
        {activeTab === 'script' && (
          <div className="space-y-3 pt-2 overflow-y-auto flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">
                Toàn bộ mã xử lý tự động tạo cột tiêu đề chuẩn và ghi dòng dữ liệu:
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="py-1.5 px-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã Sao Chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao Chép Mã Nguồn</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 text-slate-100 text-xs font-mono p-4 max-h-[360px] overflow-y-auto">
              <pre>{SAMPLE_APPS_SCRIPT_CODE}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
