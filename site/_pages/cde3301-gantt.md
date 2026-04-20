---
layout: page
permalink: /
title: CDE3301 Semester 2 Plan
description: Interactive Gantt chart for the Sand Collection System project (CDE3301 / ASI-301).
nav: true
nav_order: 1
_styles: >
  .gantt-controls { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .gantt-controls button { padding: 0.25rem 0.75rem; border: 1px solid #ccc; background: #fff; border-radius: 4px; cursor: pointer; font-size: 0.875rem; }
  .gantt-controls button.active { background: #333; color: #fff; border-color: #333; }
  .gantt-legend { display: flex; flex-wrap: wrap; gap: 1rem; margin: 1rem 0; font-size: 0.875rem; }
  .gantt-legend-item { display: inline-flex; align-items: center; gap: 0.35rem; }
  .gantt-legend-swatch { display: inline-block; width: 14px; height: 14px; border-radius: 3px; background: #999; }
  .gantt-legend-item.bar-yizhang   .gantt-legend-swatch { background: #e06c75; }
  .gantt-legend-item.bar-wonje     .gantt-legend-swatch { background: #61afef; }
  .gantt-legend-item.bar-russell   .gantt-legend-swatch { background: #98c379; }
  .gantt-legend-item.bar-mingyuan  .gantt-legend-swatch { background: #e5c07b; }
  .gantt-legend-item.bar-gary      .gantt-legend-swatch { background: #c678dd; }
  .gantt-legend-item.bar-all       .gantt-legend-swatch { background: #56b6c2; }
  .gantt .bar-wrapper.bar-yizhang   .bar { fill: #e06c75; }
  .gantt .bar-wrapper.bar-wonje     .bar { fill: #61afef; }
  .gantt .bar-wrapper.bar-russell   .bar { fill: #98c379; }
  .gantt .bar-wrapper.bar-mingyuan  .bar { fill: #e5c07b; }
  .gantt .bar-wrapper.bar-gary      .bar { fill: #c678dd; }
  .gantt .bar-wrapper.bar-all       .bar { fill: #56b6c2; }
  #gantt-wrap { overflow-x: auto; border: 1px solid #eee; border-radius: 6px; padding: 0.5rem; }
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/frappe-gantt@1.0.3/dist/frappe-gantt.css" />

<div id="gantt-controls" class="gantt-controls">
  <button data-mode="Day">Day</button>
  <button data-mode="Week" class="active">Week</button>
  <button data-mode="Month">Month</button>
</div>

<div id="gantt-legend" class="gantt-legend"></div>

<div id="gantt-wrap">
  <svg id="gantt" data-url="{{ '/assets/gantt/project_gantt.json' | relative_url }}"></svg>
</div>

<p class="text-muted small mt-3">
  Source: <a href="{{ '/assets/gantt/project_gantt.gan' | relative_url }}">project_gantt.gan</a>
  &middot;
  <a href="{{ '/assets/gantt/project_gantt.json' | relative_url }}">JSON</a>
</p>

<script src="https://cdn.jsdelivr.net/npm/frappe-gantt@1.0.3/dist/frappe-gantt.umd.js"></script>
<script src="{{ '/assets/js/gantt-viewer.js' | relative_url }}"></script>
