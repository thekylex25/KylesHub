// Utility for page URLs
export function createPageUrl(name) {
  return `/${name.toLowerCase()}`;
}

// LocalStorage helpers for plugins and submissions
export function getPlugins() {
  return JSON.parse(localStorage.getItem("kyleshub_plugins") || "[]");
}
export function savePlugins(plugins) {
  localStorage.setItem("kyleshub_plugins", JSON.stringify(plugins));
}
export function getSubmissions() {
  return JSON.parse(localStorage.getItem("kyleshub_submissions") || "[]");
}
export function saveSubmissions(subs) {
  localStorage.setItem("kyleshub_submissions", JSON.stringify(subs));
}
