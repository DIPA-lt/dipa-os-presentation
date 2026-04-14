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

  systemArchitecture: `flowchart TD
    FB["Facebook Ads"] --> WF1["WF1: Lead\\nIngestion"]
    LI["LinkedIn Ads"] --> WF1
    OL["Outlook"] --> WF2["WF2: Pre-Call\\nBrief"]
    Plaud["Plaud Audio"] --> WF3["WF3: Post-Call\\nQA"]
    Meets["Susitikimai"] --> WF4["WF4: Strategic\\nMemory"]

    WF1 --> RAG["Vertex AI\\nRAG"]
    WF1 --> Monday["Monday.com"]
    WF1 -->|"C leadai"| Newo["Newo AI"]
    Newo -->|"Rezultatai"| WF3

    WF2 --> RAG
    WF2 --> LLM["GPT-4o /\\nClaude"]
    WF3 --> Whisper["Whisper STT"]
    Whisper --> LLM
    WF3 --> Monday
    WF4 --> RAG

    WF5["WF5: Data\\nReconciliation"] --> Monday
    WF5 --> PG["PostgreSQL"]

    Monday --> PG
    Clock["Clockify"] --> PG

    RAG --> CoPilot["Co-Pilot AI"]
    PG --> Cockpit["Sales Cockpit"]
    PG --> QAMod["QA Module"]
    PG --> CMD["Command\\nCenter"]
    GDPR["GDPR Layer"] -.->|"Consent"| Monday
    GDPR -.->|"Audit"| PG`,

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
    Check -->|"Taip"| Refresh["Atnaujinti Brief\\nper RAG + LLM"]
    Check -->|"Ne"| Use["Naudoti\\nnaktinį Brief"]

    Refresh --> Deliver["Pristatyti"]
    Use --> Deliver
    Deliver --> Slack["Slack"]
    Deliver --> DashPCB["Dashboard"]`,

  wfPostCall: `graph TD
    T3["Plaud Audio"] --> Trans["Whisper:\\nTranskripcija"]
    Trans --> Analyze["LLM: QA\\nScorecard"]
    Analyze --> JSON["JSON Output:\\nsummary, BANT,\\nscore, coaching"]
    JSON --> CRM["Monday.com\\nUpdate"]
    JSON --> DB["PostgreSQL:\\nQA Balas"]
    JSON --> Email["Outlook:\\nFollow-up"]
    JSON --> DashQA["Dashboard:\\nQA View"]`,

  wfStrategicMemory: `graph TD
    T4["Susitikimo\\nĮrašas"] --> Trans2["Transkripcija"]
    Trans2 --> Extract["LLM: Action Items\\n+ Sprendimai"]
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
};
