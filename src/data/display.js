export const scheduleColors = {
  rest:           { bg: "#f5f5f5", color: "#bbb",    label: "Rest" },
  yoga:           { bg: "#f0ebf8", color: "#7c4db0", label: "Yoga" },
  run:            { bg: "#e8f5ee", color: "#2d7d5e", label: "Run" },
  cycling:        { bg: "#fff8e1", color: "#c47d00", label: "Cycling" },
  strength_lower: { bg: "#fde8e8", color: "#b02020", label: "Lower Body" },
  strength_upper: { bg: "#e8eef8", color: "#2d5a8e", label: "Upper Body" },
  long_run:       { bg: "#1a1a2e", color: "#f5a623", label: "Long Run" },
};

export const phaseColors = {
  "Base Build":    { bg: "#edf7f2", accent: "#2d7d5e", border: "#b8e0cf" },
  "Early Build":   { bg: "#edf3fa", accent: "#2d5a8e", border: "#b8d0ea" },
  "Mileage Build": { bg: "#f5edf9", accent: "#6b2d8e", border: "#dab8ea" },
  "Strength Phase":{ bg: "#faf3ed", accent: "#8e5a2d", border: "#ead8b8" },
  "Peak Build":    { bg: "#faeded", accent: "#8e2d2d", border: "#eab8b8" },
  "Peak":          { bg: "#faf0ed", accent: "#c44d00", border: "#f0c8b0" },
  "Taper":         { bg: "#edf5ed", accent: "#4a8e2d", border: "#b8dab8" },
  "Race Week":     { bg: "#1a1a2e", accent: "#f5a623", border: "#3a3a5e" },
};

export const runTypeStyle = {
  easy:     { bg: "#e8f5ee", color: "#2d7d5e", label: "Easy" },
  mp:       { bg: "#e8f0fa", color: "#2d5a8e", label: "MP" },
  tempo:    { bg: "#fef3e8", color: "#c4640a", label: "Tempo" },
  strides:  { bg: "#fdeaea", color: "#b02020", label: "Strides" },
  recovery: { bg: "#f0ecf8", color: "#6b4da0", label: "Recovery" },
};

export const dayLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export function getSchedule(w) {
  const isDeload = w.deload;
  const isRace = w.phase === "Race Week";
  const isTaper = w.phase === "Taper";
  const isLate = w.week >= 17;

  if (isRace) return [
    { type: "rest",           detail: "Full rest" },
    { type: "run",            detail: "3 mi easy shakeout" },
    { type: "rest",           detail: "Full rest" },
    { type: "run",            detail: "3 mi + 2 strides" },
    { type: "rest",           detail: "Full rest" },
    { type: "rest",           detail: "Full rest — pack & prep" },
    { type: "long_run",       detail: "🏁 Race day!" },
  ];

  if (isDeload) return [
    { type: "yoga",           detail: "Recovery yoga — no deep calf stretches" },
    { type: "run",            detail: `${w.runs[0].mi} mi recovery pace` },
    { type: "strength_lower", detail: "Light lower body — 60% normal weight" },
    { type: "run",            detail: `${w.runs[1].mi} mi recovery pace` },
    { type: "rest",           detail: "Full rest" },
    { type: "cycling",        detail: "60–75 min easy spin" },
    { type: "long_run",       detail: `${w.longRun} mi easy + upper body strength` },
  ];

  if (isTaper) return [
    { type: "yoga",           detail: "Mobility focus" },
    { type: "run",            detail: `${w.runs[0].mi} mi easy` },
    { type: "strength_lower", detail: "Light lower body — maintain, don't strain" },
    { type: "run",            detail: `${w.runs[1].mi} mi easy${w.runs[1].note ? " · " + w.runs[1].note : ""}` },
    { type: "rest",           detail: "Full rest" },
    { type: "cycling",        detail: "60 min easy spin" },
    { type: "long_run",       detail: `${w.longRun} mi easy + upper body strength` },
  ];

  return [
    { type: "yoga",           detail: "Recovery yoga — dynamic, avoid deep Achilles stretches" },
    { type: "run",            detail: `${w.runs[0].mi} mi ${w.runs[0].type}${w.runs[0].note ? " · " + w.runs[0].note : ""}` },
    { type: "strength_lower", detail: "Lower body: heel drops, RDLs, Bulgarian split squats, glutes" },
    { type: "run",            detail: `${w.runs[1].mi} mi ${w.runs[1].type}${w.runs[1].note ? " · " + w.runs[1].note : ""}` },
    { type: "rest",           detail: isLate ? "Full rest — protecting long run quality" : "Full rest" },
    { type: "cycling",        detail: "90 min endurance ride — replaces 3rd run" },
    { type: "long_run",       detail: `${w.longRun} mi ${w.runs[2].type}${w.runs[2].note ? " · " + w.runs[2].note : ""} + upper body strength` },
  ];
}
