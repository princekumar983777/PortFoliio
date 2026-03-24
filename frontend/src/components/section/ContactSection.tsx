import { useState } from "react";
import { Send, Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEND_EMAIL_API_URL } from "@/lib/apiBase";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      msg: formData.message.trim(),
    };

    try {
      const response = await fetch(SEND_EMAIL_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let detail = responseText || `Request failed (${response.status})`;
        try {
          const parsed = JSON.parse(responseText) as { detail?: unknown };
          if (parsed.detail != null) {
            detail =
              typeof parsed.detail === "string"
                ? parsed.detail
                : JSON.stringify(parsed.detail);
          }
        } catch {
          /* keep detail as responseText */
        }
        throw new Error(detail);
      }

      let successMessage: string | undefined;
      try {
        const data = responseText
          ? (JSON.parse(responseText) as { message?: string })
          : {};
        successMessage = data.message;
      } catch {
        /* ignore */
      }

      toast({
        title: "Message sent",
        description: successMessage ?? "Thanks — I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("[ContactSection] send-email:", err);
      toast({
        title: "Could not send",
        description:
          err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-container bg-section-contact flex items-center justify-center relative overflow-y-auto custom-scrollbar pt-8 sm:pt-16 md:pt-32 min-h-0">
      <div className="max-w-6xl mx-auto px-0 sm:px-6 py-12 sm:py-20 w-full">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or looking for a developer? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          {/* Contact form */}
          <div className="glass-card p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <a
                  href="mailto:hello@hhaldiya.com"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="p-3 rounded-lg bg-secondary">
                    <Mail size={20} />
                  </div>
                  <span>princekumar9837771886@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="p-3 rounded-lg bg-secondary">
                    <MapPin size={20} />
                  </div>
                  <span>Open to Remote Work Worldwide</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="font-semibold mb-4">Connect with me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/princekumar983777/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/prince-kumar-021460290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="https://x.com/PrinceK29628508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Twitter size={22} />
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Available for hire</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Currently accepting new projects and opportunities. Let's build something amazing together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
