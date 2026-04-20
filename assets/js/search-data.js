// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-cde3301-beach-debris-collection-system",
    title: "CDE3301 · Beach Debris Collection System",
    section: "Navigation",
    handler: () => {
      window.location.href = "/CDE3301-ASI301/";
    },
  },{id: "nav-gantt-chart",
          title: "Gantt Chart",
          description: "Interactive Gantt chart for the Beach Collection System project (CDE3301 / ASI-301).",
          section: "Navigation",
          handler: () => {
            window.location.href = "/CDE3301-ASI301/gantt/";
          },
        },];
