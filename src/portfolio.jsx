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
        background: big ? "transparent" : "#e8e0d4",
        border: big ? "1.5px solid #e8e0d4" : "none",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "width .2s, height .2s, background .2s",
        mixBlendMode: "difference",
      }}
    />
  );
}

function Navbar({ active }) {
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
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.25rem 3rem",
        background: scrolled ? "rgba(10,10,9,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(232,224,212,0.08)" : "none",
        transition: "all .4s ease",
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.35rem",
          letterSpacing: "0.04em",
          color: "#e8e0d4",
          cursor: "default",
        }}
      >
        Chandan&nbsp;Garg
      </span>
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
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color:
                  active === link.toLowerCase()
                    ? "#e8e0d4"
                    : "rgba(232,224,212,0.45)",
                transition: "color .25s",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.target.style.color = "#e8e0d4")}
              onMouseLeave={(e) =>
                (e.target.style.color =
                  active === link.toLowerCase()
                    ? "#e8e0d4"
                    : "rgba(232,224,212,0.45)")
              }
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
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
        padding: "0 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(232,224,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,224,212,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(30px)",
          transition: "opacity .9s ease, transform .9s ease",
          maxWidth: 680,
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "rgba(232,224,212,0.4)",
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
            color: "#e8e0d4",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Building things
          <br />
          <em style={{ fontStyle: "italic", color: "rgba(232,224,212,0.55)" }}>
            that last.
          </em>
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "rgba(232,224,212,0.55)",
            marginTop: "2rem",
            maxWidth: 480,
          }}
        >
          I architect and ship production-grade web systems — from pixel-perfect
          interfaces to resilient backend infrastructure. I care deeply about
          craft, performance, and the humans using what I build.
        </p>
        <div style={{ marginTop: "2.8rem", display: "flex", gap: "1.5rem" }}>
          <button
            data-hover
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "#e8e0d4",
              color: "#0a0a09",
              border: "none",
              padding: "0.75rem 2rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
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
              color: "rgba(232,224,212,0.7)",
              border: "1px solid rgba(232,224,212,0.2)",
              padding: "0.75rem 2rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "border-color .2s, color .2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(232,224,212,0.6)";
              e.target.style.color = "#e8e0d4";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(232,224,212,0.2)";
              e.target.style.color = "rgba(232,224,212,0.7)";
            }}
          >
            Say Hello
          </button>
        </div>
      </div>

      {/* scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "3rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          opacity: 0.3,
        }}
      >
        <div
          style={{
            width: 40,
            height: 1,
            background: "#e8e0d4",
            animation: "pulse 2s infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            color: "#e8e0d4",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
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
        padding: "8rem 3rem",
        borderTop: "1px solid rgba(232,224,212,0.07)",
      }}
    >
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.2em",
          color: "rgba(232,224,212,0.35)",
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
          color: "#e8e0d4",
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
                  color: "rgba(232,224,212,0.75)",
                }}
              >
                {skill.name}
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem",
                  color: "rgba(232,224,212,0.3)",
                }}
              >
                {skill.level}%
              </span>
            </div>
            <div
              style={{
                height: 1,
                background: "rgba(232,224,212,0.1)",
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
                  background: "#e8e0d4",
                  transition: `width 1.2s cubic-bezier(.16,1,.3,1) ${0.3 + i * 0.1}s`,
                }}
              />
            </div>
          </div>
        ))}
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
          ? "rgba(232,224,212,0.25)"
          : "rgba(232,224,212,0.07)",
        cursor: "default",
        background: "#0a0a09",
      }}
    >
      {/* hover reveal overlay — sits on top, sized to content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "2rem",
          background: "rgba(10,10,9,0.98)",
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
              color: "rgba(232,224,212,0.35)",
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
              color: "#e8e0d4",
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
              color: "rgba(232,224,212,0.6)",
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
                border: "1px solid rgba(232,224,212,0.18)",
                color: "rgba(232,224,212,0.5)",
                textTransform: "uppercase",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* default face */}
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
              color: "rgba(232,224,212,0.3)",
              textTransform: "uppercase",
            }}
          >
            {project.tag}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem",
              color: "rgba(232,224,212,0.2)",
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
            color: "#e8e0d4",
            margin: "0 0 0.5rem",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(232,224,212,0.25)",
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
        padding: "8rem 3rem",
        borderTop: "1px solid rgba(232,224,212,0.07)",
      }}
    >
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.2em",
          color: "rgba(232,224,212,0.35)",
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
          color: "#e8e0d4",
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
          background: "rgba(232,224,212,0.06)",
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} inView={inView} />
        ))}
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
          access_key: "866a6d51-efc2-4bd7-b4c9-1bad5d8ed33b",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Message from ${form.name}`, // Sets the email subject line
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSent(true); // Shows your beautiful success screen
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // if (form.name && form.email && form.message) setSent(true);

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(232,224,212,0.15)",
    padding: "0.9rem 0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.93rem",
    color: "#e8e0d4",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s",
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "8rem 3rem 6rem",
        borderTop: "1px solid rgba(232,224,212,0.07)",
      }}
    >
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.2em",
          color: "rgba(232,224,212,0.35)",
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
          color: "#e8e0d4",
          margin: "0 0 1rem",
        }}
      >
        Let's build something
      </h2>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.92rem",
          color: "rgba(232,224,212,0.45)",
          marginBottom: "3.5rem",
          maxWidth: 420,
          lineHeight: 1.7,
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
        }}
      >
        {sent ? (
          <div
            style={{
              padding: "3rem",
              border: "1px solid rgba(232,224,212,0.15)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.8rem",
                color: "#e8e0d4",
                margin: "0 0 0.5rem",
              }}
            >
              Message received.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(232,224,212,0.4)",
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
                (e.target.style.borderBottomColor = "rgba(232,224,212,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderBottomColor = "rgba(232,224,212,0.15)")
              }
            />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
              onFocus={(e) =>
                (e.target.style.borderBottomColor = "rgba(232,224,212,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderBottomColor = "rgba(232,224,212,0.15)")
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
                borderBottom: "1px solid rgba(232,224,212,0.15)",
              }}
              onFocus={(e) =>
                (e.target.style.borderBottomColor = "rgba(232,224,212,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderBottomColor = "rgba(232,224,212,0.15)")
              }
            />
            <button
              data-hover
              onClick={handleSubmit}
              style={{
                alignSelf: "flex-start",
                background: "#e8e0d4",
                color: "#0a0a09",
                border: "none",
                padding: "0.8rem 2.2rem",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity .2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
              onMouseLeave={(e) => (e.target.style.opacity = 1)}
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </div>
        )}
      </div>

      <footer
        style={{
          marginTop: "6rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(232,224,212,0.07)",
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
            color: "rgba(232,224,212,0.2)",
            letterSpacing: "0.1em",
          }}
        >
          © 2025 Chandan Garg
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { name: "GitHub", url: "https://github.com/Chandan11232" }, // Put your actual link here
            {
              name: "LinkedIn",
              url: "https://www.linkedin.com/in/chandan-garg-43015323b/",
            }, // Put your actual link here
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank" // Opens link in a new tab
              rel="noopener noreferrer" // Security best practice for opening new tabs
              data-hover
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(232,224,212,0.25)",
                textDecoration: "none",
                transition: "color .2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "rgba(232,224,212,0.7)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(232,224,212,0.25)")
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a09; cursor: none; }
        ::selection { background: rgba(232,224,212,0.2); }
        input::placeholder, textarea::placeholder { color: rgba(232,224,212,0.2); }
        @keyframes pulse { 0%,100% { opacity:.3 } 50% { opacity:.7 } }
      `}</style>
      <Cursor />
      <Navbar active={activeSection} />
      <main style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
