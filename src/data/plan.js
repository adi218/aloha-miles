export const paceZones = {
  easy:     { label: "Easy / Long Run",  pace: "11:00–11:30 /mi", color: "#4a9b6f", desc: "Conversational. Nose breathing. This is 80% of your runs.", feel: "Could sing a song" },
  mp:       { label: "Marathon Pace",    pace: "10:15 /mi",       color: "#2d7ab5", desc: "Comfortably hard. Full sentences, but focused. Target race pace.", feel: "Could answer in sentences" },
  tempo:    { label: "Tempo",            pace: "9:30–10:00 /mi",  color: "#e07b2a", desc: "Comfortably hard. 1–2 mile efforts within a run. Builds lactate threshold.", feel: "Short phrases only" },
  strides:  { label: "Strides",          pace: "~8:30 /mi",       color: "#c0392b", desc: "4×20 sec acceleration. Not sprinting — controlled fast. Full recovery between.", feel: "Can't talk" },
  recovery: { label: "Recovery",         pace: "11:45–12:30 /mi", color: "#8e6dbf", desc: "After hard efforts or deload weeks. Slower than feels necessary.", feel: "Effortless" },
};

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

export const weeks = [
  { week: 1,  dates: "Jun 01 – Jun 07",  phase: "Base Build",    longRun: 6,    totalMiles: 14, runs: [{mi:3,type:"easy"},{mi:5,type:"easy"},{mi:6,type:"easy"}],                                    notes: "Today finishes week 1. Easy pace only. Achilles isometrics daily.", deload: false },
  { week: 2,  dates: "Jun 08 – Jun 14",  phase: "Base Build",    longRun: 6.5,  totalMiles: 15, runs: [{mi:3,type:"easy"},{mi:5.5,type:"easy"},{mi:6.5,type:"easy"}],                                notes: "Add calf heel drops post-run. Keep HR conversational.", deload: false },
  { week: 3,  dates: "Jun 15 – Jun 21",  phase: "Base Build",    longRun: 7,    totalMiles: 16, runs: [{mi:3.5,type:"easy"},{mi:5.5,type:"easy"},{mi:7,type:"easy"}],                                notes: "First 7-miler. Note any Achilles feedback.", deload: false },
  { week: 4,  dates: "Jun 22 – Jun 28",  phase: "Base Build",    longRun: 6,    totalMiles: 12, runs: [{mi:3,type:"recovery"},{mi:3,type:"recovery"},{mi:6,type:"easy"}],                            notes: "Deload week. 75% volume. Recovery runs only. Strength focus.", deload: true },
  { week: 5,  dates: "Jun 29 – Jul 05",  phase: "Early Build",   longRun: 7.5,  totalMiles: 17, runs: [{mi:3.5,type:"easy"},{mi:6,type:"easy",note:"4× strides at end"},{mi:7.5,type:"easy"}],      notes: "Introduce strides on mid-week run — 4×20 sec fast, walk back.", deload: false },
  { week: 6,  dates: "Jul 06 – Jul 12",  phase: "Early Build",   longRun: 8,    totalMiles: 18, runs: [{mi:4,type:"easy"},{mi:6,type:"easy",note:"4× strides"},{mi:8,type:"easy"}],                 notes: "Start heavy slow resistance (leg press calf raises). Achilles work 3×/wk.", deload: false },
  { week: 7,  dates: "Jul 13 – Jul 19",  phase: "Early Build",   longRun: 8.5,  totalMiles: 19, runs: [{mi:4,type:"easy"},{mi:6.5,type:"easy",note:"4× strides"},{mi:8.5,type:"easy"}],            notes: "Feeling strong? Keep it easy anyway. Adaptation happens during rest.", deload: false },
  { week: 8,  dates: "Jul 20 – Jul 26",  phase: "Early Build",   longRun: 7,    totalMiles: 14, runs: [{mi:3,type:"recovery"},{mi:4,type:"recovery"},{mi:7,type:"easy"}],                           notes: "Deload. Legs should feel springy coming out of this.", deload: true },
  { week: 9,  dates: "Jul 27 – Aug 02",  phase: "Mileage Build", longRun: 9,    totalMiles: 21, runs: [{mi:4,type:"easy"},{mi:8,type:"easy",note:"1 mi tempo"},{mi:9,type:"easy"}],                 notes: "First 9-miler. Sneak in 1 mile at tempo pace mid-week.", deload: false },
  { week: 10, dates: "Aug 03 – Aug 09",  phase: "Mileage Build", longRun: 10,   totalMiles: 23, runs: [{mi:5,type:"easy"},{mi:8,type:"easy",note:"2 mi tempo"},{mi:10,type:"easy"}],                notes: "Double digits! Fuel during long run (gel at mile 6+).", deload: false },
  { week: 11, dates: "Aug 10 – Aug 16",  phase: "Mileage Build", longRun: 11,   totalMiles: 25, runs: [{mi:5,type:"easy"},{mi:9,type:"easy",note:"2 mi tempo"},{mi:11,type:"easy"}],                notes: "Practice race-day breakfast 2hrs before long run.", deload: false },
  { week: 12, dates: "Aug 17 – Aug 23",  phase: "Mileage Build", longRun: 9,    totalMiles: 18, runs: [{mi:4,type:"recovery"},{mi:5,type:"recovery"},{mi:9,type:"easy"}],                           notes: "Deload. Mandatory rest. Body is absorbing fitness.", deload: true },
  { week: 13, dates: "Aug 24 – Aug 30",  phase: "Strength Phase",longRun: 12,   totalMiles: 27, runs: [{mi:5,type:"easy"},{mi:10,type:"mp",note:"2 mi at MP"},{mi:12,type:"easy"}],                 notes: "First marathon pace miles. 2 mi at MP mid-run, not at the end.", deload: false },
  { week: 14, dates: "Aug 31 – Sep 06",  phase: "Strength Phase",longRun: 13,   totalMiles: 29, runs: [{mi:6,type:"easy"},{mi:10,type:"mp",note:"3 mi at MP"},{mi:13,type:"easy"}],                 notes: "Half marathon distance on long run. Confidence builder.", deload: false },
  { week: 15, dates: "Sep 07 – Sep 13",  phase: "Strength Phase",longRun: 14,   totalMiles: 31, runs: [{mi:6,type:"easy"},{mi:11,type:"mp",note:"3 mi at MP"},{mi:14,type:"easy"}],                 notes: "Longest run to date. Eat every 45 min on long run.", deload: false },
  { week: 16, dates: "Sep 14 – Sep 20",  phase: "Strength Phase",longRun: 11,   totalMiles: 22, runs: [{mi:5,type:"recovery"},{mi:6,type:"recovery"},{mi:11,type:"easy"}],                          notes: "Deload. Reduce strength volume this week too.", deload: true },
  { week: 17, dates: "Sep 21 – Sep 27",  phase: "Peak Build",    longRun: 16,   totalMiles: 34, runs: [{mi:7,type:"easy"},{mi:11,type:"mp",note:"4 mi at MP"},{mi:16,type:"easy"}],                 notes: "First run over 15. Break into segments mentally: 3×5 mi chunks.", deload: false },
  { week: 18, dates: "Sep 28 – Oct 04",  phase: "Peak Build",    longRun: 17,   totalMiles: 36, runs: [{mi:7,type:"easy"},{mi:12,type:"mp",note:"4 mi at MP"},{mi:17,type:"easy"}],                 notes: "Back-to-back stimulus: Saturday cycling + Sunday long run.", deload: false },
  { week: 19, dates: "Oct 05 – Oct 11",  phase: "Peak Build",    longRun: 18,   totalMiles: 38, runs: [{mi:8,type:"easy"},{mi:12,type:"mp",note:"5 mi at MP"},{mi:18,type:"easy"}],                 notes: "Simulate race: gear, nutrition, start time, Honolulu humidity.", deload: false },
  { week: 20, dates: "Oct 12 – Oct 18",  phase: "Peak Build",    longRun: 14,   totalMiles: 27, runs: [{mi:6,type:"recovery"},{mi:7,type:"recovery"},{mi:14,type:"easy"}],                          notes: "Deload. Body is absorbing massive fitness. Trust it.", deload: true },
  { week: 21, dates: "Oct 19 – Oct 25",  phase: "Peak",          longRun: 20,   totalMiles: 40, runs: [{mi:8,type:"easy"},{mi:12,type:"easy"},{mi:20,type:"easy"}],                                 notes: "THE long run. Fully easy pace. This is your peak mileage week.", deload: false },
  { week: 22, dates: "Oct 26 – Nov 01",  phase: "Peak",          longRun: 18,   totalMiles: 37, runs: [{mi:8,type:"easy"},{mi:11,type:"mp",note:"3 mi at MP"},{mi:18,type:"mp",note:"miles 14–17 at MP"}], notes: "Second peak. Miles 14–17 of long run at marathon pace.", deload: false },
  { week: 23, dates: "Nov 02 – Nov 08",  phase: "Peak",          longRun: 14,   totalMiles: 30, runs: [{mi:7,type:"easy"},{mi:9,type:"mp",note:"2 mi at MP"},{mi:14,type:"easy"}],                  notes: "Taper begins. Last quality week. Trust the bank of fitness.", deload: false },
  { week: 24, dates: "Nov 09 – Nov 15",  phase: "Taper",         longRun: 12,   totalMiles: 24, runs: [{mi:5,type:"easy"},{mi:7,type:"easy",note:"strides"},{mi:12,type:"easy"}],                   notes: "Volume drops 25%. Keep a few strides to stay sharp.", deload: false },
  { week: 25, dates: "Nov 16 – Nov 22",  phase: "Taper",         longRun: 10,   totalMiles: 19, runs: [{mi:4,type:"easy"},{mi:5,type:"easy",note:"strides"},{mi:10,type:"easy"}],                   notes: "Legs may feel heavy — totally normal. You're not losing fitness.", deload: false },
  { week: 26, dates: "Nov 23 – Nov 29",  phase: "Race Week",     longRun: 26.2, totalMiles: 33, runs: [{mi:3,type:"easy"},{mi:3,type:"easy",note:"2 strides"},{mi:26.2,type:"mp"}],                 notes: "Short shakeouts Tue & Thu. REST Fri–Sat. Honolulu Marathon Dec 13.", deload: false },
];

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
    { type: "long_run",       detail: "🏁 Honolulu Marathon — Dec 13!" },
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
