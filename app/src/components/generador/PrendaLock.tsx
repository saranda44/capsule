import { Lock, LockOpen } from "lucide-react";

interface PrendaLockProps {
  bloqueado: boolean;
  onToggle: () => void;
  tag?: string;
  className?: string;
}

export function PrendaLock({ bloqueado, onToggle, tag, className = "" }: PrendaLockProps) {
  return (
    <button
      onClick={onToggle}
      type="button"
      data-no-export="true"
      className={`no-export inline-flex items-center gap-1 cursor-pointer select-none focus:outline-none ${className}`}
      title={bloqueado ? "Desbloquear" : "Bloquear"}
    >
      {bloqueado ? (
        <Lock className="w-3.5 h-3.5 text-[#FF3B8D]" />
      ) : (
        <LockOpen className="w-3.5 h-3.5 text-[#0E0E0E]/70 hover:text-[#0E0E0E]" />
      )}
      {tag && (
        <span className="font-mono text-[9px] text-[#FF3B8D] tracking-tight">
          {tag}
        </span>
      )}
    </button>
  );
}
