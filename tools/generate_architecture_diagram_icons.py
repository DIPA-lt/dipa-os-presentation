"""
Generate icon-based architecture SVG and inline icon assets.

Uses a mix of built-in mingrammer/diagrams icons and custom downloaded icons
so every node has a semantically correct, distinct visual.
"""

from __future__ import annotations

import base64
import mimetypes
import re
from pathlib import Path

from diagrams import Cluster, Diagram, Edge
from diagrams.custom import Custom

from diagrams.gcp.ml import VertexAI, STT
from diagrams.gcp.database import Datastore
from diagrams.gcp.compute import Run as CloudRun
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.monitoring import Grafana
from diagrams.programming.framework import NextJs
from diagrams.saas.social import Facebook
from diagrams.saas.communication import Twilio


ROOT = Path(__file__).resolve().parents[1]
ICON_DIR = Path(__file__).resolve().parent / "icons"
OUT_DIR = ROOT / "assets"
OUT_DIR.mkdir(parents=True, exist_ok=True)
SVG_BASENAME = "architecture-dipa-os-icons"
SVG_PATH = OUT_DIR / f"{SVG_BASENAME}.svg"


def icon(name: str) -> str:
    return str(ICON_DIR / name)


def _file_to_data_uri(path: Path) -> str:
    raw = path.read_bytes()
    mime, _ = mimetypes.guess_type(path.name)
    if not mime:
        mime = "application/octet-stream"
    encoded = base64.b64encode(raw).decode("ascii")
    return f"data:{mime};base64,{encoded}"


def inline_svg_assets(svg_path: Path) -> int:
    text = svg_path.read_text(encoding="utf-8")
    pattern = re.compile(r'((?:xlink:)?href)="([^"]+)"')
    replaced = 0

    def repl(match: re.Match[str]) -> str:
        nonlocal replaced
        attr, value = match.group(1), match.group(2)
        if value.startswith(("data:", "http://", "https://")):
            return match.group(0)
        candidate = Path(value)
        if not candidate.exists():
            candidate = (svg_path.parent / value).resolve()
        if not candidate.exists():
            return match.group(0)
        replaced += 1
        return f'{attr}="{_file_to_data_uri(candidate)}"'

    patched = pattern.sub(repl, text)
    svg_path.write_text(patched, encoding="utf-8")
    return replaced


def build_diagram() -> None:
    graph_attr = {
        "pad": "0.3",
        "nodesep": "0.4",
        "ranksep": "0.6",
        "splines": "ortho",
        "bgcolor": "white",
        "fontsize": "12",
        "fontname": "Segoe UI",
        "labelloc": "t",
        "labeljust": "l",
    }

    node_attr = {
        "shape": "box",
        "style": "rounded,filled",
        "fillcolor": "#fafaf9",
        "color": "#0f766e",
        "penwidth": "1.2",
        "fontname": "Segoe UI",
        "fontsize": "9",
        "width": "0.85",
        "height": "0.85",
        "imagescale": "true",
        "imagepos": "tc",
    }

    edge_attr = {
        "color": "#57534e",
        "penwidth": "1.6",
        "arrowsize": "0.5",
        "fontname": "Segoe UI",
        "fontsize": "8",
        "fontcolor": "#78716c",
    }

    invisible_cluster = {
        "style": "invis",
        "margin": "6",
    }

    with Diagram(
        name="",
        filename=str((OUT_DIR / SVG_BASENAME).as_posix()),
        show=False,
        direction="TB",
        outformat="svg",
        graph_attr=graph_attr,
        node_attr=node_attr,
        edge_attr=edge_attr,
    ):
        with Cluster("Sources", graph_attr=invisible_cluster):
            fb = Facebook("Facebook\nAds")
            li = Custom("LinkedIn\nAds", icon("linkedin.png"))
            outlook = Custom("Outlook\nEmail", icon("outlook.png"))
            plaud = Custom("Plaud\nAudio", icon("microphone.png"))
            meetings = Custom("Meetings", icon("calendar.png"))

        with Cluster("n8n Orchestration", graph_attr=invisible_cluster):
            wf1 = Custom("WF1\nIngestion", icon("n8n.png"))
            wf2 = Custom("WF2\nPre-Call", icon("n8n.png"))
            wf3 = Custom("WF3\nPost-Call QA", icon("n8n.png"))
            wf4 = Custom("WF4\nMemory Sync", icon("n8n.png"))
            wf5 = Custom("WF5\nReconcile", icon("n8n.png"))

        with Cluster("AI Services", graph_attr=invisible_cluster):
            rag = Datastore("Vertex\nRAG")
            gemini = VertexAI("Gemini\n2.5 Pro")
            whisper = STT("Whisper\nSTT")
            newo = Custom("Newo AI\nCalls", icon("phone.png"))

        with Cluster("CRM & Storage", graph_attr=invisible_cluster):
            monday = Custom("Monday.com", icon("monday.png"))
            pg = PostgreSQL("PostgreSQL")

        with Cluster("DIPA OS App", graph_attr=invisible_cluster):
            app = NextJs("Dashboard")
            copil = Custom("Co-Pilot", icon("robot.png"))
            qa_view = Grafana("QA\nScorecard")
            cmd = CloudRun("Command\nCenter")

        fb >> Edge(color="#0f766e") >> wf1
        li >> Edge(color="#0f766e") >> wf1
        outlook >> Edge(color="#0f766e") >> wf2
        plaud >> Edge(color="#0f766e") >> wf3
        meetings >> Edge(color="#0f766e") >> wf4

        wf1 >> Edge(label="C-leads") >> newo
        newo >> Edge(label="results") >> wf3
        wf2 >> Edge(label="brief") >> gemini
        wf3 >> Edge(label="audio") >> whisper
        whisper >> Edge(label="transcript") >> gemini
        wf4 >> Edge(label="chunks") >> rag
        rag >> Edge(style="dashed", label="context") >> gemini

        wf1 >> monday
        gemini >> Edge(label="QA JSON") >> pg
        gemini >> Edge(label="insights") >> monday
        wf4 >> monday
        wf5 >> Edge(label="diff log") >> pg
        monday >> wf5

        pg >> qa_view >> app
        pg >> cmd >> app
        rag >> copil >> app


def main() -> None:
    build_diagram()
    replaced = inline_svg_assets(SVG_PATH)
    print(f"Generated: {SVG_PATH}")
    print(f"Inlined image references: {replaced}")


if __name__ == "__main__":
    main()
