const DIAGRAMS = {

  tocFlow: `graph LR
    A["1. Identifikuoti\\nBottleneck"] --> B["2. Išnaudoti\\nBottleneck"]
    B --> C["3. Subordinuoti\\nsistemą"]
    C --> D["4. Pakelti\\npralaidumą"]
    D --> E["5. Kartoti\\nciklą"]
    E --> A`,

  leanMuda: `graph LR
    subgraph muda [MUDA — Švaistymai]
      M1["23 val. rankinio\\napdorojimo"]
      M2["Rankinis Ads\\nduomenų vedimas"]
      M3["Status Update\\nmeetingai"]
      M4["Google paieškos\\nprieš skambutį"]
      M5["Rankinis Lead\\nklasifikavimas"]
    end

    subgraph auto [AUTOMATIZUOTA]
      A1["AI Post-Call"]
      A2["n8n API Sync"]
      A3["Live Dashboard"]
      A4["Pre-Call Brief"]
      A5["RAG Scoring"]
    end

    M1 --> A1
    M2 --> A2
    M3 --> A3
    M4 --> A4
    M5 --> A5`,

  systemArchitectureOverview: `flowchart LR
    Ads["Ads + Outreach\\n(Facebook, LinkedIn)"] --> Ingest["WF1 Ingestion\\n+ scoring entry"]
    Ops["Ops inputs\\n(Outlook, Plaud, Meetings)"] --> Flows["WF2, WF3, WF4"]
    Ingest --> CRM["Monday + PostgreSQL\\n(source of truth)"]
    Flows --> AI["Gemini 2.5 Pro\\n+ RAG + Whisper"]
    AI --> CRM
    CRM --> Views["DIPA OS views\\nCo-Pilot, Cockpit, QA, Command Center"]
    Recon["WF5 Reconciliation"] --> CRM
    GDPR["GDPR / audit"] -.-> CRM`,

  systemArchitecture: `flowchart TB
    subgraph L1 ["① Šaltiniai"]
      FB["Facebook Ads"]
      LI["LinkedIn Ads"]
      OL[Outlook]
      Plaud["Plaud Audio"]
      Meets[Susitikimai]
      Cl[Clockify]
    end

    subgraph L2 ["② n8n workflows"]
      WF1["WF1: Lead\\nIngestion"]
      WF2["WF2: Pre-Call\\nBrief"]
      WF3["WF3: Post-Call\\nQA"]
      WF4["WF4: Strategic\\nMemory"]
      WF5["WF5: Data\\nReconciliation"]
    end

    subgraph L3 ["③ AI paslaugos"]
      RAG["Vertex AI\\nRAG"]
      Whisper["Whisper STT"]
      LLM["Gemini 2.5 Pro\\n(Vertex AI)"]
      Newo["Newo AI"]
    end

    subgraph L4 ["④ CRM ir sandėlis"]
      Mon[Monday.com]
      PG[(PostgreSQL)]
    end

    subgraph L5 ["⑤ DIPA OS (Next.js)"]
      CoP[Co-Pilot]
      Cock[Sales Cockpit]
      QM[QA modulis]
      CMD[Command Center]
    end

    FB --> WF1
    LI --> WF1
    OL --> WF2
    Plaud --> WF3
    Meets --> WF4
    Cl --> PG

    WF1 --> Mon
    WF1 -->|"C lygis"| Newo
    RAG -.->|"paieška / enrichment\\n(scoring kontekstas)"| WF1
    WF1 -.->|"nauji faktai\\nį indeksą"| RAG

    Newo -->|"transkriptai /\\nrezultatai"| WF3

    RAG -.->|"retrieval:\\nkontekstas briefui"| LLM
    WF2 --> LLM
    WF2 --> Mon

    WF3 --> Whisper
    Whisper --> LLM
    LLM -->|"QA JSON /\\nstruktūra"| PG
    WF3 --> Mon

    WF4 --> RAG
    WF4 --> Mon

    Mon --> PG
    Mon --> WF5
    PG --> WF5
    WF5 -->|"reconciliation\\nlog + diff"| PG

    RAG --> CoP
    PG --> Cock
    PG --> QM
    PG --> CMD

    GDPR[GDPR sluoksnis] -.->|Consent| Mon
    GDPR -.->|Audit| PG`,

  ragArchitecture: `graph TB
    subgraph layerA [A: Klientų Duomenys]
      Rek["Rekvizitai.lt"]
      BW["BuiltWith"]
      Apollo["Apollo"]
    end

    subgraph layerB [B: Pardavimų Patirtis]
      Deals["Laimėti Dealai"]
      Proposals["Pasiūlymai"]
      Objections["Prieštaravimai"]
    end

    subgraph layerC [C: Strateginės Žinios]
      Meets["Susitikimai"]
      SOPs["SOP Taisyklės"]
      Decisions["Sprendimai"]
    end

    subgraph rag [Vertex AI RAG]
      Embed["Embeddings"]
      VDB["Vektorių DB"]
      Search["Paieška"]
    end

    Rek --> Embed
    BW --> Embed
    Apollo --> Embed
    Deals --> Embed
    Proposals --> Embed
    Objections --> Embed
    Meets --> Embed
    SOPs --> Embed
    Decisions --> Embed

    Embed --> VDB --> Search

    Search --> CP["Co-Pilot"]
    Search --> PCB["Pre-Call Brief"]
    Search --> LS["Lead Scoring"]`,

  wfLeadIngestion: `graph TD
    T["Naujas Lead"] --> Enrich["API Enrichment:\\nRekvizitai / Apollo"]
    Enrich --> Format["JSON\\nFormatavimas"]
    Format --> Score["RAG Scoring:\\nA / B / C / D"]
    Score --> Update["Monday.com\\nUpdate"]
    Update --> Dash["Dashboard Sync"]

    Score -->|"A/B"| Assign["Priskirti\\nLauriui / Marijai"]
    Score -->|"C"| NewoBot["Perduoti Newo"]
    Score -->|"D"| Nurture["Nurture"]`,

  wfPreCallBrief: `graph TD
    T1["Naktinis Cron:\\nVakaro Generavimas"] --> QueryRAG1["RAG: Sukurti\\nPirminį Brief"]
    QueryRAG1 --> Store["Išsaugoti DB"]

    T2["Outlook Event:\\n-15 min"] --> Check{"Ar yra nauji\\nduomenys?"}
    Check -->|"Taip"| Refresh["Atnaujinti Brief\\nper RAG + Gemini"]
    Check -->|"Ne"| Use["Naudoti\\nnaktinį Brief"]

    Refresh --> Deliver["Pristatyti"]
    Use --> Deliver
    Deliver --> Slack["Slack"]
    Deliver --> DashPCB["Dashboard"]`,

  wfPostCall: `graph TD
    T3["Plaud Audio"] --> Trans["Whisper:\\nTranskripcija"]
    Trans --> Analyze["Gemini 2.5 Pro:\\nQA Scorecard"]
    Analyze --> JSON["JSON Output:\\nsummary, BANT,\\nscore, coaching"]
    JSON --> CRM["Monday.com\\nUpdate"]
    JSON --> DB["PostgreSQL:\\nQA Balas"]
    JSON --> Email["Outlook:\\nFollow-up"]
    JSON --> DashQA["Dashboard:\\nQA View"]`,

  wfStrategicMemory: `graph TD
    T4["Susitikimo\\nĮrašas"] --> Trans2["Transkripcija"]
    Trans2 --> Extract["Gemini:\\nAction items + sprendimai"]
    Extract --> Vec["Embeddings →\\nVertex AI RAG"]
    Extract --> Tasks2["Monday.com\\nUžduotys"]
    Extract --> Arch["Sprendimų\\nArchyvas"]`,

  wfReconciliation: `graph TD
    Cron["Naktinis Cron:\\n02:00 val."] --> Pull["Ištraukti Monday.com\\nDeal būsenas"]
    Pull --> Compare["Palyginti su\\nPostgreSQL duomenimis"]
    Compare --> Diff{"Yra\\nneatitikimų?"}
    Diff -->|"Taip"| Flag["Pažymėti\\nneatitikimus"]
    Flag --> Alert["Slack Alert →\\nEimantas / Mantas"]
    Flag --> Log["Išsaugoti\\nReconciliation Log"]
    Diff -->|"Ne"| OK["Viskas synced ✓"]`,

  newoDecisionTree: `graph TD
    Start["Newo Skambina"] --> Greet["Pasisveikinimas"]
    Greet --> Sentiment{"Sentiment\\nAnalizė"}

    Sentiment -->|"Neigiamas"| Escalate["ESKALACIJA:\\nPerduoti Lauriui"]
    Escalate --> MondayEsc["Monday.com:\\nUrgent Flag"]

    Sentiment -->|"Neutralus/+"| Q1{"Domina\\nautomatizavimas?"}
    Q1 -->|"Ne"| NL["Pasiūlyti\\nnaujienlaiškį"]
    NL --> MondayN["Monday.com:\\nNurture"]

    Q1 -->|"Taip/Galbūt"| Pitch["AI Pitch"]
    Pitch --> Q2{"15 min\\nROI sesijai?"}
    Q2 -->|"Ne"| FU["Follow-up\\ndata"]
    FU --> MondayFU["Monday.com:\\nFollow-up"]
    Q2 -->|"Taip"| Cal["Tikrinti\\nkalendorių"]
    Cal --> Offer["Pasiūlyti\\n2 laikus"]
    Offer --> Book["Sukurti\\nsusitikimą"]`,

  dbSchema: `erDiagram
    Lead ||--o{ CallAudit : "turi"
    Lead ||--o{ ConsentLog : "turi"
    Lead ||--o{ ScoringFeedback : "turi"
    Lead {
        string id PK
        string mondayId UK
        string companyName
        string icpScore
        string source
        string status
        float scoringAccuracy
        datetime createdAt
        int timeToRevenue
    }
    CallAudit {
        string id PK
        string leadId FK
        string salesRep
        string callType
        int durationMinutes
        int qaScore
        string coachingTip
        string transcriptUrl
        datetime createdAt
    }
    FinancialMetric {
        string id PK
        datetime date
        float adSpend
        float infrastructureCost
        float revenueGenerated
        float cac
        float roas
    }
    TimeTracking {
        string id PK
        string salesRep
        string weekType
        float coreSalesHours
        float overheadHours
        float supportHours
        datetime date
    }
    CustomerHealth {
        string id PK
        string leadId FK
        int npsScore
        float churnRisk
        float upsellPotential
        datetime lastContactDate
        string status
    }
    ConsentLog {
        string id PK
        string leadId FK
        string consentType
        string legalBasis
        datetime grantedAt
        datetime revokedAt
    }
    ScoringFeedback {
        string id PK
        string leadId FK
        string predictedScore
        string actualOutcome
        float accuracy
        datetime createdAt
    }`,

  leadLifecycle: `graph LR
    Ad["Reklama"] --> Landing["Landing Page"]
    Landing --> Ingest["n8n Ingestion"]
    Ingest --> Score2["RAG Scoring\\nA/B/C/D"]

    Score2 -->|"A/B"| Bank["Lead Bank"]
    Score2 -->|"C"| NewoQ["Newo"]
    Score2 -->|"D"| Nurt["Nurture"]

    NewoQ -->|"Patvirtintas"| Bank
    Bank --> Qualify["Lauris:\\nKvalifikacija"]
    Qualify --> ROI["Marija:\\nROI Sesija"]
    ROI --> Proposal["Pasiūlymas"]
    Proposal --> Close{"Uždarymas"}

    Close -->|"Won"| Revenue["Pajamos"]
    Close -->|"Lost"| LostAn["Analizė"]

    Revenue --> Retention["CustomerHealth\\nMonitoringas"]
    Revenue --> Feedback["Scoring\\nFeedback Loop"]
    LostAn --> Feedback
    Feedback -->|"Retrain"| Score2`,

  weeklyCycle: `graph LR
    subgraph before [PRIEŠ DIPA OS]
      B1["Excel formules"] --> B2["Ginčai dėl\\nROI sesijų"]
      B2 --> B3["Neaiškūs\\nleadai"]
      B3 --> B4["45-60 min\\nmeetingas"]
    end

    subgraph after [SU DIPA OS]
      A1["14:55 AI\\nataskaita"] --> A2["15:00\\nCommand Center"]
      A2 --> A3["15:05 Marija:\\nReview"]
      A3 --> A4["15:10 Greta:\\nCAC/ROAS"]
      A4 --> A5["15:20 Call\\nAudit"]
      A5 --> A6["15:30\\nBaigta"]
    end

    B4 -->|"Transformacija"| A1`,

  dashboardViews: `graph TB
    subgraph sc [Sales Cockpit — Marija / Lauris]
      SC1["Focus Mode"] --> SC2["1-Click Actions"]
      SC2 --> SC3["Auto Follow-up"]
    end

    subgraph qa [QA Module]
      QA1["AI Scorecard"] --> QA2["Talk/Listen Ratio"]
      QA2 --> QA3["Sentiment"]
      QA3 --> QA4["AI Coaching"]
    end

    subgraph cc [Command Center — Igoris / Mantas]
      CC1["Bottleneck"] --> CC2["Live P&L"]
      CC2 --> CC3["ROAS / ROI"]
      CC3 --> CC4["Anomaly Detection"]
    end

    sc --> qa --> cc`,

  pdfVsAutomation: `flowchart TB
    subgraph sop [SOP PDF — tipinis rankinis E2E]
      S1[Ads / formos] --> S2[Lauris į Monday ranka]
      S2 --> S3[C ir D — šaltieji ranka]
      S3 --> S4[Google prieš skambutį]
      S4 --> S5[Marija planuoja ROI ranka]
      S5 --> S6[Excel penktadienis]
    end
    subgraph os [DIPA OS]
      O1[Ingest + RAG score] --> O2[Newo C / A-B žmogui]
      O2 --> O3[Pre-Call Brief]
      O3 --> O4[Post-Call QA JSON]
      O4 --> O5[Command Center 14:55]
    end
    sop -.->|transformacija| os`,

  extendedAutomation: `flowchart LR
    P1[AI pasiūlymo juodraštis] --> H[n8n orchestratorius]
    P2[E-sign status į CRM] --> H
    P3[Post-Won onboarding] --> H
    P4[Ads CAC guardrails] --> H
    P5[NPS / CustomerHealth] --> H
    H --> D[DIPA OS Dashboard]`,

  e2eElevenStages: `flowchart LR
    A[LEAD] --> B[QUAL]
    B --> C[DISCOVERY]
    C --> D[PROPOSAL]
    D --> E[CLOSING]
    E --> F[ONBOARDING]
    F --> G[PREP]
    G --> H[WORKSHOP]
    H --> I[FOLLOW-UP]
    I --> J[ROI]
    J --> K[UPSELL]`,

  handoffClosingToDelivery: `flowchart TB
    subgraph sales ["Sales iki CLOSING"]
      S["Discovery / Proposal / objections"]
    end
    W{"Monday Won + GATE"}
    subgraph pack ["Handoff paketas"]
      P["skausmas pažadas tikslai dalyviai rizikos"]
    end
    subgraph del ["Delivery takas"]
      O["ONBOARDING SLA"]
      R["PREP WORKSHOP FOLLOW-UP"]
    end
    sales --> W
    W -->|Taip| pack
    pack --> O
    O --> R`,

  tocWeekConstraint: `flowchart TB
    SR["Stop rule — neatitikimas"]
    SR --> F["Vienas focal bottleneck"]
    F --> T["Visi dirba tik su juo"]
    T --> R["RAG + Constraint review"]
    R --> KPI["Throughput Won/wk · Buffer ROI · NPS"]`,
};
