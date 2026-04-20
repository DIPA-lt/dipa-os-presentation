"""
Generate all presentation diagrams as clean vector SVGs using pure Graphviz.

No icons — just properly styled, color-coded rounded boxes with clear labels.
"""

from __future__ import annotations
from pathlib import Path
from graphviz import Digraph

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "diagrams"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ── Color palette ────────────────────────────────────────────────
# Each category gets a light fill + matching darker border
C_SRC    = {"fillcolor": "#eff6ff", "color": "#3b82f6", "fontcolor": "#1e3a5f"}  # blue — sources
C_WF     = {"fillcolor": "#f0fdfa", "color": "#0f766e", "fontcolor": "#134e4a"}  # teal — n8n workflows
C_AI     = {"fillcolor": "#f5f3ff", "color": "#7c3aed", "fontcolor": "#4c1d95"}  # violet — AI
C_DATA   = {"fillcolor": "#fff7ed", "color": "#ea580c", "fontcolor": "#7c2d12"}  # orange — CRM/DB
C_APP    = {"fillcolor": "#f0fdf4", "color": "#16a34a", "fontcolor": "#14532d"}  # green — DIPA app
C_STEP   = {"fillcolor": "#f9fafb", "color": "#6b7280", "fontcolor": "#1f2937"}  # gray — neutral step
C_DECIDE = {"fillcolor": "#fefce8", "color": "#ca8a04", "fontcolor": "#713f12"}  # amber — decision
C_ALERT  = {"fillcolor": "#fef2f2", "color": "#dc2626", "fontcolor": "#7f1d1d"}  # red — alert/warning
C_OUTPUT = {"fillcolor": "#ecfdf5", "color": "#059669", "fontcolor": "#064e3b"}  # emerald — output/result
C_MUDA   = {"fillcolor": "#fef2f2", "color": "#ef4444", "fontcolor": "#991b1b"}  # red — waste


FONT = "Segoe UI"

GRAPH_DEFAULTS = {
    "bgcolor": "white",
    "fontname": FONT,
    "fontsize": "12",
    # Extra pad + margin so strokes/labels are not flush on the viewBox edge (avoids <img> clipping).
    "pad": "0.85",
    "margin": "0.28",
    "nodesep": "0.35",
    "ranksep": "0.45",
    "splines": "spline",
    "style": "rounded",
    "dpi": "96",
}

NODE_DEFAULTS = {
    "shape": "box",
    "style": "rounded,filled",
    "fontname": FONT,
    "fontsize": "10",
    "penwidth": "1.4",
    "margin": "0.14,0.07",
    "height": "0.4",
}

EDGE_DEFAULTS = {
    "fontname": FONT,
    "fontsize": "8",
    "color": "#94a3b8",
    "penwidth": "1.4",
    "arrowsize": "0.6",
    "fontcolor": "#64748b",
}


def new_graph(name: str, direction: str = "TB", **overrides) -> Digraph:
    g = Digraph(name, format="svg", engine="dot")
    attrs = {**GRAPH_DEFAULTS, "rankdir": direction}
    attrs.update(overrides)
    g.attr(**attrs)
    g.attr("node", **NODE_DEFAULTS)
    g.attr("edge", **EDGE_DEFAULTS)
    return g


def node(g: Digraph, nid: str, label: str, cat: dict = C_STEP):
    g.node(nid, label=label, **cat)


def decision(g: Digraph, nid: str, label: str):
    g.node(nid, label=label, shape="diamond", **C_DECIDE,
           fontsize="9", margin="0.12,0.08")


def save(g: Digraph, name: str):
    path = str(OUT_DIR / name)
    g.render(path, cleanup=True)
    print(f"  {name}.svg")


# ══════════════════════════════════════════════════════════════════
# 1. TOC Flow
# ══════════════════════════════════════════════════════════════════

def diagram_tocFlow():
    g = new_graph("tocFlow", "LR")
    node(g, "a", "1. Identifikuoti\nBottleneck", C_ALERT)
    node(g, "b", "2. Išnaudoti\nBottleneck", C_WF)
    node(g, "c", "3. Subordinuoti\nsistemą", C_WF)
    node(g, "d", "4. Pakelti\npralaidumą", C_OUTPUT)
    node(g, "e", "5. Kartoti\nciklą (grįžti į 1)", C_STEP)
    g.edges([("a","b"), ("b","c"), ("c","d"), ("d","e")])
    save(g, "tocFlow")


# ══════════════════════════════════════════════════════════════════
# 2. LEAN Muda
# ══════════════════════════════════════════════════════════════════

def diagram_leanMuda():
    g = new_graph("leanMuda", "LR", nodesep="0.25", ranksep="0.4", pad="0.18", margin="0.08")
    # Smaller, uniform node boxes.
    g.attr("node", width="0.9", height="0.35", fixedsize="true", fontsize="8", margin="0.03,0.02")
    muda = [
        ("m1", "23 val.\nrankinio darbo"),
        ("m2", "Ads duomenų\nvedimas"),
        ("m3", "Status update\nmeetingai"),
        ("m4", "Google paieška\nprieš skambutį"),
        ("m5", "Lead\nklasifik."),
    ]
    auto = [
        ("a1", "AI Post-Call"),
        ("a2", "n8n API\nSync"),
        ("a3", "Live Dashboard"),
        ("a4", "Pre-Call\nBrief"),
        ("a5", "RAG Scoring"),
    ]
    for nid, label in muda:
        node(g, nid, label, C_MUDA)
    for nid, label in auto:
        node(g, nid, label, C_OUTPUT)
    for (mid, _), (aid, _) in zip(muda, auto):
        g.edge(mid, aid, color="#059669", penwidth="1.2", arrowsize="0.6")
    save(g, "leanMuda")


# ══════════════════════════════════════════════════════════════════
# 3. System Architecture
# ══════════════════════════════════════════════════════════════════

def diagram_systemArchitecture():
    g = new_graph("sysArch", "TB", ranksep="0.7", nodesep="0.4")

    with g.subgraph(name="cluster_src") as s:
        s.attr(label="Šaltiniai", style="rounded,dashed", color="#cbd5e1", fontcolor="#64748b", fontsize="11")
        node(s, "FB", "Facebook Ads", C_SRC)
        node(s, "LI", "LinkedIn Ads", C_SRC)
        node(s, "OL", "Outlook", C_SRC)
        node(s, "PL", "Plaud Audio", C_SRC)
        node(s, "MT", "Susitikimai", C_SRC)
        node(s, "CL", "Clockify", C_SRC)

    with g.subgraph(name="cluster_wf") as s:
        s.attr(label="n8n Workflows", style="rounded,dashed", color="#99f6e4", fontcolor="#134e4a", fontsize="11")
        node(s, "WF1", "WF1: Lead\nIngestion", C_WF)
        node(s, "WF2", "WF2: Pre-Call\nBrief", C_WF)
        node(s, "WF3", "WF3: Post-Call\nQA", C_WF)
        node(s, "WF4", "WF4: Strategic\nMemory", C_WF)
        node(s, "WF5", "WF5: Data\nReconciliation", C_WF)

    with g.subgraph(name="cluster_ai") as s:
        s.attr(label="AI Services", style="rounded,dashed", color="#c4b5fd", fontcolor="#4c1d95", fontsize="11")
        node(s, "RAG", "Vertex AI\nRAG", C_AI)
        node(s, "GEM", "Gemini\n2.5 Pro", C_AI)
        node(s, "WH", "Whisper\nSTT", C_AI)
        node(s, "NW", "Newo AI", C_AI)

    with g.subgraph(name="cluster_data") as s:
        s.attr(label="CRM & Storage", style="rounded,dashed", color="#fdba74", fontcolor="#7c2d12", fontsize="11")
        node(s, "MON", "Monday.com", C_DATA)
        node(s, "PG", "PostgreSQL", C_DATA)

    with g.subgraph(name="cluster_app") as s:
        s.attr(label="DIPA OS (Next.js)", style="rounded,dashed", color="#86efac", fontcolor="#14532d", fontsize="11")
        node(s, "COP", "Co-Pilot", C_APP)
        node(s, "COK", "Sales Cockpit", C_APP)
        node(s, "QA", "QA Modulis", C_APP)
        node(s, "CMD", "Command\nCenter", C_APP)

    g.edge("FB", "WF1"); g.edge("LI", "WF1")
    g.edge("OL", "WF2"); g.edge("PL", "WF3"); g.edge("MT", "WF4"); g.edge("CL", "PG")
    g.edge("WF1", "MON"); g.edge("WF1", "NW", label="C lygis")
    g.edge("RAG", "WF1", style="dashed", label="scoring")
    g.edge("WF1", "RAG", style="dashed", label="nauji faktai")
    g.edge("NW", "WF3", label="transkriptai")
    g.edge("RAG", "GEM", style="dashed", label="kontekstas")
    g.edge("WF2", "GEM"); g.edge("WF2", "MON")
    g.edge("WF3", "WH"); g.edge("WH", "GEM")
    g.edge("GEM", "PG", label="QA JSON"); g.edge("WF3", "MON")
    g.edge("WF4", "RAG"); g.edge("WF4", "MON")
    g.edge("MON", "PG"); g.edge("MON", "WF5"); g.edge("PG", "WF5")
    g.edge("WF5", "PG", label="reconciliation log")
    g.edge("RAG", "COP"); g.edge("PG", "COK"); g.edge("PG", "QA"); g.edge("PG", "CMD")
    g.node("GDPR", label="GDPR", shape="box", style="rounded,filled", **C_ALERT, fontsize="9")
    g.edge("GDPR", "MON", style="dashed", label="Consent")
    g.edge("GDPR", "PG", style="dashed", label="Audit")
    save(g, "systemArchitecture")


# ══════════════════════════════════════════════════════════════════
# 4. System Architecture Overview
# ══════════════════════════════════════════════════════════════════

def diagram_systemArchitectureOverview():
    g = new_graph("sysOverview", "LR", ranksep="0.8")
    node(g, "ads", "Ads + Outreach\n(Facebook, LinkedIn)", C_SRC)
    node(g, "ops", "Ops Inputs\n(Outlook, Plaud, Meets)", C_SRC)
    node(g, "ing", "WF1 Ingestion\n+ scoring", C_WF)
    node(g, "wfs", "WF2, WF3, WF4", C_WF)
    node(g, "ai", "Gemini 2.5 Pro\n+ RAG + Whisper", C_AI)
    node(g, "crm", "Monday +\nPostgreSQL", C_DATA)
    node(g, "views", "DIPA OS Views\nCo-Pilot · Cockpit · QA · CMD", C_APP)
    node(g, "rec", "WF5\nReconciliation", C_WF)
    g.edge("ads", "ing"); g.edge("ing", "crm")
    g.edge("ops", "wfs"); g.edge("wfs", "ai"); g.edge("ai", "crm"); g.edge("crm", "views")
    g.edge("rec", "crm", style="dashed")
    save(g, "systemArchitectureOverview")


# ══════════════════════════════════════════════════════════════════
# 5. RAG Architecture
# ══════════════════════════════════════════════════════════════════

def diagram_ragArchitecture():
    g = new_graph("rag", "TB", ranksep="0.6")
    with g.subgraph(name="cluster_a") as s:
        s.attr(label="A: Klientų Duomenys", style="rounded,dashed", color="#93c5fd", fontcolor="#1e3a5f", fontsize="10")
        node(s, "rek", "Rekvizitai.lt", C_SRC)
        node(s, "bw", "BuiltWith", C_SRC)
        node(s, "ap", "Apollo", C_SRC)
    with g.subgraph(name="cluster_b") as s:
        s.attr(label="B: Pardavimų Patirtis", style="rounded,dashed", color="#c4b5fd", fontcolor="#4c1d95", fontsize="10")
        node(s, "deals", "Laimėti Dealai", C_AI)
        node(s, "prop", "Pasiūlymai", C_AI)
        node(s, "obj", "Prieštaravimai", C_AI)
    with g.subgraph(name="cluster_c") as s:
        s.attr(label="C: Strateginės Žinios", style="rounded,dashed", color="#86efac", fontcolor="#14532d", fontsize="10")
        node(s, "meets", "Susitikimai", C_APP)
        node(s, "sops", "SOP Taisyklės", C_APP)
        node(s, "dec", "Sprendimai", C_APP)
    node(g, "emb", "Embeddings", C_AI)
    node(g, "vdb", "Vektorių DB", C_DATA)
    node(g, "srch", "Paieška", C_AI)
    for src in ["rek","bw","ap","deals","prop","obj","meets","sops","dec"]:
        g.edge(src, "emb")
    g.edge("emb", "vdb"); g.edge("vdb", "srch")
    node(g, "cp", "Co-Pilot", C_APP)
    node(g, "pcb", "Pre-Call Brief", C_OUTPUT)
    node(g, "ls", "Lead Scoring", C_OUTPUT)
    g.edge("srch", "cp"); g.edge("srch", "pcb"); g.edge("srch", "ls")
    save(g, "ragArchitecture")


# ══════════════════════════════════════════════════════════════════
# 6. WF1: Lead Ingestion
# ══════════════════════════════════════════════════════════════════

def diagram_wfLeadIngestion():
    g = new_graph("wf1", "TB")
    node(g, "new", "Naujas Lead", C_SRC)
    node(g, "enr", "API Enrichment\nRekvizitai / Apollo", C_WF)
    node(g, "fmt", "JSON Formatavimas", C_STEP)
    node(g, "scr", "RAG Scoring\nA / B / C / D", C_AI)
    node(g, "upd", "Monday.com Update", C_DATA)
    node(g, "dsh", "Dashboard Sync", C_APP)
    node(g, "ab", "Priskirti\nLauriui / Marijai", C_OUTPUT)
    node(g, "c", "Perduoti Newo", C_AI)
    node(g, "d", "Nurture", C_STEP)
    g.edge("new", "enr"); g.edge("enr", "fmt"); g.edge("fmt", "scr")
    g.edge("scr", "upd"); g.edge("upd", "dsh")
    g.edge("scr", "ab", label="A/B"); g.edge("scr", "c", label="C"); g.edge("scr", "d", label="D")
    save(g, "wfLeadIngestion")


# ══════════════════════════════════════════════════════════════════
# 7. WF2: Pre-Call Brief
# ══════════════════════════════════════════════════════════════════

def diagram_wfPreCallBrief():
    g = new_graph("wf2", "TB", ranksep="0.55")
    node(g, "cron", "Naktinis Cron", C_WF)
    node(g, "rag", "RAG: Sukurti\npirminį Brief", C_AI)
    node(g, "store", "Išsaugoti DB", C_DATA)
    node(g, "ev", "Outlook Event\nT−15 min", C_SRC)
    decision(g, "chk", "Nauji\nduomenys?")
    node(g, "ref", "Atnaujinti Brief\nRAG + Gemini", C_AI)
    node(g, "use", "Naudoti naktinį\nBrief", C_STEP)
    node(g, "del", "Pristatyti", C_OUTPUT)
    node(g, "sl", "Slack", C_APP)
    node(g, "da", "Dashboard", C_APP)
    g.edge("cron", "rag"); g.edge("rag", "store")
    g.edge("ev", "chk")
    g.edge("chk", "ref", label="Taip"); g.edge("chk", "use", label="Ne")
    g.edge("ref", "del"); g.edge("use", "del")
    g.edge("del", "sl"); g.edge("del", "da")
    save(g, "wfPreCallBrief")


# ══════════════════════════════════════════════════════════════════
# 8. WF3: Post-Call QA
# ══════════════════════════════════════════════════════════════════

def diagram_wfPostCall():
    g = new_graph("wf3", "TB")
    node(g, "au", "Plaud Audio", C_SRC)
    node(g, "tr", "Whisper: Transkripcija", C_AI)
    node(g, "an", "Gemini 2.5 Pro:\nQA Scorecard", C_AI)
    node(g, "js", "JSON Output\nsummary · BANT · score", C_STEP)
    node(g, "crm", "Monday.com Update", C_DATA)
    node(g, "db", "PostgreSQL: QA", C_DATA)
    node(g, "em", "Outlook: Follow-up", C_OUTPUT)
    node(g, "da", "Dashboard: QA View", C_APP)
    g.edge("au", "tr"); g.edge("tr", "an"); g.edge("an", "js")
    g.edge("js", "crm"); g.edge("js", "db"); g.edge("js", "em"); g.edge("js", "da")
    save(g, "wfPostCall")


# ══════════════════════════════════════════════════════════════════
# 9. WF4: Strategic Memory
# ══════════════════════════════════════════════════════════════════

def diagram_wfStrategicMemory():
    g = new_graph("wf4", "TB")
    node(g, "rec", "Susitikimo Įrašas", C_SRC)
    node(g, "tr", "Transkripcija", C_AI)
    node(g, "ex", "Gemini: Action Items\n+ Sprendimai", C_AI)
    node(g, "vec", "Embeddings →\nVertex AI RAG", C_AI)
    node(g, "tasks", "Monday.com\nUžduotys", C_DATA)
    node(g, "arch", "Sprendimų\nArchyvas", C_OUTPUT)
    g.edge("rec", "tr"); g.edge("tr", "ex")
    g.edge("ex", "vec"); g.edge("ex", "tasks"); g.edge("ex", "arch")
    save(g, "wfStrategicMemory")


# ══════════════════════════════════════════════════════════════════
# 10. WF5: Reconciliation
# ══════════════════════════════════════════════════════════════════

def diagram_wfReconciliation():
    g = new_graph("wf5", "TB")
    node(g, "cr", "Naktinis Cron 02:00", C_WF)
    node(g, "pull", "Ištraukti Monday.com\nDeal būsenas", C_DATA)
    node(g, "cmp", "Palyginti su\nPostgreSQL", C_STEP)
    decision(g, "diff", "Neatitikimų?")
    node(g, "flag", "Pažymėti neatitikimus", C_ALERT)
    node(g, "alert", "Slack Alert →\nEimantas / Mantas", C_ALERT)
    node(g, "log", "Reconciliation Log", C_DATA)
    node(g, "ok", "Viskas synced ✓", C_OUTPUT)
    g.edge("cr", "pull"); g.edge("pull", "cmp"); g.edge("cmp", "diff")
    g.edge("diff", "flag", label="Taip"); g.edge("diff", "ok", label="Ne")
    g.edge("flag", "alert"); g.edge("flag", "log")
    save(g, "wfReconciliation")


# ══════════════════════════════════════════════════════════════════
# 11. Newo Decision Tree
# ══════════════════════════════════════════════════════════════════

def diagram_newoDecisionTree():
    g = new_graph("newo", "TB", ranksep="0.5", nodesep="0.4")
    node(g, "st", "Newo Skambina", C_AI)
    node(g, "gr", "Pasisveikinimas", C_STEP)
    decision(g, "sent", "Sentiment\nAnalizė")
    node(g, "esc", "ESKALACIJA:\nPerduoti Lauriui", C_ALERT)
    node(g, "mesc", "Monday.com:\nUrgent Flag", C_DATA)
    decision(g, "q1", "Domina\nautomatizavimas?")
    node(g, "nl", "Pasiūlyti\nnaujienlaiškį", C_STEP)
    node(g, "mn", "Monday: Nurture", C_DATA)
    node(g, "pi", "AI Pitch", C_AI)
    decision(g, "q2", "15 min ROI\nsesijai?")
    node(g, "fu", "Follow-up data", C_STEP)
    node(g, "mfu", "Monday: Follow-up", C_DATA)
    node(g, "cal", "Tikrinti kalendorių", C_WF)
    node(g, "of", "Pasiūlyti 2 laikus", C_WF)
    node(g, "bk", "Sukurti susitikimą", C_OUTPUT)
    g.edge("st", "gr"); g.edge("gr", "sent")
    g.edge("sent", "esc", label="Neigiamas"); g.edge("esc", "mesc")
    g.edge("sent", "q1", label="Neutralus / +")
    g.edge("q1", "nl", label="Ne"); g.edge("nl", "mn")
    g.edge("q1", "pi", label="Taip"); g.edge("pi", "q2")
    g.edge("q2", "fu", label="Ne"); g.edge("fu", "mfu")
    g.edge("q2", "cal", label="Taip"); g.edge("cal", "of"); g.edge("of", "bk")
    save(g, "newoDecisionTree")


# ══════════════════════════════════════════════════════════════════
# 12. Lead Lifecycle
# ══════════════════════════════════════════════════════════════════

def diagram_leadLifecycle():
    g = new_graph("lifecycle", "LR", ranksep="0.6", nodesep="0.35")
    node(g, "ad", "Reklama", C_SRC)
    node(g, "land", "Landing Page", C_SRC)
    node(g, "ing", "n8n Ingestion", C_WF)
    node(g, "scr", "RAG Scoring\nA/B/C/D", C_AI)
    node(g, "bank", "Lead Bank", C_OUTPUT)
    node(g, "newo", "Newo", C_AI)
    node(g, "nurt", "Nurture", C_STEP)
    node(g, "qual", "Lauris:\nKvalifikacija", C_WF)
    node(g, "roi", "Marija:\nROI Sesija", C_WF)
    node(g, "prop", "Pasiūlymas", C_STEP)
    decision(g, "cl", "Uždarymas")
    node(g, "rev", "Pajamos", C_OUTPUT)
    node(g, "lost", "Analizė", C_ALERT)
    node(g, "ret", "CustomerHealth\nMonitoringas", C_APP)
    node(g, "fb", "Scoring\nFeedback Loop", C_AI)
    g.edge("ad", "land"); g.edge("land", "ing"); g.edge("ing", "scr")
    g.edge("scr", "bank", label="A/B"); g.edge("scr", "newo", label="C"); g.edge("scr", "nurt", label="D")
    g.edge("newo", "bank", label="Patvirtintas")
    g.edge("bank", "qual"); g.edge("qual", "roi"); g.edge("roi", "prop"); g.edge("prop", "cl")
    g.edge("cl", "rev", label="Won"); g.edge("cl", "lost", label="Lost")
    g.edge("rev", "ret"); g.edge("rev", "fb"); g.edge("lost", "fb")
    g.edge("fb", "scr", style="dashed", label="Retrain", constraint="false")
    save(g, "leadLifecycle")


# ══════════════════════════════════════════════════════════════════
# 13. Weekly Cycle
# ══════════════════════════════════════════════════════════════════

def diagram_weeklyCycle():
    g = new_graph("weekly", "LR", ranksep="0.7", nodesep="0.3")
    with g.subgraph(name="cluster_before") as s:
        s.attr(label="PRIEŠ DIPA OS", style="rounded,dashed", color="#fca5a5", fontcolor="#991b1b", fontsize="10")
        node(s, "b1", "Excel formulės", C_MUDA)
        node(s, "b2", "Ginčai dėl\nROI sesijų", C_MUDA)
        node(s, "b3", "Neaiškūs leadai", C_MUDA)
        node(s, "b4", "45-60 min\nmeetingas", C_MUDA)
    with g.subgraph(name="cluster_after") as s:
        s.attr(label="SU DIPA OS", style="rounded,dashed", color="#86efac", fontcolor="#14532d", fontsize="10")
        node(s, "a1", "14:55 AI\nataskaita", C_APP)
        node(s, "a2", "15:00\nCommand Center", C_APP)
        node(s, "a3", "15:05 Marija:\nReview", C_APP)
        node(s, "a4", "15:10 Greta:\nCAC/ROAS", C_APP)
        node(s, "a5", "15:20 Call\nAudit", C_APP)
        node(s, "a6", "15:30 Baigta", C_OUTPUT)
    g.edge("b1", "b2"); g.edge("b2", "b3"); g.edge("b3", "b4")
    g.edge("b4", "a1", label="Transformacija", color="#0f766e", penwidth="2")
    g.edge("a1", "a2"); g.edge("a2", "a3"); g.edge("a3", "a4"); g.edge("a4", "a5"); g.edge("a5", "a6")
    save(g, "weeklyCycle")


# ══════════════════════════════════════════════════════════════════
# 14. Dashboard Views
# ══════════════════════════════════════════════════════════════════

def diagram_dashboardViews():
    g = new_graph("dashViews", "LR", ranksep="0.45", nodesep="0.25")
    g.attr("node", width="1.3", height="0.4", fixedsize="true", fontsize="9", margin="0.04,0.02")
    with g.subgraph(name="cluster_sc") as s:
        s.attr(label="Sales Cockpit", style="rounded,dashed", color="#93c5fd", fontcolor="#1e3a5f", fontsize="10")
        node(s, "sc1", "Focus Mode", C_APP)
        node(s, "sc2", "Auto Follow-up", C_APP)
    with g.subgraph(name="cluster_qa") as s:
        s.attr(label="QA Module", style="rounded,dashed", color="#c4b5fd", fontcolor="#4c1d95", fontsize="10")
        node(s, "qa1", "AI Scorecard", C_AI)
        node(s, "qa2", "AI Coaching", C_AI)
    with g.subgraph(name="cluster_cc") as s:
        s.attr(label="Command Center", style="rounded,dashed", color="#fdba74", fontcolor="#7c2d12", fontsize="10")
        node(s, "cc1", "Live P&L", C_DATA)
        node(s, "cc2", "Anomaly Detect", C_DATA)
    g.edge("sc1", "sc2")
    g.edge("qa1", "qa2")
    g.edge("cc1", "cc2")
    g.edge("sc2", "qa1", style="dashed")
    g.edge("qa2", "cc1", style="dashed")
    save(g, "dashboardViews")


# ══════════════════════════════════════════════════════════════════
# 15. PDF vs Automation
# ══════════════════════════════════════════════════════════════════

def diagram_pdfVsAutomation():
    g = new_graph("pdfVsAuto", "LR", nodesep="0.35", ranksep="0.7")
    g.attr("node", width="1.25", height="0.45", fixedsize="true", fontsize="9", margin="0.04,0.02")
    with g.subgraph(name="cluster_sop") as s:
        s.attr(label="SOP PDF — rankinis E2E", style="rounded,dashed", color="#fca5a5", fontcolor="#991b1b", fontsize="10")
        node(s, "s1", "Ads / formos", C_MUDA)
        node(s, "s2", "Monday ranka\n+ cold lead", C_MUDA)
        node(s, "s3", "Google + ROI\n+ Excel", C_MUDA)
    with g.subgraph(name="cluster_os") as s:
        s.attr(label="DIPA OS", style="rounded,dashed", color="#86efac", fontcolor="#14532d", fontsize="10")
        node(s, "o1", "Ingest\n+ RAG", C_WF)
        node(s, "o2", "Newo +\nPre-Call", C_AI)
        node(s, "o3", "QA JSON\n+ Command", C_APP)
    g.edge("s1", "s2"); g.edge("s2", "s3")
    g.edge("o1", "o2"); g.edge("o2", "o3")
    g.edge("s3", "o1", style="dashed", label="transformacija", color="#0f766e")
    save(g, "pdfVsAutomation")


# ══════════════════════════════════════════════════════════════════
# 16. Extended Automation
# ══════════════════════════════════════════════════════════════════

def diagram_extendedAutomation():
    g = new_graph("extAuto", "LR", ranksep="0.8")
    node(g, "p1", "AI pasiūlymo\njuodraštis", C_AI)
    node(g, "p2", "E-sign status\nį CRM", C_STEP)
    node(g, "p3", "Post-Won\nonboarding", C_OUTPUT)
    node(g, "p4", "Ads CAC\nguardrails", C_ALERT)
    node(g, "p5", "NPS /\nCustomerHealth", C_APP)
    node(g, "hub", "n8n\nOrchestrator", C_WF)
    node(g, "dipa", "DIPA OS\nDashboard", C_APP)
    for p in ["p1","p2","p3","p4","p5"]:
        g.edge(p, "hub")
    g.edge("hub", "dipa")
    save(g, "extendedAutomation")


# ══════════════════════════════════════════════════════════════════
# 17. E2E Eleven Stages
# ══════════════════════════════════════════════════════════════════

def diagram_e2eElevenStages():
    g = new_graph("e2e11", "LR", nodesep="0.3", ranksep="0.45")
    stages = [
        ("a", "LEAD", C_SRC), ("b", "QUAL", C_WF), ("c", "DISCOVERY", C_WF),
        ("d", "PROPOSAL", C_STEP), ("e", "CLOSING", C_OUTPUT),
        ("f", "ONBOARDING", C_APP), ("g", "PREP", C_APP),
        ("h", "WORKSHOP", C_APP), ("i", "FOLLOW-UP", C_STEP),
        ("j", "ROI", C_OUTPUT), ("k", "UPSELL", C_OUTPUT),
    ]
    for nid, label, cat in stages:
        node(g, nid, label, cat)
    for i in range(len(stages) - 1):
        g.edge(stages[i][0], stages[i+1][0])
    save(g, "e2eElevenStages")


# ══════════════════════════════════════════════════════════════════
# 18. Handoff Closing → Delivery
# ══════════════════════════════════════════════════════════════════

def diagram_handoffClosingToDelivery():
    g = new_graph("handoff", "TB")
    node(g, "sales", "Sales\nDiscovery / Proposal", C_WF)
    decision(g, "gate", "Monday Won\n+ GATE")
    node(g, "pack", "Handoff paketas\nskausmas · pažadas ·\ntikslai · dalyviai · rizikos", C_STEP)
    node(g, "onb", "ONBOARDING SLA", C_APP)
    node(g, "del", "PREP → WORKSHOP\n→ FOLLOW-UP", C_APP)
    node(g, "rej", "Grąžinti į Sales\n+ priežastis audite", C_ALERT)
    g.edge("sales", "gate"); g.edge("gate", "pack", label="Taip")
    g.edge("gate", "rej", label="Ne")
    g.edge("rej", "sales", style="dashed", label="Taisyti")
    g.edge("pack", "onb"); g.edge("onb", "del")
    save(g, "handoffClosingToDelivery")


# ══════════════════════════════════════════════════════════════════
# 19. TOC Week Constraint
# ══════════════════════════════════════════════════════════════════

def diagram_tocWeekConstraint():
    g = new_graph("tocWeek", "TB")
    node(g, "sr", "Stop rule —\nneatitikimas", C_ALERT)
    node(g, "f", "Vienas focal\nbottleneck", C_ALERT)
    node(g, "t", "Visi dirba\ntik su juo", C_WF)
    node(g, "r", "RAG + Constraint\nreview", C_AI)
    node(g, "kpi", "Throughput Won/wk\nBuffer ROI · NPS", C_OUTPUT)
    g.edge("sr", "f"); g.edge("f", "t"); g.edge("t", "r"); g.edge("r", "kpi")
    save(g, "tocWeekConstraint")


# ══════════════════════════════════════════════════════════════════
# 20. JTBD Multi-Agent Architecture (Orchestrator + 7 specialist agents)
# ══════════════════════════════════════════════════════════════════

def diagram_jtbdMultiAgent():
    g = new_graph("jtbdAgents", "TB", ranksep="0.55", nodesep="0.30")
    g.attr("node", fontsize="10", margin="0.12,0.06", width="1.7")

    # User entry
    node(g, "user", "Vartotojas\n(DIPA RAG UI)", C_SRC)

    # Orchestrator in middle
    node(g, "orch", "Orchestrator Agent\n· srauto eiga\n· būsenos\n· validacija", C_AI)

    # 7 specialist agents
    with g.subgraph(name="cluster_agents") as s:
        s.attr(label="Specialist Agents", style="rounded,dashed",
               color="#a78bfa", fontcolor="#4c1d95", fontsize="10")
        node(s, "a1", "A. Intake /\nSession Manager", C_WF)
        node(s, "a2", "B. JTBD\nStrategist", C_WF)
        node(s, "a3", "C. Competitive /\nPositioning", C_WF)
        node(s, "a4", "D. Website\nAnalysis", C_WF)
        node(s, "a5", "E. 90-Day\nPlanner", C_WF)
        node(s, "a6", "F. OPPM\nMapper", C_WF)
        node(s, "a7", "G. Guardrail /\nCompliance", C_ALERT)

    # Knowledge layer
    node(g, "rag", "RAG Knowledge Layer\n(saugios instrukcijos)", C_AI)

    # OPPM output
    node(g, "oppm", "OPPM Projektas\n(matrica · tikslai · KPI)", C_OUTPUT)

    g.edge("user", "orch")
    g.edge("orch", "a1"); g.edge("orch", "a2"); g.edge("orch", "a3")
    g.edge("orch", "a4"); g.edge("orch", "a5"); g.edge("orch", "a6")
    g.edge("orch", "a7", style="dashed", label="visur")
    g.edge("rag", "orch", style="dashed", label="retrieval")
    g.edge("a6", "oppm", label="1 mygtukas")
    save(g, "jtbdMultiAgent")


# ══════════════════════════════════════════════════════════════════
# 21. Delivery → Upsell Loop (client dossier feedback into sales)
# ══════════════════════════════════════════════════════════════════

def diagram_deliveryUpsellLoop():
    g = new_graph("deliveryUpsell", "LR", ranksep="0.55", nodesep="0.30")
    g.attr("node", width="1.7", fontsize="10")

    with g.subgraph(name="cluster_del") as s:
        s.attr(label="Delivery (Mantas)", style="rounded,dashed",
               color="#16a34a", fontcolor="#14532d", fontsize="10")
        node(s, "wk", "Workshopai\n+ dirbtuvės", C_APP)
        node(s, "hw", "Namų darbai\n+ anketos", C_APP)
        node(s, "call", "Delivery\npokalbiai", C_APP)

    node(g, "dossier", "Kliento dosjė\n(CustomerHealth)", C_DATA)
    node(g, "ai", "AI analizė\n(signalai · NPS)", C_AI)
    node(g, "up", "Upsell / Cross-sell\npasiūlymas", C_OUTPUT)
    node(g, "sales", "Sales pipeline\n(Monday)", C_WF)

    g.edge("wk", "dossier")
    g.edge("hw", "dossier")
    g.edge("call", "dossier")
    g.edge("dossier", "ai")
    g.edge("ai", "up", label="signalas rastas")
    g.edge("up", "sales", label="naujas deal")
    g.edge("sales", "wk", style="dashed", label="pakartotinis\ndelivery")
    save(g, "deliveryUpsellLoop")


# ══════════════════════════════════════════════════════════════════
# 22. MVP Delegation Matrix (who does what)
# ══════════════════════════════════════════════════════════════════

def diagram_mvpDelegation():
    g = new_graph("mvpDeleg", "LR", ranksep="0.45", nodesep="0.25")
    g.attr("node", width="1.7", fontsize="9", margin="0.10,0.05")

    # MVP center
    node(g, "mvp", "MVP DIPA OS\n~255 h / 6 sav.", C_AI)

    # Eimantas — critical core + know-how in-house
    with g.subgraph(name="cluster_e") as s:
        s.attr(label="Eimantas — 180 h (core + know-how)", style="rounded,filled",
               fillcolor="#eff6ff", color="#3b82f6", fontcolor="#1e3a5f", fontsize="9")
        node(s, "e1", "Next.js karkasas\n+ Prisma schema", C_WF)
        node(s, "e2", "RAG + Vertex AI\n+ Strategic Brain", C_WF)
        node(s, "e3", "LLM promptai\n+ QA Scorecards", C_WF)
        node(s, "e4", "Co-Pilot + UI\nimplementacija", C_WF)
        node(s, "e5", "ICP / KPI\nturinys (in-house)", C_WF)

    # External N8N dev — minimized scope
    with g.subgraph(name="cluster_n") as s:
        s.attr(label="External N8N — 52 h (tik workflow'ai)", style="rounded,filled",
               fillcolor="#f0fdfa", color="#0f766e", fontcolor="#134e4a", fontsize="9")
        node(s, "n1", "Monday · Clockify\n· Ads API", C_APP)
        node(s, "n2", "Newo API\n+ eskalacija", C_APP)
        node(s, "n3", "WF5\nReconciliation", C_APP)

    # External Dev — Figma only
    with g.subgraph(name="cluster_d") as s:
        s.attr(label="External Dev — 14 h (tik Figma)", style="rounded,filled",
               fillcolor="#ecfeff", color="#0891b2", fontcolor="#164e63", fontsize="9")
        node(s, "d1", "Design System\n+ Cockpit maketas", C_APP)
        node(s, "d2", "Pre-Call Brief\n+ Command Center\nFigma maketai", C_APP)

    # Team — validation + delivery SOP
    with g.subgraph(name="cluster_t") as s:
        s.attr(label="Komanda — 9 h (UAT + SOP)", style="rounded,filled",
               fillcolor="#f0fdf4", color="#16a34a", fontcolor="#14532d", fontsize="9")
        node(s, "t1", "QA scorecard\nvalidacija", C_OUTPUT)
        node(s, "t2", "E2E UAT\nstaging'e", C_OUTPUT)
        node(s, "t3", "Delivery checklist\n+ handoff SOP", C_OUTPUT)

    g.edge("mvp", "e1", style="invis")
    g.edge("mvp", "n1", style="invis")
    g.edge("mvp", "d1", style="invis")
    g.edge("mvp", "t1", style="invis")
    save(g, "mvpDelegation")


# ══════════════════════════════════════════════════════════════════
# 23. 3 → 6 → 12 KPI Decomposition (cause-effect tree)
# ══════════════════════════════════════════════════════════════════

def diagram_kpiDecomposition():
    g = new_graph("kpiDecomp", "TB", ranksep="0.45", nodesep="0.25")
    g.attr("node", fontsize="10", width="1.6")

    # Top: 3 most important
    with g.subgraph(name="cluster_top") as s:
        s.attr(label="3 svarbiausi (vadovybei)", style="rounded,dashed",
               color="#dc2626", fontcolor="#7f1d1d", fontsize="10")
        node(s, "t1", "ROAS", C_ALERT)
        node(s, "t2", "Won Deals / sav.", C_ALERT)
        node(s, "t3", "Bottleneck\nIndex", C_ALERT)

    # Middle: 6 drivers
    with g.subgraph(name="cluster_mid") as s:
        s.attr(label="6 varikliai (vadovų)", style="rounded,dashed",
               color="#ca8a04", fontcolor="#713f12", fontsize="10")
        node(s, "m1", "CAC", C_DECIDE)
        node(s, "m2", "LVR", C_DECIDE)
        node(s, "m3", "TTR", C_DECIDE)
        node(s, "m4", "Pipeline\nConversion", C_DECIDE)
        node(s, "m5", "AI vs Human\nQualification", C_DECIDE)
        node(s, "m6", "Core Sales\nEfficiency", C_DECIDE)

    # Bottom: 12 operational
    with g.subgraph(name="cluster_bot") as s:
        s.attr(label="12 operaciniai (komandos)", style="rounded,dashed",
               color="#0f766e", fontcolor="#134e4a", fontsize="10")
        node(s, "b1", "Lead Speed", C_WF)
        node(s, "b2", "QA Score", C_WF)
        node(s, "b3", "Talk/Listen", C_WF)
        node(s, "b4", "Obj. Win%", C_WF)
        node(s, "b5", "NPS", C_WF)
        node(s, "b6", "Churn", C_WF)
        node(s, "b7", "Upsell €", C_WF)
        node(s, "b8", "Sentiment", C_WF)
        node(s, "b9", "Followup%", C_WF)
        node(s, "b10", "RAG Hits", C_WF)
        node(s, "b11", "Ad CTR", C_WF)
        node(s, "b12", "GATE Pass%", C_WF)

    # Cause-effect (only a few to avoid noise)
    g.edge("m1", "t1", label="↑")
    g.edge("m2", "t2")
    g.edge("m3", "t2")
    g.edge("m4", "t3")
    g.edge("m5", "t3")
    g.edge("m6", "t3")
    g.edge("b2", "m4"); g.edge("b3", "m6"); g.edge("b4", "m4")
    g.edge("b5", "m5"); g.edge("b1", "m2"); g.edge("b11", "m1")
    save(g, "kpiDecomposition")


# ══════════════════════════════════════════════════════════════════

ALL = [
    diagram_tocFlow, diagram_leanMuda,
    diagram_systemArchitecture, diagram_systemArchitectureOverview,
    diagram_ragArchitecture,
    diagram_wfLeadIngestion, diagram_wfPreCallBrief, diagram_wfPostCall,
    diagram_wfStrategicMemory, diagram_wfReconciliation,
    diagram_newoDecisionTree, diagram_leadLifecycle,
    diagram_weeklyCycle, diagram_dashboardViews,
    diagram_pdfVsAutomation, diagram_extendedAutomation,
    diagram_e2eElevenStages, diagram_handoffClosingToDelivery,
    diagram_tocWeekConstraint,
    diagram_jtbdMultiAgent, diagram_deliveryUpsellLoop,
    diagram_mvpDelegation, diagram_kpiDecomposition,
]

def main() -> None:
    print(f"Generating {len(ALL)} diagrams...\n")
    for fn in ALL:
        fn()
    print(f"\nDone — {len(ALL)} SVGs in {OUT_DIR}")

if __name__ == "__main__":
    main()
