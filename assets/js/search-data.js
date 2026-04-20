// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-cde3301-sand-collection-system",
    title: "CDE3301 · Sand Collection System",
    section: "Navigation",
    handler: () => {
      window.location.href = "/CDE3301-ASI301/";
    },
  },{id: "nav-gantt-chart",
          title: "Gantt Chart",
          description: "Interactive Gantt chart for the Sand Collection System project (CDE3301 / ASI-301).",
          section: "Navigation",
          handler: () => {
            window.location.href = "/CDE3301-ASI301/gantt/";
          },
        },];
