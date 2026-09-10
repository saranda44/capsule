import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0E0E]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F7F6F2] border border-[#E4E1D8] rounded-[4px] w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative text-[#0E0E0E] shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#0E0E0E]/60 hover:text-[#0E0E0E] p-1 transition-colors cursor-pointer"
          title="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {title && (
          <h2 className="text-base font-bold tracking-tight mb-4 text-[#0E0E0E]">
            {title}
          </h2>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}
