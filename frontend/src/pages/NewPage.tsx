import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

// ============================================================
// 🔧 EDIT THESE — your answers, questions, hints
// ============================================================
const BIRTHDAY_ANSWER = "10/22"; // Oct 22

const Q2_QUESTION = "There's a plant… you like to eat its leaves. Which one is it?";
const Q2_HINT = "LT ke alawa or bhi lahi hai kya uske paudhe 🍃 ?";
const Q2_ANSWER = "tulsi"; // case-insensitive

// Future question — edit when ready
const Q3_QUESTION = "TODO: your question here";
const Q3_HINT = "TODO: hint here";
const Q3_ANSWER = "todo"; // replace with real answer
// ============================================================

// ============================================================
// 🔊 AUDIO — import your recordings & assign here
// ============================================================
// import audioAfterQ1 from "@/audios/after_q1.mp3";
// import audioAfterQ2 from "@/audios/after_q2.mp3";
// import audioAfterQ3 from "@/audios/after_q3.mp3";
// import finalAudio1   from "@/audios/final_1.mp3";
// import finalAudio2   from "@/audios/final_2.mp3";
// import finalAudio3   from "@/audios/final_3.mp3";

const AUDIO_AFTER_Q1: string | null = null; // audioAfterQ1
const AUDIO_AFTER_Q2: string | null = null; // audioAfterQ2
const AUDIO_AFTER_Q3: string | null = null; // audioAfterQ3

// These play one after another in the final show
const FINAL_AUDIO_PLAYLIST: string[] = [
  // finalAudio1,
  // finalAudio2,
  // finalAudio3,
];
// ============================================================

// ============================================================
// 🎵 Audio player hook — plays a src, calls onEnd when done
// ============================================================
function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((src: string | null, onEnd?: () => void) => {
    if (!src) { onEnd?.(); return; }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.remove();
    }
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play();
    audio.onended = () => { onEnd?.(); };
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.remove();
      audioRef.current = null;
    }
  }, []);

  // cleanup on unmount
  useEffect(() => () => stop(), [stop]);

  return { play, stop };
}

// ============================================================
// 🎵 Playlist hook — plays array of audios sequentially
// ============================================================
function usePlaylist(playlist: string[]) {
  const { play, stop } = useAudioPlayer();
  const indexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [finished, setFinished] = useState(false);

  const start = useCallback(() => {
    indexRef.current = 0;
    setFinished(false);
    if (playlist.length === 0) { setFinished(true); return; }
    setCurrentIndex(0);
    play(playlist[0], () => {
      indexRef.current = 1;
      setCurrentIndex(1);
    });
  }, [playlist, play]);

  // chain next track whenever currentIndex advances
  useEffect(() => {
    const i = currentIndex;
    if (i < 0) return;
    if (i >= playlist.length) { setFinished(true); return; }
    if (i === 0) return; // first one already started in start()
    play(playlist[i], () => {
      indexRef.current = i + 1;
      setCurrentIndex(i + 1);
    });
  }, [currentIndex, playlist, play]);

  return { start, stop, finished, currentIndex };
}

// ============================================================
// Hearts
// ============================================================
interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

function generateHearts(count: number): Heart[] {
  const colors = ["#ff6b8a", "#ff8fa3", "#ffb3c1", "#e63964", "#ff4d72", "#ffd6e0", "#ffcdd2"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 10 + Math.random() * 30,
    duration: 7 + Math.random() * 9,
    delay: Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

function FloatingHearts({ intense = false }) {
  const hearts = useRef(generateHearts(intense ? 50 : 16)).current;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: "absolute",
            left: `${h.x}%`,
            bottom: "-60px",
            fontSize: `${h.size}px`,
            color: h.color,
            animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
            filter: "drop-shadow(0 0 8px rgba(255,107,138,0.5))",
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Typewriter
// ============================================================
function Typewriter({ text, onDone, delay = 40 }: { text: string; onDone?: () => void; delay?: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown < text.length) {
      const t = setTimeout(() => setShown((s) => s + 1), delay);
      return () => clearTimeout(t);
    } else {
      onDone?.();
    }
  }, [shown, text, delay, onDone]);

  return (
    <span style={{ whiteSpace: "pre-wrap" }}>
      {text.slice(0, shown)}
      {shown < text.length && <span style={{ animation: "blink 0.8s step-end infinite" }}>|</span>}
    </span>
  );
}

// ============================================================
// Confetti
// ============================================================
function Confetti() {
  const colors = ["#ff6b8a", "#ffb3c1", "#ffd6e0", "#e63964", "#fff0f3", "#ff4d72"];
  const pieces = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    left: 35 + Math.random() * 30,
    color: colors[i % colors.length],
    duration: 1.4 + Math.random() * 1.2,
    delay: Math.random() * 0.4,
    size: 5 + Math.random() * 9,
    xDrift: (Math.random() - 0.5) * 360,
    rotate: Math.random() * 720,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10 }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "40%",
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.55,
            background: p.color,
            borderRadius: 2,
            animation: `confettiFall ${p.duration}s ease-out ${p.delay}s forwards`,
            ["--xd" as any]: `${p.xDrift}px`,
            ["--rot" as any]: `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// Ripple ring (plays around a center heart during audio)
// ============================================================
function RipplePulse() {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: 140 }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 80 + i * 40,
            height: 80 + i * 40,
            borderRadius: "50%",
            border: "2px solid rgba(255,107,138,0.3)",
            animation: `ripple 2.4s ease-out ${i * 0.8}s infinite`,
          }}
        />
      ))}
      <div style={{ fontSize: 52, zIndex: 1, animation: "pulse 1.4s ease infinite", position: "relative" }}>💝</div>
    </div>
  );
}

// ============================================================
// MAIN
// ============================================================
// stages: 0=landing, 1=Q1(birthday), 2=transition audio after Q1,
//         3=Q2(tulsi), 4=transition audio after Q2,
//         5=Q3, 6=transition audio after Q3,
//         7=FINAL SHOW
const TOTAL_QUESTIONS = 3;

export default function IsThatYou() {
  const [stage, setStage] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { play } = useAudioPlayer();
  const playlist = usePlaylist(FINAL_AUDIO_PLAYLIST);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 350);
  }, [stage]);

  // When playlist finishes, nothing extra needed (animations keep running)
  // You can add a "done" state here if you want a final card after all audios

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  // ---- Transition stage: play audio then advance ----
  // stage 2 → plays AUDIO_AFTER_Q1 → goes to 3
  // stage 4 → plays AUDIO_AFTER_Q2 → goes to 5
  // stage 6 → plays AUDIO_AFTER_Q3 → goes to 7
  useEffect(() => {
    if (stage === 2) {
      play(AUDIO_AFTER_Q1, () => setStage(3));
    }
    if (stage === 4) {
      play(AUDIO_AFTER_Q2, () => setStage(5));
    }
    if (stage === 6) {
      play(AUDIO_AFTER_Q3, () => setStage(7));
    }
  }, [stage, play]);

  // ---- Start final playlist when we hit stage 7 ----
  useEffect(() => {
    if (stage === 7) {
      playlist.start();
    }
  }, [stage]);

  // ---- Validation helpers ----
  const checkBirthday = () => {
    const raw = input.replace(/\s/g, "").replace(/-/g, "/");
    let n = raw;
    if (!raw.includes("/") && raw.length === 4) n = raw.slice(0, 2) + "/" + raw.slice(2);
    // also accept "22/10" (DD/MM) or "oct 22" style? keep simple: MM/DD only
    if (n === BIRTHDAY_ANSWER) {
      reset(); setStage(2); // go to audio transition
    } else {
      setError("Hmm… that's not right ✗");
      triggerShake();
      setAttempts((a) => a + 1);
    }
  };

  const checkQ2 = () => {
    if (input.trim().toLowerCase() === Q2_ANSWER.toLowerCase()) {
      reset(); setStage(4);
    } else {
      setError("Not quite… think again 😏");
      triggerShake();
      const next = attempts + 1;
      setAttempts(next);
      if (next >= 2) setShowHint(true);
    }
  };

  const checkQ3 = () => {
    if (input.trim().toLowerCase() === Q3_ANSWER.toLowerCase()) {
      reset(); setStage(6);
    } else {
      setError("Nope… try again 💭");
      triggerShake();
      const next = attempts + 1;
      setAttempts(next);
      if (next >= 2) setShowHint(true);
    }
  };

  const reset = () => {
    setInput("");
    setError("");
    setShowHint(false);
    setAttempts(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (stage === 1) checkBirthday();
    if (stage === 3) checkQ2();
    if (stage === 5) checkQ3();
  };

  // ============================================================
  // RENDER
  // ============================================================

  // --- LANDING ---
  if (stage === 0) {
    return (
      <Page>
        <FloatingHearts />
        <Card center>
          <Eyebrow>a little secret</Eyebrow>
          <h1 style={S.title}>
            Is That<br /><span style={{ color: "#ff6b8a" }}>You?</span>
          </h1>
          <p style={S.subtitle}>
            Think you know me?<br />Let's find out…
          </p>
          <Btn onClick={() => setStage(1)}>I'm ready</Btn>
          <BackLink />
        </Card>
      </Page>
    );
  }

  // --- QUESTION STAGES (1, 3, 5) ---
  const questionMap: Record<number, { step: string; question: string; hint: string; placeholder: string }> = {
    1: { step: "01", question: "Enter your birthday", hint: "", placeholder: "MM / DD" },
    3: { step: "02", question: Q2_QUESTION, hint: Q2_HINT, placeholder: "the plant name…" },
    5: { step: "03", question: Q3_QUESTION, hint: Q3_HINT, placeholder: "your answer…" },
  };

  if (questionMap[stage]) {
    const { step, question, hint, placeholder } = questionMap[stage];
    return (
      <Page>
        <FloatingHearts />
        <Card center>
          <Badge>{step} / {TOTAL_QUESTIONS}</Badge>

          {stage === 1 && (
            <p style={{ color: "#c4959e", fontSize: 14, marginBottom: 12, fontStyle: "italic", textAlign: "center" }}>
              You once doubted me… let's see 😉
            </p>
          )}
          {stage === 3 && (
            <p style={{ color: "#ff8fa3", fontSize: 13, marginBottom: 10, fontStyle: "italic", textAlign: "center" }}>
              knowing my birthday doesn't mean you're me… let's go deeper
            </p>
          )}

          <h2 style={S.questionTitle}>
            <Typewriter text={question} />
          </h2>

          {stage === 1 && <p style={{ color: "#8a6870", fontSize: 13, textAlign: "center", margin: "0 0 8px" }}>(MM / DD)</p>}

          {/* Hint */}
          {hint && !showHint && (
            <button style={S.hintBtn} onClick={() => setShowHint(true)}>🤔 I need a hint</button>
          )}
          {hint && showHint && (
            <div style={S.hintBox}>
              <p style={S.hintLabel}>hint</p>
              <p style={S.hintContent}>{hint}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(""); }}
              placeholder={placeholder}
              style={{ ...S.input, animation: shake ? "shake 0.4s ease" : "none" }}
              autoComplete="off"
            />
            {error && <p style={S.errorText}>{error}</p>}
            <Btn type="submit">
              {stage === 1 ? "That's my answer" : stage === 3 ? "That's the one" : "Submit"}
            </Btn>
          </form>
          <BackLink />
        </Card>
      </Page>
    );
  }

  // --- AUDIO TRANSITION STAGES (2, 4, 6) ---
  if (stage === 2 || stage === 4 || stage === 6) {
    const msgs = [
      "nice… I knew it 😊",
      "see? I know you…",
      "almost there… 💛",
    ];
    const idx = stage === 2 ? 0 : stage === 4 ? 1 : 2;
    return (
      <Page>
        <FloatingHearts />
        <Card center>
          <RipplePulse />
          <p style={{ color: "#e8c0c8", fontSize: 18, textAlign: "center", marginTop: 12, fontStyle: "italic" }}>
            {msgs[idx]}
          </p>
          {/* If no audio set, auto-skip after 2s */}
          <AutoSkip
            active={
              (stage === 2 && !AUDIO_AFTER_Q1) ||
              (stage === 4 && !AUDIO_AFTER_Q2) ||
              (stage === 6 && !AUDIO_AFTER_Q3)
            }
            onSkip={() => setStage(stage + 1)}
          />
        </Card>
      </Page>
    );
  }

  // --- FINAL SHOW (stage 7) ---
  if (stage === 7) {
    return (
      <Page>
        <FloatingHearts intense />
        <Confetti />
        <Card center style={{ border: "1px solid rgba(255,107,138,0.35)" }}>
          <RipplePulse />
          <h2 style={{ ...S.title, fontSize: 30, textAlign: "center", marginTop: 8 }}>
            It's really you.
          </h2>
          <p style={{ color: "#e8c0c8", fontSize: 16, textAlign: "center", lineHeight: 1.7, marginTop: 12, fontStyle: "italic" }}>
            Every single answer… you got them all.<br />
            That means everything. 💛
          </p>

          {/* Audio status */}
          {FINAL_AUDIO_PLAYLIST.length > 0 && (
            <div style={S.audioStatus}>
              {playlist.currentIndex >= 0 && playlist.currentIndex < FINAL_AUDIO_PLAYLIST.length
                ? <span>🎵 playing… ({playlist.currentIndex + 1}/{FINAL_AUDIO_PLAYLIST.length})</span>
                : playlist.finished
                  ? <span>🎵 done ✓</span>
                  : <span>🎵 waiting…</span>
              }
            </div>
          )}

          <Btn onClick={() => { playlist.stop(); setStage(0); }} style={{ marginTop: 28 }}>↩ play again</Btn>
          <BackLink />
        </Card>
      </Page>
    );
  }

  return null;
}

// ============================================================
// Auto-skip helper (when no audio is set, skip after delay)
// ============================================================
function AutoSkip({ active, onSkip }: { active: boolean; onSkip: () => void }) {
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(onSkip, 2200);
    return () => clearTimeout(t);
  }, [active, onSkip]);
  return null;
}

// ============================================================
// Small reusable layout components
// ============================================================
function Page({ children }: { children: React.ReactNode }) {
  return (
    <div style={S.page}>
      {children}
      <GlobalStyles />
    </div>
  );
}

function Card({ children, center, style }: { children: React.ReactNode; center?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 440, margin: "0 auto", padding: "0 20px" }}>
      <div style={{ ...S.card, ...(center ? { textAlign: "center" } : {}), ...style }}>
        {children}
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p style={S.eyebrow}>{children}</p>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return <p style={S.badge}>{children}</p>;
}

function Btn({ children, onClick, type, style }: { children: React.ReactNode; onClick?: () => void; type?: "submit" | "button"; style?: React.CSSProperties }) {
  return (
    <button type={type || "button"} onClick={onClick} style={{ ...S.btn, ...style }}>
      {children}
    </button>
  );
}

function BackLink() {
  return <Link to="/" style={S.backLink}>← back to portfolio</Link>;
}

// ============================================================
// Global keyframes
// ============================================================
function GlobalStyles() {
  return (
    <style>{`
      @keyframes floatUp {
        0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
        8%   { opacity: 0.7; }
        92%  { opacity: 0.4; }
        100% { transform: translateY(-115vh) rotate(420deg); opacity: 0; }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%      { transform: translateX(-9px); }
        40%      { transform: translateX(9px); }
        60%      { transform: translateX(-5px); }
        80%      { transform: translateX(5px); }
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50%      { transform: scale(1.18); }
      }
      @keyframes ripple {
        0%   { transform: scale(0.7); opacity: 0.6; }
        100% { transform: scale(1.8); opacity: 0; }
      }
      @keyframes confettiFall {
        0%   { transform: translateX(0) translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateX(var(--xd, 0px)) translateY(340px) rotate(var(--rot, 0deg)); opacity: 0; }
      }
      input:focus {
        border-color: rgba(255,107,138,0.55) !important;
        box-shadow: 0 0 0 3px rgba(255,107,138,0.12);
      }
      button:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 24px rgba(230,57,100,0.45) !important;
      }
    `}</style>
  );
}

// ============================================================
// STYLES
// ============================================================
const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(150deg, #0d0810 0%, #1a0e15 45%, #110c0f 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Georgia', serif",
    position: "relative",
    overflow: "hidden",
  },
  card: {
    background: "rgba(28, 16, 20, 0.88)",
    backdropFilter: "blur(18px)",
    borderRadius: 24,
    padding: "44px 34px 34px",
    border: "1px solid rgba(255,107,138,0.14)",
    boxShadow: "0 10px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,107,138,0.08)",
  },
  eyebrow: {
    color: "#ff8fa3",
    fontSize: 13,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: 14,
    fontStyle: "italic",
    margin: "0 0 14px",
  },
  title: {
    color: "#fff",
    fontSize: 44,
    fontWeight: 300,
    lineHeight: 1.15,
    margin: "0 0 14px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "#b8888f",
    fontSize: 16,
    lineHeight: 1.7,
    margin: "0 0 30px",
  },
  badge: {
    display: "inline-block",
    background: "rgba(255,107,138,0.1)",
    color: "#ff8fa3",
    fontSize: 12,
    letterSpacing: "0.16em",
    padding: "5px 15px",
    borderRadius: 20,
    marginBottom: 18,
    margin: "0 auto 18px",
  },
  questionTitle: {
    color: "#fff",
    fontSize: 21,
    fontWeight: 400,
    lineHeight: 1.55,
    margin: "0 0 6px",
    minHeight: 64,
  },
  input: {
    display: "block",
    width: "100%",
    padding: "13px 18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,107,138,0.22)",
    borderRadius: 14,
    color: "#fff",
    fontSize: 16,
    fontFamily: "'Georgia', serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  btn: {
    display: "block",
    width: "100%",
    padding: "13px 22px",
    marginTop: 18,
    background: "linear-gradient(135deg, #d63060, #ff6b8a)",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    fontSize: 15,
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
    letterSpacing: "0.03em",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 18px rgba(230,57,100,0.32)",
  },
  errorText: {
    color: "#ff6b8a",
    fontSize: 13,
    marginTop: 10,
    marginBottom: 0,
    fontStyle: "italic",
    textAlign: "center",
  },
  hintBtn: {
    display: "inline-block",
    marginTop: 14,
    background: "transparent",
    border: "1px solid rgba(255,107,138,0.28)",
    color: "#ff8fa3",
    padding: "6px 16px",
    borderRadius: 20,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    transition: "background 0.2s",
  },
  hintBox: {
    marginTop: 14,
    background: "rgba(255,107,138,0.07)",
    border: "1px solid rgba(255,107,138,0.16)",
    borderRadius: 12,
    padding: "11px 16px",
  },
  hintLabel: {
    color: "#ff8fa3",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    margin: "0 0 4px",
  },
  hintContent: {
    color: "#b8888f",
    fontSize: 14,
    margin: 0,
    fontStyle: "italic",
  },
  backLink: {
    display: "block",
    marginTop: 22,
    color: "#5a3f46",
    fontSize: 13,
    textDecoration: "none",
    textAlign: "center",
    transition: "color 0.2s",
  },
  audioStatus: {
    marginTop: 18,
    color: "#ff8fa3",
    fontSize: 13,
    fontStyle: "italic",
    letterSpacing: "0.05em",
  },
};