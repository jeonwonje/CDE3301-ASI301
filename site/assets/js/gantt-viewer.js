// Frappe Gantt viewer for CDE3301 project plan.
// Loads the pre-converted JSON and renders a read-only chart with a
// swimlane legend and view-mode switcher.

(function () {
  const DEFAULT_MODE = "Week";

  function fmt(d) {
    return new Date(d).toLocaleDateString("en-SG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function buildPopup({ task }) {
    return `
      <div class="gantt-popup">
        <h5 class="mb-1">${task.name}</h5>
        <div class="text-muted small">${task.swimlane || ""}</div>
        <hr class="my-2"/>
        <div><strong>Start:</strong> ${fmt(task._start || task.start)}</div>
        <div><strong>End:</strong> ${fmt(task._end || task.end)}</div>
      </div>`;
  }

  function renderLegend(swimlanes, container) {
    const items = swimlanes
      .map(
        (s) =>
          `<span class="gantt-legend-item ${s.custom_class}">
             <span class="gantt-legend-swatch"></span>${s.name}
           </span>`
      )
      .join("");
    container.innerHTML = items;
  }

  function bindModeButtons(gantt, root) {
    root.querySelectorAll("[data-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.mode;
        gantt.change_view_mode(mode);
        root
          .querySelectorAll("[data-mode]")
          .forEach((b) => b.classList.toggle("active", b === btn));
      });
    });
  }

  async function init() {
    const mount = document.getElementById("gantt");
    const legend = document.getElementById("gantt-legend");
    const controls = document.getElementById("gantt-controls");
    if (!mount) return;

    const dataUrl = mount.dataset.url;
    if (!dataUrl) {
      mount.innerHTML = `<p class="text-danger">Missing data-url on #gantt.</p>`;
      return;
    }
    const res = await fetch(dataUrl);
    if (!res.ok) {
      mount.innerHTML = `<p class="text-danger">Failed to load Gantt data.</p>`;
      return;
    }
    const data = await res.json();

    const tasks = data.tasks.map((t) => ({
      id: t.id,
      name: t.name,
      start: t.start,
      end: t.end,
      progress: t.progress,
      dependencies: t.dependencies || "",
      custom_class: t.custom_class,
      swimlane: t.swimlane,
    }));

    // Pin the chart range to min(task.start)..max(task.end) by shrinking
    // Frappe's per-view-mode padding (defaults: Day=7d, Week=1m, Month=2m).
    // Month mode snaps end DOWN to the first-of-month, so it needs 1m right-pad
    // to avoid clipping tasks that end mid-month.
    const view_modes = [
      { ...Gantt.VIEW_MODE.DAY, padding: ["0d", "0d"] },
      { ...Gantt.VIEW_MODE.WEEK, padding: ["0d", "0d"] },
      { ...Gantt.VIEW_MODE.MONTH, padding: ["0d", "1m"] },
    ];

    const gantt = new Gantt(mount, tasks, {
      view_mode: DEFAULT_MODE,
      view_modes,
      readonly: true,
      popup: buildPopup,
      language: "en",
    });

    renderLegend(data.swimlanes, legend);
    bindModeButtons(gantt, controls);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
