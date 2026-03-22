import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "MERN", level: 95 },
  { name: "JAVA", level: 90 },
  { name: "MongoDB", level: 85 },
  { name: "Linux", level: 80 },
  { name: "Langchain", level: 75 },
  { name: "Github", level: 88 },
];

const PROJECTS = [
  {
    id: 1,
    title: "Youtube Q&A Bot",
    year: "2026",
    tag: "Langchain",
    description:
      "A langchain based Q&A bot that analyzes caption based video url and answer queries based on the video.",
    stack: ["Langchain", "Streamlit", "Python"],
  },
  {
    id: 2,
    title: "Chatify",
    year: "2025",
    tag: "Full Stack",
    description:
      "A real time chat application that allows users to chat either privately or in groups with proper user authentication and authorization.",
    stack: ["MERN Stack", "Socket.io", "Google OAuth"],
  },
  {
    id: 3,
    title: "Blog Application",
    year: "2025",
    tag: "NextJS",
    description:
      "A Blog application which allows users to create, read, update and delete blogs, Users will be able to see and read other user's blogs from their specific profiles.",
    stack: ["NextJS", "Github", "MongoDB", "Authentication"],
  },
  {
    id: 4,
    title: "SolX",
    year: "2026",
    tag: "RAG",
    description:
      "A RAG based LLM ChatBot, which answers to user's queries based on the uploaded document.",
    stack: ["Langchain", "File Handling", "Python", "Linux"],
  },
  {
    id: 5,
    title: "ResearchMind",
    year: "2026",
    tag: "Lang-graph",
    description:
      "multi-iteration AI research agent with iterative retrieval that uses lang-graph.",
    stack: ["Langchain", "File Handling", "Python", "Linux", "lang-graph"],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      if (e.target.closest("a,button,[data-hover]")) setBig(true);
    };
    const out = () => setBig(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        transform: "translate(-50%,-50%)",
        width: big ? 36 : 10,
        height: big ? 36 : 10,
        background: big ? "transparent" : "rgb(var(--text))",
        border: big ? "1.5px solid rgb(var(--text))" : "none",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "width .2s, height .2s, background .2s",
      }}
    />
  );
}

function Navbar({ active, theme, toggleTheme, showStars, toggleStars }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scroll = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: "50%", // ✨ Moves it to the middle
        transform: "translateX(-50%)", // ✨ Perfectly centers it
        width: "59%", // ✨ Keeps it responsive on mobile
        maxWidth: 1200, // ✨ Locks the exact width to your main container
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.25rem 3rem",
        background: scrolled ? "rgba(var(--bg),0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(var(--text),0.08)" : "none",
        transition: "all .4s ease",
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.35rem",
          letterSpacing: "0.04em",
          color: "rgb(var(--text))",
          fontWeight: 600,
          cursor: "none",
          transition: "color 0.4s ease",
        }}
      >
        Chandan&nbsp;Garg
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            onClick={toggleStars}
            data-hover
            style={{
              background: "none",
              border: "none",
              cursor: "none",
              fontSize: "1.1rem",
              color: showStars ? "rgb(var(--text))" : "rgba(var(--text), 0.3)",
              transition: "color 0.2s, transform 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={showStars ? "Disable Stars" : "Enable Stars"}
          >
            ✧
          </button>

          <button
            onClick={toggleTheme}
            data-hover
            style={{
              background: "none",
              border: "none",
              cursor: "none",
              fontSize: "1.1rem",
              color: "rgb(var(--text))",
              transition: "color 0.2s, transform 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "rotate(15deg)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "rotate(0deg)";
            }}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>

        <ul
          style={{
            display: "flex",
            gap: "2.5rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => scroll(link)}
                data-hover
                style={{
                  background: "none",
                  border: "none",
                  cursor: "none",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: active === link.toLowerCase() ? "600" : "400",
                  color:
                    active === link.toLowerCase()
                      ? "rgb(var(--text))"
                      : "rgba(var(--text),0.45)",
                  transition: "color .25s",
                  padding: 0,
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "rgb(var(--text))")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color =
                    active === link.toLowerCase()
                      ? "rgb(var(--text))"
                      : "rgba(var(--text),0.45)")
                }
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Hero({ showStars }) {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      id="about"
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {showStars && (
        <div className="stars-container">
          <div className="stars"></div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(var(--text),0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text),0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(30px)",
          transition: "opacity .9s ease, transform .9s ease",
          maxWidth: 680,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "rgba(var(--text),0.5)",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          Software Engineer
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
            lineHeight: 1.05,
            fontWeight: 300,
            color: "rgb(var(--text))",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Building things
          <br />
          <em style={{ fontStyle: "italic", color: "rgba(var(--text),0.55)" }}>
            that last.
          </em>
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(var(--text),0.6)",
            marginTop: "2rem",
            maxWidth: 480,
          }}
        >
          I architect and ship production-grade web systems — from pixel-perfect
          interfaces to resilient backend infrastructure. I care deeply about
          craft, performance, and the humans using what I build.
        </p>
        <div
          style={{
            marginTop: "2.8rem",
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
          }}
        >
          <button
            data-hover
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "rgb(var(--text))",
              color: "rgb(var(--bg))",
              border: "none",
              padding: "0.75rem 2rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "none",
              transition: "opacity .2s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            View Work
          </button>
          <button
            data-hover
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "transparent",
              color: "rgba(var(--text),0.7)",
              border: "1px solid rgba(var(--text),0.3)",
              padding: "0.75rem 2rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "none",
              transition: "border-color .2s, color .2s, background .2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(var(--text),0.6)";
              e.target.style.color = "rgb(var(--text))";
              e.target.style.background = "rgba(var(--text),0.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(var(--text),0.3)";
              e.target.style.color = "rgba(var(--text),0.7)";
              e.target.style.background = "transparent";
            }}
          >
            Say Hello
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          opacity: 0.4,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            color: "rgb(var(--text))",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "rgb(var(--text))",
            animation: "pulse 2s infinite",
          }}
        />
      </div>
    </section>
  );
}

function Skills() {
  const [ref, inView] = useInView();
  return (
    <section
      id="skills"
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8rem 3rem",
        borderTop: "1px solid rgba(var(--text),0.07)",
      }}
    >
      <div style={{ width: "100%" }}>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            color: "rgba(var(--text),0.4)",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          02 — Skills
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 300,
            color: "rgb(var(--text))",
            margin: "0 0 4rem",
            letterSpacing: "-0.01em",
          }}
        >
          What I work with
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px)",
                transition: `opacity .7s ease ${i * 0.1}s, transform .7s ease ${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.6rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem",
                    color: "rgba(var(--text),0.75)",
                  }}
                >
                  {skill.name}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    color: "rgba(var(--text),0.4)",
                  }}
                >
                  {skill.level}%
                </span>
              </div>
              <div
                style={{
                  height: 1,
                  background: "rgba(var(--text),0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: inView ? `${skill.level}%` : "0%",
                    background: "rgb(var(--text))",
                    transition: `width 1.2s cubic-bezier(.16,1,.3,1) ${0.3 + i * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition: `opacity .7s ease ${index * 0.08}s, transform .7s ease ${index * 0.08}s`,
        position: "relative",
        minHeight: 220,
        border: "1px solid",
        borderColor: hovered
          ? "rgba(var(--text),0.25)"
          : "rgba(var(--text),0.07)",
        cursor: "none",
        background: "rgb(var(--bg))",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "2rem",
          background: "rgba(var(--bg),0.98)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "none" : "translateY(6px)",
          transition: "opacity .3s ease, transform .3s ease",
          pointerEvents: hovered ? "auto" : "none",
          zIndex: 3,
          overflow: "auto",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "rgba(var(--text),0.4)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {project.tag} — {project.year}
          </p>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              color: "rgb(var(--text))",
              margin: "0 0 0.75rem",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.84rem",
              lineHeight: 1.7,
              color: "rgba(var(--text),0.65)",
              margin: 0,
            }}
          >
            {project.description}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.45rem",
            marginTop: "1.25rem",
          }}
        >
          {project.stack.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                padding: "0.28rem 0.6rem",
                border: "1px solid rgba(var(--text),0.18)",
                color: "rgba(var(--text),0.6)",
                textTransform: "uppercase",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              color: "rgba(var(--text),0.4)",
              textTransform: "uppercase",
            }}
          >
            {project.tag}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem",
              color: "rgba(var(--text),0.3)",
            }}
          >
            {project.year}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.6rem",
            fontWeight: 400,
            color: "rgb(var(--text))",
            margin: "0 0 0.5rem",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(var(--text),0.35)",
            margin: 0,
          }}
        >
          Hover to explore →
        </p>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, inView] = useInView();
  return (
    <section
      id="projects"
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8rem 3rem",
        borderTop: "1px solid rgba(var(--text),0.07)",
      }}
    >
      <div style={{ width: "100%" }}>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            color: "rgba(var(--text),0.4)",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          03 — Projects
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 300,
            color: "rgb(var(--text))",
            margin: "0 0 4rem",
          }}
        >
          Selected work
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gridAutoRows: "280px",
            gap: "1px",
            background: "rgba(var(--text),0.06)",
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill out all fields!");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "866a6d51-efc2-4bd7-b4c9-1bad5d8ed33b", // Keep your key here!
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Message from ${form.name}`,
        }),
      });
      const result = await response.json();
      if (result.success) setSent(true);
      else alert("Something went wrong. Please try again.");
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(var(--text),0.2)",
    padding: "0.9rem 0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.93rem",
    color: "rgb(var(--text))",
    textAlign: "center", // ✨ Centers the typing text!
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s",
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "8rem 3rem 2rem",
        borderTop: "1px solid rgba(var(--text),0.07)",
      }}
    >
      {/* ✨ Added alignItems, textAlign, and margin auto to fully center this block */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            color: "rgba(var(--text),0.4)",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          04 — Contact
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 300,
            color: "rgb(var(--text))",
            margin: "0 0 1rem",
          }}
        >
          Let's build something
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.92rem",
            color: "rgba(var(--text),0.55)",
            marginBottom: "3.5rem",
            maxWidth: 420,
            lineHeight: 1.7,
            margin: "0 auto 3.5rem", // Keeps the paragraph centered
          }}
        >
          Open to interesting projects, long-term contracts, and the occasional
          weird idea. Drop me a message.
        </p>

        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "opacity .8s ease, transform .8s ease",
            maxWidth: 560,
            width: "100%", // Ensures form takes up available centered space
          }}
        >
          {sent ? (
            <div
              style={{
                padding: "3rem",
                border: "1px solid rgba(var(--text),0.15)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  color: "rgb(var(--text))",
                  margin: "0 0 0.5rem",
                }}
              >
                Message received.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(var(--text),0.5)",
                }}
              >
                I'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor = "rgba(var(--text),0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = "rgba(var(--text),0.2)")
                }
              />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor = "rgba(var(--text),0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = "rgba(var(--text),0.2)")
                }
              />
              <textarea
                placeholder="Tell me about your project..."
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{
                  ...inputStyle,
                  resize: "none",
                  borderBottom: "1px solid rgba(var(--text),0.2)",
                }}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor = "rgba(var(--text),0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = "rgba(var(--text),0.2)")
                }
              />
              <button
                data-hover
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                  alignSelf: "center", // ✨ Centers the button!
                  background: "rgb(var(--text))",
                  color: "rgb(var(--bg))",
                  border: "none",
                  padding: "0.8rem 2.2rem",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "none",
                  transition: "opacity .2s",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) e.target.style.opacity = 0.8;
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) e.target.style.opacity = 1;
                }}
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </div>
          )}
        </div>
      </div>

      <footer
        style={{
          marginTop: "auto",
          paddingTop: "2rem",
          width: "100%", // ✨ Ensures the footer spans the full width even though parent is centered
          borderTop: "1px solid rgba(var(--text),0.07)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(var(--text),0.3)",
            letterSpacing: "0.1em",
          }}
        >
          © 2026 Chandan Garg
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { name: "GitHub", url: "https://github.com/Chandan11232" },
            {
              name: "LinkedIn",
              url: "https://www.linkedin.com/in/chandan-garg-43015323b/",
            },
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(var(--text),0.4)",
                textDecoration: "none",
                transition: "color .2s",
                cursor: "none",
              }}
              onMouseEnter={(e) => (e.target.style.color = "rgb(var(--text))")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(var(--text),0.4)")
              }
            >
              {social.name}
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [theme, setTheme] = useState("dark");
  const [showStars, setShowStars] = useState(true);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleStars = () => {
    setShowStars((prev) => !prev);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    ["about", "skills", "projects", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-theme={theme}
      style={{
        transition: "background 0.4s ease, color 0.4s ease",
        background: "rgb(var(--bg))",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400&display=swap');
        
        :root {
          --bg: 10, 10, 9;
          --text: 255, 255, 255; 
        }
        
        [data-theme="light"] {
          --bg: 245, 243, 238;
          --text: 0, 0, 0; 
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; cursor: none !important; }
        
        html { scroll-behavior: smooth; background: rgb(var(--bg)); }
        body { background: rgb(var(--bg)); transition: background 0.4s ease; }
        ::selection { background: rgba(var(--text),0.2); }
        input::placeholder, textarea::placeholder { color: rgba(var(--text),0.3); }
        
        @keyframes pulse { 0%,100% { opacity:.3 } 50% { opacity:.7 } }
        
        .stars-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .stars {
          position: absolute;
          width: 200%;
          height: 200%;
          background: transparent;
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(var(--text), 0.7) 1px, transparent 0),
            radial-gradient(1.5px 1.5px at 30% 40%, rgba(var(--text), 0.5) 1px, transparent 0),
            radial-gradient(1px 1px at 50% 80%, rgba(var(--text), 0.9) 1px, transparent 0),
            radial-gradient(1.5px 1.5px at 70% 30%, rgba(var(--text), 0.4) 1px, transparent 0),
            radial-gradient(2px 2px at 90% 70%, rgba(var(--text), 0.6) 1px, transparent 0),
            radial-gradient(1px 1px at 20% 90%, rgba(var(--text), 0.8) 1px, transparent 0),
            radial-gradient(1.5px 1.5px at 80% 50%, rgba(var(--text), 0.5) 1px, transparent 0);
          background-size: 250px 250px;
          animation: drift 50s linear infinite;
          opacity: 0.35;
        }
        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-15%, -15%); }
        }
      `}</style>

      <Cursor />
      <Navbar
        active={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        showStars={showStars}
        toggleStars={toggleStars}
      />
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Hero showStars={showStars} />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
