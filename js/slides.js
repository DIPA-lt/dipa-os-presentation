const SLIDES = [
  // ===== SLIDE 1: Title =====
  {
    id: 'slide-1',
    title: 'DIPA OS',
    subtitle: 'Dirbtinio Intelekto Produktyvumo Architektai — Operacinė Sistema',
    description: 'Centralizuota pardavimų valdymo platforma, pastatyta ant LEAN ir TOC metodologijų.',
    content: `
      <div class="title-slide">
        <div class="slide-badge">v2.0 — Strateginė sesija + MVP Planas</div>
        <h1>DIPA OS</h1>
        <p class="slide-subtitle">Centralizuota AI-valdomos pardavimų komandos operacinė sistema.<br>
        LEAN principai. Theory of Constraints. Pilna automatizacija.</p>
        <div class="team-grid">
          <div class="team-member"><div class="name">Igoris</div><div class="role">Vadovybė / Strategija</div></div>
          <div class="team-member"><div class="name">Mantas</div><div class="role">Vadovybė / Koordinatorius</div></div>
          <div class="team-member"><div class="name">Marija</div><div class="role">Core Sales / Closing</div></div>
          <div class="team-member"><div class="name">Lauris</div><div class="role">Kvalifikacija / Pipeline</div></div>
          <div class="team-member"><div class="name">Greta</div><div class="role">Marketingas / Ads</div></div>
          <div class="team-member"><div class="name">Eimantas</div><div class="role">Lead Developer</div></div>
          <div class="team-member"><div class="name">Newo AI</div><div class="role">AI Skambučių Agentas</div></div>
          <div class="team-member"><div class="name">DIPA Co-Pilot</div><div class="role">AI Asistentas</div></div>
        </div>
      </div>`,
    diagram: null,
    notes: 'Pagrindinis titulinis slaidas. Pristatyti komandą ir DIPA OS koncepciją.',
  },

  // ===== SLIDE 2: Philosophy LEAN + TOC =====
  {
    id: 'slide-2',
    title: 'Filosofija: LEAN + TOC',
    subtitle: 'Muda eliminavimas ir Bottleneck valdymas',
    description: 'Metodologinis pagrindas — LEAN švaistymų eliminavimas ir Theory of Constraints.',
    content: `
      <div class="slide">
        <div class="slide-badge">Metodologija</div>
        <h1>Filosofija: LEAN + TOC</h1>
        <p class="slide-subtitle">Prieš programuojant — procesų valdymo logika</p>

        <div class="philosophy-board">
          <article class="info-card accent">
            <h3>LEAN — Muda eliminavimas</h3>
            <p>Tikslas: eliminuoti viską, kas nekuria tiesioginės vertės (ROI sesijų ir uždarymų).</p>
            <ul>
              <li><strong>Laurio 23 val.</strong> — rankinis skambučių apdorojimas → AI automatizacija</li>
              <li><strong>Rankinis duomenų vedimas</strong> iš Facebook Ads → n8n API integracija</li>
              <li><strong>Google paieškos</strong> prieš skambutį → Pre-Call Brief AI</li>
              <li><strong>Status update</strong> susitikimai → Command Center live duomenys</li>
            </ul>
          </article>
          <article class="info-card purple">
            <h3>TOC — Apribojimų teorija</h3>
            <p><strong>Bottleneck:</strong> Marijos laikas ir Core Sales pralaidumas.</p>
            <p>Pagal TOC visa sistema (Marketingas, Newo, n8n) subordinuojama taip, kad bottleneck:</p>
            <ul>
              <li>Visada maitinamas <strong>tik A/B kokybės</strong> leadais</li>
              <li><strong>Niekada nestovi</strong> be darbo</li>
              <li>Overhead laikas <strong>minimizuotas iki &lt;15%</strong></li>
            </ul>
          </article>
          <article class="info-card yellow philosophy-board__full">
            <h3>Drum · Buffer · Rope</h3>
            <div class="dbr-trio">
              <div class="dbr-item">
                <span class="dbr-item__label">Drum</span>
                <p>Marijos kalendoriaus tempas — ROI sesijos ir uždarymai.</p>
              </div>
              <div class="dbr-item">
                <span class="dbr-item__label">Buffer</span>
                <p>A/B leadų eilė prieš bottleneck; stebima Command Center.</p>
              </div>
              <div class="dbr-item">
                <span class="dbr-item__label">Rope</span>
                <p>n8n traukia tik tiek naujos reklamos ir kvotų, kiek buffer nepasiekė kritinės ribos — marketingas ir Newo subordinuoti šiam tempui.</p>
              </div>
            </div>
          </article>
          <article class="info-card accent philosophy-board__full">
            <h3>SLA — priėmimo kriterijai</h3>
            <ul class="sla-compact">
              <li><strong>Pre-Call Brief:</strong> naktinis bazinis variantas arba T−15 atnaujinimas, jei atsirado naujų CRM / RAG signalų</li>
              <li><strong>Post-call:</strong> struktūrizuotas JSON į Monday ir PostgreSQL per vieną pipeline (be rankinių kopijų tarp sistemų)</li>
              <li><strong>WF5 reconciliation:</strong> Slack alertas dėl neatitikimo per 24 val. nuo naktinio cron</li>
            </ul>
          </article>
        </div>

        <h2>TOC 5-žingsnių Ciklas</h2>
        <div class="diagram-container" data-svg="tocFlow" data-scale="0.7"></div>

        <h2>Muda → Automatizacija</h2>
        <div class="diagram-container" data-svg="leanMuda" data-scale="0.49"></div>
      </div>`,
    diagram: null,
    notes: 'TOC identifikuoja bottleneck (Marija), LEAN eliminuoja waste. Visa sistema subordinuojama.',
  },

  // ===== SLIDE 3: System Architecture + RAG (merged old 3+4) =====
  {
    id: 'slide-3',
    title: 'Sistemos ir Duomenų Architektūra',
    subtitle: 'DIPA OS — Next.js + RAG + n8n pilnas vaizdas',
    description: 'Pilna sistemos architektūra su RAG 3 sluoksniais, enrichment API ir multi-model LLM strategija.',
    content: `
      <div class="slide">
        <div class="slide-badge">Architektūra</div>
        <h1>Sistemos ir Duomenų Architektūra</h1>
        <p class="slide-subtitle">Next.js aplikacija, jungianti visas platformas per n8n automatizacijas ir AI sluoksnį</p>

        <h2>Architektūros vaizdas (high-level)</h2>
        <div class="diagram-container" data-svg="systemArchitectureOverview"></div>

        <h2>Detalus workflow žemėlapis</h2>
        <div class="diagram-container" data-svg="systemArchitecture" data-scale="0.49"></div>

        <div class="info-card">
          <h3>Kaip skaityti šią schemą</h3>
          <ul class="sla-compact">
            <li><strong>WF2</strong> Pre-Call Brief <em>skaito</em> iš RAG; punktyrinė rodyklė = užklausa, ne duomenų siuntimas.</li>
            <li><strong>WF5</strong> — palyginimas Monday ↔ PostgreSQL; išėjimas į PG (žurnalas, neatitikimai).</li>
            <li><strong>Post-Call QA</strong> — audio → Whisper → LLM → struktūrizuotas rezultatas į PG + Monday.</li>
            <li><strong>WF4</strong> — strateginės atminties turinys keliauja į RAG ir Monday.</li>
          </ul>
        </div>

        <div class="card-grid">
          <div class="info-card accent">
            <h3>Frontend: Next.js 14+</h3>
            <p>TypeScript, Tailwind CSS, Shadcn/UI. Trijų vaizdų dashboard: Sales Cockpit, QA Module, Command Center.</p>
          </div>
          <div class="info-card green">
            <h3>Backend: n8n + API Routes</h3>
            <p>5 pagrindiniai n8n workflows (WF1–WF5). Next.js API routes kaip BFF proksiai.</p>
          </div>
          <div class="info-card purple">
            <h3>AI: Multi-Model Strategija</h3>
            <p><strong>Gemini 2.5 Pro</strong> (primary, per Vertex AI). <strong>GPT-4o / Claude 3.5 Sonnet</strong> kaip fallback per OpenRouter. Whisper transkripcijai.</p>
          </div>
        </div>

        <div class="info-card accent">
          <h3>Deployment ir aplinka</h3>
          <ul>
            <li><strong>Konteineriai:</strong> Docker; <strong>target:</strong> Cloud Run</li>
            <li><strong>Secrets:</strong> Vertex, Monday, Ads API raktai tik serverio pusėje (.env / Secret Manager)</li>
            <li><strong>Observability:</strong> n8n execution istorija, kritinės klaidos → Slack / el. paštas</li>
          </ul>
        </div>

        <h2>RAG Duomenų Architektūra — 3 Sluoksniai</h2>
        <p class="slide-subtitle">3 atskiri duomenų sluoksniai (vektorių bazės), iš kurių AI agentas trauks informaciją</p>
        <div class="diagram-container" data-svg="ragArchitecture"></div>

        <div class="card-grid">
          <div class="info-card accent">
            <h3>A: Išoriniai Klientų Duomenys</h3>
            <ul>
              <li><strong>Rekvizitai.lt / Scorify:</strong> Pajamos, darbuotojų augimas, pelningumas, kredito reitingas</li>
              <li><strong>BuiltWith / Apollo:</strong> CRM, chatbotai, e-komercijos platforma, decision-maker email</li>
              <li><strong>LinkedIn:</strong> Decision Makers, jų postai ir fokusas</li>
            </ul>
          </div>
          <div class="info-card green">
            <h3>B: Vidinė Pardavimų Patirtis</h3>
            <ul>
              <li>Sėkmingų sandorių istorija (Monday.com)</li>
              <li>Pasiūlymai ir sutartys (PDF)</li>
              <li>Prieštaravimų biblioteka iš Plaud transkriptų</li>
            </ul>
          </div>
          <div class="info-card purple">
            <h3>C: Strateginės Žinios (Company Brain)</h3>
            <ul>
              <li>Vidinių susitikimų transkripcijos</li>
              <li>Priimti sprendimai, SOP taisyklės</li>
              <li>Atsakomybės ir action items</li>
            </ul>
          </div>
        </div>

        <div class="info-card yellow">
          <h3>Praktinis Pavyzdys — Enrichment veikime</h3>
          <p>Kai Lauris skambina UAB „TechSprendimas", Co-Pilot per RAG suranda: <strong>Rekvizitai.lt</strong> → įmonės kodas, apyvarta +30% per metus; <strong>Scorify</strong> → kredito reitingas A; <strong>BuiltWith</strong> → naudoja Shopify + senas CRM; <strong>Apollo</strong> → CTO el. paštas ir LinkedIn profilis.</p>
          <p>Lauris klausia Co-Pilot: <em>„Kokia mūsų nuolaidų politika IT įmonėms pagal paskutinį strateginį meetą?"</em> → AI pateikia tikslų atsakymą su nuoroda į susitikimo transkriptą.</p>
        </div>

        <h2>Delivery duomenys → D sluoksnis (strateginė sesija, post-Won)</h2>
        <div class="info-card accent">
          <h3>Kodėl svarbu</h3>
          <p>Igoris/Mantas akcentavo: „uždaras pardavimų ratas" reikalauja <strong>delivery</strong> duomenų — pamokų, workshopų, anketų, namų darbų, delivery pokalbių. Iš jų kyla <strong>upsell / cross-sell</strong> galimybės. Agentas fiksuoja signalus → atpažįsta „banke sėdinčius" klientus su panašiais poreikiais → siūlo didesnės vertės sprendimus. Detalus srautas — skaidrėje 13.</p>
        </div>

        <div class="info-card purple">
          <h3>Strategijos sluoksnis: JTBD ↔ OPPM (skaidrė 16)</h3>
          <p>JTBD asistentas gyvena <strong>DIPA RAG platformoje</strong> (ne viešame GPT'e — know-how apsauga). Vartotojas eina per multiagentinę seką, gauna 90 dienų planą, spaudžia <em>„Perkelti į OPPM"</em> → sukuriamas vykdymo projektas. Strategija ir vykdymas sujungiami į vieną srautą.</p>
        </div>
      </div>`,
    diagram: null,
    notes: 'Big picture + Delivery duomenys + JTBD/OPPM sluoksnių nuoroda.',
  },

  // ===== SLIDE 4: Marketing & Finance (old 5) =====
  {
    id: 'slide-4',
    title: 'Marketingo ir Finansų Modulis',
    subtitle: 'Gretos kampanijos, kaštai ir realus ROI',
    description: 'API integracijos su Facebook/LinkedIn Ads, automatinė ROI/CAC/ROAS matematika.',
    content: `
      <div class="slide">
        <div class="slide-badge">Finansai</div>
        <h1>Marketingo ir Finansų Modulis</h1>
        <p class="slide-subtitle">Realus ROI vietoj „atvestų leadų skaičiaus"</p>

        <h2>API Integracijos</h2>
        <div class="card-grid">
          <div class="info-card accent">
            <h3>Facebook Graph API</h3>
            <p>n8n Cron (00:01) → Vakarykščiai duomenys: Ad Spend, Paspaudimai, Konversijos</p>
          </div>
          <div class="info-card accent">
            <h3>LinkedIn Ads API</h3>
            <p>Analogiškas naktinis traukimas. Lyginama su Facebook ROI.</p>
          </div>
        </div>

        <h2>Automatinė Matematika</h2>
        <div class="formula">CAC = (Visos reklamos išlaidos + Infrastruktūros kaštai) / Uždarytų klientų skaičius</div>
        <div class="formula">ROAS = Sugeneruotos pajamos (Monday.com „Won") / Reklamos išlaidos</div>
        <div class="formula">Live ROI = (Pajamos − Visi Kaštai) / Visi Kaštai × 100%</div>

        <h2>Infrastruktūros Kaštai</h2>
        <p>Next.js dashboarde — atskira skiltis „Fixed & Variable Costs". Kartą per mėnesį suvedami: serverių, API (Gemini / Vertex AI, kitos LLM paslaugos), Newo ir kitų įrankių kaštai.</p>

        <div class="info-card green">
          <h3>Command Center rodmenys</h3>
          <p>Vadovybė realiu laiku mato: <strong>„Šios savaitės CAC yra 250 EUR, ROAS: 8x"</strong></p>
        </div>

        <div class="info-card yellow">
          <h3>Alertų ir ribų pavyzdžiai</h3>
          <ul>
            <li>ROAS žemiau sutarto slenksčio kelias savaites iš eilės → „Stop / review spend" žyma Gretai</li>
            <li>CAC šuolis vs. 4 savaičių slenkantis vidurkis → santrauka vadovybei (Slack)</li>
            <li>Infrastruktūros kintamieji kaštai virš mėnesio biudžeto → finansų suvestinė</li>
          </ul>
        </div>
      </div>`,
    diagram: null,
    notes: 'Finansų modulis — kaip matuojame tikrąjį ROI, ne tik leadų kiekį.',
  },

  // ===== SLIDE 5: Call Quality & QA (old 6, fixed) =====
  {
    id: 'slide-5',
    title: 'Skambučių Kokybės ir QA Modulis',
    subtitle: 'AI Scorecard — automatinis skambučių auditas',
    description: 'Plaud → n8n → LLM pipeline. AI Scorecard kriterijai, 40/60 ratio ir coaching.',
    content: `
      <div class="slide">
        <div class="slide-badge">QA / AI</div>
        <h1>Skambučių Kokybės ir QA Modulis</h1>
        <p class="slide-subtitle">Automatinis QA — nereikia atskiro app'so. Integruota tiesiai į DIPA OS.</p>

        <h2>Procesas</h2>
        <p>Kai Lauris arba Marija baigia skambutį (įrašytą per Plaud), garso failas per n8n keliauja į LLM.</p>

        <h2>AI Scorecard (0-100 balų)</h2>
        <div class="card-grid">
          <div class="info-card accent">
            <h3>Kvalifikacija (BANT)</h3>
            <p>Ar buvo užduoti Budget, Authority, Need, Timeline klausimai?</p>
          </div>
          <div class="info-card yellow">
            <h3>Prieštaravimų Valdymas</h3>
            <p>Kaip pardavėjas reagavo į „per brangu", „nėra laiko", „neturime IT resursų"?</p>
          </div>
          <div class="info-card green">
            <h3>Next Steps</h3>
            <p>Ar pokalbio pabaigoje aiškiai sutartas kitas veiksmas?</p>
          </div>
        </div>

        <h2>Papildomos Metrikos</h2>
        <div class="card-grid">
          <div class="metric-card">
            <div class="metric-label">Talk-to-Listen Ratio</div>
            <div class="metric-value">40/60</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Tikslas: pardavėjas 40%, klientas 60%. Viršijus 50% — AI coaching signalas.</p>
          </div>
          <div class="metric-card">
            <div class="metric-label">Pacing & Sentiment</div>
            <div class="metric-value">AI</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Ar klientas susidomėjęs ar susierzinęs?</p>
          </div>
          <div class="metric-card">
            <div class="metric-label">Objection Win Rate</div>
            <div class="metric-value">%</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Kiek „Ne" sėkmingai neutralizuota</p>
          </div>
        </div>

        <div class="info-card purple">
          <h3>AI Coaching</h3>
          <p>Po kiekvieno skambučio AI sugeneruoja 3 bullet-pointus: <em>„Ką padarei gerai"</em> ir <em>„Ką kitą kartą daryti kitaip."</em></p>
          <p><strong>Pavyzdys:</strong> Laurio skambučio analizė: Talk 55% / Listen 45% → AI coaching: <em>„Per daug kalbėjote apie features. Leiskite klientui išsakyti poreikius — idealus ratio yra 40/60."</em></p>
        </div>
      </div>`,
    diagram: null,
    notes: 'QA modulis eliminuoja rankinį vertinimą. AI auditas + coaching su 40/60 talk/listen tikslu.',
  },

  // ===== SLIDE 6: Newo AI Agent (old 7) =====
  {
    id: 'slide-6',
    title: 'Newo AI Skambučių Agentas',
    subtitle: 'Automatizuoti C lygio leadų kvalifikavimą',
    description: 'Newo decision tree, inbound/outbound srautai, duomenų grąžinimas.',
    content: `
      <div class="slide">
        <div class="slide-badge">AI Agentas</div>
        <h1>Newo AI Skambučių Agentas</h1>
        <p class="slide-subtitle">Pilnavertis komandos narys, atliekantis „juodąjį" darbą</p>

        <div class="card-grid">
          <div class="info-card accent">
            <h3>Outbound (Šaltieji/Šiltieji)</h3>
            <p>Kai n8n identifikuoja „C" lygio leadą (Lauriui skambinti neapsimoka), Newo paskambina, užduoda kvalifikacinius klausimus.</p>
          </div>
          <div class="info-card green">
            <h3>Inbound (Klientas skambina mums)</h3>
            <p>Newo atsiliepia, per API patikrina Monday.com: <em>"Sveiki, Tomai, matau, kad turite suplanuotą ROI sesiją su Marija ketvirtadienį..."</em></p>
          </div>
        </div>

        <h2>Outbound Sprendimų Medis</h2>
        <div class="diagram-container" data-svg="newoDecisionTree"></div>

        <div class="info-card yellow">
          <h3>Duomenų Grąžinimas</h3>
          <p>Po kiekvieno Newo skambučio: transkriptas + „Intent Score" per Webhook → n8n → Next.js Dashboard</p>
        </div>

        <div class="info-card red">
          <h3>Eskalacijos Kelias</h3>
          <p>Newo vykdo <strong>realaus laiko sentiment analizę</strong> pokalbio metu. Jei aptinkamas neigiamas sentimentas:</p>
          <ul>
            <li>Pokalbis automatiškai perduodamas <strong>Lauriui arba Marijai</strong> (live handoff)</li>
            <li>Monday.com sukuriamas <strong>Urgent Flag</strong> su kontekstu</li>
            <li>Transkriptas iki eskalacijos momento išsaugomas analizei</li>
          </ul>
        </div>
      </div>`,
    diagram: null,
    notes: 'Newo perima C leadus, laisvindamas Laurio laiką A/B leadams.',
  },

  // ===== SLIDE 7: Pre-Call + n8n Workflows (merged old 8+10) =====
  {
    id: 'slide-7',
    title: 'n8n Automatizacijos ir Pre-Call Brief',
    subtitle: '5 pagrindiniai Workflows',
    description: '5 n8n workflows su Pre-Call Brief dviejų etapų strategija ir Outlook follow-up juodraščiu.',
    content: `
      <div class="slide">
        <div class="slide-badge">Automatizacijos</div>
        <h1>n8n Automatizacijos ir Pre-Call Brief</h1>
        <p class="slide-subtitle">5 pagrindiniai procesai, kurie valdo visą duomenų srautą</p>

        <h2>Workflow 1: Lead Ingestion & Brain Sync</h2>
        <div class="diagram-container" data-svg="wfLeadIngestion"></div>

        <h2>Workflow 2: Pre-Call Brief Generation</h2>
        <div class="diagram-container" data-svg="wfPreCallBrief"></div>

        <div class="info-card green">
          <h3>WF2 — Dviejų Etapų Strategija</h3>
          <p><strong>Etapas 1 — Naktinis:</strong> Cron generuoja pirminį Brief ir išsaugo DB (fallback, jei API lėtas).</p>
          <p><strong>Etapas 2 — Refresh T−15 min:</strong> Prieš skambutį sistema patikrina naujus duomenis → atnaujina arba naudoja naktinę versiją.</p>
        </div>

        <div class="card-grid">
          <div class="info-card accent">
            <h3>The Hook (AI Hipotezė)</h3>
            <p>Pagrindinis kliento skausmas. Pvz.: <em>„Įmonė X paaugo nuo 20 iki 50 darbuotojų, bet naudoja seną ERP."</em></p>
          </div>
          <div class="info-card purple">
            <h3>BANT Gairės</h3>
            <p>Konkretūs klausimai tai įmonei: <em>„Paklauskite, ar planuoja plėsti klientų aptarnavimo komandą..."</em></p>
          </div>
          <div class="info-card red">
            <h3>Red Flags</h3>
            <p>AI įspėja, jei pajamos krenta arba nėra tech vadovo.</p>
          </div>
        </div>

        <h2>Workflow 3: Post-Call AI Processing</h2>
        <div class="diagram-container" data-svg="wfPostCall"></div>
        <div class="info-card yellow">
          <h3>WF3 Outputai</h3>
          <p>QA Scorecard JSON → Monday.com + PostgreSQL. <strong>Follow-up email juodraštis → Outlook Drafts</strong> (pardavėjas tik peržiūri ir siunčia). Pvz.: <em>„Sveiki, ačiū už pokalbio metu aptartą..."</em></p>
        </div>

        <h2>Workflow 4: Strategic Memory Ingestion</h2>
        <div class="diagram-container" data-svg="wfStrategicMemory" data-scale="0.49"></div>

        <h2>Workflow 5: Data Reconciliation</h2>
        <p>Naktinis procesas, tikrinantis Monday.com ir PostgreSQL duomenų suderinamumą. Fiksuoja neatitikimus ir siunčia Slack alertą.</p>
        <div class="diagram-container" data-svg="wfReconciliation"></div>
      </div>`,
    diagram: null,
    notes: '5 n8n workflows su Pre-Call Brief detalizacija ir Outlook follow-up juodraščiu.',
  },

  // ===== SLIDE 8: Dashboard Views (old 9) =====
  {
    id: 'slide-8',
    title: 'Dashboard Vaizdai',
    subtitle: '3 rolėmis paremti ekranai',
    description: 'Sales Cockpit (Marija/Lauris), QA & Performance, Command Center (Igoris).',
    content: `
      <div class="slide">
        <div class="slide-badge">UI / UX</div>
        <h1>Dashboard Vaizdai</h1>
        <p class="slide-subtitle">Kiekvienas komandos narys mato tik tai, kas jam svarbu</p>
        <div class="diagram-container" data-svg="dashboardViews" data-scale="0.7"></div>

        <div class="card-grid">
          <div class="info-card accent">
            <h3>Sales Cockpit (Marija / Lauris)</h3>
            <ul>
              <li><strong>Focus Mode:</strong> Tik šiandienos suplanuoti skambučiai (Outlook sync)</li>
              <li><strong>1-Click Actions:</strong> [Skaityti Brief] [Pradėti Skambutį] [Įkelti Įrašą]</li>
              <li><strong>Auto Follow-up:</strong> AI sugeneruotas el. laiško juodraštis po skambučio</li>
            </ul>
          </div>
          <div class="info-card yellow">
            <h3>QA & Performance</h3>
            <ul>
              <li>Automatinis AI Scorecard (0-100) kiekvienam skambučiui</li>
              <li>Talk-to-Listen Ratio, Sentiment, Objection Win Rate</li>
              <li>AI Coaching: 3 bullet-pointai po kiekvieno skambučio</li>
            </ul>
          </div>
          <div class="info-card green">
            <h3>Command Center (Igoris / Mantas)</h3>
            <ul>
              <li><strong>Bottleneck indikatorius:</strong> Marijos kalendorius >80% → geltonas signalas</li>
              <li><strong>Live P&L:</strong> Išlaidos vs. Pajamos realiu laiku</li>
              <li><strong>ROAS / ROI:</strong> Gyvi skaičiai iš Monday.com ir Ads API</li>
              <li><strong>Anomaly Detection:</strong> Lead Bank tuščias? Win Rate < 50%? → Slack alert</li>
            </ul>
          </div>
        </div>

        <h2>Sales Cockpit — Dienos planas iš AI agento</h2>
        <div class="info-card accent">
          <h3>Proaktyvus, ne tik „duomenų pildytojas"</h3>
          <p>AI agentas ryte sudaro pardavėjo dieną, kad būtų pasiekti KPI. <strong>Konkretūs laiko tikslai:</strong> A tipo lead'ui — 3–5 d. nuo įkretimo iki sutarties; B tipo — 7 d. Jei viršyta → raudonas signalas su šakninės priežasties dekompozicija.</p>
          <ul>
            <li><strong>One-click veiksmai:</strong> [Skaityti Brief] [Pradėti Skambutį] [Kelti Įrašą] — nereikia šokinėti tarp Monday/Outlook/Plaud</li>
            <li><strong>Auto follow-up:</strong> po skambučio Outlook juodraštis jau paruoštas (pardavėjas tik peržiūri)</li>
            <li><strong>Pre-kvalifikacijų seka:</strong> aiški eilė „kam skambinti ir kada"</li>
          </ul>
        </div>

        <h2>Command Center — Pasekmių ↔ Priežasčių Dekompozicija</h2>
        <p class="slide-subtitle">„3 svarbiausi → 6 žemiau → 12" principas su vertikalia priežasčių linija</p>
        <div class="diagram-container" data-svg="kpiDecomposition" data-scale="0.6"></div>

        <div class="card-grid">
          <div class="info-card red">
            <h3>3 svarbiausi (vadovybei)</h3>
            <p>ROAS · Won Deals/sav. · Bottleneck Index. Bet kuris raudonas → agentas <strong>automatiškai</strong> parodo varikliuos (6), kur tiksliai prarandama vertė.</p>
          </div>
          <div class="info-card yellow">
            <h3>6 varikliai (vadovų)</h3>
            <p>CAC · LVR · TTR · Pipeline Conv · AI vs Human Qual · Core Sales Efficiency. Kiekvienas — susietas su 2 operaciniais signalais žemiau.</p>
          </div>
          <div class="info-card accent">
            <h3>12 operacinių (komandos)</h3>
            <p>Lead Speed, QA Score, Talk/Listen, Obj. Win%, NPS, Churn, Upsell €, Sentiment, Followup%, RAG Hits, Ad CTR, GATE Pass%. Agentas pats gauna signalą ir pakelia aukštyn.</p>
          </div>
        </div>

        <div class="info-card purple">
          <h3>Pavyzdys — „ROAS krito" signalas</h3>
          <p>Command Center pažymi raudoną ROAS → agentas iškart rodo: <strong>CAC ↑ (nes Ad CTR ↓)</strong>. Drill-down: „FB kampanija X — CTR 0.8% vs 2.1% normos, Ad spend nepakitęs, konversijos krito 40%". <strong>Rekomenduojamas veiksmas:</strong> „Pause kampanija X, pakelti biudžetą kampanijai Y" — viskas viename ekrane, be ginčų.</p>
        </div>
      </div>`,
    diagram: null,
    notes: 'Trys vaizdai + Sales Cockpit dienos planas + Command Center 3→6→12 priežasčių dekompozicija.',
  },

  // ===== SLIDE 9: Technical Infrastructure (merged old 11+12) =====
  {
    id: 'slide-9',
    title: 'Techninė Infrastruktūra: Promptai + DB',
    subtitle: 'LLM promptų architektūra ir Prisma duomenų schema',
    description: 'Post-Call QA ir Pre-Call Brief promptų struktūra su JSON formatais bei DB modeliai.',
    content: `
      <div class="slide">
        <div class="slide-badge">Techninis</div>
        <h1>Techninė Infrastruktūra</h1>
        <p class="slide-subtitle">LLM promptai grąžina struktūruotus JSON duomenis → DB modeliai saugoja viską analitikai</p>

        <h2>A. Post-Call QA Promptas</h2>
        <div class="prompt-block">
          <div class="prompt-label">System Message</div>
          <div class="prompt-content">Tu esi DIPA vyriausiasis pardavimų auditorius ir CRM administratorius. Tavo tikslas – išanalizuoti pardavimų skambučio transkriptą, įvertinti pardavėjo darbą pagal LEAN ir BANT metodologijas ir paruošti duomenis Monday.com sistemai.

Privalai grąžinti atsakymą TIK validžiu JSON formatu.</div>
        </div>

        <h3>JSON Output Schema</h3>
        <pre>{
  "crm_summary": "3-4 sakinių santrauka",
  "bant_status": {
    "budget": { "status": "Identified|Missing", "quote": "..." },
    "authority": { "status": "Identified|Missing", "quote": "..." },
    "need": { "status": "Identified|Missing", "quote": "..." },
    "timeline": { "status": "Identified|Missing", "quote": "..." }
  },
  "qa_score": 78,
  "coaching_tip": "Kitą kartą leiskite klientui daugiau kalbėti — ratio buvo 55/45.",
  "next_action": "Siųsti pasiūlymą iki penktadienio",
  "follow_up_email_draft": "Sveiki, ačiū už pokalbį..."
}</pre>

        <div class="info-card green">
          <h3>Duomenų Paskirstymas</h3>
          <ul>
            <li><code>crm_summary</code> → Monday.com pastabos</li>
            <li><code>qa_score</code> + <code>coaching_tip</code> → Next.js QA Dashboard</li>
            <li><code>follow_up_email_draft</code> → Outlook juodraštis</li>
          </ul>
        </div>

        <h2>B. Pre-Call Brief Promptas</h2>
        <div class="prompt-block">
          <div class="prompt-label">System Message</div>
          <div class="prompt-content">Tu esi DIPA strateginis patarėjas. Po 15 minučių pardavėjas turės skambutį su įmone: [ĮMONĖS PAVADINIMAS].

Duomenys iš išorinių API: [API DUOMENYS]
Kontekstas iš RAG: [RAG KONTEKSTAS]

Paruošk Pre-Call Brief:
• The Hook — didžiausias Bottleneck
• Icebreaker — ką paminėti pradžioje
• DIPA Case Study — panašus klientas
• Red Flags — rizikos</div>
        </div>

        <h2>C. Duomenų Bazės Schema (Prisma + PostgreSQL)</h2>
        <div class="diagram-container" data-diagram="dbSchema"></div>

        <div class="card-grid">
          <div class="info-card accent">
            <h3>Lead</h3>
            <p>Pagrindinis įrašas. <code>mondayId</code>, ICP balas (A/B/C/D), šaltinis, statusas, Time-to-Revenue.</p>
          </div>
          <div class="info-card yellow">
            <h3>CallAudit</h3>
            <p>AI auditas: <code>qaScore</code> (0-100), <code>coachingTip</code>, transkript URL. Susietas su Lead.</p>
          </div>
          <div class="info-card green">
            <h3>FinancialMetric</h3>
            <p>Dienos finansiniai duomenys: Ad Spend, infrastruktūra, pajamos, CAC ir ROAS.</p>
          </div>
          <div class="info-card purple">
            <h3>TimeTracking</h3>
            <p>Clockify: Core Sales vs. Overhead vs. Support valandos pagal savaitės tipą.</p>
          </div>
        </div>

        <div class="card-grid">
          <div class="info-card red">
            <h3>CustomerHealth</h3>
            <p>Post-sale: <code>npsScore</code>, <code>churnRisk</code>, <code>upsellPotential</code>.</p>
          </div>
          <div class="info-card yellow">
            <h3>ConsentLog (GDPR)</h3>
            <p>Sutikimų sekimas: <code>consentType</code>, <code>legalBasis</code>, <code>grantedAt</code>.</p>
          </div>
          <div class="info-card purple">
            <h3>ScoringFeedback</h3>
            <p>Feedback loop: <code>predictedScore</code> vs. <code>actualOutcome</code> → RAG scoring tikslumo matavimas.</p>
          </div>
        </div>

        <div class="info-card accent">
          <h3>Praktinis Pavyzdys — Pilnas Duomenų Kelias</h3>
          <p>Greta išleidžia 500 EUR FB reklamai → n8n → <code>FinancialMetric</code>. Marija uždaro 4000 EUR dealą → <code>revenueGenerated</code>. Dashboard: <strong>„CAC: 250 EUR, ROAS: 8x"</strong>. Po skambučio: <code>CallAudit.qaScore = 78</code>, <code>coachingTip = „Leiskite klientui daugiau kalbėti"</code>.</p>
        </div>
      </div>`,
    diagram: null,
    notes: 'Promptų architektūra + DB schema — JSON output → n8n → analytics.',
  },

  // ===== SLIDE 10: KPI Indices (old 13, expanded) =====
  {
    id: 'slide-10',
    title: 'KPI Indeksai',
    subtitle: 'Išplėstiniai performanso rodikliai',
    description: 'LVR, TTR, Core Sales Efficiency, Pipeline Conversion, ROAS, Team Time Savings ir retention metrikos.',
    content: `
      <div class="slide">
        <div class="slide-badge">Metrika</div>
        <h1>KPI Indeksai</h1>
        <p class="slide-subtitle">Vietoj „kiek paskambinome" — gilieji indeksai, skaičiuojami realiu laiku</p>

        <h2>Pagrindiniai Pardavimų KPI</h2>
        <div class="card-grid">
          <div class="metric-card">
            <div class="metric-label">Lead Velocity Rate (LVR)</div>
            <div class="metric-value">+%</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">A/B leadų augimas vs. praėjęs mėnuo. Geriausias ateities pajamų indikatorius.</p>
          </div>
          <div class="metric-card">
            <div class="metric-label">Time-to-Revenue (TTR)</div>
            <div class="metric-value">d</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Dienų nuo leado sukūrimo iki „Closed Won". Tikslas: trumpinti.</p>
          </div>
          <div class="metric-card">
            <div class="metric-label">Core Sales Efficiency</div>
            <div class="metric-value">€/h</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Pajamos / Marijos ir Laurio Core Sales valandos (Clockify).</p>
          </div>
        </div>

        <div class="card-grid">
          <div class="metric-card">
            <div class="metric-label">Pipeline Conversion Rate</div>
            <div class="metric-value">%</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Closing Week vs. Pipeline Build Week Win Rate palyginimas.</p>
          </div>
          <div class="metric-card">
            <div class="metric-label">AI vs. Human Qualification</div>
            <div class="metric-value">ratio</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Kiek leadų sėkmingai kvalifikavo Newo vs. Lauris.</p>
          </div>
          <div class="metric-card">
            <div class="metric-label">CAC</div>
            <div class="metric-value">€</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Customer Acquisition Cost — visos išlaidos / uždarytų klientų sk.</p>
          </div>
        </div>

        <h2>Operaciniai ir Efektyvumo KPI</h2>
        <div class="card-grid">
          <div class="metric-card">
            <div class="metric-label">ROAS</div>
            <div class="metric-value">x</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Return on Ad Spend — pajamos / reklamos išlaidos. Tikslas: >5x.</p>
          </div>
          <div class="metric-card">
            <div class="metric-label">Bottleneck Index</div>
            <div class="metric-value">%</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Marijos kalendoriaus užpildymas. >80% → geltonas signalas Command Center.</p>
          </div>
          <div class="metric-card">
            <div class="metric-label">Lead Ingestion Speed</div>
            <div class="metric-value">&lt;5s</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Laikas nuo leado atsiradimo iki A/B/C/D klasifikacijos. Tikslas: &lt;5 sek.</p>
          </div>
        </div>

        <div class="card-grid">
          <div class="metric-card">
            <div class="metric-label">Komandos Laiko Sutaupymas</div>
            <div class="metric-value">~35 h/sav</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Lauris: -26.5h (QA + Pre-Call), Greta: -3.5h (ads ataskaitos), Marija: -3h (lead triage), Friday meeting: -2h.</p>
          </div>
        </div>

        <h2>Retention Metrikos</h2>
        <div class="card-grid">
          <div class="metric-card">
            <div class="metric-label">NPS Score</div>
            <div class="metric-value">0-10</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Net Promoter Score — klientų lojalumo indikatorius.</p>
          </div>
          <div class="metric-card">
            <div class="metric-label">Churn Rate</div>
            <div class="metric-value">%</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Klientų praradimo procentas per mėnesį.</p>
          </div>
          <div class="metric-card">
            <div class="metric-label">Upsell Pipeline</div>
            <div class="metric-value">€</div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Papildomų pardavimų esamiems klientams vertė.</p>
          </div>
        </div>

        <h2>Formulės</h2>
        <div class="formula">Core Sales Efficiency = Sugeneruotos Pajamos / (Core Sales Valandos iš Clockify)</div>
        <div class="formula">LVR = ((A/B Leadai šį mėn. − A/B Leadai praeitą mėn.) / A/B Leadai praeitą mėn.) × 100%</div>
        <div class="formula">ROAS = Sugeneruotos Pajamos (Monday.com „Won") / Reklamos Išlaidos</div>

        <h2>3 → 6 → 12 Dekompozicijos Principas</h2>
        <p>KPI suskirstyti į <strong>tris lygius</strong>, kad vadovybė nemato 12 skaičių iš karto, bet gali <strong>drill-down</strong> į šakninę priežastį. Pilnas grafas — Sales Cockpit / Command Center skaidrėje (8). Kiekvienas raudonas signalas viršuje → automatinis priežasčių atskleidimas žemesniame lygyje.</p>
        <div class="card-grid">
          <div class="info-card red">
            <h3>3 (vadovybė)</h3>
            <p>ROAS · Won Deals/sav. · Bottleneck Index — greitas „traffic light"</p>
          </div>
          <div class="info-card yellow">
            <h3>6 (vadovai)</h3>
            <p>CAC · LVR · TTR · Pipeline Conv · AI vs Human Qual · Core Sales Efficiency</p>
          </div>
          <div class="info-card accent">
            <h3>12 (komanda)</h3>
            <p>Lead Speed · QA Score · Talk/Listen · Obj. Win% · NPS · Churn · Upsell · Sentiment · Followup% · RAG Hits · Ad CTR · GATE Pass%</p>
          </div>
        </div>

        <div class="info-card purple">
          <h3>Lojalumo indikatorius (sudėtingesnis)</h3>
          <p>Susitikime aptarta — <strong>matomas, bet sunkus skaičiuoti</strong>. Formavimo pasiūlymas: <code>LoyaltyIndex = (NPS_weighted + ReferralRate + RepeatPurchaseFrequency + NegativeChurnSignal) / 4</code>. Matuojama per CustomerHealth (<code>npsScore</code>, <code>upsellPotential</code>, <code>churnRisk</code>) ir Strategic Memory (review transkriptai). Įtraukta S4+ backlog'e.</p>
        </div>
      </div>`,
    diagram: null,
    notes: 'KPI + 3→6→12 dekompozicija + lojalumo indikatorius.',
  },

  // ===== SLIDE 11: Roadmap + Backlog + Risks + Testing (merged old 14+17) =====
  {
    id: 'slide-11',
    title: 'Roadmap: 3 Sprintai',
    subtitle: '6 savaičių iteracinis planas + backlog + rizikos + testavimas',
    description: 'Sprint 1-3 planas, Sprint 4+ backlog, projekto rizikos ir testavimo strategija.',
    content: `
      <div class="slide">
        <div class="slide-badge">Roadmap</div>
        <h1>Roadmap: 3 Sprintai</h1>
        <p class="slide-subtitle">Agile sprintai po 2 savaites — nuo duomenų pamato iki pilnos AI sistemos</p>

        <div class="sprint-timeline">
          <div class="sprint-block open">
            <div class="sprint-header" onclick="this.parentElement.classList.toggle('open')">
              <div class="sprint-title">
                <span class="sprint-num">S1</span> Duomenų Pamatas ir Next.js Karkasas
              </div>
              <div class="sprint-dates">Savaitė 1-2</div>
              <svg class="sprint-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="sprint-body">
              <ul>
                <li>Next.js aplikacija (DIPA OS) + Docker Compose dev aplinka</li>
                <li>CI/CD pipeline: GitHub Actions → Cloud Run</li>
                <li>Monday.com + Clockify API per n8n (webhook receiver)</li>
                <li>Facebook/LinkedIn Ads API sujungimas</li>
                <li>Prisma schema + PostgreSQL inicializacija + seed script</li>
                <li>Rankinio kaštų suvedimo forma</li>
              </ul>
            </div>
          </div>

          <div class="sprint-block">
            <div class="sprint-header" onclick="this.parentElement.classList.toggle('open')">
              <div class="sprint-title">
                <span class="sprint-num">S2</span> AI Skambučių QA ir Newo Integracija
              </div>
              <div class="sprint-dates">Savaitė 3-4</div>
              <svg class="sprint-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="sprint-body">
              <ul>
                <li>Plaud failų atidavimas → Whisper API integracija (audio-to-text)</li>
                <li>LLM promptai vertinimui (QA Scorecards) + Zod JSON validacija</li>
                <li>QA balai ir coaching Next.js dashboarde</li>
                <li>Newo API + Webhook transkriptų grąžinimas</li>
                <li>Newo eskalacijos kelias (sentiment → live handoff)</li>
                <li>GDPR Compliance Layer (consent tracking + RAG indexing check)</li>
                <li>Monday.com / PostgreSQL Reconciliation (WF5)</li>
              </ul>
            </div>
          </div>

          <div class="sprint-block">
            <div class="sprint-header" onclick="this.parentElement.classList.toggle('open')">
              <div class="sprint-title">
                <span class="sprint-num">S3</span> DIPA Co-Pilot ir Išplėstinė Analitika
              </div>
              <div class="sprint-dates">Savaitė 5-6</div>
              <svg class="sprint-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="sprint-body">
              <ul>
                <li>Gilieji indeksai (LVR, CAC, TTR, Core Sales Efficiency)</li>
                <li>Vertex AI paremtas DIPA Co-Pilot + RAG citation support</li>
                <li>Pre-Call Brief dviejų etapų generavimas + Outlook trigger</li>
                <li>Penktadienio ataskaitų automatizacija → Slack/Teams</li>
                <li>Anomaly Detection: CAC spike, Lead Bank tuščias, Win Rate &lt;50%</li>
                <li>Lead Scoring Feedback Loop (Won/Lost → retrain)</li>
                <li>Customer Retention Metrikos (NPS, Churn, Upsell)</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Lead Gyvavimo Ciklas (End-to-End)</h2>
        <div class="diagram-container" data-svg="leadLifecycle" data-scale="0.65"></div>

        <h2>Sprint 4+ Backlog</h2>
        <p>Nekeičia core architektūros — prideda verslo vertės sluoksnius ant to paties PostgreSQL + Monday + RAG pagrindo.</p>
        <div class="card-grid">
          <div class="info-card accent">
            <h3>Pasiūlymas ir sutartys</h3>
            <p>AI juodraštis iš CRM laukų + RAG. E-sign (DocuSign) webhook → Monday „Signed".</p>
          </div>
          <div class="info-card green">
            <h3>Įsigijimas ir sveikata</h3>
            <p>Post-Won onboarding checklist. NPS / CustomerHealth apklausos cron + alertai.</p>
          </div>
          <div class="info-card purple">
            <h3>Marketingas ir rizika</h3>
            <p>LinkedIn sekų šablonai. CAC/ROAS guardrails: automatinis „pause". Retargeting lubos.</p>
          </div>
        </div>

        <div class="diagram-container" data-svg="extendedAutomation"></div>

        <h2>Projekto Rizikos</h2>
        <div class="card-grid">
          <div class="info-card red">
            <h3>Duomenų kokybė</h3>
            <p>Monday.com laukai neužpildyti / nekonzistentiški. <strong>Mitigacija:</strong> WF5 naktinis reconciliation + Slack alertas.</p>
          </div>
          <div class="info-card red">
            <h3>RAG haliucinacijos</h3>
            <p>LLM gali sugeneruoti netikrus duomenis. <strong>Mitigacija:</strong> struktūrizuotas JSON + citavimo nuorodos.</p>
          </div>
          <div class="info-card red">
            <h3>API Rate Limits</h3>
            <p>Facebook/LinkedIn/Rekvizitai throttling. <strong>Mitigacija:</strong> n8n retry + exponential backoff.</p>
          </div>
        </div>
        <div class="card-grid">
          <div class="info-card red">
            <h3>Single Point of Failure</h3>
            <p>n8n orchestrator down = visi WF sustoja. <strong>Mitigacija:</strong> Cloud Run health checks + Slack alertai.</p>
          </div>
          <div class="info-card red">
            <h3>GDPR Consent</h3>
            <p>Skambučių audio apdorojimas be sutikimo. <strong>Mitigacija:</strong> consent flag check prieš Whisper.</p>
          </div>
          <div class="info-card red">
            <h3>Vendor Lock-in</h3>
            <p>Vertex AI / Monday.com priklausomybė. <strong>Mitigacija:</strong> abstrakcijos sluoksnis, multi-model fallback.</p>
          </div>
          <div class="info-card red">
            <h3>Adoption Risk</h3>
            <p>Komanda nepasitiki AI scoring. <strong>Mitigacija:</strong> žmogaus peržiūros periodas (S2), override galimybė.</p>
          </div>
        </div>

        <h2>Testavimo Strategija</h2>
        <div class="card-grid">
          <div class="info-card green">
            <h3>Unit testai</h3>
            <p>Zod schema validacija visiems JSON outputams (QA score, Pre-Call Brief, Lead enrichment).</p>
          </div>
          <div class="info-card green">
            <h3>Integration testai</h3>
            <p>n8n workflow test mode su sample payloadais kiekvienam WF1–WF5.</p>
          </div>
          <div class="info-card green">
            <h3>E2E Smoke Test</h3>
            <p>Naujas lead → Monday → n8n → RAG → DB verifikacija staging aplinkoje.</p>
          </div>
        </div>
        <div class="card-grid">
          <div class="info-card green">
            <h3>QA Scorecard Validacija</h3>
            <p>10 žinomų transkriptų — AI score vs. žmogaus auditas. Tikslumas ≥85%.</p>
          </div>
          <div class="info-card green">
            <h3>Load Test</h3>
            <p>50 concurrent lead ingestions — n8n/Vertex throughput validacija.</p>
          </div>
          <div class="info-card green">
            <h3>Reconciliation Test</h3>
            <p>Tyčia įvesti Monday/PG neatitikimą — patikrinti, ar WF5 pagauna ir alertina.</p>
          </div>
          <div class="info-card green">
            <h3>Regression Suite</h3>
            <p>Automatinis testų paleidimas su kiekvienu deploy per CI/CD pipeline.</p>
          </div>
        </div>
      </div>`,
    diagram: null,
    notes: 'Roadmap + backlog + 7 rizikų ir 7 testavimo metodų apžvalga.',
  },

  // ===== SLIDE 12: Transformation SOP vs DIPA (merged old 15+16) =====
  {
    id: 'slide-12',
    title: 'Transformacija: SOP vs DIPA OS',
    subtitle: 'Prieš vs. Po + SOP PDF palyginimas + integruoti tobulinimai',
    description: 'Penktadienio transformacija, SOP E2E palyginimas su DIPA OS ir 6 integruoti tobulinimai.',
    content: `
      <div class="slide">
        <div class="slide-badge">Transformacija</div>
        <h1>Transformacija: SOP vs DIPA OS</h1>
        <p class="slide-subtitle">Kaip keičiasi komandos darbas — prieš ir po automatizacijos</p>

        <div class="comparison">
          <div class="comparison-col before">
            <h4>Prieš DIPA OS</h4>
            <ul>
              <li>Lauris rankomis skaičiuoja Excel formules</li>
              <li>Ginčijamasi dėl mažai ROI sesijų</li>
              <li>Neaišku, kokios kokybės leadai atėjo</li>
              <li>45-60 min vien statuso atnaujinimams</li>
              <li>Lead į CRM įvedamas ranka, be vienodo score</li>
              <li>Po skambučio — pastabos fragmentuotai</li>
            </ul>
          </div>
          <div class="comparison-col after">
            <h4>Su DIPA OS</h4>
            <ul>
              <li><strong>14:55</strong> — AI generuoja PDF ataskaitą → Slack</li>
              <li><strong>15:00</strong> — Visi atidaro Command Center</li>
              <li><strong>15:00-05</strong> — Marija: AI ataskaita review</li>
              <li><strong>15:05-15</strong> — Greta: Live CAC ir ROAS</li>
              <li><strong>15:15-30</strong> — Call Audit peržiūra + sprendimai</li>
              <li><strong>15:30</strong> — Susitikimas baigtas. <strong>30 min vietoj 60.</strong></li>
            </ul>
          </div>
        </div>

        <div class="info-card yellow">
          <h3>Praktinis Pavyzdys — Penktadienis PRIEŠ vs PO</h3>
          <p><strong>PRIEŠ:</strong> Lauris 2 val. ruošia Excel ataskaitą, Greta skaičiuoja CAC rankiniu būdu, meetingas trunka 55 min, pusė laiko — statuso atnaujinimai.</p>
          <p><strong>PO:</strong> 14:55 AI ataskaita jau Slack'e, visi ateina su skaičiais ekranuose, 30 min fokusuotas sprendimų priėmimas.</p>
        </div>

        <div class="diagram-container" data-svg="weeklyCycle" data-scale="0.65"></div>

        <h2>SOP PDF vs DIPA OS automatizacija</h2>
        <p>Oficialaus E2E proceso (4 takai × 11 etapų) palyginimas su DIPA OS. Ne visi langeliai pilnai automatiniai.</p>

        <div class="comparison">
          <div class="comparison-col before">
            <h4>Tipinis rankinis E2E (pagal PDF)</h4>
            <ul>
              <li>Lead į CRM įvedamas ranka (Lauris)</li>
              <li>C/D šaltieji — rankiniai skambučiai</li>
              <li>Prieš pokalbį — Google / atmintis</li>
              <li>ROI planavimas — Excel ir diskusijos</li>
              <li>Po skambučio — pastabos be QA JSON</li>
            </ul>
          </div>
          <div class="comparison-col after">
            <h4>Su DIPA OS (target būsena)</h4>
            <ul>
              <li><strong>WF1:</strong> ingest + RAG scoring (A/B/C/D) → Monday</li>
              <li><strong>Newo:</strong> C lygis automatiškai; A/B → Lauriui / Marijai</li>
              <li><strong>WF2:</strong> Pre-Call Brief iš 3 RAG sluoksnių</li>
              <li><strong>WF3:</strong> QA scorecard → CRM + DB + follow-up</li>
              <li>Command Center vietoj Excel</li>
            </ul>
          </div>
        </div>

        <div class="diagram-container" data-svg="pdfVsAutomation" data-scale="0.65"></div>

        <h2>Integruoti Sistemos Tobulinimai</h2>
        <p>6 tobulinimai suprojektuoti ir integruoti į DIPA OS architektūrą, DB schemą ir užduočių planą.</p>
        <div class="card-grid">
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> Lead Scoring Feedback Loop</h3>
            <p><code>ScoringFeedback</code> modelis. Won/Lost rezultatai automatiškai grįžta į RAG scoring. <strong>S3</strong></p>
          </div>
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> Klientų Retention Metrikos</h3>
            <p><code>CustomerHealth</code> modelis su NPS, churnRisk, upsellPotential. <strong>S3</strong></p>
          </div>
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> GDPR Compliance Layer</h3>
            <p><code>ConsentLog</code> modelis. Consent forma, data retention, right-to-deletion. <strong>S2</strong></p>
          </div>
        </div>
        <div class="card-grid">
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> Data Reconciliation (WF5)</h3>
            <p>Naktinis Monday.com vs PostgreSQL palyginimas. Slack alert. <strong>S2</strong></p>
          </div>
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> Newo Eskalacijos Kelias</h3>
            <p>Sentiment analizė + live handoff + Monday Urgent Flag. <strong>S2</strong></p>
          </div>
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> Pre-Call Brief Dviejų Etapų</h3>
            <p>Naktinis Cron + T−15 refresh. Eliminuoja API latency riziką. <strong>S3</strong></p>
          </div>
        </div>
      </div>`,
    diagram: null,
    notes: 'Transformacija su before/after, SOP palyginimas ir 6 integruoti tobulinimai.',
  },

  // ===== SLIDE 13: E2E Matrix + Handoff + GATE (merged old 18+19) =====
  {
    id: 'slide-13',
    title: 'E2E Matrica, GATE ir Handoff',
    subtitle: '11 etapų × 4 takai + Sales ↔ Delivery perdavimas',
    description: 'E2E padengimo analizė, GATE validacijos ir Sales/Delivery handoff su TOC savaitės apribojimu.',
    content: `
      <div class="slide">
        <div class="slide-badge">SOP × DIPA</div>
        <h1>E2E Matrica, GATE ir Handoff</h1>
        <p class="slide-subtitle">Kiekvienas etapas turi aiškų savininką, KPI ir GATE — tai galima perkelti į Monday laukus, n8n trigerius ir RAG kontekstą.</p>

        <h2>11 etapų grandinė (SOP)</h2>
        <div class="diagram-container" data-svg="e2eElevenStages" data-scale="0.65"></div>

        <div class="info-card accent">
          <h3>Kur DIPA OS jau stipri</h3>
          <p><strong>LEAD → CLOSING:</strong> ingest, scoring, Newo, Pre/Post call, QA, Ads KPI, penktadienio suvestinė — pagrindiniai WFs ir RAG sutampa su Marketing + Sales takais.</p>
        </div>

        <div class="info-card yellow">
          <h3>Kur dar reikia papildymo</h3>
          <ul>
            <li><strong>ONBOARDING → WORKSHOP:</strong> Delivery takas — kickoff, prep, dalyvavimas: procesas + checklist, ne pilnas robotas.</li>
            <li><strong>FOLLOW-UP → ROI → UPSELL:</strong> CustomerHealth, NPS, RAG jau numatyta; pilnas „Proposal Assistant" — backlog.</li>
          </ul>
        </div>

        <h2>Padengimo lentelė</h2>
        <div class="e2e-table-wrap">
          <table class="e2e-table">
            <thead>
              <tr><th>Takas</th><th>DIPA OS sutapimas</th><th>Būsena</th></tr>
            </thead>
            <tbody>
              <tr><td>Marketing (Greta)</td><td>Ads API, lead volume, response SLA, CRM per WF1</td><td class="cov-full">Didelis</td></tr>
              <tr><td>Sales (Lauris / Marija)</td><td>RAG, Brief, QA JSON, pipeline, Command Center</td><td class="cov-full">Didelis</td></tr>
              <tr><td>Delivery (Mantas)</td><td>Post-Won checklist, kickoff, ROI/NPS signalai</td><td class="cov-part">Vidutinis + backlog</td></tr>
              <tr><td>AI agentai</td><td>Co-Pilot, WF2/3, proposal/uptime idėjos</td><td class="cov-part">Funkcijos dalinai; kai kur backlog</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Sales ↔ Delivery Handoff</h2>
        <div class="comparison">
          <div class="comparison-col sales-to-delivery">
            <h4>Sales → Delivery</h4>
            <p><strong>Privalomas paketas</strong> prieš kickoff:</p>
            <ul>
              <li>Kliento <strong>skausmas</strong>, <strong>pažadas</strong>, <strong>tikslai</strong></li>
              <li><strong>Dalyviai</strong> ir <strong>rizikos</strong></li>
              <li>Susieti su Won etapu — ne tik tekstas el. laiške</li>
            </ul>
          </div>
          <div class="comparison-col delivery-to-sales">
            <h4>Delivery → Sales</h4>
            <p><strong>Grįžtamasis ryšys</strong> upsell ir forecast'ui:</p>
            <ul>
              <li><strong>Rezultatai</strong> ir <strong>ROI signalai</strong></li>
              <li><strong>Upsell galimybės</strong> (įrašyta CRM)</li>
            </ul>
          </div>
        </div>

        <div class="diagram-container" data-svg="handoffClosingToDelivery"></div>

        <div class="info-card purple">
          <h3>GATE kaip programinė logika</h3>
          <p>Kiekvienas SOP „GATE" = <strong>privalomi CRM laukai</strong> + automatizuotas patikrinimas. Etapas negali pereiti be žalio signalo arba vadovo override su priežastimi.</p>
        </div>

        <div class="info-card red">
          <h3>TOC — Constraint of the Week</h3>
          <p><strong>Throughput:</strong> Won deals / savaitę. <strong>Buffer:</strong> ROI užrezervuota / NPS ≥ 8. <strong>Stop rule:</strong> jei constraint neišspręstas — nestumti kitų iniciatyvų.</p>
        </div>

        <div class="diagram-container" data-svg="tocWeekConstraint"></div>

        <h2>Delivery → Upsell Grįžtamoji Kilpa</h2>
        <p class="slide-subtitle">Kliento dosjė iš workshopų ir delivery veda į naują pardavimą — „uždaras ratas"</p>
        <div class="diagram-container" data-svg="deliveryUpsellLoop" data-scale="0.65"></div>

        <div class="card-grid">
          <div class="info-card green">
            <h3>Kliento dosjė (po Won)</h3>
            <ul>
              <li>Workshopų transkriptai + pastabos</li>
              <li>Namų darbai + anketų atsakymai</li>
              <li>Delivery pokalbiai (įrašymas + santrauka)</li>
              <li>Pamokų progresas, užklausos, skausmai</li>
            </ul>
          </div>
          <div class="info-card accent">
            <h3>AI signalai upsell'ui</h3>
            <ul>
              <li>„Workshopo metu išspręsta 1 problema → matoma 2-a"</li>
              <li>„Klientas 3 kartus paminėjo X įrankį, kurio mes siūlome"</li>
              <li>„NPS 9+ su komentaru apie papildomą poreikį"</li>
              <li>„Banke 50 įmonių tam pačiam poreikiui — cross-sell kampanija"</li>
            </ul>
          </div>
          <div class="info-card purple">
            <h3>Veiksmas</h3>
            <p>AI sugeneruoja upsell pasiūlymo juodraštį į Monday (naujas pipeline įrašas) + pastabas pardavėjui iš delivery konteksto — pardavėjas nebekopijuoja iš galvos ar Excel.</p>
          </div>
        </div>
      </div>`,
    diagram: null,
    notes: 'E2E matrica + handoff + GATE validacijos + TOC savaitės constraint.',
  },

  // ===== SLIDE 14: AI Agents (old 20, adjusted) =====
  {
    id: 'slide-14',
    title: 'AI agentai (SOP eilė) ↔ DIPA stack',
    subtitle: 'Kas jau yra produkte, kas — roadmap',
    description: '1:1 atitikmuo tarp PDF AI agentų eilės ir konkrečių modulių; 8 agentų tipai aptarnauja 11 E2E etapų.',
    content: `
      <div class="slide">
        <div class="slide-badge">AI layer</div>
        <h1>Pilnas AI sluoksnio padengimas</h1>
        <p class="slide-subtitle">E2E matrica (skaidrė 13) apibrėžia 11 etapų. Žemiau — <strong>8 AI agentų tipai</strong>, kurie aptarnauja šiuos etapus, ir jų būsena DIPA OS.</p>

        <div class="e2e-table-wrap">
          <table class="e2e-table">
            <thead>
              <tr><th>Agentas (SOP)</th><th>DIPA atitikmuo</th><th>Būsena</th></tr>
            </thead>
            <tbody>
              <tr><td>Lead Qualification Assistant</td><td>WF1 + RAG scoring + Newo C</td><td class="cov-full">Live / branduolys</td></tr>
              <tr><td>Discovery Copilot</td><td>WF3 QA, Co-Pilot, susitikimų santraukos → RAG</td><td class="cov-part">Dauguma; tobulinti JTBD</td></tr>
              <tr><td>Proposal Assistant</td><td>Backlog: šablonai + RAG + CRM juodraštis</td><td class="cov-plan">Roadmap (S4+)</td></tr>
              <tr><td>Follow-up Assistant (Closing)</td><td>Post-call JSON → follow-up juodraštis + Outlook</td><td class="cov-part">Dalinis</td></tr>
              <tr><td>Prep Assistant (Onb. / Prep)</td><td>Post-Won checklist, kickoff agenda (n8n + RAG)</td><td class="cov-plan">Backlog / S2–S3</td></tr>
              <tr><td>Live Facilitation (Workshop)</td><td>Žmogus + galimos pastabos į RAG po sesijos</td><td class="cov-plan">Minimal — pagal SOP</td></tr>
              <tr><td>Insight Assistant (Follow-up/ROI)</td><td>WF4 Strategic Memory, CustomerHealth, NPS</td><td class="cov-part">Branduolys + plėtra</td></tr>
              <tr><td>Upsell Assistant</td><td>ROI signalas → pasiūlymo juodraštis, pipeline laukas</td><td class="cov-plan">Roadmap (S4+)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="info-card green">
          <h3>Išvada</h3>
          <p><strong>Visi</strong> proceso automatizacijos <strong>kryptys</strong> yra paliestos architektūroje arba backlog'e. Pilnas „vieno mygtuko" lygis visur neįmanomas ir nereikalingas — kritiniai GATE ir workshop lieka žmogaus atsakomybė; sistema užtikrina <strong>seką, duomenis ir matomumą</strong>.</p>
        </div>
      </div>`,
    diagram: null,
    notes: '8 AI agentų tipai aptarnauja 11 E2E etapų. Atnaujinti lentelę po kiekvieno release.',
  },

  // ═══════════════════════════════════════════════════════════════
  // SLIDE 15: DIPA Filosofija (Igoris) + Nevo integracija
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'slide-15',
    title: 'DIPA Filosofija — verslo progresas, ne AI įrankiai',
    subtitle: 'Data Intelligent Productivity Architecture (Igoris)',
    description: 'DIPA principai: vertės pažadas, matavimo X3 logika, transformacija, Nevo integracija.',
    content: `
      <div class="slide">
        <div class="slide-badge">Filosofija</div>
        <h1>DIPA Filosofija</h1>
        <p class="slide-subtitle">Neparduodame AI — parduodame <strong>verslo progresą</strong>. Rinkoje trūksta AI vertės matavimo įrankių; DIPA šią spragą užpildo.</p>

        <h2>Vertės Pažadas — 4 Etapai</h2>
        <div class="card-grid">
          <div class="info-card accent">
            <h3>1. Aiškumas</h3>
            <p>Dirbtuvės ir diagnostika parodo, <strong>kur AI kuria vertę</strong>. Nustatoma brandos ir vertės erdvė.</p>
          </div>
          <div class="info-card yellow">
            <h3>2. Prioritetai</h3>
            <p>Pirmieji scenarijai. Atrenkame ten, kur <strong>didžiausia grąža</strong> — ne viską iš karto.</p>
          </div>
          <div class="info-card green">
            <h3>3. Įgyvendinimas</h3>
            <p>Realus naudojimo startas, ne prototipas. <strong>Praktika &gt; teorija.</strong></p>
          </div>
          <div class="info-card purple">
            <h3>4. Pamatuojama Vertė</h3>
            <p>Matavimas &gt; pažadas. Skaičiuojame mažesnes klaidas, didesnį pajėgumą, pajamas, sutaupytą laiką, mažesnius kaštus.</p>
          </div>
        </div>

        <h2>Matavimo Logika — X3</h2>
        <div class="info-card accent">
          <h3>Grąža ≥ 3× investicija</h3>
          <p>Kiekvienas AI sprendimas privalo grąžinti <strong>minimum 3× daugiau</strong>, nei į jį investuojama. Jei grąžos nėra — darbas atliktas nekokybiškai. Tai galioja tiek Eimanto valandoms, tiek išorės biudžetui, tiek komandos laikui.</p>
          <div class="formula">Grąža = (Pajamos_su_DIPA − Pajamos_be_DIPA + Kaštų_sutaupymas) / Investicija_į_DIPA</div>
          <p><strong>Ribinis atvejis:</strong> jei MVP kainavo 240 h + 3 000 € išorė, po 3 mėn. DIPA turi sugeneruoti <strong>≥ 3× šią vertę</strong> (matuojama papildomomis pajamomis, sutaupytomis valandomis, išvengtomis CAC klaidomis).</p>
        </div>

        <h2>Transformacijos Principai</h2>
        <div class="card-grid">
          <div class="info-card yellow">
            <h3>Žmonės priešinsis</h3>
            <p>Natūralu. Todėl reikia <strong>įpročių formavimo</strong> ir pardavimo vidinei komandai — vienos aiškios pirmos skaidrės principu („nauda &lt; 10 sek.").</p>
          </div>
          <div class="info-card red">
            <h3>Flow &gt; asistentai</h3>
            <p>Pirma pademonstruojamas <strong>pavienio agento</strong> kuriamas efektas; tada statomas <strong>tarpasistentinis srautas</strong>. Kitaip — chaosas.</p>
          </div>
          <div class="info-card green">
            <h3>Startas &gt; įkvėpimas</h3>
            <p>„Nespėliok" taisyklė iš RAG: jei duomenų nėra — sakyti „nerandu". MVP &gt; perfekcionizmas. Sluoksniuotas augimas.</p>
          </div>
        </div>

        <div class="info-card purple">
          <h3>DIPA Identitetas — „Konstitucija"</h3>
          <p><em>Kas esame:</em> Data Intelligent Productivity Architects. <em>Ką žadame:</em> verslo progresą per AI vertės matavimą. <em>Ką dirbame:</em> dirbtuves, diagnostiką, pirmus scenarijus, realų startą, tolesnį diegimą. <strong>Delivery nėra programa — tai įvykęs pokytis.</strong></p>
        </div>

        <h2>Nevo Integracijos Pozicija</h2>
        <div class="info-card accent">
          <h3>22 d. susitikimas — ko norime iš Nevo</h3>
          <ul>
            <li><strong>Aiški vieta mūsų sistemoje:</strong> Nevo = outbound/inbound skambučių agentas C lygiui + eskalacija į Lauriui/Marijai</li>
            <li><strong>Integracija per webhook:</strong> transkriptai + sentiment + intent score → WF3 → RAG</li>
            <li><strong>Kuriama „revenue" sistema:</strong> marketingas + pardavimai + integruotas pokalbių robotas = vienas flow</li>
            <li><strong>Igorio veiksmas:</strong> parengti pristatymą (iki 22 d.) — mūsų revenue vizija, Nevo vieta, tarpusavio lūkesčiai</li>
          </ul>
        </div>
      </div>`,
    diagram: null,
    notes: 'Igorio DIPA framework: vertės pažadas, X3 matavimas, transformacijos principai, Nevo pozicionavimas.',
  },

  // ═══════════════════════════════════════════════════════════════
  // SLIDE 16: JTBD Asistentas — Multi-Agent + OPPM
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'slide-16',
    title: 'JTBD Asistentas + OPPM Integracija',
    subtitle: 'Multiagentinė architektūra DIPA RAG platformoje',
    description: 'JTBD strategijos sluoksnio sujungimas su OPPM vykdymo sluoksniu per orchestrator + 7 sub-agentus.',
    content: `
      <div class="slide">
        <div class="slide-badge">AI Strategija</div>
        <h1>JTBD Asistentas + OPPM Integracija</h1>
        <p class="slide-subtitle">Strategijos (JTBD) ir vykdymo (OPPM) sluoksnių sujungimas per multiagentinę architektūrą DIPA RAG platformoje</p>

        <h2>Problema, kurią sprendžiame</h2>
        <div class="card-grid">
          <div class="info-card red">
            <h3>Šiandien — fragmentuota</h3>
            <ul>
              <li>JTBD analizė — atskiras ChatGPT MVP asistentas</li>
              <li>Svetainių analizė — atskiras ChatGPT MVP</li>
              <li>OPPM / 1PPM — atskiras RAG sprendimas</li>
              <li><strong>Rizika:</strong> viešo GPT instrukcijos gali būti ištraukiamos → know-how nutekėjimas</li>
            </ul>
          </div>
          <div class="info-card green">
            <h3>DIPA vizija — vientisa</h3>
            <ul>
              <li>Vienas modulis DIPA RAG platformoje</li>
              <li>Vartotojo kelias: vedimas nuo verslo aprašymo iki OPPM projekto</li>
              <li><strong>Know-how RAG žinių sluoksnyje</strong> (ne UI prompt'e)</li>
              <li>Vienas mygtukas „Perkelti į OPPM" — nereikia kopijuoti ranka</li>
            </ul>
          </div>
        </div>

        <h2>Multiagentinė Architektūra</h2>
        <div class="diagram-container" data-svg="jtbdMultiAgent" data-scale="0.55"></div>

        <div class="card-grid">
          <div class="info-card accent">
            <h3>Orchestrator</h3>
            <p>Valdo srautą, būsenas, klausimų seką, sub-agentų iškvietimą, rezultatų sujungimą, <strong>validaciją prieš OPPM perdavimą</strong>.</p>
          </div>
          <div class="info-card purple">
            <h3>A · Intake / Session Manager</h3>
            <p>Sesijos pradžia, projekto tipo identifikavimas, konteksto rinkimas, <strong>skip logika</strong> (ar vartotojas turi svetainę).</p>
          </div>
          <div class="info-card purple">
            <h3>B · JTBD Strategist</h3>
            <p>JTBD klausimai: auditorija, <em>job</em>, skausmai, vertė, pažadas, emocinis/funkcinis/filosofinis lygmenys, įmonės DNR, prieštaravimai.</p>
          </div>
          <div class="info-card purple">
            <h3>C · Competitive / Positioning</h3>
            <p>Konkurentų analizė, skirtumų išgryninimas, <strong>unikalaus mechanizmo</strong> identifikavimas, vertės pasiūlymo patikslinimas.</p>
          </div>
        </div>

        <div class="card-grid">
          <div class="info-card purple">
            <h3>D · Website Analysis</h3>
            <p>URL + screenshot → <strong>2 metodai</strong>: 12 produktinių kriterijų (0/1/2 brandos); UX Honeycomb / AIDA / StoryBrand / JTBD / CCD frameworkai. <em>Skip galima — be svetainės.</em></p>
          </div>
          <div class="info-card purple">
            <h3>E · 90-Day Planner</h3>
            <p>Prioritetai, iniciatyvos, atsakomybių tipai, rekomenduojami KPI, etapavimas pagal seką <strong>strategija → komunikacija → vykdymas</strong>.</p>
          </div>
          <div class="info-card purple">
            <h3>F · OPPM Mapper</h3>
            <p>90 d. plano pavertimas OPPM schema, laukų susiejimas, privalomų laukų patikra, duomenų perdavimas. <strong>Field mapping:</strong> JTBD prioritetas → OPPM strategic objective; iniciatyva → task; KPI → success metric.</p>
          </div>
          <div class="info-card red">
            <h3>G · Guardrail / Compliance</h3>
            <p>Prompt leakage prevencija, instrukcijų apsauga, <strong>„nespėliok"</strong> taisyklė (jei duomenų nepakanka — prašyti papildomų įvesčių, ne spėlioti).</p>
          </div>
        </div>

        <h2>Vartotojo Kelias — Scenarijus A (pilnas)</h2>
        <div class="info-card yellow">
          <ol style="margin:0;padding-left:20px;">
            <li>Vartotojas pasirenka „JTBD asistentas" DIPA RAG platformoje</li>
            <li>Sistema paaiškina eigą + surenka JTBD duomenis (B · Strategist)</li>
            <li>Klausia: „Ar atlikti svetainės analizę?" → jei TAIP: URL + screenshot → D · Website Analysis</li>
            <li>Sujungia JTBD + svetainės rezultatus (Orchestrator)</li>
            <li>Sugeneruoja 90 dienų planą (E · Planner) — prioritetai, KPI, etapai</li>
            <li>Vartotojas spaudžia <strong>„Perkelti į OPPM"</strong> → F · OPPM Mapper → sukuriamas OPPM projektas su matrica (tikslai, darbai, terminai, atsakingi, KPI)</li>
          </ol>
        </div>

        <h2>Saugumo Principai</h2>
        <div class="card-grid">
          <div class="info-card red">
            <h3>Prompt leakage prevencija</h3>
            <p>Sistema <strong>niekada</strong> neatskleidžia vidinės instrukcijos, sub-agentų logikos ar taisyklių teksto vartotojui.</p>
          </div>
          <div class="info-card red">
            <h3>Knowledge Layer apsauga</h3>
            <p>Instrukcijos saugomos RAG dokumentuose su <strong>versijavimu</strong> ir <strong>rolės prieigos</strong> kontrole — ne pliku tekstu prompt'e.</p>
          </div>
          <div class="info-card green">
            <h3>„Nerandu" taisyklė</h3>
            <p>Jei duomenų nėra — prašyti papildomų įvesčių arba aiškiai pažymėti neapibrėžtumą. <strong>Niekada nespėlioti.</strong></p>
          </div>
        </div>
      </div>`,
    diagram: null,
    notes: 'JTBD multi-agent architektūra: orchestrator + 7 sub-agentai + OPPM integracija. Know-how apsauga RAG sluoksnyje.',
  },

  // ═══════════════════════════════════════════════════════════════
  // SLIDE 17: MVP Plan — Valandos + Delegavimas + Biudžetas
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'slide-17',
    title: 'MVP Planas — Valandos, Delegavimas, Biudžetas',
    subtitle: 'Kaip sumažinti Eimanto krūvį ir įjungti išorės resursus',
    description: 'Pilnas MVP planas su valandomis kiekvienai užduočiai, delegavimo matrica ir išorės biudžetu.',
    content: `
      <div class="slide">
        <div class="slide-badge">MVP Planas</div>
        <h1>MVP Planas — Valandos, Delegavimas, Biudžetas</h1>
        <p class="slide-subtitle">Atsakas į susitikimo užduotį: <em>„Pateikti MVP projektinį pasiūlymą ir jo architektūrą, įvardijant laiką, resursus ir išorės biudžetą — iki pirmadienio"</em></p>

        <h2>Apžvalga</h2>
        <div class="mvp-summary-grid">
          <div class="owner-card" style="border-left-color:#3b82f6;">
            <h4>Eimantas</h4>
            <div class="owner-hours">117 h <small>/ 6 sav.</small></div>
            <p>Core architektūra, Prisma, RAG, LLM moduliai, Co-Pilot. Kritinis kelias.</p>
          </div>
          <div class="owner-card" style="border-left-color:#0f766e;">
            <h4>External n8n dev</h4>
            <div class="owner-hours">70 h</div>
            <p>WF1–WF5, Monday/Outlook/Clockify/Ads API, webhook endpoints. <strong>Kandidatas: ukrainietis (LT/EN).</strong></p>
          </div>
          <div class="owner-card" style="border-left-color:#0891b2;">
            <h4>External dev (frontend)</h4>
            <div class="owner-hours">29 h</div>
            <p>Shadcn polinimas, Sales Cockpit, Pre-Call Brief UI, Command Center tree view.</p>
          </div>
          <div class="owner-card" style="border-left-color:#7c3aed;">
            <h4>Igoris</h4>
            <div class="owner-hours">16 h</div>
            <p>ICP kriterijai, QA promptai, RAG turinys (Strategic Brain), Nevo pristatymas.</p>
          </div>
          <div class="owner-card" style="border-left-color:#ea580c;">
            <h4>Mantas</h4>
            <div class="owner-hours">12 h</div>
            <p>Monday laukų žemėlapis, delivery checklist, SOP handoff, kandidato onboarding.</p>
          </div>
          <div class="owner-card" style="border-left-color:#16a34a;">
            <h4>Komanda (UAT)</h4>
            <div class="owner-hours">8 h</div>
            <p>QA scorecard validacija, E2E smoke testai staging'e.</p>
          </div>
        </div>

        <h2>Delegavimo Matrica</h2>
        <div class="diagram-container" data-svg="mvpDelegation" data-scale="0.55"></div>

        <h2>Sprintų Suvestinė</h2>
        <table class="hours-table">
          <thead>
            <tr><th>Sprintas</th><th>Fokusas</th><th class="num">Eimantas</th><th class="num">N8N</th><th class="num">Dev</th><th class="num">Igoris</th><th class="num">Mantas</th><th class="num">Komanda</th><th class="num">Viso</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>S1</strong> · 1–2 sav.</td><td>Duomenų pamatas + Next.js karkasas</td><td class="num">26</td><td class="num">23</td><td class="num">10</td><td class="num">6</td><td class="num">7</td><td class="num">0</td><td class="num"><strong>72</strong></td></tr>
            <tr><td><strong>S2</strong> · 3–4 sav.</td><td>AI QA + Newo + RAG + GDPR</td><td class="num">41</td><td class="num">31</td><td class="num">5</td><td class="num">10</td><td class="num">0</td><td class="num">4</td><td class="num"><strong>91</strong></td></tr>
            <tr><td><strong>S3</strong> · 5–6 sav.</td><td>Co-Pilot + Gilieji KPI + Anomaly</td><td class="num">50</td><td class="num">16</td><td class="num">14</td><td class="num">0</td><td class="num">0</td><td class="num">4</td><td class="num"><strong>84</strong></td></tr>
          </tbody>
          <tfoot>
            <tr><td colspan="2">MVP VISO (S1–S3)</td><td class="num">117</td><td class="num">70</td><td class="num">29</td><td class="num">16</td><td class="num">7</td><td class="num">8</td><td class="num"><strong>247 h</strong></td></tr>
            <tr><td colspan="2">S4+ Backlog (JTBD + Delivery Upsell + Nevo)</td><td class="num">~90</td><td class="num">~8</td><td class="num">0</td><td class="num">~20</td><td class="num">~12</td><td class="num">0</td><td class="num"><strong>~130 h</strong></td></tr>
          </tfoot>
        </table>

        <h2>Išorės Biudžetas (skaičiavimas)</h2>
        <div class="card-grid">
          <div class="info-card accent">
            <h3>Kūrimo kaštai (MVP)</h3>
            <ul>
              <li><strong>N8N dev 70 h × 30 €/h</strong> ≈ <strong>2 100 €</strong></li>
              <li><strong>Frontend dev 29 h × 30 €/h</strong> ≈ <strong>870 €</strong></li>
              <li><strong>Iš viso išorės kūrimas:</strong> <u>~2 970 €</u></li>
            </ul>
          </div>
          <div class="info-card yellow">
            <h3>Infrastruktūra (/ mėn.)</h3>
            <ul>
              <li>Cloud Run + PostgreSQL: ~150 €</li>
              <li>Vertex AI + Gemini 2.5 Pro: ~200 €</li>
              <li>OpenRouter (fallback): ~50 €</li>
              <li>Whisper API: ~50 €</li>
              <li>n8n self-hosted: ~20 €</li>
              <li><strong>Iš viso:</strong> <u>~470 €/mėn.</u></li>
            </ul>
          </div>
          <div class="info-card green">
            <h3>3 mėn. DIPA MVP</h3>
            <ul>
              <li>Išorės kūrimas: 2 970 €</li>
              <li>Infra (3 mėn.): 1 410 €</li>
              <li>Rezervas 15%: 660 €</li>
              <li><strong>Iš viso:</strong> <u>~5 040 €</u></li>
            </ul>
          </div>
        </div>

        <h2>Eimanto Krūvio Mažinimas</h2>
        <div class="comparison">
          <div class="comparison-col before">
            <h4>Jei viskas Eimantui (247 h)</h4>
            <ul>
              <li>Prie 20 h/sav. → ~12 savaičių (3 mėn.)</li>
              <li>Prie 30 h/sav. → ~8 savaičių (2 mėn.)</li>
              <li>Kritinis kelias: architektūra + n8n + UI lygiagrečiai</li>
              <li>Rizika: deadline'ų praradimas, burnout</li>
            </ul>
          </div>
          <div class="comparison-col after">
            <h4>Su išorės pagalba (117 h)</h4>
            <ul>
              <li>Prie 20 h/sav. → <strong>~6 sav.</strong> (sutampa su planu)</li>
              <li>Eimantas fokuse: architektūra, RAG, LLM — <em>core know-how</em></li>
              <li>n8n + UI paraleliai — nepriklausomi streamai</li>
              <li>Investicija: <strong>~3 000 €</strong> kūrimo (žiūr. X3 logika skaidrėje 15)</li>
            </ul>
          </div>
        </div>

        <h2>Delegavimo Principai (kur išorė tinka)</h2>
        <div class="card-grid">
          <div class="info-card green">
            <h3>✓ Tinka deleguoti</h3>
            <ul>
              <li><strong>n8n workflow'ai</strong> — aiškūs specifikacijomis, API integracijos</li>
              <li><strong>UI komponentai</strong> — Figma maketas, Shadcn patterns</li>
              <li><strong>Turinys (Igoris/Mantas):</strong> QA rubrika, delivery checklistai, ICP kriterijai</li>
              <li><strong>Testavimas:</strong> UAT, scorecard validacija</li>
            </ul>
          </div>
          <div class="info-card red">
            <h3>✗ Lieka Eimantui</h3>
            <ul>
              <li><strong>Architektūra</strong> — duomenų modeliai, srautų dizainas</li>
              <li><strong>RAG + embedding</strong> — strateginis know-how</li>
              <li><strong>LLM promptai + integracija</strong> — visos sistemos centras</li>
              <li><strong>Guardrail + security</strong> — rizikos mažinimas</li>
            </ul>
          </div>
        </div>

        <h2>Rizikos ir Sprendimai</h2>
        <div class="card-grid">
          <div class="info-card yellow">
            <h3>Ukrainiečio kandidato rizika</h3>
            <p><strong>Mitigacija:</strong> Igoris atlieka test skambutį (LT/EN vertinimas), Mantas duoda n8n užduotį → savaitės trial prieš pilną angažavimą. Veiksmas: skaidrė 17 → task t-4-5.</p>
          </div>
          <div class="info-card yellow">
            <h3>Infra kaštai augs</h3>
            <p><strong>Mitigacija:</strong> S1 nustatyti monthly budget alertus GCP'e; Anomaly Detection kataloguoja LLM užklausų šuolius; mėnesinis ROI review pagal X3 logiką.</p>
          </div>
          <div class="info-card yellow">
            <h3>Scope creep (JTBD į MVP)</h3>
            <p><strong>Mitigacija:</strong> JTBD multi-agent — <strong>S4+ backlog</strong>, ne MVP. MVP = S1–S3 (Sales OS branduolys). JTBD pradedamas tik po MVP release + X3 įvertinimo.</p>
          </div>
        </div>

        <div class="info-card accent">
          <h3>Veiksmų planas iki pirmadienio</h3>
          <ul>
            <li><strong>Pirmadienis:</strong> šis MVP pasiūlymas (atlikta) + Eimanto sandbox'as S1 pirmosios dienos</li>
            <li><strong>Antradienis–trečiadienis:</strong> ukrainiečio test skambutis + n8n užduotis (Igoris + Mantas)</li>
            <li><strong>Ketvirtadienis:</strong> Figma Sales Cockpit maketas → external dev briefas</li>
            <li><strong>Penktadienis:</strong> S1 Kick-off — Monday laukų audit (Mantas) + ICP kriterijai (Igoris)</li>
            <li><strong>22 d.:</strong> Nevo integracijos pristatymas (Igoris)</li>
          </ul>
        </div>
      </div>`,
    diagram: null,
    notes: 'MVP planas su valandomis, delegavimu ir biudžetu. Atsakas į susitikimo užduotį. Eimantas 117h, išorė ~3k€.',
  },
];
