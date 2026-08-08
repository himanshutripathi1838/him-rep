import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { ActionAnchor, ActionButton } from "@/components/site/Action";
import resumeAsset from "@/assets/resume-ats.pdf.asset.json";
import { site } from "@/data/site";

type Props = {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
};

/**
 * Downloads the resume as a blob so the browser saves the file instead of
 * navigating to it (embedded/sandboxed viewers block plain PDF navigation).
 * Falls back to a normal download link if the fetch fails.
 */
export function ResumeDownloadButton({
  variant = "primary",
  size = "lg",
  label = "Download resume",
  className,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const fileName = `${site.name.replace(/\s+/g, "-")}-Resume.pdf`;

  if (failed) {
    return (
      <ActionAnchor
        href={resumeAsset.url}
        download={fileName}
        target="_blank"
        rel="noreferrer"
        variant={variant}
        size={size}
        {...(className ? { className } : {})}
      >
        <Download className="size-4" /> {label}
      </ActionAnchor>
    );
  }

  const handleClick = async () => {
    setBusy(true);
    try {
      const res = await fetch(resumeAsset.url);
      if (!res.ok) throw new Error(`Resume request failed: ${res.status}`);
      const blob = await res.blob();
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(href), 2000);
    } catch (error) {
      console.error(error);
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ActionButton
      type="button"
      onClick={handleClick}
      disabled={busy}
      variant={variant}
      size={size}
      {...(className ? { className } : {})}
    >
      {busy ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
      {label}
    </ActionButton>
  );
}
