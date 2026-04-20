// Owner labels for delegation:
//  eimantas      — core integrator (critical path, architecture, DB, RAG, LLM)
//  external-n8n  — n8n / automation contractor (e.g. Ukrainian candidate)
//  external-dev  — frontend / UI contractor
//  igoris        — strategy, content, prompts, QA criteria, Nevo
//  mantas        — coordination, delivery SOPs, handoff templates
//  team          — validation / UAT
const OWNER_META = {
  'eimantas':     { label: 'Eimantas',     color: '#3b82f6', short: 'E' },
  'external-n8n': { label: 'External n8n', color: '#0f766e', short: 'N8N' },
  'external-dev': { label: 'External Dev', color: '#0891b2', short: 'DEV' },
  'igoris':       { label: 'Igoris',       color: '#7c3aed', short: 'I' },
  'mantas':       { label: 'Mantas',       color: '#ea580c', short: 'M' },
  'team':         { label: 'Komanda',      color: '#16a34a', short: 'T' },
};

const INITIAL_TASKS = [
  // ═══════════════════════════════════════════════════════════════
  // SPRINT 1 — Duomenų Pamatas + Next.js Karkasas (~72h)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 't-1-1', slideId: 'slide-3', title: 'Next.js + Prisma karkasas (DIPA OS)',
    status: 'pending', sprint: '1', owner: 'eimantas', hours: 20,
    subtasks: [
      { id: 'st-1-1-1', title: 'Next.js 14 init + TypeScript strict', status: 'pending', owner: 'eimantas', hours: 2 },
      { id: 'st-1-1-2', title: 'Tailwind CSS + Shadcn/UI konfigūracija', status: 'pending', owner: 'eimantas', hours: 2 },
      { id: 'st-1-1-3', title: 'Prisma schema + PostgreSQL + seed scriptas', status: 'pending', owner: 'eimantas', hours: 4 },
      { id: 'st-1-1-4', title: 'NextAuth autentifikacijos sluoksnis', status: 'pending', owner: 'eimantas', hours: 4 },
      { id: 'st-1-1-5', title: 'Docker Compose dev aplinka (Next + PG + n8n)', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-1-1-6', title: 'CI/CD: GitHub Actions → Cloud Run', status: 'pending', owner: 'eimantas', hours: 5 },
    ],
  },
  {
    id: 't-1-2', slideId: 'slide-3', title: 'Monday.com + Clockify per n8n',
    status: 'pending', sprint: '1', owner: 'external-n8n', hours: 13,
    subtasks: [
      { id: 'st-1-2-1', title: 'Monday.com API + webhook registracija', status: 'pending', owner: 'external-n8n', hours: 4 },
      { id: 'st-1-2-2', title: 'n8n webhook receiver (item changes)', status: 'pending', owner: 'external-n8n', hours: 3 },
      { id: 'st-1-2-3', title: 'Clockify API n8n workflow', status: 'pending', owner: 'external-n8n', hours: 3 },
      { id: 'st-1-2-4', title: 'Duomenų sinchronizacija į PostgreSQL', status: 'pending', owner: 'external-n8n', hours: 3 },
    ],
  },
  {
    id: 't-1-3', slideId: 'slide-4', title: 'Facebook + LinkedIn Ads API',
    status: 'pending', sprint: '1', owner: 'external-n8n', hours: 10,
    subtasks: [
      { id: 'st-1-3-1', title: 'Facebook Graph API n8n workflow', status: 'pending', owner: 'external-n8n', hours: 4 },
      { id: 'st-1-3-2', title: 'LinkedIn Ads API n8n workflow', status: 'pending', owner: 'external-n8n', hours: 4 },
      { id: 'st-1-3-3', title: 'Naktinis cron (00:01) + retry logika', status: 'pending', owner: 'external-n8n', hours: 2 },
    ],
  },
  {
    id: 't-1-4', slideId: 'slide-4', title: 'Infrastruktūros kaštų forma',
    status: 'pending', sprint: '1', owner: 'eimantas', hours: 6,
    subtasks: [
      { id: 'st-1-4-1', title: 'UI forma kaštams suvesti', status: 'pending', owner: 'eimantas', hours: 2 },
      { id: 'st-1-4-2', title: 'FinancialMetric CRUD API', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-1-4-3', title: 'Seed data + pradinė migracija', status: 'pending', owner: 'eimantas', hours: 1 },
    ],
  },
  {
    id: 't-1-5', slideId: 'slide-13', title: 'Monday laukų žemėlapis vs DIPA GATE',
    status: 'pending', sprint: '1', owner: 'mantas', hours: 7,
    subtasks: [
      { id: 'st-1-5-1', title: 'Audituoti esamus Monday stulpelius', status: 'pending', owner: 'mantas', hours: 2 },
      { id: 'st-1-5-2', title: 'Priskirti GATE laukus etapams', status: 'pending', owner: 'mantas', hours: 3 },
      { id: 'st-1-5-3', title: 'Pasiūlyti naujus laukus + validacijos', status: 'pending', owner: 'mantas', hours: 2 },
    ],
  },
  {
    id: 't-1-6', slideId: 'slide-7', title: 'ICP / Lead scoring kriterijai (A/B/C/D)',
    status: 'pending', sprint: '1', owner: 'igoris', hours: 6,
    subtasks: [
      { id: 'st-1-6-1', title: 'ICP kriterijų dokumentas', status: 'pending', owner: 'igoris', hours: 3 },
      { id: 'st-1-6-2', title: 'A/B/C/D slenksčiai ir veiksmai', status: 'pending', owner: 'igoris', hours: 2 },
      { id: 'st-1-6-3', title: 'Review su komanda', status: 'pending', owner: 'igoris', hours: 1 },
    ],
  },
  {
    id: 't-1-7', slideId: 'slide-8', title: 'UI Design System + Sales Cockpit maketas',
    status: 'pending', sprint: '1', owner: 'external-dev', hours: 10,
    subtasks: [
      { id: 'st-1-7-1', title: 'Figma dizaino tokenai + Shadcn theme override', status: 'pending', owner: 'external-dev', hours: 3 },
      { id: 'st-1-7-2', title: 'Sales Cockpit layout + Focus Mode', status: 'pending', owner: 'external-dev', hours: 4 },
      { id: 'st-1-7-3', title: '1-Click Actions komponentai', status: 'pending', owner: 'external-dev', hours: 3 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SPRINT 2 — AI QA + Newo + RAG (~91h)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 't-2-1', slideId: 'slide-5', title: 'Plaud audio → Whisper pipeline',
    status: 'pending', sprint: '2', owner: 'eimantas', hours: 9,
    subtasks: [
      { id: 'st-2-1-1', title: 'Audio upload endpoint (Next.js API route)', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-2-1-2', title: 'Whisper API integracija per n8n', status: 'pending', owner: 'eimantas', hours: 4 },
      { id: 'st-2-1-3', title: 'Webhook triggeris + failų saugojimas', status: 'pending', owner: 'eimantas', hours: 2 },
    ],
  },
  {
    id: 't-2-2', slideId: 'slide-5', title: 'LLM QA Scorecard promptai ir validacija',
    status: 'pending', sprint: '2', owner: 'eimantas', hours: 15,
    subtasks: [
      { id: 'st-2-2-1', title: 'QA System prompt (BANT + skausmas + prieštaravimai)', status: 'pending', owner: 'igoris', hours: 4 },
      { id: 'st-2-2-2', title: 'Zod schema JSON output validacijai', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-2-2-3', title: 'Prompt iteracijos ir A/B su realiais skambučiais', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-2-2-4', title: 'QA Dashboard komponentas Next.js', status: 'pending', owner: 'eimantas', hours: 5 },
    ],
  },
  {
    id: 't-2-3', slideId: 'slide-6', title: 'Newo API — C lygio leadų automatizacija',
    status: 'pending', sprint: '2', owner: 'external-n8n', hours: 13,
    subtasks: [
      { id: 'st-2-3-1', title: 'Newo API konfigūracija + auth', status: 'pending', owner: 'external-n8n', hours: 3 },
      { id: 'st-2-3-2', title: 'Outbound decision tree implementacija', status: 'pending', owner: 'external-n8n', hours: 4 },
      { id: 'st-2-3-3', title: 'Inbound atpažinimas per Monday.com', status: 'pending', owner: 'external-n8n', hours: 3 },
      { id: 'st-2-3-4', title: 'Transkriptų grąžinimo webhook endpoint', status: 'pending', owner: 'external-n8n', hours: 3 },
    ],
  },
  {
    id: 't-2-4', slideId: 'slide-6', title: 'Newo eskalacijos kelias + handoff',
    status: 'pending', sprint: '2', owner: 'external-n8n', hours: 10,
    subtasks: [
      { id: 'st-2-4-1', title: 'Sentiment analizės integracija į Newo', status: 'pending', owner: 'external-n8n', hours: 3 },
      { id: 'st-2-4-2', title: 'Live handoff logika (Newo → pardavėjas)', status: 'pending', owner: 'external-n8n', hours: 3 },
      { id: 'st-2-4-3', title: 'Monday.com Urgent Flag automatinis sukūrimas', status: 'pending', owner: 'external-n8n', hours: 2 },
      { id: 'st-2-4-4', title: 'UI notifikacija pardavėjui (toast + sound)', status: 'pending', owner: 'eimantas', hours: 2 },
    ],
  },
  {
    id: 't-2-5', slideId: 'slide-12', title: 'GDPR Compliance Layer',
    status: 'pending', sprint: '2', owner: 'eimantas', hours: 12,
    subtasks: [
      { id: 'st-2-5-1', title: 'ConsentLog DB modelis + API', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-2-5-2', title: 'Consent forma prieš skambučio įrašymą', status: 'pending', owner: 'eimantas', hours: 2 },
      { id: 'st-2-5-3', title: 'Data retention + auto-deletion politika', status: 'pending', owner: 'eimantas', hours: 2 },
      { id: 'st-2-5-4', title: 'Right-to-deletion workflow (n8n)', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-2-5-5', title: 'Consent check prieš RAG indeksavimą', status: 'pending', owner: 'eimantas', hours: 2 },
    ],
  },
  {
    id: 't-2-6', slideId: 'slide-7', title: 'WF5 Monday ↔ PostgreSQL Reconciliation',
    status: 'pending', sprint: '2', owner: 'external-n8n', hours: 8,
    subtasks: [
      { id: 'st-2-6-1', title: 'Naktinis cron workflow (02:00)', status: 'pending', owner: 'external-n8n', hours: 3 },
      { id: 'st-2-6-2', title: 'Monday vs PG palyginimo logika', status: 'pending', owner: 'external-n8n', hours: 3 },
      { id: 'st-2-6-3', title: 'Slack alert + reconciliation log', status: 'pending', owner: 'external-n8n', hours: 2 },
    ],
  },
  {
    id: 't-2-7', slideId: 'slide-3', title: 'Vertex AI RAG indeksas (3 sluoksniai)',
    status: 'pending', sprint: '2', owner: 'eimantas', hours: 13,
    subtasks: [
      { id: 'st-2-7-1', title: 'Vertex AI RAG projekto konfigūracija', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-2-7-2', title: 'Embedding pipeline (docs → vektoriai)', status: 'pending', owner: 'eimantas', hours: 5 },
      { id: 'st-2-7-3', title: 'A/B/C sluoksnių indeksavimas + metadata', status: 'pending', owner: 'eimantas', hours: 5 },
    ],
  },
  {
    id: 't-2-8', slideId: 'slide-3', title: 'RAG turinio surinkimas (Strategic Brain)',
    status: 'pending', sprint: '2', owner: 'igoris', hours: 6,
    subtasks: [
      { id: 'st-2-8-1', title: 'Išrinkti pagrindinius SOP dokumentus', status: 'pending', owner: 'igoris', hours: 2 },
      { id: 'st-2-8-2', title: 'Paruošti pardavimų patirtis (deals archyvas)', status: 'pending', owner: 'igoris', hours: 2 },
      { id: 'st-2-8-3', title: 'Sprendimų ir taisyklių katalogas', status: 'pending', owner: 'igoris', hours: 2 },
    ],
  },
  {
    id: 't-2-9', slideId: 'slide-7', title: 'Pre-Call Brief UI komponentas',
    status: 'pending', sprint: '2', owner: 'external-dev', hours: 5,
    subtasks: [
      { id: 'st-2-9-1', title: 'Brief card komponentas su sekcijomis', status: 'pending', owner: 'external-dev', hours: 3 },
      { id: 'st-2-9-2', title: 'Real-time refresh T−15 indicator', status: 'pending', owner: 'external-dev', hours: 2 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SPRINT 3 — Co-Pilot + Gilieji KPI (~84h)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 't-3-1', slideId: 'slide-10', title: 'Gilieji KPI indeksai (LVR, CAC, TTR, ROAS, Bottleneck)',
    status: 'pending', sprint: '3', owner: 'eimantas', hours: 18,
    subtasks: [
      { id: 'st-3-1-1', title: 'LVR (Lead Velocity Rate) skaičiavimas', status: 'pending', owner: 'eimantas', hours: 2 },
      { id: 'st-3-1-2', title: 'CAC ir ROAS automatinė matematika', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-3-1-3', title: 'TTR (Time-to-Revenue) sekimas', status: 'pending', owner: 'eimantas', hours: 2 },
      { id: 'st-3-1-4', title: 'Core Sales Efficiency Index (€/h)', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-3-1-5', title: 'Pipeline Conversion Rate pagal režimą', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-3-1-6', title: 'Bottleneck Index (Marijos kalendorius)', status: 'pending', owner: 'eimantas', hours: 2 },
      { id: 'st-3-1-7', title: 'Team Time Savings dashboard', status: 'pending', owner: 'eimantas', hours: 3 },
    ],
  },
  {
    id: 't-3-2', slideId: 'slide-3', title: 'DIPA Co-Pilot chatbot (Vertex AI)',
    status: 'pending', sprint: '3', owner: 'eimantas', hours: 17,
    subtasks: [
      { id: 'st-3-2-1', title: 'Vertex AI RAG prisijungimas', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-3-2-2', title: 'Chat langas Next.js dešinėje pusėje', status: 'pending', owner: 'eimantas', hours: 5 },
      { id: 'st-3-2-3', title: 'Kontekstinės užklausos + citavimo nuorodos', status: 'pending', owner: 'eimantas', hours: 5 },
      { id: 'st-3-2-4', title: 'Anomaly Detection alertai (Slack/Teams)', status: 'pending', owner: 'eimantas', hours: 4 },
    ],
  },
  {
    id: 't-3-3', slideId: 'slide-12', title: 'Penktadienio ataskaitų automatizacija',
    status: 'pending', sprint: '3', owner: 'external-n8n', hours: 7,
    subtasks: [
      { id: 'st-3-3-1', title: 'Ataskaitos šablonas (PDF/Markdown)', status: 'pending', owner: 'external-n8n', hours: 2 },
      { id: 'st-3-3-2', title: 'Cron triggeris (Pn 14:55)', status: 'pending', owner: 'external-n8n', hours: 2 },
      { id: 'st-3-3-3', title: 'Slack/Teams integracija', status: 'pending', owner: 'external-n8n', hours: 3 },
    ],
  },
  {
    id: 't-3-4', slideId: 'slide-7', title: 'Pre-Call Brief dviejų etapų generavimas',
    status: 'pending', sprint: '3', owner: 'external-n8n', hours: 9,
    subtasks: [
      { id: 'st-3-4-1', title: 'Naktinis cron: vakaro brief', status: 'pending', owner: 'external-n8n', hours: 3 },
      { id: 'st-3-4-2', title: 'Outlook event T−15 min triggeris', status: 'pending', owner: 'external-n8n', hours: 4 },
      { id: 'st-3-4-3', title: 'Slack + Dashboard atvaizdavimas', status: 'pending', owner: 'external-n8n', hours: 2 },
    ],
  },
  {
    id: 't-3-5', slideId: 'slide-12', title: 'Lead Scoring Feedback Loop',
    status: 'pending', sprint: '3', owner: 'eimantas', hours: 9,
    subtasks: [
      { id: 'st-3-5-1', title: 'ScoringFeedback DB modelis', status: 'pending', owner: 'eimantas', hours: 2 },
      { id: 'st-3-5-2', title: 'Won/Lost outcome → feedback pipeline', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-3-5-3', title: 'RAG scoring retrain logika', status: 'pending', owner: 'eimantas', hours: 4 },
    ],
  },
  {
    id: 't-3-6', slideId: 'slide-10', title: 'Customer Retention + Upsell metrikos',
    status: 'pending', sprint: '3', owner: 'external-dev', hours: 9,
    subtasks: [
      { id: 'st-3-6-1', title: 'CustomerHealth DB modelis', status: 'pending', owner: 'eimantas', hours: 2 },
      { id: 'st-3-6-2', title: 'NPS + Churn Risk dashboard', status: 'pending', owner: 'external-dev', hours: 4 },
      { id: 'st-3-6-3', title: 'Upsell pipeline sekimas', status: 'pending', owner: 'external-dev', hours: 3 },
    ],
  },
  {
    id: 't-3-7', slideId: 'slide-7', title: 'Anomaly Detection rules engine',
    status: 'pending', sprint: '3', owner: 'eimantas', hours: 8,
    subtasks: [
      { id: 'st-3-7-1', title: 'CAC spike detection (vs 4 sav. vidurkis)', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-3-7-2', title: 'Lead Bank / Win Rate &lt;50% alertai', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-3-7-3', title: 'Notifikacijų konfigūracija + routing', status: 'pending', owner: 'eimantas', hours: 2 },
    ],
  },
  {
    id: 't-3-8', slideId: 'slide-8', title: 'Command Center cause-effect UI (3→6→12)',
    status: 'pending', sprint: '3', owner: 'external-dev', hours: 7,
    subtasks: [
      { id: 'st-3-8-1', title: '3→6→12 vizualizacija (tree view)', status: 'pending', owner: 'external-dev', hours: 4 },
      { id: 'st-3-8-2', title: 'Drill-down modal su detalėmis', status: 'pending', owner: 'external-dev', hours: 3 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SPRINT 4+ — JTBD + Delivery Upsell + Nevo (backlog ~100h)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 't-4-1', slideId: 'slide-16', title: 'JTBD Asistentas — orchestrator + 7 sub-agentai',
    status: 'pending', sprint: '4', owner: 'eimantas', hours: 53,
    subtasks: [
      { id: 'st-4-1-1', title: 'Orchestrator agento skeleton + state machine', status: 'pending', owner: 'eimantas', hours: 8 },
      { id: 'st-4-1-2', title: 'A. Intake / Session Manager', status: 'pending', owner: 'eimantas', hours: 4 },
      { id: 'st-4-1-3', title: 'B. JTBD Strategist — promptai ir klausimyno logika', status: 'pending', owner: 'igoris', hours: 6 },
      { id: 'st-4-1-4', title: 'B. JTBD Strategist — implementacija', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-4-1-5', title: 'C. Competitive / Positioning — turinys', status: 'pending', owner: 'igoris', hours: 3 },
      { id: 'st-4-1-6', title: 'C. Competitive / Positioning — implementacija', status: 'pending', owner: 'eimantas', hours: 2 },
      { id: 'st-4-1-7', title: 'D. Website Analysis — 12 kriterijų + frameworkai (turinys)', status: 'pending', owner: 'igoris', hours: 4 },
      { id: 'st-4-1-8', title: 'D. Website Analysis — screenshot + URL apdorojimas', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-4-1-9', title: 'E. 90-Day Planner — generavimo logika', status: 'pending', owner: 'eimantas', hours: 5 },
      { id: 'st-4-1-10', title: 'E. 90-Day Planner — KPI ir etapavimo taisyklės', status: 'pending', owner: 'igoris', hours: 3 },
      { id: 'st-4-1-11', title: 'F. OPPM Mapper — field mapping + validacija', status: 'pending', owner: 'eimantas', hours: 5 },
      { id: 'st-4-1-12', title: 'G. Guardrail / Compliance (prompt leakage prevencija)', status: 'pending', owner: 'eimantas', hours: 3 },
      { id: 'st-4-1-13', title: '„Perkelti į OPPM" mygtukas + draft peržiūra', status: 'pending', owner: 'eimantas', hours: 4 },
      { id: 'st-4-1-14', title: 'Session + JTBD + 90-day + Website data modeliai', status: 'pending', owner: 'eimantas', hours: 3 },
    ],
  },
  {
    id: 't-4-2', slideId: 'slide-13', title: 'Delivery → Upsell dosjė + feedback loop',
    status: 'pending', sprint: '4', owner: 'mantas', hours: 17,
    subtasks: [
      { id: 'st-4-2-1', title: 'Delivery checklist + kickoff SOP', status: 'pending', owner: 'mantas', hours: 4 },
      { id: 'st-4-2-2', title: 'Handoff paketo šablonas (Won → Delivery)', status: 'pending', owner: 'mantas', hours: 3 },
      { id: 'st-4-2-3', title: 'CustomerHealth integracija su workshop duomenimis', status: 'pending', owner: 'eimantas', hours: 4 },
      { id: 'st-4-2-4', title: 'Upsell signalų aptikimo taisyklės (turinys)', status: 'pending', owner: 'igoris', hours: 3 },
      { id: 'st-4-2-5', title: 'Upsell signalų implementacija + pipeline', status: 'pending', owner: 'eimantas', hours: 3 },
    ],
  },
  {
    id: 't-4-3', slideId: 'slide-11', title: 'Proposal Assistant (backlog MVP)',
    status: 'pending', sprint: '4', owner: 'eimantas', hours: 12,
    subtasks: [
      { id: 'st-4-3-1', title: 'RAG-based pasiūlymo juodraštis', status: 'pending', owner: 'eimantas', hours: 8 },
      { id: 'st-4-3-2', title: 'E-sign (DocuSign) webhook → Monday', status: 'pending', owner: 'external-n8n', hours: 4 },
    ],
  },
  {
    id: 't-4-4', slideId: 'slide-15', title: 'Nevo integracija — pristatymas + hooks',
    status: 'pending', sprint: '4', owner: 'igoris', hours: 8,
    subtasks: [
      { id: 'st-4-4-1', title: 'Nevo pristatymas (iki 22 d.)', status: 'pending', owner: 'igoris', hours: 4 },
      { id: 'st-4-4-2', title: 'Integration hooks — Newo ↔ DIPA OS handoff', status: 'pending', owner: 'eimantas', hours: 4 },
    ],
  },
  {
    id: 't-4-5', slideId: 'slide-17', title: 'Ukrainiečio kandidato testavimas + onboarding',
    status: 'pending', sprint: '4', owner: 'mantas', hours: 5,
    subtasks: [
      { id: 'st-4-5-1', title: 'Test skambutis (LT/EN)', status: 'pending', owner: 'igoris', hours: 1 },
      { id: 'st-4-5-2', title: 'Techninių įgūdžių vertinimas (n8n užduotis)', status: 'pending', owner: 'mantas', hours: 1 },
      { id: 'st-4-5-3', title: 'Onboarding dokumentas + credentials', status: 'pending', owner: 'mantas', hours: 3 },
    ],
  },
  {
    id: 't-4-6', slideId: 'slide-12', title: 'SOP PDF vs DIPA OS — neatitikimų sąrašas',
    status: 'pending', sprint: '4', owner: 'mantas', hours: 5,
    subtasks: [
      { id: 'st-4-6-1', title: 'E2E PDF žingsnių sutapatinimas su DIPA schema', status: 'pending', owner: 'mantas', hours: 3 },
      { id: 'st-4-6-2', title: 'Rankinis vs automatizuota matrica', status: 'pending', owner: 'mantas', hours: 2 },
    ],
  },
  {
    id: 't-4-7', slideId: 'slide-14', title: 'AI agentų lentelė — atnaujinimas po release',
    status: 'pending', sprint: '4', owner: 'mantas', hours: 2,
    subtasks: [
      { id: 'st-4-7-1', title: 'Po Proposal Assistant MVP — pažymėti cov-full', status: 'pending', owner: 'mantas', hours: 1 },
      { id: 'st-4-7-2', title: 'Po JTBD Asistento MVP — atnaujinti Discovery Copilot', status: 'pending', owner: 'mantas', hours: 1 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Validation / UAT — visuose sprintuose
  // ═══════════════════════════════════════════════════════════════
  {
    id: 't-v-1', slideId: 'slide-11', title: 'QA Scorecard validacija (10 žinomų transkriptų)',
    status: 'pending', sprint: '2', owner: 'team', hours: 4,
    subtasks: [
      { id: 'st-v-1-1', title: 'Peržiūrėti 10 realių skambučių su AI score', status: 'pending', owner: 'team', hours: 4 },
    ],
  },
  {
    id: 't-v-2', slideId: 'slide-11', title: 'End-to-end UAT staging aplinkoje',
    status: 'pending', sprint: '3', owner: 'team', hours: 4,
    subtasks: [
      { id: 'st-v-2-1', title: 'Naujas lead → Monday → RAG → Dashboard verifikacija', status: 'pending', owner: 'team', hours: 4 },
    ],
  },
];

const TaskManager = {
  STORAGE_KEY: 'dipa-os-tasks-v2',

  load() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) { /* ignore */ }
    return JSON.parse(JSON.stringify(INITIAL_TASKS));
  },

  save(tasks) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  },

  reset() {
    localStorage.removeItem(this.STORAGE_KEY);
    return JSON.parse(JSON.stringify(INITIAL_TASKS));
  },

  getAllTasks() {
    return this.load();
  },

  getTasksForSlide(slideId) {
    return this.load().filter(t => t.slideId === slideId);
  },

  toggleTaskStatus(taskId) {
    const tasks = this.load();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return tasks;
    const cycle = { 'pending': 'in-progress', 'in-progress': 'done', 'done': 'pending' };
    task.status = cycle[task.status] || 'pending';
    this.save(tasks);
    return tasks;
  },

  toggleSubtaskStatus(taskId, subtaskId) {
    const tasks = this.load();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return tasks;
    const sub = task.subtasks.find(s => s.id === subtaskId);
    if (!sub) return tasks;
    const cycle = { 'pending': 'in-progress', 'in-progress': 'done', 'done': 'pending' };
    sub.status = cycle[sub.status] || 'pending';
    this.save(tasks);
    return tasks;
  },

  getStats() {
    const tasks = this.load();
    let total = 0, pending = 0, inProgress = 0, done = 0;
    let hoursTotal = 0, hoursPending = 0, hoursInProgress = 0, hoursDone = 0;
    tasks.forEach(t => {
      total++;
      if (t.status === 'pending') pending++;
      else if (t.status === 'in-progress') inProgress++;
      else if (t.status === 'done') done++;
      const h = t.hours || 0;
      hoursTotal += h;
      if (t.status === 'pending') hoursPending += h;
      else if (t.status === 'in-progress') hoursInProgress += h;
      else if (t.status === 'done') hoursDone += h;

      (t.subtasks || []).forEach(s => {
        total++;
        if (s.status === 'pending') pending++;
        else if (s.status === 'in-progress') inProgress++;
        else if (s.status === 'done') done++;
      });
    });
    return { total, pending, inProgress, done, hoursTotal, hoursPending, hoursInProgress, hoursDone };
  },

  /** Aggregate hours by owner across all subtasks (more accurate than task-level). */
  getHoursByOwner() {
    const tasks = this.load();
    const totals = {};
    tasks.forEach(t => {
      (t.subtasks || []).forEach(s => {
        const owner = s.owner || t.owner || 'eimantas';
        totals[owner] = (totals[owner] || 0) + (s.hours || 0);
      });
    });
    return totals;
  },

  /** Aggregate hours by owner within a given sprint. */
  getHoursByOwnerForSprint(sprint) {
    const tasks = this.load();
    const totals = {};
    tasks.filter(t => t.sprint === String(sprint)).forEach(t => {
      (t.subtasks || []).forEach(s => {
        const owner = s.owner || t.owner || 'eimantas';
        totals[owner] = (totals[owner] || 0) + (s.hours || 0);
      });
    });
    return totals;
  },

  /** Total hours in a sprint. */
  getSprintHours(sprint) {
    const owners = this.getHoursByOwnerForSprint(sprint);
    return Object.values(owners).reduce((a, b) => a + b, 0);
  },

  getUniqueAssignees() {
    return Object.keys(OWNER_META);
  },

  ownerBadge(owner) {
    const meta = OWNER_META[owner];
    if (!meta) return '';
    return `<span class="owner-badge" style="background:${meta.color}20;color:${meta.color};border:1px solid ${meta.color}40;" title="${meta.label}">${meta.short}</span>`;
  },

  hoursBadge(hours) {
    if (!hours) return '';
    return `<span class="hours-badge">${hours}h</span>`;
  },

  renderTaskItem(task, showSlide = false) {
    const statusClass = task.status === 'done' ? 'checked' : task.status === 'in-progress' ? 'in-progress' : '';
    const textClass = task.status === 'done' ? 'done' : '';

    let html = `<div class="task-item" data-task-id="${task.id}">
      <div class="task-checkbox ${statusClass}" data-task-id="${task.id}"></div>
      <span class="task-text ${textClass}">${task.title}</span>
      ${this.ownerBadge(task.owner)}
      ${this.hoursBadge(task.hours)}
      <span class="task-sprint-badge">S${task.sprint}</span>
    </div>`;

    if (task.subtasks && task.subtasks.length > 0) {
      html += '<div class="subtask-list">';
      task.subtasks.forEach(sub => {
        const subStatus = sub.status === 'done' ? 'checked' : sub.status === 'in-progress' ? 'in-progress' : '';
        const subText = sub.status === 'done' ? 'done' : '';
        html += `<div class="subtask-item" data-task-id="${task.id}" data-subtask-id="${sub.id}">
          <div class="task-checkbox ${subStatus}" data-task-id="${task.id}" data-subtask-id="${sub.id}"></div>
          <span class="task-text ${subText}">${sub.title}</span>
          ${this.ownerBadge(sub.owner || task.owner)}
          ${this.hoursBadge(sub.hours)}
        </div>`;
      });
      html += '</div>';
    }

    return html;
  },

  renderGlobalPanel(filters = {}) {
    const tasks = this.load();
    const { sprint = 'all', status = 'all', owner = 'all' } = filters;

    const filtered = tasks.filter(t => {
      if (sprint !== 'all' && t.sprint !== sprint) return false;
      if (status !== 'all' && t.status !== status) return false;
      if (owner !== 'all' && t.owner !== owner) return false;
      return true;
    });

    let html = '';
    filtered.forEach(t => { html += this.renderTaskItem(t, true); });
    if (!filtered.length) {
      html = '<p style="color:var(--text-muted);text-align:center;padding:20px;">Nėra užduočių pagal pasirinktus filtrus.</p>';
    }

    return html;
  },

  renderStats() {
    const s = this.getStats();
    const hoursDoneOfTotal = s.hoursTotal > 0 ? Math.round((s.hoursDone / s.hoursTotal) * 100) : 0;
    return `
      <div class="stat-item"><span class="stat-dot pending-dot"></span> Laukia: ${s.pending}</div>
      <div class="stat-item"><span class="stat-dot progress-dot"></span> Vykdoma: ${s.inProgress}</div>
      <div class="stat-item"><span class="stat-dot done-dot"></span> Atlikta: ${s.done}</div>
      <div class="stat-item" style="margin-left:auto;"><strong>${s.hoursDone}</strong>/${s.hoursTotal} h (${hoursDoneOfTotal}%)</div>
    `;
  },
};
