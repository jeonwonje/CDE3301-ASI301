#!/usr/bin/env python3
"""Convert a GanttProject .gan file to a Frappe-Gantt-compatible JSON.

Usage:
    python _scripts/gan_to_json.py \
        assets/gantt/project_gantt.gan \
        assets/gantt/project_gantt.json
"""
import json
import sys
import xml.etree.ElementTree as ET
from datetime import date, timedelta
from pathlib import Path

OWNER_CLASS = {
    "yizhang": "bar-yizhang",
    "wonje": "bar-wonje",
    "russell": "bar-russell",
    "ming yuan": "bar-mingyuan",
    "gary": "bar-gary",
    "all": "bar-all",
}


def owner_class(swimlane_name: str) -> str:
    name = swimlane_name.lower()
    for key, cls in OWNER_CLASS.items():
        if name.startswith(key):
            return cls
    return "bar-default"


def iso_add_days(start: str, days: int) -> str:
    y, m, d = (int(x) for x in start.split("-"))
    return (date(y, m, d) + timedelta(days=days)).isoformat()


def convert(gan_path: Path, json_path: Path) -> None:
    root = ET.parse(gan_path).getroot()
    project_name = root.get("name", "Project")

    tasks = []
    swimlanes = []

    for top in root.find("tasks"):
        if top.tag != "task":
            continue
        swim_name = top.get("name", "")
        swim_id = top.get("id")
        swim_class = owner_class(swim_name)
        swimlanes.append(
            {"id": swim_id, "name": swim_name, "custom_class": swim_class}
        )
        for child in top:
            if child.tag != "task":
                continue
            start = child.get("start")
            dur = int(child.get("duration", "1"))
            tasks.append(
                {
                    "id": f"t{child.get('id')}",
                    "name": child.get("name", ""),
                    "start": start,
                    "end": iso_add_days(start, dur),
                    "progress": 0,
                    "dependencies": "",
                    "swimlane": swim_name,
                    "custom_class": swim_class,
                }
            )

    payload = {
        "project": project_name,
        "swimlanes": swimlanes,
        "tasks": tasks,
    }
    json_path.write_text(json.dumps(payload, indent=2) + "\n")
    print(
        f"Wrote {len(tasks)} tasks across {len(swimlanes)} swimlanes -> {json_path}"
    )


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(__doc__, file=sys.stderr)
        sys.exit(1)
    convert(Path(sys.argv[1]), Path(sys.argv[2]))
