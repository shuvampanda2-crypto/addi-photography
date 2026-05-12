import { ArrowRight } from "lucide-react";

interface LuxuryButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "data-ocid"?: string;
}

export function LuxuryButton({
  variant = "primary",
  children,
  onClick,
  href,
  arrow = false,
  className = "",
  type = "button",
  disabled = false,
  "data-ocid": dataOcid,
}: LuxuryButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-400 cursor-pointer relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "border border-accent text-accent px-8 py-4 hover:bg-accent hover:text-[#0B0B0B] hover:shadow-[0_0_30px_rgba(199,164,108,0.3)]",
    secondary:
      "border border-white/30 text-white px-8 py-4 hover:bg-white hover:text-[#0B0B0B] hover:border-white",
    ghost:
      "text-accent/80 hover:text-accent px-0 py-2 border-b border-transparent hover:border-accent/50",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} data-ocid={dataOcid}>
        {children}
        {arrow && (
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      data-ocid={dataOcid}
    >
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </button>
  );
}
