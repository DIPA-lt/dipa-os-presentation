const SLIDES = [
  // ===== SLIDE 1: Title =====
  {
    id: 'slide-1',
    title: 'DIPA OS',
    subtitle: 'Dirbtinio Intelekto Produktyvumo Architektai — Operacinė Sistema',
    description: 'Centralizuota pardavimų valdymo platforma, pastatyta ant LEAN ir TOC metodologijų.',
    content: `
      <div class="title-slide">
        <div class="slide-badge">v1.0 — Interaktyvi Prezentacija</div>
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

        <div class="card-grid">
          <div class="info-card accent">
            <h3>LEAN — Muda Eliminavimas</h3>
            <p>Tikslas: eliminuoti viską, kas nekuria tiesioginės vertės (ROI sesijų ir uždarymų).</p>
            <ul>
              <li><strong>Laurio 23 val.</strong> — rankinis skambučių apdorojimas → AI automatizacija</li>
              <li><strong>Rankinis duomenų vedimas</strong> iš Facebook Ads → n8n API integracija</li>
              <li><strong>Google paieškos</strong> prieš skambutį → Pre-Call Brief AI</li>
              <li><strong>Status update</strong> susitikimai → Command Center live duomenys</li>
            </ul>
          </div>
          <div class="info-card purple">
            <h3>TOC — Apribojimų Teorija</h3>
            <p><strong>Bottleneck:</strong> Marijos laikas ir Core Sales pralaidumas.</p>
            <p>Pagal TOC, visa sistema (Marketingas, Newo, n8n) turi būti subordinuota taip, kad Bottleneck:</p>
            <ul>
              <li>Visada maitinamas <strong>tik A/B kokybės</strong> leadais</li>
              <li><strong>Niekada nestovi</strong> be darbo</li>
              <li>Overhead laikas <strong>minimizuotas iki &lt;15%</strong></li>
            </ul>
          </div>
        </div>

        <h2>TOC 5-žingsnių Ciklas</h2>
        <div class="diagram-container" data-diagram="tocFlow"></div>

        <h2>Muda → Automatizacija</h2>
        <div class="diagram-container" data-diagram="leanMuda"></div>
      </div>`,
    diagram: null,
    notes: 'TOC identifikuoja bottleneck (Marija), LEAN eliminuoja waste. Visa sistema subordinuojama.',
  },

  // ===== SLIDE 3: System Architecture =====
  {
    id: 'slide-3',
    title: 'Sistemos Architektūra',
    subtitle: 'DIPA OS — Next.js centrinis valdymo pultas',
    description: 'Pilna sistemos architektūra: Next.js, n8n, Monday.com, Vertex AI, Newo.',
    content: `
      <div class="slide">
        <div class="slide-badge">Architektūra</div>
        <h1>DIPA OS Sistemos Architektūra</h1>
        <p class="slide-subtitle">Next.js aplikacija, jungianti visas platformas per n8n automatizacijas ir AI sluoksnį</p>
        <div class="diagram-container" data-diagram="systemArchitecture"></div>

        <div class="card-grid">
          <div class="info-card accent">
            <h3>Frontend: Next.js 14+</h3>
            <p>TypeScript, Tailwind CSS, Shadcn/UI. Trijų vaizdų dashboard: Sales Cockpit, QA Module, Command Center.</p>
          </div>
          <div class="info-card green">
            <h3>Backend: n8n + API Routes</h3>
            <p>4 pagrindiniai n8n workflows. Next.js API routes kaip BFF (Backend-for-Frontend) proksiai.</p>
          </div>
          <div class="info-card purple">
            <h3>AI: Vertex AI + LLM</h3>
            <p>RAG sistema su 3 duomenų sluoksniais. GPT-4o / Claude 3.5 skambučių analizei. Whisper transkripcijai.</p>
          </div>
        </div>
      </div>`,
    diagram: null,
    notes: 'Big picture — kaip visos sistemos sujungtos. Pabrėžti n8n kaip centrinį orchestratorių.',
  },

  // ===== SLIDE 4: RAG Data Architecture =====
  {
    id: 'slide-4',
    title: 'RAG Duomenų Architektūra',
    subtitle: '3 sluoksnių „Smegenys" — Vertex AI',
    description: 'Trijų sluoksnių RAG sistema: išoriniai klientų duomenys, vidinė patirtis, strateginės žinios.',
    content: `
      <div class="slide">
        <div class="slide-badge">AI / RAG</div>
        <h1>RAG Duomenų Architektūra</h1>
        <p class="slide-subtitle">3 atskiri duomenų sluoksniai (vektorių bazės), iš kurių AI agentas trauks informaciją</p>
        <div class="diagram-container" data-diagram="ragArchitecture"></div>

        <div class="card-grid">
          <div class="info-card accent">
            <h3>A: Išoriniai Klientų Duomenys</h3>
            <ul>
              <li><strong>Rekvizitai.lt / Scorify:</strong> Pajamos, darbuotojų augimas, pelningumas</li>
              <li><strong>BuiltWith / Apollo:</strong> CRM, chatbotai, e-komercijos platforma</li>
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
          <h3>Praktinis Pavyzdys</h3>
          <p>Lauris klausia Co-Pilot: <em>"Kokia mūsų nuolaidų politika IT įmonėms pagal paskutinį strateginį meetą?"</em> → AI pateikia tikslų atsakymą su nuoroda į susitikimo transkriptą.</p>
        </div>
      </div>`,
    diagram: null,
    notes: 'RAG yra „smegenys". 3 sluoksniai užtikrina, kad AI žino viską — nuo kliento finansų iki vidinių sprendimų.',
  },

  // ===== SLIDE 5: Marketing & Finance =====
  {
    id: 'slide-5',
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
        <p>Next.js dashboarde — atskira skiltis „Fixed & Variable Costs". Kartą per mėnesį suvedami: serverių, API (OpenAI, Vertex AI), Newo ir kitų įrankių kaštai.</p>

        <div class="info-card green">
          <h3>Command Center rodmenys</h3>
          <p>Vadovybė realiu laiku mato: <strong>„Šios savaitės CAC yra 250 EUR, ROAS: 8x"</strong></p>
        </div>
      </div>`,
    diagram: null,
    notes: 'Finansų modulis — kaip matuojame tikrąjį ROI, ne tik leadų kiekį.',
  },

  // ===== SLIDE 6: Call Quality & AI QA =====
  {
    id: 'slide-6',
    title: 'Skambučių Kokybės ir QA Modulis',
    subtitle: 'AI Scorecard — automatinis skambučių auditas',
    description: 'Plaud → n8n → LLM pipeline. AI Scorecard kriterijai ir coaching.',
    content: `
      <div class="slide">
        <div class="slide-badge">QA / AI</div>
        <h1>Skambučių Kokybės Modulis</h1>
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
            <p style="font-size:0.8rem;color:var(--text-muted)">Idealus: pardavėjas 40%, klientas 60%</p>
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
          <p>Pavyzdys: <em>"Lauris šioje vietoje per anksti perėjo prie kainos, reikėjo labiau išgryninti skausmą."</em></p>
        </div>
      </div>`,
    diagram: null,
    notes: 'QA modulis eliminuoja rankinį vertinimą. AI auditas + coaching rekomendacijos.',
  },

  // ===== SLIDE 7: Newo AI Agent =====
  {
    id: 'slide-7',
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
        <div class="diagram-container" data-diagram="newoDecisionTree"></div>

        <div class="info-card yellow">
          <h3>Duomenų Grąžinimas</h3>
          <p>Po kiekvieno Newo skambučio: transkriptas + „Intent Score" per Webhook → n8n → Next.js Dashboard</p>
        </div>

        <div class="info-card red">
          <h3>Eskalacijos Kelias (Naujas)</h3>
          <p>Newo vykdo <strong>realaus laiko sentiment analizę</strong> pokalbio metu. Jei aptinkamas neigiamas sentimentas (pvz., klientas pyksta, nori baigti pokalbį):</p>
          <ul>
            <li>Pokalbis automatiškai perduodamas <strong>Lauriui arba Marijai</strong> (live handoff)</li>
            <li>Monday.com sukuriamas <strong>Urgent Flag</strong> su kontekstu</li>
            <li>Transkriptas iki eskalacijos momento išsaugomas analizei</li>
          </ul>
        </div>
      </div>`,
    diagram: null,
    notes: 'Newo perima C leadus, laisvindamas Laurio laiką A/B leadams. Eskalacijos kelias užtikrina žmogiškąjį saugiklį.',
  },

  // ===== SLIDE 8: Pre-Call Brief =====
  {
    id: 'slide-8',
    title: 'Pre-Call Intelligence Brief',
    subtitle: 'Automatinis pasiruošimas skambučiui per 0 minučių',
    description: '15 min prieš skambutį — AI sugeneruotas brief su hipoteze, icebreaker, BANT gairėmis.',
    content: `
      <div class="slide">
        <div class="slide-badge">Intelligence</div>
        <h1>Pre-Call Intelligence Brief</h1>
        <p class="slide-subtitle">Marija ir Lauris neskiria nei minutės „pasiruošimui". Dviejų etapų generavimas užtikrina patikimumą.</p>

        <div class="info-card green">
          <h3>Dviejų Etapų Strategija (Naujas)</h3>
          <p><strong>Etapas 1 — Naktinis:</strong> Vakare Cron generuoja pirminį Brief ir išsaugo DB. Tai fallback, jei rytoj API bus lėtas.</p>
          <p><strong>Etapas 2 — Refresh:</strong> Likus 15 min iki skambučio, sistema patikrina, ar atsirado naujų duomenų. Jei taip — atnaujina Brief. Jei ne — naudoja naktinę versiją.</p>
        </div>

        <div class="diagram-container" data-diagram="wfPreCallBrief"></div>

        <h2>Ką mato pardavėjas?</h2>
        <div class="card-grid">
          <div class="info-card accent">
            <h3>The Hook (AI Hipotezė)</h3>
            <p>Remiantis RAG duomenimis — pagrindinis kliento skausmas. Pvz.: <em>„Įmonė X paaugo nuo 20 iki 50 darbuotojų, bet naudoja seną ERP. Skausmas — rankinis duomenų vedimas."</em></p>
          </div>
          <div class="info-card green">
            <h3>Icebreaker</h3>
            <p>Personalizuotas sakinys pokalbio pradžiai, paremtas kliento LinkedIn veikla.</p>
          </div>
          <div class="info-card purple">
            <h3>BANT Gairės</h3>
            <p>Konkretūs klausimai tai įmonei: <em>„Paklauskite, ar planuoja plėsti klientų aptarnavimo komandą..."</em></p>
          </div>
        </div>
        <div class="card-grid">
          <div class="info-card yellow">
            <h3>Case Studies</h3>
            <p>RAG ištraukia 2 panašius DIPA klientus iš tos pačios industrijos name-dropui.</p>
          </div>
          <div class="info-card red">
            <h3>Red Flags</h3>
            <p>AI įspėja, jei pajamos krenta arba nėra tech vadovo — sprendimas gali užtrukti.</p>
          </div>
        </div>
      </div>`,
    diagram: null,
    notes: 'Pre-Call Brief — vienas didžiausių time-saverių. Pardavėjas gauna viską paruoštą.',
  },

  // ===== SLIDE 9: Dashboard Views =====
  {
    id: 'slide-9',
    title: 'Dashboard Vaizdai',
    subtitle: '3 rolėmis paremti ekranai',
    description: 'Sales Cockpit (Marija/Lauris), QA & Performance, Command Center (Igoris).',
    content: `
      <div class="slide">
        <div class="slide-badge">UI / UX</div>
        <h1>Dashboard Vaizdai</h1>
        <p class="slide-subtitle">Kiekvienas komandos narys mato tik tai, kas jam svarbu</p>
        <div class="diagram-container" data-diagram="dashboardViews"></div>

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
      </div>`,
    diagram: null,
    notes: 'Trys vaizdai — niekas nemato nereikalingos info. Focus = produktyvumas.',
  },

  // ===== SLIDE 10: n8n Workflows =====
  {
    id: 'slide-10',
    title: 'n8n Automatizacijų Žemėlapis',
    subtitle: '4 pagrindiniai Workflows',
    description: 'Lead Ingestion, Pre-Call Brief, Post-Call QA, Strategic Memory.',
    content: `
      <div class="slide">
        <div class="slide-badge">Automatizacijos</div>
        <h1>n8n Automatizacijų Žemėlapis</h1>
        <p class="slide-subtitle">4 pagrindiniai procesai, kurie valdo visą duomenų srautą</p>

        <h2>Workflow 1: Lead Ingestion & Brain Sync</h2>
        <div class="diagram-container" data-diagram="wfLeadIngestion"></div>

        <h2>Workflow 2: Pre-Call Brief Generation</h2>
        <div class="diagram-container" data-diagram="wfPreCallBrief"></div>

        <h2>Workflow 3: Post-Call AI Processing</h2>
        <div class="diagram-container" data-diagram="wfPostCall"></div>

        <h2>Workflow 4: Strategic Memory Ingestion</h2>
        <div class="diagram-container" data-diagram="wfStrategicMemory"></div>

        <h2>Workflow 5: Data Reconciliation (Naujas)</h2>
        <p>Naktinis procesas, tikrinantis Monday.com ir PostgreSQL duomenų suderinamumą. Fiksuoja neatitikimus ir siunčia Slack alertą.</p>
        <div class="diagram-container" data-diagram="wfReconciliation"></div>
      </div>`,
    diagram: null,
    notes: 'Penki n8n workflows — įskaitant naują Reconciliation procesą duomenų vientisumui užtikrinti.',
  },

  // ===== SLIDE 11: LLM Prompt Architectures =====
  {
    id: 'slide-11',
    title: 'LLM Promptų Architektūros',
    subtitle: 'Struktūruoti AI promptai — JSON output',
    description: 'Post-Call QA ir Pre-Call Brief promptų struktūra su JSON formatais.',
    content: `
      <div class="slide">
        <div class="slide-badge">AI Promptai</div>
        <h1>LLM Promptų Architektūros</h1>
        <p class="slide-subtitle">Promptai grąžina struktūruotus JSON duomenis — nulis rankinio darbo</p>

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
  "qa_score": 0-100,
  "coaching_tip": "1-2 sakinių patarimas",
  "next_action": "Konkretus veiksmas",
  "follow_up_email_draft": "El. laiško juodraštis"
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
      </div>`,
    diagram: null,
    notes: 'Promptų architektūra — kritinė dalis. JSON output leidžia n8n automatiškai paskirstyti duomenis.',
  },

  // ===== SLIDE 12: Database Schema =====
  {
    id: 'slide-12',
    title: 'Duomenų Bazės Schema',
    subtitle: 'Prisma + PostgreSQL — Next.js analitikos pagrindas',
    description: 'Lead, CallAudit, FinancialMetric, TimeTracking modeliai.',
    content: `
      <div class="slide">
        <div class="slide-badge">Duomenų Bazė</div>
        <h1>Duomenų Bazės Schema</h1>
        <p class="slide-subtitle">Prisma ORM + PostgreSQL — giliųjų indeksų skaičiavimo pagrindas</p>
        <div class="diagram-container" data-diagram="dbSchema"></div>

        <h2>Modeliai</h2>
        <div class="card-grid">
          <div class="info-card accent">
            <h3>Lead</h3>
            <p>Pagrindinis įrašas. Susiejimas su Monday.com per <code>mondayId</code>. ICP balas (A/B/C/D), šaltinis, statusas, Time-to-Revenue.</p>
          </div>
          <div class="info-card yellow">
            <h3>CallAudit</h3>
            <p>Kiekvieno skambučio AI auditas. <code>qaScore</code> (0-100), <code>coachingTip</code>, transkript URL. Susietas su Lead.</p>
          </div>
          <div class="info-card green">
            <h3>FinancialMetric</h3>
            <p>Dienos finansiniai duomenys: Ad Spend, infrastruktūros kaštai, pajamos, automatiškai apskaičiuotas CAC ir ROAS.</p>
          </div>
          <div class="info-card purple">
            <h3>TimeTracking</h3>
            <p>Clockify duomenys: Core Sales vs. Overhead vs. Support valandos pagal savaitės tipą (Pipeline Build / Closing Week).</p>
          </div>
        </div>

        <h2>Nauji Modeliai (Tobulinimai)</h2>
        <div class="card-grid">
          <div class="info-card red">
            <h3>CustomerHealth</h3>
            <p>Post-sale metrikos: <code>npsScore</code>, <code>churnRisk</code>, <code>upsellPotential</code>. Susietas su Lead per <code>leadId</code>.</p>
          </div>
          <div class="info-card yellow">
            <h3>ConsentLog (GDPR)</h3>
            <p>Sutikimų sekimas: <code>consentType</code>, <code>legalBasis</code>, <code>grantedAt</code>, <code>revokedAt</code>. EU reikalavimams.</p>
          </div>
          <div class="info-card purple">
            <h3>ScoringFeedback</h3>
            <p>Feedback loop: <code>predictedScore</code> vs. <code>actualOutcome</code>. Leidžia matuoti ir tobulinti RAG scoring tikslumą.</p>
          </div>
        </div>

        <div class="info-card accent">
          <h3>Praktinis Pavyzdys</h3>
          <p>Greta išleidžia 500 EUR FB reklamai → n8n įrašo į <code>FinancialMetric</code>.<br>
          Marija uždaro 4000 EUR dealą → n8n atnaujina <code>revenueGenerated</code>.<br>
          Dashboard: <strong>„Šios savaitės CAC: 250 EUR, ROAS: 8x"</strong></p>
        </div>
      </div>`,
    diagram: null,
    notes: 'DB schema su naujais modeliais: CustomerHealth, ConsentLog, ScoringFeedback.',
  },

  // ===== SLIDE 13: KPIs =====
  {
    id: 'slide-13',
    title: 'KPI Indeksai',
    subtitle: 'Išplėstiniai performanso rodikliai',
    description: 'LVR, TTR, Core Sales Efficiency, Pipeline Conversion, AI vs Human Ratio.',
    content: `
      <div class="slide">
        <div class="slide-badge">Metrika</div>
        <h1>KPI Indeksai</h1>
        <p class="slide-subtitle">Vietoj „kiek paskambinome" — gilieji indeksai, skaičiuojami realiu laiku</p>

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

        <h2>Retention Metrikos (Naujos)</h2>
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

        <div class="formula">Core Sales Efficiency = Sugeneruotos Pajamos / (Core Sales Valandos iš Clockify)</div>
        <div class="formula">LVR = ((A/B Leadai šį mėn. − A/B Leadai praeitą mėn.) / A/B Leadai praeitą mėn.) × 100%</div>
      </div>`,
    diagram: null,
    notes: 'KPI su retention metrikomis — pilnas vaizdas nuo acquisition iki retention.',
  },

  // ===== SLIDE 14: Roadmap =====
  {
    id: 'slide-14',
    title: 'Roadmap: 3 Sprintai',
    subtitle: '6 savaičių iteracinis planas',
    description: 'Sprint 1 (duomenų pamatas), Sprint 2 (AI QA + Newo), Sprint 3 (Co-Pilot + analitika).',
    content: `
      <div class="slide">
        <div class="slide-badge">Roadmap</div>
        <h1>Veiksmų Planas: 3 Sprintai</h1>
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
                <li>Sukurti bazinę Next.js aplikaciją (DIPA OS)</li>
                <li>Per n8n pajungti Monday.com ir Clockify API</li>
                <li>Sujungti Facebook/LinkedIn Ads API (išlaidų vaizdavimas)</li>
                <li>Sutvarkyti rankinio kaštų suvedimo formą</li>
                <li>Prisma schema + PostgreSQL inicializacija</li>
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
                <li>Sujungti Plaud failų atidavimą į n8n</li>
                <li>Sukurti LLM promptus skambučių vertinimui (Scorecards)</li>
                <li>Atvaizduoti QA balus ir coaching Next.js dashboarde</li>
                <li>Pajungti Newo API — C lygio leadai automatiškai keliauja robotui</li>
                <li>Newo transkriptų Webhook grąžinimas</li>
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
                <li>Vertex AI paremtas DIPA Co-Pilot chat-botas Next.js</li>
                <li>Pre-Call Brief automatinis generavimas</li>
                <li>Penktadienio ataskaitų automatizacija</li>
                <li>Anomaly Detection + Slack/Teams alertai</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Lead Gyvavimo Ciklas (End-to-End)</h2>
        <div class="diagram-container" data-diagram="leadLifecycle"></div>
      </div>`,
    diagram: null,
    notes: 'Roadmap — 3 sprintai. Iteracinis požiūris. Pradedame nuo duomenų, baigiame AI.',
  },

  // ===== SLIDE 15: Weekly Cycle + Integrated Improvements =====
  {
    id: 'slide-15',
    title: 'Transformacija ir Integruoti Tobulinimai',
    subtitle: 'Prieš vs. Po DIPA OS + 6 tobulinimai jau suprojektuoti',
    description: 'Penktadienio transformacija ir visi 6 tobulinimai integruoti į sistemos dizainą.',
    content: `
      <div class="slide">
        <div class="slide-badge">Transformacija</div>
        <h1>Transformacija ir Tobulinimai</h1>
        <p class="slide-subtitle">Penktadienio susitikimo transformacija + 6 tobulinimai, integruoti į DIPA OS dizainą</p>

        <div class="comparison">
          <div class="comparison-col before">
            <h4>Prieš DIPA OS</h4>
            <ul>
              <li>Lauris rankomis skaičiuoja Excel formules</li>
              <li>Ginčijamasi dėl mažai ROI sesijų</li>
              <li>Neaišku, kokios kokybės leadai atėjo</li>
              <li>45-60 min vien statuso atnaujinimams</li>
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
              <li><strong>15:30</strong> — Susitikimas baigtas. 30 min.</li>
            </ul>
          </div>
        </div>

        <div class="diagram-container" data-diagram="weeklyCycle"></div>

        <h2>Integruoti Sistemos Tobulinimai</h2>
        <p>Visi 6 tobulinimai suprojektuoti ir integruoti į DIPA OS architektūrą, DB schemą ir užduočių planą.</p>
        <div class="card-grid">
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> Lead Scoring Feedback Loop</h3>
            <p>Naujas <code>ScoringFeedback</code> modelis DB. Won/Lost rezultatai automatiškai grįžta į RAG scoring per feedback pipeline. Matomas <code>scoringAccuracy</code> laukas Lead modelyje.</p>
            <p><strong>Sprintas 3</strong> · Eimantas</p>
          </div>
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> Klientų Retention Metrikos</h3>
            <p>Naujas <code>CustomerHealth</code> modelis su NPS, churnRisk, upsellPotential. Trys nauji KPI indeksai dashboarde. Post-sale monitoringas Lead lifecycle diagramoje.</p>
            <p><strong>Sprintas 3</strong> · Eimantas</p>
          </div>
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> GDPR Compliance Layer</h3>
            <p>Naujas <code>ConsentLog</code> modelis DB. GDPR Layer komponentas DIPA OS architektūroje. Consent forma, data retention, right-to-deletion workflow.</p>
            <p><strong>Sprintas 2</strong> · Mantas</p>
          </div>
        </div>
        <div class="card-grid">
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> Data Reconciliation (WF5)</h3>
            <p>Naujas n8n Workflow 5: naktinis Monday.com vs PostgreSQL palyginimas. Automatinis Slack alertas neatitikimams. Reconciliation Log archyvas.</p>
            <p><strong>Sprintas 2</strong> · Eimantas</p>
          </div>
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> Newo Eskalacijos Kelias</h3>
            <p>Sentiment analizė realiu laiku Newo pokalbiuose. Live handoff į Laurį/Mariją kai neigiamas sentimentas. Monday.com Urgent Flag automatizuotas.</p>
            <p><strong>Sprintas 2</strong> · Eimantas</p>
          </div>
          <div class="info-card green">
            <h3><span class="kpi-badge low">Integruota</span> Pre-Call Brief Dviejų Etapų</h3>
            <p>Naktinis Cron generuoja pirminį Brief (fallback). 15 min prieš skambutį — refresh tik jei yra naujų duomenų. Eliminuoja API latency riziką.</p>
            <p><strong>Sprintas 3</strong> · Eimantas</p>
          </div>
        </div>
      </div>`,
    diagram: null,
    notes: 'Visi 6 tobulinimai integruoti. Diskutuoti prioritetus ir sprintų paskirstymą.',
  },
];
