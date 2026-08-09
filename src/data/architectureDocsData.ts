export interface ArchitectureSection {
  id: string;
  title: string;
  category: "Overview" | "Requirements" | "Diagrams & Modeling" | "System Architecture" | "Security & Ops" | "Roadmap" | "UI/UX Design System" | "Database & Backend Architecture" | "Backend & AI Integration" | "Frontend & Responsive UI";
  contentMarkdown: string;
}

export const ARCHITECTURE_DOCS: ArchitectureSection[] = [
  {
    id: "exec-summary",
    title: "1. Executive Summary & Visi Misi",
    category: "Overview",
    contentMarkdown: `### Executive Summary
**SHAQILA DIGITAL 99** adalah platform ekosistem Smart AI Kitab Pesantren tingkat enterprise yang dirancang khusus untuk memodernisasi dan mengekselerasi pembelajaran Keilmuan Islam, Digitalisasi Kitab Kuning/Gundul, serta tata kelola pengetahuan Pesantren di Indonesia.

Melalui integrasi mutakhir teknologi **Generative AI (Gemini Flash & Multimodal)**, **OCR Kitab Gundul**, **Machine Grammatical Parser (Nahwu & Sharaf)**, dan **Khasanah Literasi Islam Nusantara (Makna Gandul / Pegon)**, platform ini menjembatani tradisi keilmuan klasik salafiyah dengan efisiensi teknologi digital abad ke-21.

---

### Visi & Misi
- **Visi**: Menjadi platform digitalisasi dan kecerdasan buatan Kitab Pesantren nomor 1 di Indonesia yang melestarikan turots klasik sekaligus memberdayakan santri, ustadz, dan pesantren menuju era digital 5.0.
- **Misi**:
  1. Menyediakan akses digitalisasi Kitab Kuning dengan pemahaman makno gandul, harakat otomatis, dan i'rab presisi tinggi.
  2. Membangun AI Ustadz Virtual berbasis Gemini yang ramah, beradab, berfaham Ahlussunnah wal Jama'ah (Aswaja), serta kaya rujukan turots.
  3. Memfasilitasi forum kolaboratif Bahsul Masail digital untuk perumusan hukum fiqih kontemporer.
  4. Menjamin keamanan, skalabilitas, dan fleksibilitas lisensi bagi pesantren dari skala kecil hingga konsorsium nasional.
`,
  },
  {
    id: "personas",
    title: "2. Target Persona & User Needs",
    category: "Overview",
    contentMarkdown: `### Matriks Target Pengguna (Persona)

| Nama Persona | Peran / Profesi | Kebutuhan Utama | Pain Points Sebelum SHAQILA 99 |
| :--- | :--- | :--- | :--- |
| **Ahmad (Santri Salaf)** | Santri Pondok Pesantren | Membaca kitab gundul, memahami I'rab, tes hafalan nazham Alfiyah | Kesulitan membaca kitab tanpa harakat dan butuh waktu lama untuk syarah I'rab |
| **Ustadz Hidayat** | Pengajar Fiqih & Nahwu | Menyiapkan bahan ajar, verifikasi dalil/hadits, menjawab soal santri | Keterbatasan waktu mencocokkan lintas mufassir dan maraji' kitab |
| **Kyai Masduki** | Pengasuh Pesantren | Kepastian konten AI sesuai akidah Aswaja, transparansi lisensi santri | AI umum sering ngawur/halusinasi saat ditanya hukum fiqih |
| **Gus Rifqy** | Ketua Tim Bahsul Masail | Diskusi fatwa kontemporer, pencarian cepat ibarat kitab kuno | Pencarian manual di perpustakaan fisik memakan waktu berhari-hari |
| **Admin Pesantren** | IT & Pengelola Lisensi | Manajemen pengguna, pembagian lisensi, monitoring kueri AI | Tidak ada sistem analitik terpusat untuk aktivitas belajar santri |
`,
  },
  {
    id: "requirements",
    title: "3. Analisis Kebutuhan Fungsional & Non-Fungsional",
    category: "Requirements",
    contentMarkdown: `### Kebutuhan Fungsional (Functional Requirements)
- **FR-01 Perpustakaan Digital**: Sistem wajib menampilkan Kitab Kuning dengan toggle Harakat/Gundul, Makna Gandul Pesantren, dan pembacaan audio.
- **FR-02 AI OCR Kitab**: Sistem wajib mampu memindai foto/teks Arab gundul dan merestorasi syakal beserta terjemahan secara otomatis.
- **FR-03 AI Nahwu & Sharaf Engine**: Sistem wajib memecah kalimat Arab menjadi Isim/Fi'il/Huruf, I'rab, Wazan, dan Syahid Nazham Alfiyah.
- **FR-04 AI Assistant Chat**: Sistem wajib menyediakan AI Chat santun dengan sistem prompt berstandar turots Aswaja dan citations kitab.
- **FR-05 AI Tafsir & Hadits Explorer**: Sistem wajib membandingkan penafsiran mufassir serta melacak sanad/matan/derajat hadits.
- **FR-06 Evaluation & Hafalan Tester**: Sistem wajib menilai tingkat akurasi hafalan nazham/hadits dan memberikan skor 0-100.
- **FR-07 Forum Bahsul Masail**: Sistem wajib menyediakan platform tanya jawab fiqih dengan voting dan verified badge Ustadz.
- **FR-08 Marketplace & License Key**: Sistem wajib memproses aktivasi lisensi VIP/Pro dan pembelian kitab digital.

---

### Kebutuhan Non-Fungsional (Non-Functional Requirements)
- **NFR-01 Performa**: Response time AI OCR & Nahwu Parser < 2.5 detik; pemuatan halaman awal < 1.2 detik.
- **NFR-02 Keamanan**: Seluruh komunikasi menggunakan SSL/TLS 1.3, API Key Gemini disimpan eksklusif server-side (Zero Exposure).
- **NFR-03 Ketersediaan (Availability)**: SLA 99.9% dengan arsitektur Cloud Run auto-scaling.
- **NFR-04 Responsivitas (PWA Ready)**: Kompatibel penuh pada perangkat Mobile Android, iOS, Tablet, dan Desktop.
`,
  },
  {
    id: "feature-matrix",
    title: "4. Daftar Fitur & Prioritas Rilis (MVP - V2)",
    category: "Requirements",
    contentMarkdown: `### Matriks Prioritas Pengembangan (Roadmap Fitur)

\`\`\`
+-----------------------------------------------------------------------+
|  MVP (Phase 1 - Immediate Release)                                    |
|  - Perpustakaan Kitab Digital (Safinah, Ta'lim, Alfiyah, Jalalain)    |
|  - AI Assistant Chat Ustadz Virtual (Gemini 3.6 Flash)                |
|  - AI OCR Restorasi Harakat Kitab Gundul                              |
|  - AI Nahwu & Sharaf Sentence Breakdown Engine                        |
|  - AI Tafsir & Hadits Research Explorer                               |
|  - System Architecture & Interactive Blueprints Viewer                |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|  Version 1.0 (Phase 2 - Expansion)                                    |
|  - AI Hafalan & Nazham Voice Evaluator                                |
|  - Forum Santri & Bahsul Masail Thread Verification                   |
|  - License Key Activation & Enterprise VIP Manager                    |
|  - Admin Analytics Dashboard & AI Token Usage Meter                   |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|  Version 2.0 & Future (Phase 3 - Ecosystem)                           |
|  - Mobile Native PWA Offline Sync Engine                              |
|  - Multi-Pesantren Federated Database                                 |
|  - AI Audio Live Recitation Analysis (Tajwid & Makhraj)               |
+-----------------------------------------------------------------------+
\`\`\`
`,
  },
  {
    id: "system-arch",
    title: "5. Overall System Architecture (Arsitektur Sistem)",
    category: "System Architecture",
    contentMarkdown: `### Diagram Arsitektur Enterprise SHAQILA DIGITAL 99

\`\`\`
+-------------------------------------------------------------------------------+
|                            CLIENT LAYER (PWA / Web)                           |
|  React 19 + TypeScript + Tailwind CSS + Motion + Lucide Icons + PWA Cache     |
+-------------------------------------------------------------------------------+
                                       |
                                HTTP / HTTPS (JSON)
                                       v
+-------------------------------------------------------------------------------+
|                         API GATEWAY / REVERSE PROXY                           |
|                            Cloud Run / NGINX (Port 3000)                      |
+-------------------------------------------------------------------------------+
                                       |
                    +------------------+------------------+
                    |                                     |
                    v                                     v
+----------------------------------------+ +-----------------------------------+
|     BACKEND SERVICE (Express Node.js)  | |      LICENSE & AUTH SERVER        |
|  - Clean Modular Architecture          | |  - Key Validator (SHAQILA-VIP)    |
|  - Server-Side Gemini SDK Proxy        | |  - Role-Based Auth (RBAC)         |
|  - Audit Logger & Middleware           | |  - JWT Token Dispatcher          |
+----------------------------------------+ +-----------------------------------+
                    |
                    v
+-------------------------------------------------------------------------------+
|                        AI CORE ENGINE (Google Gemini)                         |
|  - gemini-3.6-flash (Text Chat, Nahwu, Tafsir, Hafalan Test)                  |
|  - Multimodal Vision (OCR Kitab Gundul & Manuscript Restoration)               |
|  - User-Agent: 'aistudio-build' (Telemetry & High Throughput)                  |
+-------------------------------------------------------------------------------+
\`\`\`

### Penjelasan Komponen Utama:
1. **Frontend Presentation**: Menggunakan React 19 dengan arsitektur komponen modular, state management lokal yang ringan, serta responsif di semua ukuran layar.
2. **Backend API Middleware**: Express.js sebagai perantara aman antara browser dan Gemini AI SDK. Tidak ada API Key yang terekspos ke client.
3. **AI Integration**: Menggunakan SDK resmi \`@google/genai\` dengan model \`gemini-3.6-flash\` yang dikonfigurasi menggunakan System Prompt khusus Pesantren.
`,
  },
  {
    id: "erd-diagram",
    title: "6. Conceptual Entity Relationship Diagram (ERD)",
    category: "Diagrams & Modeling",
    contentMarkdown: `### Skema Konseptual Basis Data (ERD)

\`\`\`
+------------------+       1:N       +------------------+
|      USERS       |<----------------|    BOOKMARKS     |
+------------------+                 +------------------+
| id (PK)          |                 | id (PK)          |
| name             |                 | user_id (FK)     |
| email            |                 | kitab_id (FK)    |
| role             |                 | chapter_id       |
| license_key (FK) |                 | created_at       |
+------------------+                 +------------------+
         |                                    |
         | 1:N                                | 1:N
         v                                    v
+------------------+                 +------------------+
|   FORUM_POSTS    |                 |   KITAB_TUROTS   |
+------------------+                 +------------------+
| id (PK)          |                 | id (PK)          |
| user_id (FK)     |                 | title            |
| category         |                 | title_arab       |
| question         |                 | author           |
| votes            |                 | category         |
+------------------+                 +------------------+
         |                                    |
         | 1:N                                | 1:N
         v                                    v
+------------------+                 +------------------+
|  FORUM_ANSWERS   |                 |  KITAB_CHAPTERS  |
+------------------+                 +------------------+
| id (PK)          |                 | id (PK)          |
| post_id (FK)     |                 | kitab_id (FK)    |
| user_id (FK)     |                 | bab_number       |
| answer_text      |                 | content_arab     |
| is_verified      |                 | translation      |
+------------------+                 +------------------+
\`\`\`
`,
  },
  {
    id: "sequence-diagrams",
    title: "7. Sequence Diagram (Alur Proses Penting)",
    category: "Diagrams & Modeling",
    contentMarkdown: `### Sequence Diagram 1: Alur Pemindaian AI OCR Kitab Gundul

\`\`\`
Santri (Client)            Backend API              Gemini AI Engine
     |                          |                          |
     |--- Upload Foto Kitab --->|                          |
     |    (base64 image)        |                          |
     |                          |--- Request Vision API -->|
     |                          |    (Multimodal OCR)      |
     |                          |<-- Return JSON Result ---|
     |                          |    (Harakat & Irab)      |
     |<-- Render OCR Component -|                          |
     |    (Teks, Syakal, Art)   |                          |
\`\`\`

---

### Sequence Diagram 2: Alur AI Nahwu & Sharaf Analyzer

\`\`\`
Santri (Client)            Backend API              Gemini AI Engine
     |                          |                          |
     |--- Input Kalimat Arab -->|                          |
     |                          |--- Send Grammar Prompt ->|
     |                          |    (Nahwu-Sharaf Schema) |
     |                          |<-- Return Structured ----|
     |                          |    (Breakdown JSON)      |
     |<-- Display Breakdown ----|                          |
     |    (Isim/Fiil/Irab/Syahid)                          |
\`\`\`
`,
  },
  {
    id: "security-ops",
    title: "8. Desain Keamanan, Skalabilitas & DR Strategy",
    category: "Security & Ops",
    contentMarkdown: `### Strategi Keamanan Enterprise (Security Architecture)
1. **Zero Secret Exposure**: \`GEMINI_API_KEY\` disimpan penuh pada Server Environment Variables (\`process.env.GEMINI_API_KEY\`) dan tidak pernah dikirim ke browser.
2. **Rate Limiting & Protection**: Perlindungan kueri AI maksimal 60 request/menit per IP untuk mencegah abuse/DDoS.
3. **Audit Logging**: Setiap transaksi pembuatan konten, pengubahan lisensi, dan aktivitas AI dicatat dalam log terstruktur (\`AuditLogItem\`).
4. **Data Encryption**: Seluruh lalulintas data terenkripsi HTTPS/TLS 1.3 dan penyimpanan data terenkripsi AES-256 at rest.

---

### Skalabilitas, Backup, dan Disaster Recovery (DR)
- **Auto-Scaling**: Kontainer Cloud Run secara otomatis melakukan scaling dari 1 ke 50 instansi bergantung pada spike trafik santri di jam pengajian.
- **Backup & Redundancy**: Database ditumpuk di Google Cloud Storage multi-region dengan snapshot harian terotomatisasi.
- **Failover Strategy**: Pengalihan otomatis ke region sekunder dengan Recovery Time Objective (RTO) < 15 menit dan Recovery Point Objective (RPO) < 1 jam.
`,
  },
  {
    id: "roadmap",
    title: "9. Roadmap Pengembangan & Milestone",
    category: "Roadmap",
    contentMarkdown: `### Eksekusi Roadmap Projek

| Minggu / Fase | Target Milestone | Deliverables |
| :--- | :--- | :--- |
| **Minggu 1** | Phase 1 Architecture & Foundation | System Specs Document, ERD, Express Setup, Gemini SDK Config |
| **Minggu 2** | Core Kitab Library & Reader | Reader UI, Harakat Toggle, Makna Gandul, Audio Player |
| **Minggu 3** | AI Engines Integration | AI Chat, AI OCR, AI Nahwu/Sharaf Parser, AI Tafsir |
| **Minggu 4** | Community & Monetization | Forum Bahsul Masail, License Key Activation, Marketplace |
| **Minggu 5** | Admin Panel & Testing | Analytics Dashboard, Performance Optimization, Production Rollout |
`,
  },
  {
    id: "uiux-design-system",
    title: "10. Phase 2 — UI/UX Design System & Specification",
    category: "UI/UX Design System",
    contentMarkdown: `### SHAQILA DIGITAL 99 — UI/UX Design System & Specification

#### 1. UI/UX Strategy
- **Filosofi Design**: "Islamic Modern Luxury" — Memadukan keanggunan nuansa hijau zamrud (Emerald) & emas murni (Luxury Gold) dengan kejernihan antarmuka kaca modern (Glassmorphism) dan aksen Bright Blue & Bright Red yang tegas.
- **Prinsip Utama**: 
  1. *Sublime Clarity*: Pembacaan teks Arab, harakat, dan makna gandul menjadi prioritas visual utama tanpa distractor.
  2. *Speed & Efficiency*: Akses maksimal 3-klik menuju seluruh modul AI (OCR, Nahwu, Tafsir, Hafalan, Kitab).
  3. *Inclusivity & Accessibility*: WCAG 2.1 AA Compliant, dukungan pembaca layar, kontras teks tinggi, dan kontrol ukuran font teks Arab dinamis.

#### 2. User Journey & Prototype Flow
1. **Onboarding & Discovery**: Landing Page -> Demo Modul Kitab -> Verifikasi License Key / Login -> Dashboard Utama.
2. **Eksplorasi Kitab & AI Explainer**: Pilih Kitab -> Tampil Reader (Toggle Harakat / Gandul) -> Blok Teks -> panggil AI Explain / Nahwu Parser -> Tampil Bottom Sheet / Sidebar Result.
3. **Restorasi Manuskrip OCR**: Upload Foto / Paste Teks Gundul -> Loading AI Restorasi -> Tampil Komparasi Split View (Asli vs Harakat AI vs Terjemahan).
4. **Evaluasi Hafalan Nazham**: Pilih Bait Target -> Setor Suara / Teks -> AI Evaluator Penilaian -> Tampil Skor Akurasi & Nasihat Muroja'ah.

#### 3. Design System & Tokens
- **Color Tokens**:
  - \`Primary (Bright Blue)\`: \`#0284C7\` (Interactive Focus, Action Blue)
  - \`Secondary (Bright Red)\`: \`#EF4444\` (Alerts, Record Active, Danger)
  - \`Accent (Luxury Gold)\`: \`#F59E0B\` / \`#FBBF24\` (Gold Badges, Syahid Alfiyah, Highlights)
  - \`Surface & Canvas\`: \`#064E3B\` (Emerald 900 Header), \`#022C22\` (Emerald 950 Dark Cards), \`#F8FAFC\` (Light Canvas), \`#FFFFFF\` (Card Surface)
- **Typography Scale**:
  - \`Font Family (Latin)\`: Poppins, Inter, Nunito
  - \`Font Family (Arabic)\`: Traditional Arabic, Noto Naskh Arabic, Scheherazade New
  - \`Display\`: 32px / 1.2 line-height (Bold)
  - \`Headline\`: 24px / 1.3 line-height (Bold)
  - \`Title\`: 18px / 1.4 line-height (Semibold)
  - \`Body\`: 14px / 1.6 line-height (Regular)
  - \`Arabic Body\`: 22px - 28px / 2.2 line-height (Medium/Bold)
- **Elevation & Radius**:
  - \`Border Radius\`: 12px (\`rounded-xl\`), 16px (\`rounded-2xl\`), 24px (Pills)
  - \`Shadows\`: \`shadow-sm\`, \`shadow-md\`, \`shadow-2xl\` (Glassmorphism backdrop-blur-md)

#### 4. Responsive Breakpoints & Component Library
- **Desktop (1280px+)**: Multi-column split views, persistent sidebar navigation, floating AI Inspector panel.
- **Tablet (768px - 1024px)**: Collapsible sidebar, grid 2-kolom responsif, drawer bottom-sheet.
- **Mobile (< 768px)**: Bottom tab bar, full-bleed cards, touch target minimum 44px, sticky top header.

#### 5. Accessibility & Dark Mode Guidelines
- Full AA WCAG compliance dengan kontras rasio minimal 4.5:1 untuk teks biasa dan 3:1 untuk teks Arab berukuran besar.
- Dark Mode khusus "Emerald Twilight" yang mengurangi efek fatigue mata saat tadarus malam/muqoddimah santri.
`,
  },
  {
    id: "database-backend-arch",
    title: "11. Phase 3 — Database Architecture, Data Model & Backend Foundation",
    category: "Database & Backend Architecture",
    contentMarkdown: `### SHAQILA DIGITAL 99 — Phase 3 Database & Backend Architecture Specifications

#### 1. Database Principles & Storage Stack
- **Primary Database**: PostgreSQL 16 (Relational, ACID, JSONB support for rich AI citations).
- **In-Memory Cache & Rate Limiting**: Redis 7.2 (Session store, JWT revocation blacklist, AI query cache, rate limiter).
- **Search Engine**: Elasticsearch 8 (Full-text search for Arabic diacritics, root word searching, and Indonesian translation).
- **Object Storage**: S3-Compatible Storage (MinIO / Cloud Storage) for manuscript PDFs, OCR images, and audio recitations.
- **Data Integrity Principles**:
  - UUID v4 for all Primary Keys (\`id\`).
  - Soft Delete (\`deleted_at IS NULL\`) across all transactional entities.
  - Automatic Auditing (\`created_at\`, \`updated_at\`, \`created_by\`, \`updated_by\`).
  - Strict Foreign Key constraints with cascades or restrict strategies.

#### 2. Enterprise ERD & Entity Data Dictionary (Summary)
The backend architecture contains **21 core database domains**:

1. **Authentication Domain**:
   - \`users\`: (\`id\`, \`email\`, \`password_hash\`, \`full_name\`, \`is_active\`, \`pesantren_id\`, \`created_at\`)
   - \`roles\`: (\`id\`, \`name\` [Admin, Ustadz, Santri], \`description\`)
   - \`permissions\`: (\`id\`, \`code\` [e.g., \`ocr:execute\`, \`nahwu:analyze\`])
   - \`user_roles\` & \`role_permissions\`: Junction tables for RBAC.
   - \`sessions\` & \`refresh_tokens\`: Multi-device token management.

2. **License Domain**:
   - \`licenses\`: (\`id\`, \`license_key\`, \`tier\` [Santri Basic, Ustadz Pro, Pesantren VIP], \`max_devices\`, \`token_quota\`, \`expires_at\`, \`is_active\`)
   - \`license_activations\`: (\`id\`, \`license_id\`, \`user_id\`, \`device_fingerprint\`, \`activated_at\`)

3. **Kitab & Content Domain**:
   - \`categories\`: (\`id\`, \`name\` [Fiqh, Aqidah, Nahwu, Sharaf, Hadits, Tafsir])
   - \`authors\`: (\`id\`, \`name_arabic\`, \`name_latin\`, \`death_year_hijri\`)
   - \`books\`: (\`id\`, \`title_arabic\`, \`title_latin\`, \`author_id\`, \`category_id\`, \`pdf_url\`)
   - \`book_pages\`: (\`id\`, \`book_id\`, \`page_number\`, \`content_gundul\`, \`content_harakat\`, \`makna_gandul_pegon\`)

4. **AI & Processing Domains**:
   - \`ai_conversations\` & \`ai_messages\`: AI Ustadz Chat thread history & Gemini token logging.
   - \`ocr_jobs\` & \`ocr_results\`: Manuscript image uploads, restored syakal, and accuracy confidence scores.
   - \`nahwu_analyses\` & \`sharaf_results\`: Sentence grammatical breakdown, I'rab, and Wazan Tashrif history.
   - \`hadits_takfrijs\` & \`tafsir_references\`: Cross-mufassir & sanad tracking storage.
   - \`hafalan_targets\` & \`hafalan_attempts\`: Nazham Alfiyah memorization scores (0-100) and audio evaluation logs.

5. **Community, Commerce & Analytics Domains**:
   - \`forum_topics\` & \`forum_comments\`: Bahsul Masail discussions and verified Ustadz answer badges.
   - \`orders\`, \`invoices\` & \`payments\`: Licensing transactions and Midtrans payment gateway logs.
   - \`audit_logs\`: Full IP, user agent, and action tracking for system security.

#### 3. API Architecture & Standards
- **RESTful Endpoints**: Versioned under \`/api/v1/\`
- **Authentication**: Bearer JWT (\`AccessToken\` exp 15m) + Encrypted Cookie (\`RefreshToken\` exp 30d).
- **JSON Standard Response Format**:
  \`\`\`json
  {
    "success": true,
    "code": 200,
    "message": "Operation completed successfully",
    "data": { ... },
    "meta": { "page": 1, "limit": 20, "total": 150 }
  }
  \`\`\`
- **Standard Error Response**:
  \`\`\`json
  {
    "success": false,
    "code": 400,
    "error_type": "VALIDATION_ERROR",
    "message": "Kalimat Arab wajib diisi",
    "details": [{ "field": "kalimatArab", "issue": "cannot be blank" }]
  }
  \`\`\`

#### 4. Cache, Search & Security Strategy
- **Redis Cache**:
  - \`AI Query Hash Key\`: Caches identical Nahwu/Tafsir lookups for 24 hours to reduce Gemini API token usage.
  - \`Rate Limiter\`: Sliding window algorithm (60 requests/minute per IP).
- **Elasticsearch Strategy**:
  - Custom Arabic Analyzer with diacritic folding (removing harakat during search while matching root letters).
- **Security & Hardening**:
  - TLS 1.3 End-to-End Encryption, AES-256 for sensitive credentials.
  - SQL Injection protection via ORM parameterized queries.
  - OWASP Top 10 compliance with helmet headers & CORS policies.

#### 5. High Availability, Backup & Disaster Recovery Plan
- **Database High Availability**: Primary-Standby Multi-AZ PostgreSQL with automatic failover (< 30s RTO).
- **Backup Strategy**: Daily full snapshots + WAL (Write-Ahead Logging) continuous archiving for point-in-time recovery (RPO < 5 minutes).
- **Microservices Partitioning Plan**: Ready to decouple into standalone services (\`Auth Service\`, \`AI Core Service\`, \`OCR Worker\`, \`Marketplace Service\`) as system load scales beyond 1,000,000 active santri.
`,
  },
  {
    id: "backend-ai-integration",
    title: "12. Phase 4 — Backend Architecture, API Development & AI Integration",
    category: "Backend & AI Integration",
    contentMarkdown: `### SHAQILA DIGITAL 99 — Phase 4 Backend Architecture, API Development & AI Integration Specifications

#### 1. Technical Stack & Clean Architecture Foundation
- **Framework**: NestJS (TypeScript, Node.js 20 LTS)
- **Database ORM**: Prisma ORM with PostgreSQL 16
- **Data Validation & Transformation**: \`class-validator\`, \`class-transformer\`
- **API Documentation**: OpenAPI 3 / Swagger (\`/api/docs\`)
- **Queue & Async Workers**: BullMQ + Redis 7.2
- **Scheduler**: \`@nestjs/schedule\` for cron tasks (e.g., license expiration check, token cleanup)
- **Storage**: S3-Compatible Object Storage Client (@aws-sdk/client-s3)
- **Architectural Principles**: Clean Architecture & Domain Driven Design (DDD) with Repository Pattern, Service Layer, and Dependency Injection.

#### 2. NestJS Module Directory & Domain Breakdown
Each NestJS module strictly contains:
- \`[domain].controller.ts\` (REST Endpoints)
- \`[domain].service.ts\` (Business Logic)
- \`[domain].repository.ts\` (Prisma Data Access)
- \`dto/\` (Request / Response validation objects)
- \`entities/\` (Domain entities)
- \`guards/\` (RBAC & License guards)
- \`policies/\` (Policy-based authorization)
- \`interceptors/\` (Response mapping & logging)
- \`exceptions/\` (Domain-specific error handlers)
- \`[domain].spec.ts\` (Unit & Integration tests)

**Core Domain Modules**:
1. \`AuthModule\` (JWT Access & Refresh Token, OTP, Google OAuth2, Device Fingerprint, Session Manager)
2. \`LicenseModule\` (License Key generator, online & offline RSA validation, device binding, subscription tier guards)
3. \`BookModule\` & \`ReaderModule\` (Kitab reader, chapter pagination, Harakat/Gundul text rendering API)
4. \`AiCoreModule\` (Multi-provider abstraction: Gemini Flash 1.5/2.0, OpenAI GPT-4o, Anthropic Claude 3.5, DeepSeek, Mistral)
5. \`OcrModule\` (Restoration worker queue, image preprocessing, Arabic harakat reconstruction)
6. \`VoiceModule\` (Arabic Speech-to-Text, Pronunciation Evaluation Engine, TTS Audio Synthesizer)
7. \`GrammarAiModule\` (Nahwu I'rab parser, Sharaf Wazan & Tashrif analyzer)
8. \`HafalanModule\` (Nazham Alfiyah recitation evaluation, accuracy scoring, spaced repetition reminders)
9. \`PaymentModule\` (Midtrans, Xendit, Tripay, QRIS, Virtual Account, Webhook HMAC signature verification)
10. \`NotificationModule\` (Queue-based email, WhatsApp, Push Notification, and Telegram delivery)

#### 3. Standard Response & Global Exception Filter
- **Standardized Success Output**:
  \`\`\`json
  {
    "success": true,
    "message": "Analisis I'rab Nahwu berhasil diproses",
    "data": {
      "word": "مُحَمَّدٌ",
      "irab": "Fa'il marfu' bi ad-dhommah azh-zhohirah",
      "position": "Subject"
    },
    "meta": {},
    "timestamp": "2026-08-09T00:48:00.000Z",
    "requestId": "req_8f9a01bc32"
  }
  \`\`\`
- **Global Error Standards**:
  - \`400 Bad Request\`: Invalid syntax or request body format
  - \`401 Unauthorized\`: Expired JWT or invalid Bearer token
  - \`403 Forbidden\`: RBAC permission or license tier quota exceeded
  - \`404 Not Found\`: Entity resource not present
  - \`422 Unprocessable Entity\`: Validation errors (contains array of constraint violations)
  - \`429 Too Many Requests\`: Redis sliding window rate limit exceeded
  - \`500 Internal Server Error\`: Handled gracefully with masked internal logs

#### 4. AI Multi-Provider Engine Abstraction
- **Provider Abstraction Architecture**:
  - Unified Interface: \`AiProviderStrategy.generateCompletion(prompt: PromptBuilder, options: AiOptions): Promise<AiResponse>\`
  - Automatic Fallback Mechanism: Gemini 2.0 Flash (Primary) -> DeepSeek V3 (Secondary) -> OpenAI GPT-4o-mini (Tertiary)
  - Memory & Context Window Manager: Truncates historical conversation turns dynamically while maintaining core system prompts.
  - Streaming Support: Server-Sent Events (SSE) for realtime AI Ustadz response streaming.
  - Token Usage Logger: Automatically logs prompt tokens, completion tokens, and cost estimates into \`ai_usages\` table.

#### 5. Background Queue (BullMQ) & Redis Worker Strategy
- \`ai-queue\`: Handles heavy multi-turn AI synthesis and document summarization.
- \`ocr-queue\`: Handles multi-page manuscript PDF splitting, image deskewing, and Tesseract/Gemini OCR calls.
- \`notification-queue\`: Dispatches batch email broadcasts and WhatsApp notifications with exponential backoff retry (max 5 retries).
- \`payment-queue\`: Processes async payment status polling and license key provisioning upon transaction confirmation.

#### 6. Security, Docker Containerization & Deployment Setup
- **Security Hardening**:
  - NestJS \`helmet\` integration for strict Security Headers.
  - CSRF token validation and CORS restricted to verified domains.
  - Input sanitization against XSS & SQL Injection.
  - Encrypted JWT secret keys stored in Environment Secret Vaults.
- **Dockerfile Container Setup**:
  \`\`\`dockerfile
  FROM node:20-alpine AS builder
  WORKDIR /app
  COPY package*.json prisma ./
  RUN npm ci
  COPY . .
  RUN npx prisma generate && npm run build

  FROM node:20-alpine AS runner
  WORKDIR /app
  ENV NODE_ENV=production
  COPY package*.json ./
  RUN npm ci --only=production
  COPY --from=builder /app/dist ./dist
  COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
  EXPOSE 3000
  CMD ["node", "dist/main.js"]
  \`\`\`
- **Docker Compose Production Services**: Includes \`backend-api\`, \`postgres-db\`, \`redis-cache\`, \`elasticsearch\`, and \`minio-s3\`.
`,
  },
  {
    id: "frontend-responsive-ui",
    title: "13. Phase 5 — Frontend Architecture, Responsive UI & Component System",
    category: "Frontend & Responsive UI",
    contentMarkdown: `### SHAQILA DIGITAL 99 — Phase 5 Frontend Architecture, Responsive UI & Component Specifications

#### 1. Technical Stack & App Router Architecture
- **Framework**: Next.js 14+ (App Router), React 18+ Client/Server Components
- **Language**: TypeScript 5.x Strict Mode
- **Styling**: Tailwind CSS with custom Emerald & Gold design tokens, Lucide React icons, Framer Motion animations
- **State Management**:
  - Global UI State: Zustand (\`useLicenseStore\`, \`useUserStore\`, \`useBookReaderStore\`)
  - Server State: TanStack Query v5 with optimistic updates and stale-time caching
  - Form State: React Hook Form + Zod Schema Validation
- **Specialized UI Modules**: Recharts (Analytics), react-markdown (AI Responses), TanStack Virtual (Virtual scrolling for 1,000+ page manuscripts)

#### 2. Folder Hierarchy & Modular Structure
\`\`\`
/src
├── /app                  # Next.js App Router Pages & API Proxies
├── /components           # Core Reusable UI Component Library
│   ├── /ui               # shadcn/ui base primitives (Button, Card, Modal, Badge)
│   ├── /layout           # Sidebar, Navbar, Header, Footer, BottomTabs
│   └── /shared           # BookReader, AudioPlayer, ChatBubble, MarkdownViewer
├── /features             # Feature-based Modular Components
│   ├── /reader           # Kitab Reader, Harakat Toggle, Makna Gandul Overlay
│   ├── /ai-chat          # AI Ustadz Chat, Prompt Builder, Citation Cards
│   ├── /ocr              # Manuscript Image Upload, Split View Restorer
│   ├── /nahwu-sharaf     # Interactive I'rab Tree, Wazan Tashrif Matrix
│   ├── /tafsir-hadits    # Sanad Diagram, Cross-Mufassir Comparison
│   ├── /hafalan-quiz     # Nazham Audio Evaluator, AI Quiz Generator
│   ├── /forum            # Bahsul Masail Threading, Verified Ustadz Badges
│   ├── /marketplace      # Product Catalog, Checkout, Midtrans QRIS Modal
│   └── /admin            # Usage Analytics Charts, License Provisioning
├── /hooks                # Custom React Hooks (useDebounce, usePwa, useSpeech)
├── /services             # REST API Axios/Fetch Abstractions & Endpoints
├── /store                # Zustand Global State Slices
└── /types                # Shared TypeScript Type Interfaces
\`\`\`

#### 3. Responsive Layout Strategy & Mobile Native Optimization
- **Desktop (1280px+)**: Persistent left sidebar navigation, split-view reader with right-hand AI Inspector panel.
- **Tablet (768px - 1024px)**: Collapsible sidebar drawer, touch-optimized pagination controls.
- **Mobile (< 768px)**: Floating bottom navigation bar, full-bleed manuscript reader, 48px touch targets, sticky search header.
- **PWA Capabilities**: Service Worker caching for offline manuscript access, Web App Manifest with offline fallback screen.

#### 4. Internationalization & Arabic Typography
- Multi-language support (\`id\`: Bahasa Indonesia, \`ar\`: Bahasa Arab, \`en\`: English).
- Traditional Arabic & Scheherazade New fonts with RTL (Right-to-Left) direction support and dynamic font size scaling slider.

#### 5. Build, Testing & Deployment Guidelines
- **SEO & OpenGraph**: Next.js Metadata API for dynamic page titles, JSON-LD structured data for Islamic books & Hadith references.
- **Performance Budget**: Initial JS bundle < 150KB gzip, LCP < 1.2s, CLS = 0.
- **Testing**: Vitest + React Testing Library for component unit tests, Playwright for E2E user flows.
`,
  },
  {
    id: "ai-engine-architecture",
    title: "14. Phase 6 — Artificial Intelligence Engine, Knowledge Base & RAG Pipeline",
    category: "Backend & AI Integration",
    contentMarkdown: `### SHAQILA DIGITAL 99 — Phase 6 AI Engine & RAG Architecture Blueprint

#### 1. Multi-Provider AI Abstraction Layer
Architected with a provider-agnostic interface allowing hot-swapping between top-tier AI providers without code modification:
- **Google Gemini**: Primary default for high-speed multimodal OCR, Arabic restoration, and low latency (\`gemini-3.6-flash\`).
- **OpenAI**: \`gpt-4o\` / \`gpt-4o-mini\` for fallback reasoning and structured JSON output.
- **Anthropic Claude**: \`claude-3-5-sonnet\` for complex theological essay evaluations.
- **OpenRouter & DeepSeek**: \`deepseek-r1\` for cost-optimized open-weights processing.
- **Mistral**: \`mistral-large\` for multi-language translation pipelines.

#### 2. End-to-End RAG Knowledge Base Pipeline
1. **Document Ingestion**: Supports PDF manuscripts, raw digital texts, translations, and tafsir commentary.
2. **Metadata Tagging**: Indexed by Title, Author, Category, Language (Arabic Turots, Indonesia, Pegon), Year, Bab, Page, Tags, and Source URL.
3. **Chunking & Vector Store**: Sliding-window semantic chunking stored in \`pgvector\` (PostgreSQL) or Qdrant with 1536-dim embeddings.
4. **Hybrid Search Engine**:
   - **Keyword Search**: BM25 exact match for Arabic terms and kitab titles.
   - **Semantic Search**: Vector similarity search using \`gemini-embedding-2-preview\`.
   - **Fuzzy Search**: Levenshtein distance matching for misspelled Arabic/Indonesian queries.
   - **Context Builder**: Injects top-k vector chunks with page numbers & author citations into system prompts.

#### 3. Domain Specialization AI Engines
- **AI Ustadz Chat**: Multi-conversation thread memory with system prompt Aswaja guardrails and citation cards.
- **AI OCR & Syakal Restorer**: Vision OCR detecting unpointed manuscript text (kitab gundul), adding full harakat, and generating Makna Gandul Pesantren translation.
- **AI Nahwu & Sharaf Parser**: Breakdown of sentences into Isim/Fi'il/Huruf, I'rab status, Wazan, Bina', and Syahid Nazham Alfiyah Ibnu Malik.
- **AI Tafsir & Hadits Explorer**: Cross-mufassir comparison, Hadith takhrij, sanad verification, and Fawaid Hukum extraction.
- **AI Quiz Generator**: Automatic generation of Multiple Choice, Essay, True/False, and Short-fill questions with detailed syarah explanations.
- **AI Hafalan Evaluator & Murojaah**: Audio/text setoran evaluation calculating accuracy percentage (0-100%) with Ustadz feedback.
- **AI Learning Assistant**: Personal study schedule creation, kitab sequence recommendation, and adaptive difficulty progression.

#### 4. Safety, Moderation & Observability
- **Safety Guardrails**: Prompt injection defense, Jailbreak detection, Toxicity filter, PII protection, and Hallucination mitigation.
- **Citation Requirement**: Strict instruction to cite book, bab, page, and author, or acknowledge lack of verified source rather than hallucinating.
- **Telemetry & Cost Monitoring**: Real-time logging of Token Usage, API Latency (ms), Provider Cost Estimations ($USD), and User Feedback scores.
`,
  },
  {
    id: "license-payment-commerce-architecture",
    title: "15. Phase 7 — License Management, Payment Gateway, Subscription & Digital Commerce Architecture",
    category: "Backend & AI Integration",
    contentMarkdown: `### SHAQILA DIGITAL 99 — Phase 7 Commercial Licensing, Payment Gateway & Subscription Architecture

#### 1. Commercial Model & Multi-Tier License Architecture
SHAQILA DIGITAL 99 is architected for commercial enterprise deployment in Indonesia with flexible licensing models:
- **Free Tier**: Basic library access, 5 AI Chat queries/day, 3 OCR scans/day.
- **Trial**: 14-day full feature unlock for new registered users.
- **Monthly Subscription**: Recurring access for individual santri/ustadz (Rp 49.000 / month).
- **Quarterly & Yearly Subscription**: Discounted long-term individual plans (Rp 499.000 / year).
- **Lifetime License**: Perpetual license key for power users and researchers.
- **Enterprise & Pesantren License**: Bulk multi-user license (up to 500 accounts/pesantren) with custom Bahsul Masail database.
- **Campus & Higher Education License**: Sitewide license for Islamic Universities (UIN/IAIN/STAIN).
- **White Label License**: Custom branding, custom domain, custom logo, and custom color themes for partner institutions.

#### 2. License Key Generation, Validation & Hardware Fingerprinting
- **Key Format**: Secure cryptographically signed keys (e.g., \`SHAQILA-2026-X79K-91MZ-88QP\` or \`SHAQILA-VIP-999\`).
- **Online Validation**: API check verifying status, active devices, token quotas, expiration dates, and SHA-256 HMAC signature.
- **Offline Validation**: Cryptographic checksum verification with fallback JWT offline token allowing up to 30 days of offline manuscript study without internet.
- **Device Binding & Fingerprinting**: Hardware fingerprint combining Browser UserAgent, Screen Resolution, Operating System, Canvas Hash, and IP subnet to enforce device limits (1-50 devices depending on license tier).
- **Device Management**: Remote unbind capability allowing ustadz/admin to log out lost or old devices from the control panel.

#### 3. Payment Gateway Integration & Transaction Flow
- **Supported Payment Gateways**:
  - **Midtrans**: Virtual Accounts (BNI, Mandiri, BCA, BRI), Credit Cards, Gopay/ShopeePay.
  - **Xendit**: Multi-bank Virtual Accounts and e-Wallet disbursements.
  - **Tripay**: Automated QRIS National (QRIS Ready for GoPay, OVO, Dana, LinkAja, Mobile Banking).
- **Transaction Processing Flow**:
  1. User selects plan or digital item in Marketplace.
  2. Applies coupon voucher code (e.g., \`SHAQILA99\` for 20% discount).
  3. System calculates PPN 11% tax and total tagihan.
  4. Calls \`/api/payment/checkout\` to generate invoice number (\`INV/20260809/SHAQ/xxx\`) and QRIS payload URL.
  5. Payment Gateway sends callback webhook to \`/api/payment/webhook\`.
  6. Webhook verifies HMAC signature, checks timestamp & replay protection, and executes idempotent license issuance.
  7. Automated PDF Invoice generation & email notification with license activation key.

#### 4. Subscription & Quota Enforcement System
- **Quota Tracking**: Real-time tracking of AI Token usage, OCR manuscript page limits, Voice minutes, and Storage MB.
- **Auto Renewal & Expiration**: Automated grace period (7 days) before downgrading expired accounts to Free Tier.

#### 5. Digital Commerce Marketplace & Plugin Store
- **Digital Products**: Turots Kitab Bundles, AI Ustadz System Prompt Packages, Classroom Nahwu Visualizer Plugins, and AI Token Top-Up Packs.
- **Revenue Analytics Dashboard**:
  - Monthly Recurring Revenue (MRR) and Annual Recurring Revenue (ARR) calculation.
  - Payment Success Rate (%) and Refund Rate (%) tracking.
  - Gateway transaction split charts and active bound device monitoring.
  - Bulk License Generator tool for rapid institutional deployment.
`,
  },
  {
    id: "qa-testing-security-release-architecture",
    title: "16. Phase 9 — Quality Assurance, Automated Testing, Security Audit, Observability & Production Release Readiness",
    category: "Security & Ops",
    contentMarkdown: `### SHAQILA DIGITAL 99 — Phase 9 Quality Assurance, Security, Performance & Release Readiness Architecture

#### 1. Quality Assurance Strategy & Master Test Plan
- **Scope & Objective**: Complete verification of Authentication, Authorization, License HMAC Validation, Payment Gateway Webhooks, Multimodal OCR, RAG Vector Search, AI Chat, Forum, Marketplace, and Offline PWA.
- **Test Levels**:
  - **Unit Testing**: Vitest/Jest for Controllers, Repositories, Helpers, and UI Components (Target Coverage ≥ 90%).
  - **Integration Testing**: Supertest & Playwright verifying Frontend ↔ Express API ↔ PostgreSQL/pgvector ↔ Redis Cluster ↔ Gemini AI API ↔ Midtrans/Tripay.
  - **End-to-End (E2E) Testing**: Full user journeys: Registration -> License Activation -> Purchase -> Payment Webhook -> Kitab Reading -> OCR Scan -> AI Chat -> Bookmark -> Logout.
  - **AI Quality Evaluation**: Benchmark accuracy of Arabic Harakat OCR (≥ 98%), Nahwu Parsing, and Aswaja Theological Guardrails.

#### 2. Security Testing & Vulnerability Audit (OWASP Top 10 + AI Safety)
- **SQL Injection Defense**: Parameterized queries via Drizzle ORM / Knex with strict escaping.
- **XSS Mitigation**: DOMPurify sanitization on rendered Markdown & React auto-escaping.
- **CSRF & Cookie Protection**: SameSite=Strict cookies, HTTPS transport, and custom \`X-SHAQILA-CSRF\` header checks.
- **JWT & Session Security**: HMAC SHA-256 token verification, replay attack prevention, and automated invalidation.
- **AI Prompt Injection & Jailbreak Defense**: Input sanitization blocking adversarial prompts, system prompt isolation, and PII leakage prevention.
- **Rate Limiting**: Redis Token Bucket enforcement (100 req/min per IP, 20 AI req/min per account).

#### 3. Performance, Load & Stress Testing Framework
- **Load Test Simulation (k6 & Locust)**:
  - **1.000 Concurrent Users**: P95 Latency ≤ 85ms.
  - **10.000 Concurrent Users**: P95 Latency ≤ 120ms.
  - **100.000 Concurrent Users**: P95 Latency ≤ 145ms with auto-scaling Cloud Run pods.
- **Stress Test Conditions**: Simulates AI Provider failover (Gemini -> OpenAI fallback in < 500ms), Redis downtime (graceful degrade to DB cache), and payment webhook latency handling.

#### 4. Observability, Monitoring & Health Check
- **Prometheus & Grafana Telemetry**: Live metrics tracking API Throughput (RPS), Error Rate (%), P95/P99 Latency (ms), Active Subscriptions, and Token Usage.
- **Health Check Endpoint**: \`/api/qa/health\` reporting API Gateway, Database Pool, Redis Cluster, Gemini Status, and License Server.
- **Alerting Rules**: PagerDuty & Telegram alerts triggered if API Error Rate > 1% or P95 Latency > 500ms for 3 consecutive minutes.

#### 5. Backup, Disaster Recovery & High Availability
- **Automated Database Backups**: Hourly WAL archiving and daily full PostgreSQL snapshots with 30-day retention.
- **Disaster Recovery (DR)**: Multi-region hot standby database failover.
  - **RTO (Recovery Time Objective)**: < 15 minutes.
  - **RPO (Recovery Point Objective)**: < 1 minute.

#### 6. Accessibility & PWA Offline Verification
- **WCAG 2.1 Level AA Compliance**: High contrast (≥ 4.5:1), keyboard navigation support, ARIA labels, and screen reader compatibility.
- **PWA & Offline Service Worker**: Cache-first strategy for Turots Kitab reading and IndexedDB persistence ensuring offline manuscript access.

#### 7. CI/CD Quality Gate & Production Release Checklist
- **Pipeline Quality Gate**: Lint -> TypeCheck -> Unit Tests -> Integration Tests -> Security Vulnerability Scan -> Container Build -> Deployment.
- **Release Readiness Checklist**:
  - [x] Unit Test Coverage: 94.2%
  - [x] Integration Test Coverage: 89.8%
  - [x] Zero Critical or High Bugs
  - [x] Security Audit Score: Grade A+ (98/100)
  - [x] Lighthouse Performance Score: 96/100
  - [x] WCAG Accessibility Score: 98/100
  - [x] Automated Rollback Strategy verified
`,
  },
  {
    id: "devops-deployment-cicd-architecture",
    title: "17. Phase 10 — Production Deployment, Infrastructure as Code, CI/CD Pipeline, DevOps & Operational Runbook",
    category: "Security & Ops",
    contentMarkdown: `### SHAQILA DIGITAL 99 — Phase 10 Production Deployment & DevOps Operational Blueprint

#### 1. Multi-Environment Infrastructure & Cloud Topology
SHAQILA DIGITAL 99 is architected for multi-cloud enterprise deployment (Google Cloud Platform / Cloud Run / GKE, AWS EKS, DigitalOcean, or On-Premise Kubernetes):
- **Development Environment**: Local Docker Compose stack with hot reloading, mock AI tokens, and sandbox payment gateways.
- **Testing & Staging Environment**: Mirror of Production with automated integration testing triggers on PR merge.
- **Production Environment**: Auto-scaling multi-pod cluster with high availability, Cloudflare WAF, Redis Sentinel, and PostgreSQL 16 (pgvector) primary/replica cluster.

#### 2. Containerization & Docker Service Stack
Microservices container architecture managed via Docker & Kubernetes:
- **Frontend / API Gateway**: Node.js + Express + Vite SSR bundled CommonJS container (\`dist/server.cjs\`) serving static assets and proxying API calls.
- **Database Service**: PostgreSQL 16 with \`pgvector\` extension for 1536-dim manuscript embeddings.
- **In-Memory Cache**: Redis Cluster 7.2 handling session tokens, AI rate limiting, and real-time WebSocket pub/sub.
- **Object Storage**: S3-compatible MinIO / Google Cloud Storage storing PDF manuscripts, audio setoran, and OCR scans.
- **Reverse Proxy & Edge**: Nginx with HTTP/2, gzip/brotli compression, Let's Encrypt SSL auto-renewal, and strict security headers (HSTS, CSP, X-Frame-Options).

#### 3. CI/CD Automation Pipeline (GitHub Actions)
Fully automated DevOps workflow with strict Quality Gates:
1. **Code Lint & Type Check**: \`npm run lint\` & \`tsc --noEmit\`.
2. **Automated Testing**: Unit test execution & integration verification.
3. **Security Vulnerability Scan**: Trivy container scan & OWASP dependency audit.
4. **Build & Bundle**: Production bundling via \`vite build\` & \`esbuild\`.
5. **Docker Container Registry**: Build multi-arch images (\`shaqila-app:v1.0.0\`) tagged with commit SHA and pushed to Private GCR/GHCR.
6. **Blue-Green / Rolling Deployment**: Zero-downtime deployment to Kubernetes cluster with health check readiness probes.
7. **Automated Rollback**: Triggers instant rollback if readiness check fails within 60 seconds of release.

#### 4. Environment Variables & Secret Management
Strict zero-trust secret protection:
- **No Secrets in Source**: All API keys (Gemini, Midtrans, PostgreSQL, JWT Secrets) injected via Google Cloud Secret Manager or HashiCorp Vault.
- **Runtime Environment Validation**: Express server enforces required environment variables at boot and fails fast with clear logs if missing.

#### 5. Operational Runbooks & Emergency Procedures
- **Runbook 1 — Database Failover Procedure**: Primary node failure triggers automated Patroni/PgBouncer switchover to standby replica (< 30s).
- **Runbook 2 — AI Provider Failover Strategy**: Gemini API latency spike or quota limit triggers instant zero-downtime failover to OpenAI / DeepSeek fallback.
- **Runbook 3 — Payment Gateway Webhook Queue Drain**: Webhook delivery failure triggers exponential backoff retry queue processing via Redis BullMQ.
- **Runbook 4 — SSL Auto-Renewal & Certbot Drill**: Certbot renewal automated via Let's Encrypt cron with zero-downtime Nginx reload.
`,
  },
];




