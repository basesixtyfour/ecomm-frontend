import mixpanel from "mixpanel-browser";

const token = import.meta.env.VITE_MIXPANEL_TOKEN;
if (token) {
  mixpanel.init(token, {
    debug: import.meta.env.DEV,
    track_pageview: true,
    persistence: "localStorage",
    autocapture: true,
    record_sessions_percent: 100,
  });
}

export { mixpanel };
