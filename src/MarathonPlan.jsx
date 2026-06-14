import { useState } from "react";
import { scheduleColors, phaseColors, runTypeStyle, dayLabels, getSchedule } from "./data/display.js";

export default function MarathonPlan({ plan, user, onLogout }) {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [activeTab, setActiveTab] = useState("plan");
  const [filter, setFilter] = useState("All");

  const { meta, weeks, paceZones } = plan;
  const phases = ["All","Base Build","Early Build","Mileage Build","Strength Phase","Peak Build","Peak","Taper","Race Week"];
  const filtered = filter === "All" ? weeks : weeks.filter(w => w.phase === filter);
  const selected = weeks.find(w => w.week === selectedWeek);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#f5f2ee", minHeight: "100vh", paddingBottom: 60 }}>

      {/* Header */}
      <div style={{ background: "#1a1a2e", padding: "40px 24px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute",inset:0, backgroundImage:"radial-gradient(circle at 80% 50%, rgba(245,166,35,0.07) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ color: "#f5a623", fontSize: 10, letterSpacing: "0.35em", fontFamily: "monospace", marginBottom: 8, textTransform: "uppercase" }}>
              {user.firstname} · {meta.race} · {meta.raceDate}
            </div>
            <button onClick={onLogout} style={{
              background: "none", border: "1px solid #3a3a5e", color: "#7070a0",
              padding: "4px 12px", borderRadius: 6, cursor: "pointer",
              fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em",
            }}>
              Sign out
            </button>
          </div>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 }}>
            26-Week Marathon Training Plan
          </h1>
          <p style={{ color: "#7070a0", fontSize: 13, margin: "0 0 20px" }}>
            {meta.subtitle}
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[["6→20","Peak miles"],[meta.mpPace,"MP pace /mi"],[meta.projectedFinish,"Projected finish"],[meta.raceDate,"Race day"]].map(([v,l]) => (
              <div key={l}>
                <div style={{ color: "#f5a623", fontSize: 18, fontWeight: 700 }}>{v}</div>
                <div style={{ color: "#50508a", fontSize: 10, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"monospace" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:4, marginTop: 24 }}>
            {[["plan","Weekly Plan"],["schedule","Weekly Template"],["paces","Paces & Run Types"]].map(([id,label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{
                padding: "7px 14px", borderRadius: "20px 20px 0 0",
                background: activeTab===id ? "#f5f2ee" : "transparent",
                color: activeTab===id ? "#1a1a2e" : "#8080b0",
                border: "none", cursor: "pointer", fontSize: 11,
                fontFamily: "monospace", letterSpacing: "0.05em",
                fontWeight: activeTab===id ? 700 : 400,
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>

        {/* WEEKLY TEMPLATE TAB */}
        {activeTab === "schedule" && (
          <div style={{ paddingTop: 24 }}>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 20 }}>
              This is your standard weekly structure. It repeats every week, with intensity and volume adjusting per phase. Tap any week in the Plan tab to see the exact activities for that week.
            </div>

            {[
              { day: "Monday",    type: "yoga",           detail: "Rest or yoga — dynamic flow, avoid deep Achilles stretches" },
              { day: "Tuesday",   type: "run",             detail: "Easy or quality run — pace depends on phase" },
              { day: "Wednesday", type: "strength_lower",  detail: "Lower body strength — heel drops, RDLs, Bulgarian splits, glutes, calves" },
              { day: "Thursday",  type: "run",             detail: "Easy run — always conversational pace" },
              { day: "Friday",    type: "rest",            detail: "Full rest — protecting Saturday cycling and Sunday long run" },
              { day: "Saturday",  type: "cycling",         detail: "90 min endurance ride — replaces 3rd run, zero Achilles load" },
              { day: "Sunday",    type: "long_run",        detail: "Long run + upper body strength — run first, always" },
            ].map(({ day, type, detail }) => {
              const s = scheduleColors[type];
              return (
                <div key={day} style={{
                  display: "grid", gridTemplateColumns: "80px 110px 1fr",
                  alignItems: "center", gap: 12,
                  background: "#fff", borderRadius: 8, padding: "14px 16px",
                  marginBottom: 6, border: "1px solid #e8e4df",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e", fontFamily: "monospace" }}>{day}</div>
                  <div style={{
                    background: s.bg, color: s.color,
                    fontSize: 10, fontWeight: 700, padding: "4px 10px",
                    borderRadius: 20, fontFamily: "monospace", letterSpacing: "0.08em",
                    textAlign: "center",
                  }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{detail}</div>
                </div>
              );
            })}

            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { color: "#b07000", bg: "#fffbf0", border: "#f5e0a0", title: "SUNDAY: RUN BEFORE LIFTING", body: "Always complete the long run before upper body strength. Upper body lifting has zero interference with running recovery — the combo works." },
                { color: "#6b2d8e", bg: "#f8f0ff", border: "#e0c8f0", title: "WEDNESDAY: ACHILLES FOCUS", body: "This is your dedicated tendon day. Heel drops, heavy calf raises, and posterior chain work. This is what makes the Achilles fix permanent." },
                { color: "#2d5a8e", bg: "#f0f4ff", border: "#c8d8f0", title: "LATE BUILD (weeks 17+)", body: "Friday stays rest. If Sunday's long run is 18+ miles, Wednesday strength goes lighter. The run always wins in peak weeks." },
              ].map(n => (
                <div key={n.title} style={{ background: n.bg, border: `1px solid ${n.border}`, borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: n.color, marginBottom: 5, fontFamily: "monospace", letterSpacing: "0.1em" }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{n.body}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PACES TAB */}
        {activeTab === "paces" && (
          <div style={{ paddingTop: 24 }}>
            <div style={{ marginBottom: 20, fontSize: 13, color: "#666", lineHeight: 1.7 }}>
              All paces anchored to your <strong>11:00/mi comfortable easy pace</strong>. Brooklyn Half was injury-affected and not a reliable benchmark.
              Projected marathon: <strong>~4:29–4:35</strong>.
            </div>
            {Object.entries(paceZones).map(([key, z]) => (
              <div key={key} style={{
                background: "#fff", borderRadius: 10, padding: "18px 20px", marginBottom: 10,
                borderLeft: `4px solid ${z.color}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:15, color:"#1a1a2e", marginBottom:3 }}>{z.label}</div>
                    <div style={{ fontSize:12, color:"#666", lineHeight:1.6, maxWidth:420 }}>{z.desc}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:20, fontWeight:700, color:z.color, fontFamily:"monospace" }}>{z.pace}</div>
                    <div style={{ fontSize:10, color:"#aaa", marginTop:2, fontStyle:"italic" }}>Feel: {z.feel}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ background:"#fffbf0", border:"1px solid #f5e0a0", borderRadius:10, padding:"16px 20px", marginTop:8 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#b07000", marginBottom:6, fontFamily:"monospace", letterSpacing:"0.1em" }}>ACHILLES NOTE</div>
              <div style={{ fontSize:13, color:"#7a5000", lineHeight:1.6 }}>
                No tempo or MP miles for the first 8 weeks. Strides start at week 5 (brief enough to be safe). Tempo at week 9. Marathon pace at week 13. This sequencing protects the tendon while you build fitness.
              </div>
            </div>
          </div>
        )}

        {/* PLAN TAB */}
        {activeTab === "plan" && (
          <>
            <div style={{ padding:"20px 0 12px", display:"flex", gap:6, flexWrap:"wrap" }}>
              {phases.map(p => (
                <button key={p} onClick={() => setFilter(p)} style={{
                  padding:"5px 12px", borderRadius:20,
                  border: filter===p ? "none" : "1px solid #ddd",
                  background: filter===p ? "#1a1a2e" : "#fff",
                  color: filter===p ? "#f5a623" : "#666",
                  fontSize:11, letterSpacing:"0.05em", cursor:"pointer",
                  fontFamily:"monospace", transition:"all 0.15s",
                }}>{p}</button>
              ))}
            </div>

            {selected && (() => {
              const c = phaseColors[selected.phase];
              const isRace = selected.phase === "Race Week";
              const schedule = getSchedule(selected);
              return (
                <div style={{
                  background: isRace ? "#1a1a2e" : c.bg,
                  border: `2px solid ${c.accent}`,
                  borderRadius:12, padding:"20px", marginBottom:16, position:"relative"
                }}>
                  <button onClick={() => setSelectedWeek(null)} style={{
                    position:"absolute", top:12, right:14, background:"none", border:"none",
                    cursor:"pointer", color: c.accent, fontSize:20, fontWeight:700, lineHeight:1,
                  }}>×</button>

                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4, flexWrap:"wrap" }}>
                    <span style={{ fontSize:10, fontFamily:"monospace", letterSpacing:"0.2em", color: isRace?"#f5a623":c.accent, textTransform:"uppercase" }}>
                      {selected.phase} · Week {selected.week}
                    </span>
                    {selected.deload && <span style={{ fontSize:9, background:c.accent, color:"#fff", padding:"2px 8px", borderRadius:8, fontFamily:"monospace" }}>DELOAD</span>}
                  </div>

                  <div style={{ fontSize:13, color: isRace?"#9090c0":"#888", marginBottom:10, fontFamily:"monospace" }}>
                    {selected.dates}
                  </div>

                  <div style={{ fontSize:20, fontWeight:700, color: isRace?"#f5a623":"#1a1a2e", marginBottom:16 }}>
                    {isRace ? "🏁 Honolulu Marathon — Dec 13" : `${selected.totalMiles} mi total · ${selected.longRun} mi long run`}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize:10, fontFamily:"monospace", letterSpacing:"0.15em", color: isRace?"#5050a0":"#aaa", textTransform:"uppercase", marginBottom:8 }}>This Week</div>
                    {schedule.map((day, i) => {
                      const s = scheduleColors[day.type];
                      return (
                        <div key={i} style={{
                          display:"grid", gridTemplateColumns:"52px 90px 1fr",
                          alignItems:"center", gap:8,
                          padding:"8px 10px", borderRadius:6, marginBottom:3,
                          background: isRace ? "#2a2a4e" : "#fff",
                          border: `1px solid ${isRace?"#3a3a5e":"#eee"}`,
                        }}>
                          <div style={{ fontSize:10, fontWeight:700, color: isRace?"#8080c0":"#aaa", fontFamily:"monospace" }}>{dayLabels[i]}</div>
                          <div style={{ background:s.bg, color:s.color, fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:12, fontFamily:"monospace", letterSpacing:"0.06em", textAlign:"center" }}>
                            {s.label}
                          </div>
                          <div style={{ fontSize:11, color: isRace?"#c0c0e0":"#555", lineHeight:1.4 }}>{day.detail}</div>
                        </div>
                      );
                    })}
                  </div>

                  {!isRace && (
                    <div>
                      <div style={{ fontSize:10, fontFamily:"monospace", letterSpacing:"0.15em", color:"#aaa", textTransform:"uppercase", marginBottom:8 }}>Runs</div>
                      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
                        {selected.runs.map((r, i) => {
                          const rt = runTypeStyle[r.type];
                          const isLong = i === selected.runs.length - 1;
                          return (
                            <div key={i} style={{
                              background:"#fff", borderRadius:8, padding:"10px 14px",
                              border:`1px solid ${c.border}`, minWidth:90,
                            }}>
                              <div style={{ fontSize:20, fontWeight:700, color:c.accent }}>{r.mi}</div>
                              <div style={{ fontSize:9, fontFamily:"monospace", letterSpacing:"0.1em", color:"#aaa", marginBottom:4 }}>
                                {isLong ? "LONG RUN" : `RUN ${i+1}`}
                              </div>
                              <div style={{ display:"inline-block", background:rt.bg, color:rt.color, fontSize:9, padding:"2px 6px", borderRadius:6, fontFamily:"monospace" }}>
                                {rt.label}
                              </div>
                              <div style={{ fontSize:10, color:"#888", marginTop:4 }}>{paceZones[r.type].pace}</div>
                              {r.note && <div style={{ fontSize:10, color:c.accent, marginTop:3, fontStyle:"italic" }}>{r.note}</div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div style={{ fontSize:13, color: isRace?"#b0b0d0":"#444", lineHeight:1.6, fontStyle:"italic" }}>
                    {selected.notes}
                  </div>
                </div>
              );
            })()}

            <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
              {filtered.map(w => {
                const c = phaseColors[w.phase];
                const isSelected = selectedWeek === w.week;
                const isRace = w.phase === "Race Week";
                const isToday = w.week === 1;
                return (
                  <div key={w.week} onClick={() => setSelectedWeek(isSelected ? null : w.week)} style={{
                    display:"grid", gridTemplateColumns:"56px 1fr auto",
                    alignItems:"center", gap:10,
                    padding:"11px 14px", borderRadius:8,
                    background: isRace?"#1a1a2e" : isSelected?c.bg : "#fff",
                    border: isSelected ? `2px solid ${c.accent}` : isToday ? `2px solid ${c.accent}` : "1px solid #e8e4df",
                    cursor:"pointer", transition:"all 0.12s", position:"relative",
                  }}>
                    {isToday && !isSelected && (
                      <div style={{ position:"absolute", top:6, right:8, fontSize:9, fontFamily:"monospace", color:c.accent, letterSpacing:"0.1em", background:c.bg, padding:"1px 6px", borderRadius:8 }}>
                        THIS WEEK
                      </div>
                    )}
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:9, fontFamily:"monospace", color: isRace?"#f5a623":"#bbb", letterSpacing:"0.1em" }}>WK</div>
                      <div style={{ fontSize:22, fontWeight:700, color: isRace?"#f5a623":c.accent, lineHeight:1 }}>{w.week}</div>
                    </div>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2, flexWrap:"wrap" }}>
                        <span style={{ fontSize:9, fontFamily:"monospace", letterSpacing:"0.1em", color: isRace?"#f5a623":c.accent, textTransform:"uppercase" }}>{w.phase}</span>
                        {w.deload && <span style={{ fontSize:8, background:c.accent, color:"#fff", padding:"1px 5px", borderRadius:8, fontFamily:"monospace" }}>DELOAD</span>}
                        {isRace && <span style={{ fontSize:12 }}>🏁</span>}
                      </div>
                      <div style={{ fontSize:12, color: isRace?"#c0c0e0":"#444", marginBottom:1 }}>
                        {isRace ? "Honolulu Marathon · Dec 13" : `${w.totalMiles} mi · ${w.longRun} mi long`}
                      </div>
                      <div style={{ fontSize:10, color: isRace?"#6060a0":"#aaa", fontFamily:"monospace" }}>{w.dates}</div>
                    </div>
                    <div style={{ width:52, textAlign:"right" }}>
                      <div style={{ height:3, background: isRace?"#2d2d50":"#ede8e0", borderRadius:2, marginBottom:4, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${Math.min(100,(w.totalMiles/40)*100)}%`, background: isRace?"#f5a623":c.accent, borderRadius:2 }} />
                      </div>
                      <div style={{ display:"flex", gap:2, justifyContent:"flex-end" }}>
                        {w.runs.map((r,i) => (
                          <div key={i} title={runTypeStyle[r.type].label} style={{ width:8, height:8, borderRadius:"50%", background:runTypeStyle[r.type].color, opacity:0.8 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop:16, background:"#fff", borderRadius:8, padding:"14px 16px", border:"1px solid #e8e4df" }}>
              <div style={{ fontSize:10, fontFamily:"monospace", letterSpacing:"0.15em", color:"#aaa", marginBottom:8, textTransform:"uppercase" }}>Run type legend</div>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {Object.entries(runTypeStyle).map(([key,s]) => (
                  <div key={key} style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:s.color }} />
                    <span style={{ fontSize:11, color:"#555" }}>{s.label}</span>
                    <span style={{ fontSize:10, color:"#aaa", fontFamily:"monospace" }}>{paceZones[key].pace}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop:8, background:"#fff", borderRadius:8, padding:"14px 16px", border:"1px solid #e8e4df" }}>
              <div style={{ fontSize:10, fontFamily:"monospace", letterSpacing:"0.15em", color:"#aaa", marginBottom:8, textTransform:"uppercase" }}>Key rules</div>
              {["Never increase weekly mileage more than 5%","Every 4th week is a deload — non-negotiable","Achilles strength work every Wednesday throughout","Any Achilles flare → drop back one full phase","Easy runs should feel embarrassingly slow","Run always before upper body strength on Sundays"].map((r,i) => (
                <div key={i} style={{ display:"flex", gap:8, marginBottom:6, alignItems:"flex-start" }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:"#1a1a2e", color:"#f5a623", fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", flexShrink:0 }}>{i+1}</div>
                  <div style={{ fontSize:12, color:"#555", lineHeight:1.5 }}>{r}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
