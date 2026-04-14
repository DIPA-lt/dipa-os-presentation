"""
Generate DIPA OS architecture diagram as SVG.

Why not icon nodes from `diagrams`?
On Windows, generated SVG can reference absolute local icon paths, which do not
resolve in browser-hosted preview. This script renders pure vector nodes so the
output is portable and always visible.
"""

from pathlib import Path

from graphviz import Digraph


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def add_node(g: Digraph, node_id: str, label: str, fill: str = "#ffffff") -> None:
    g.node(
        node_id,
        label=label,
        shape="rect",
        style="rounded,filled",
        fillcolor=fill,
        color="#0f766e",
        penwidth="1.2",
        fontname="Segoe UI",
        fontsize="11",
        margin="0.12,0.08",
    )


def main() -> None:
    g = Digraph("dipa_arch", filename=str((OUT_DIR / "architecture-dipa-os").as_posix()), format="svg")
    g.attr(
        rankdir="TB",
        bgcolor="transparent",
        pad="0.25",
        nodesep="0.45",
        ranksep="0.75",
        splines="spline",
        fontname="Segoe UI",
        fontsize="16",
        labelloc="t",
        label="DIPA OS Architecture (diagram-as-code)",
    )
    g.attr("edge", color="#78716c", penwidth="1.1", arrowsize="0.7", fontname="Segoe UI", fontsize="10")

    with g.subgraph(name="cluster_sources") as c:
        c.attr(label="Sources", color="#d6d3d1", style="rounded", bgcolor="#f8fafc")
        add_node(c, "ads", "Facebook / LinkedIn Ads")
        add_node(c, "outlook", "Outlook")
        add_node(c, "plaud", "Plaud Audio")
        add_node(c, "meetings", "Meetings")
        add_node(c, "clockify", "Clockify")

    with g.subgraph(name="cluster_wf") as c:
        c.attr(label="Orchestration (n8n)", color="#d6d3d1", style="rounded", bgcolor="#f8fafc")
        add_node(c, "wf1", "WF1 Lead Ingestion", "#ecfdf5")
        add_node(c, "wf2", "WF2 Pre-Call Brief", "#ecfdf5")
        add_node(c, "wf3", "WF3 Post-Call QA", "#ecfdf5")
        add_node(c, "wf4", "WF4 Strategic Memory", "#ecfdf5")
        add_node(c, "wf5", "WF5 Reconciliation", "#ecfdf5")

    with g.subgraph(name="cluster_ai") as c:
        c.attr(label="AI Layer", color="#d6d3d1", style="rounded", bgcolor="#f8fafc")
        add_node(c, "rag", "Vertex AI RAG", "#f0f9ff")
        add_node(c, "gemini", "Gemini 2.5 Pro", "#f0f9ff")
        add_node(c, "whisper", "Whisper STT", "#f0f9ff")
        add_node(c, "newo", "Newo AI", "#f0f9ff")

    with g.subgraph(name="cluster_data") as c:
        c.attr(label="Data / CRM", color="#d6d3d1", style="rounded", bgcolor="#f8fafc")
        add_node(c, "monday", "Monday.com", "#fffbeb")
        add_node(c, "pg", "PostgreSQL", "#fffbeb")

    with g.subgraph(name="cluster_app") as c:
        c.attr(label="DIPA OS App", color="#d6d3d1", style="rounded", bgcolor="#f8fafc")
        add_node(c, "copilot", "Co-Pilot")
        add_node(c, "cockpit", "Sales Cockpit")
        add_node(c, "qa", "QA Module")
        add_node(c, "cmd", "Command Center")

    with g.subgraph(name="cluster_compliance") as c:
        c.attr(label="Compliance", color="#d6d3d1", style="rounded", bgcolor="#f8fafc")
        add_node(c, "gdpr", "GDPR / Audit")
        add_node(c, "alerts", "Alerts")

    # Source inputs
    g.edge("ads", "wf1")
    g.edge("outlook", "wf2")
    g.edge("plaud", "wf3")
    g.edge("meetings", "wf4")
    g.edge("clockify", "pg")

    # Orchestration + AI
    g.edge("wf1", "monday")
    g.edge("wf1", "newo", label="C leads")
    g.edge("newo", "wf3", label="results")
    g.edge("rag", "wf1", style="dashed", label="enrichment")
    g.edge("wf1", "rag", style="dashed", label="new facts")

    g.edge("rag", "gemini", style="dashed", label="context")
    g.edge("wf2", "gemini")
    g.edge("wf2", "monday")

    g.edge("wf3", "whisper")
    g.edge("whisper", "gemini")
    g.edge("gemini", "pg", label="QA JSON")
    g.edge("wf3", "monday")

    g.edge("wf4", "rag")
    g.edge("wf4", "monday")

    # Reconciliation
    g.edge("monday", "wf5")
    g.edge("pg", "wf5")
    g.edge("wf5", "pg", label="log + diff")
    g.edge("wf5", "alerts")

    # App views
    g.edge("rag", "copilot")
    g.edge("pg", "cockpit")
    g.edge("pg", "qa")
    g.edge("pg", "cmd")

    # Compliance
    g.edge("gdpr", "monday", style="dashed", label="consent")
    g.edge("gdpr", "pg", style="dashed", label="audit")

    g.render(cleanup=True)


if __name__ == "__main__":
    main()
