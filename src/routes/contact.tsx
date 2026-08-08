import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/site/BrandIcons";
import { ActionButton } from "@/components/site/Action";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hire Himanshu Tripathi, Software Engineer" },
      {
        name: "description",
        content:
          "Get in touch with Himanshu Tripathi about software engineering and AI/ML roles, or focused freelance engineering work.",
      },
      { property: "og:title", content: "Contact Himanshu Tripathi" },
      {
        property: "og:description",
        content: "Open to software engineering and AI/ML roles, plus selected freelance work.",
      },
    ],
  }),
  component: Contact,
});

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "Location", value: site.location, icon: MapPin },
];

const WEB3FORMS_ACCESS_KEY = "7b303e93-6aab-4e8b-bda1-d2c996fbb839";

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: values.name,
          email: values.email,
          subject: values.subject || `Portfolio enquiry from ${values.name}`,
          message: values.message,
          from_name: "Portfolio contact form",
        }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) throw new Error(data.message ?? `Request failed: ${res.status}`);
      setSent(true);
      reset();
      window.setTimeout(() => setSent(false), 6000);
    } catch (err) {
      console.error(err);
      setError("Message could not be sent. Please email me directly.");
    }
  };


  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <p className="mono-label">Contact</p>
            <h1 className="mt-5 text-4xl font-semibold text-gradient md:text-5xl">
              Let's talk about what you're building.
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              I read everything that comes through here and reply within a day or two. Roles,
              contract work, or a question about one of the case studies — all welcome.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <dl className="space-y-6">
              {channels.map((channel) => (
                <div key={channel.label} className="flex items-start gap-4">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface/60">
                    <channel.icon className="size-4 text-accent" />
                  </span>
                  <div>
                    <dt className="mono-label">{channel.label}</dt>
                    {channel.href ? (
                      <dd>
                        <a
                          href={channel.href}
                          className="text-sm text-foreground transition-colors hover:text-accent"
                        >
                          {channel.value}
                        </a>
                      </dd>
                    ) : (
                      <dd className="text-sm text-foreground">{channel.value}</dd>
                    )}
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <LinkedinIcon className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} className="surface-card relative p-8 md:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" error={errors.name?.message}>
                <input
                  {...register("name", { required: "Your name helps me reply properly." })}
                  className={inputClass(!!errors.name)}
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email", {
                    required: "I need an address to reply to.",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "That email looks off." },
                  })}
                  className={inputClass(!!errors.email)}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Subject" error={errors.subject?.message}>
                <input
                  {...register("subject", { required: "A subject keeps things findable." })}
                  className={inputClass(!!errors.subject)}
                  placeholder="Engineering role at …"
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  {...register("message", {
                    required: "Tell me a little about the work.",
                  })}

                  rows={6}
                  className={cn(inputClass(!!errors.message), "resize-none py-3")}
                  placeholder="What are you building, and where do I fit?"
                />
              </Field>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <ActionButton type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending
                  </>
                ) : (
                  <>
                    <Send className="size-4" /> Send message
                  </>
                )}
              </ActionButton>
              <AnimatePresence>
                {sent ? (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2 font-mono text-xs text-accent"
                  >
                    <span className="inline-flex size-5 items-center justify-center rounded-full border border-accent">
                      <Check className="size-3" />
                    </span>
                    Message sent — I'll reply soon
                  </motion.span>
                ) : null}
              </AnimatePresence>
              {error ? (
                <span className="text-xs text-destructive" role="alert">
                  {error}
                </span>
              ) : null}

            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "h-11 w-full rounded-lg border bg-surface/40 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground",
    hasError ? "border-destructive/70" : "border-border focus:border-primary/60",
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mono-label">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-2 block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}
