const FAKE_PATTERNS = [
  /^(test|fake|dummy|sample|example|temp|throwaway|anonymous|noreply|no-reply)@/i,
  /@(test|fake|dummy|sample|example|temp|throwaway|localhost|invalid)\./i,
  /\.(test|fake|dummy|invalid|example|local)$/i,
  /^[a-z]{1,3}@[a-z]{1,5}\.(com|net|org)$/i,
  /^\d+@\d+\.(com|net|org)$/i,
  /^user\d*@/i,
  /^admin@/i,
  /^[a-z]{1,5}@gmail\.com$/i,
  /^(qwerty|asdfgh|zxcvbn).*@gmail\.com$/i,
];

const SUSPICIOUS_PATTERNS = [
  /^[qwertyuiop]+@/i,
  /^[asdfghjkl]+@/i,
  /^[a-z]{1,2}@/i,
  /^\d{10,}@/i,
  /^(.)\1{3,}@/i,
];

const ROLE_EMAILS =
  /^(admin|info|support|sales|contact|noreply|no-reply|webmaster|postmaster|root)@/i;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Client-side email validation (fast, no network).
 * Returns an error string if invalid, or null if valid.
 */
export function validateEmail(email) {
  if (!EMAIL_REGEX.test(email))
    return "Please enter a valid email format.";
  if (FAKE_PATTERNS.some((p) => p.test(email)))
    return "Please use a real email address, not a test or temporary email.";
  if (SUSPICIOUS_PATTERNS.some((p) => p.test(email)))
    return "This email address appears to be invalid. Please use your real email.";
  if (ROLE_EMAILS.test(email))
    return "Please use your personal email, not a role-based address.";
  return null;
}

/**
 * Validates email via Abstract API (checks deliverability + MX records).
 * Returns { ok: true } if valid, or { ok: false, error: string } if not.
 */
export async function validateEmailAbstract(email) {
  const apiKey = process.env.REACT_APP_ABSTRACT_API_KEY || "";
  if (!apiKey) return { ok: true }; // skip in dev if key not set

  try {
    const res = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`
    );
    const data = await res.json();

    if (data.deliverability === "UNDELIVERABLE")
      return { ok: false, error: "This email address doesn't appear to exist. Please check it." };
    if (data.is_disposable_email?.value)
      return { ok: false, error: "Disposable emails are not allowed. Please use your real email." };
    if (!data.is_mx_found?.value)
      return { ok: false, error: "We couldn't verify this email domain. Please use a real email." };

    return { ok: true };
  } catch {
    return { ok: true }; // fail open — don't block user if API is down
  }
}

/**
 * Sends the contact form payload to a Discord webhook.
 * Returns { ok: true } on success or { ok: false, error: string } on failure.
 */
export async function sendToDiscord({ name, email, subject, message }) {
  const webhookUrl = process.env.REACT_APP_DISCORD_WEBHOOK_URL;
  const roleId     = process.env.REACT_APP_OWNER_ROLE_ID;

  if (!webhookUrl) return { ok: true }; // dev/demo fallback

  const payload = {
    content: roleId ? `<@&${roleId}>` : undefined,
    embeds: [
      {
        title: "New Contact Form Submission!",
        color: 3447003,
        fields: [
          { name: "Contact", value: `${name} (${email})`, inline: false },
          { name: "Subject", value: subject,              inline: false },
          { name: "Message", value: `**${message}**`,     inline: false },
          { name: "Email",   value: email,                inline: true  },
          { name: "Time",    value: new Date(),          inline: true },
          { name: "Status",  value: "Valid",              inline: true  },
        ],
        footer: {
          text:
            "Portfolio Contact Form • " +
            new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
        },
      },
    ],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}