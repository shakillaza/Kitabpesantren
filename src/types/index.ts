export type ActiveTab =
  | "docs"
  | "library"
  | "chat"
  | "ocr"
  | "nahwu"
  | "tafsir"
  | "hafalan"
  | "forum"
  | "marketplace"
  | "admin"
  | "settings";

export interface KitabItem {
  id: string;
  title: string;
  titleArab: string;
  category: "Fiqh" | "Nahwu-Sharaf" | "Akhlaq" | "Tafsir" | "Hadits" | "Aqidah";
  author: string;
  description: string;
  totalBab: number;
  iconName: string;
  featured?: boolean;
  chapters: KitabChapter[];
}

export interface KitabChapter {
  id: string;
  babNumber: number;
  title: string;
  titleArab: string;
  contentArabWithHarakat: string;
  contentArabGundul: string;
  translation: string;
  maknaGandul?: string;
  irabNotes?: { kata: string; irab: string; arti: string }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
  sources?: string[];
}

export interface OCRResult {
  teksGundul: string;
  teksHarakat: string;
  terjemahan: string;
  maknaGandul?: string;
  estNamaKitab?: string;
  kandunganHukum?: string;
}

export interface NahwuAnalysisResult {
  kalimat: string;
  ringkasanKaidah: string;
  breakdown: {
    kata: string;
    jenis: "Isim" | "Fi'il" | "Huruf";
    irab: string;
    tandaIrab: string;
    alasan: string;
    wazan?: string;
    bina?: string;
  }[];
  syahidNazham?: string;
}

export interface TafsirHaditsResult {
  topik: string;
  teksArab: string;
  terjemahan: string;
  sumber: string;
  mufassirOrPerawi: string;
  derajatHadits?: string;
  asbabunNuzul?: string;
  tafsirPanjang: string;
  fawaidHukum: string[];
}

export interface HafalanResult {
  skorAkurasi: number;
  statusHafalan: string;
  detailKesalahan: string[];
  teksKoreksi: string;
  catatanUstadz: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  role: "Santri" | "Ustadz" | "Kyai";
  category: "Fiqh" | "Nahwu" | "Bahsul Masail" | "Umum";
  question: string;
  votes: number;
  answersCount: number;
  timestamp: string;
  verifiedAnswer?: {
    author: string;
    answer: string;
    kitabRef: string;
  };
}

export interface LicenseInfo {
  isLicensed: boolean;
  key: string;
  tier: string;
  expiresAt: string;
  licensedTo: string;
  tokenQuota: number;
  tokenUsed: number;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  status: "Success" | "Warning" | "Error";
  ipAddress: string;
}

// Phase 6 — AI Engine & Ecosystem Extensions
export type AIProvider =
  | "Google Gemini"
  | "OpenAI"
  | "Anthropic Claude"
  | "OpenRouter"
  | "DeepSeek"
  | "Mistral";

export interface AIProviderConfig {
  id: string;
  name: AIProvider;
  modelName: string;
  apiKeySet: boolean;
  status: "Active" | "Standby" | "Disabled";
  latencyMs: number;
  costPer1kTokens: string;
}

export interface KnowledgeBaseDocument {
  id: string;
  title: string;
  author: string;
  category: string;
  language: "Arab (Turots)" | "Indonesia" | "Jawa (Pegon)" | "Bilingual";
  year: number;
  edition: string;
  bab: string;
  page: number;
  tags: string[];
  source: string;
  contentChunk: string;
  vectorId: string;
}

export interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "essay" | "true_false" | "short_fill";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface QuizSession {
  id: string;
  title: string;
  kitabTarget: string;
  questions: QuizQuestion[];
  durationMinutes: number;
}

export interface LearningPlanItem {
  day: string;
  topic: string;
  targetPage: string;
  estimatedMinutes: number;
  completed: boolean;
}

export interface LearningAssistantData {
  currentLevel: "Mubtadi (Pemula)" | "Mutawassit (Menengah)" | "Muntahi (Lanjut)";
  recommendedKitab: string[];
  studySchedule: LearningPlanItem[];
  evalSummary: string;
}

export interface TelemetryMetrics {
  totalQueries: number;
  totalTokensUsed: number;
  activeUsers: number;
  avgLatencyMs: number;
  estimatedCostUsd: number;
  activeProvider: AIProvider;
}

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  systemPrompt: string;
  userPromptTemplate: string;
  safetyRules: string[];
}

// Phase 7 — License System, Payment Gateway & Digital Commerce
export type LicenseModel =
  | "Free"
  | "Trial"
  | "Monthly Subscription"
  | "Quarterly Subscription"
  | "Yearly Subscription"
  | "Lifetime License"
  | "Enterprise License"
  | "Pesantren License"
  | "Campus License"
  | "White Label License";

export type PaymentGatewayType = "Midtrans" | "Xendit" | "Tripay" | "QRIS" | "Manual Bank Transfer";

export interface DeviceBinding {
  id: string;
  deviceId: string;
  deviceName: string;
  os: string;
  browser: string;
  ipAddress: string;
  activationTime: string;
  lastActive: string;
  isPrimary: boolean;
}

export interface CommercialPlan {
  id: string;
  name: string;
  tier: LicenseModel;
  priceIdr: number;
  billingCycle: "Monthly" | "Quarterly" | "Yearly" | "One-time";
  maxDevices: number;
  aiTokenQuotaPerMonth: number;
  ocrPageLimitPerMonth: number;
  voiceMinutesPerMonth: number;
  storageMb: number;
  features: string[];
  recommendedFor: string;
  popular?: boolean;
}

export interface CommercialTransaction {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  amountIdr: number;
  taxAmountIdr: number;
  discountIdr: number;
  totalIdr: number;
  gatewayUsed: PaymentGatewayType;
  paymentMethod: "QRIS" | "Virtual Account BNI" | "Virtual Account Mandiri" | "Gopay" | "Credit Card";
  status: "PAID" | "PENDING" | "EXPIRED" | "REFUNDED" | "FAILED";
  paidAt?: string;
  licenseKeyGenerated?: string;
  qrisPayloadUrl?: string;
}

export interface MarketplaceDigitalProduct {
  id: string;
  title: string;
  category: "Kitab Digital" | "Plugin AI" | "Prompt Package" | "Tema & White Label" | "Paket Kuota AI";
  authorOrVendor: string;
  priceIdr: number;
  originalPriceIdr?: number;
  rating: number;
  salesCount: number;
  description: string;
  badge?: string;
  coverImage: string;
}

export interface CouponCode {
  code: string;
  discountPercent: number;
  maxDiscountIdr: number;
  validUntil: string;
  usageCount: number;
  maxUsage: number;
  minPurchaseIdr: number;
}

export interface RevenueAnalyticsData {
  mrrIdr: number;
  arrIdr: number;
  totalActiveSubscriptions: number;
  paymentSuccessRate: number;
  refundRate: number;
  activeDevicesBound: number;
  topSellingPlan: string;
  gatewaySplit: { gateway: string; percentage: number }[];
}


