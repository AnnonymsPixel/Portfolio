import { useState } from "react";
import { validateEmail, validateEmailAbstract, sendToDiscord } from "../../utils/mail";

/**
 * Contact section — form with email validation and Discord webhook delivery.
 * Props: theme, onNotify, sectionStyle, containerStyle
 */
export default function ContactSection({ theme, onNotify, sectionStyle, containerStyle }) {
  const t = theme.vars;

  const [form,    setForm]    = useState({ name: "", subject: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const headingFont = { fontFamily: "Russo One, sans-serif", fontWeight: 500, color: t.mainText };

  const inputStyle = {
    width: "100%",
    padding: "10px 8px",
    backgroundColor: t.secondaryColor,
    borderRadius: 5,
    border: `1px solid ${t.borderColor}`,
    fontSize: 14,
    color: t.mainText,
    fontFamily: "Roboto Mono, monospace",
    boxSizing: "border-box",
    marginBottom: 4,
  };

  const labelStyle = {
    display: "block",
    marginTop: 12,
    marginBottom: 4,
    color: t.mainText,
    fontFamily: "Roboto Mono, monospace",
    fontSize: 14,
  };

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, email, subject, message } = form;

    if (!name || !email || !subject || !message) {
      onNotify("Please fill in all fields!", "error");
      return;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      onNotify(emailError, "error");
      return;
    }

    setLoading(true);
    onNotify("Verifying email...", "info");

    const { ok, error } = await validateEmailAbstract(email);
    if (!ok) {
      onNotify(error, "error");
      setLoading(false);
      return;
    }

    const result = await sendToDiscord({ name, email, subject, message });

    if (result.ok) {
      onNotify("Message sent successfully! ✓", "success");
      setForm({ name: "", subject: "", email: "", message: "" });
    } else {
      onNotify("Failed to send message. Please try again.", "error");
    }

    setLoading(false);
  }

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h3 style={{ ...headingFont, fontSize: 28, textAlign: "center", paddingTop: 30 }}>
          Get in Contact
        </h3>

        <div
          style={{
            maxWidth: 600,
            margin: "0 auto 50px",
            border: `1px solid ${t.borderColor}`,
            padding: 15,
            borderRadius: 5,
            backgroundColor: t.mainColor,
          }}
        >
          <label style={labelStyle}>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            type="text"
          />

          <label style={labelStyle}>Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            style={inputStyle}
            type="text"
          />

          <label style={labelStyle}>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            type="text"
          />

          <label style={labelStyle}>Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "10px 0",
              color: "#fff",
              backgroundColor: t.buttonColor,
              border: "none",
              borderRadius: 15,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "Roboto Mono, monospace",
              fontSize: 14,
              opacity: loading ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Verifying & Sending..." : "Send"}
          </button>

          <p
            style={{
              marginTop: 10,
              textAlign: "center",
              fontFamily: "Roboto Mono, monospace",
              fontSize: 13,
              color: t.mainText,
            }}
          >
            🔒 Protected by email reputation verification
          </p>
        </div>
      </div>
    </section>
  );
}