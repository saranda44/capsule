interface ToggleOuterwearProps {
  incluirOuterwear: boolean;
  onToggle: () => void;
}

export function ToggleOuterwear({ incluirOuterwear, onToggle }: ToggleOuterwearProps) {
  return (
    <div className="flex items-center gap-2 select-none cursor-pointer" onClick={onToggle}>
      <span className="font-mono text-xs text-[#0E0E0E]">incluir outerwear</span>
      <div
        className={`w-[30px] h-[16px] rounded-full relative transition-colors duration-200 ${
          incluirOuterwear ? "bg-[#1D1DE0]" : "bg-[#0E0E0E]/20"
        }`}
      >
        <div
          className={`w-[12px] h-[12px] bg-[#F7F6F2] rounded-full absolute top-[2px] transition-all duration-200 ${
            incluirOuterwear ? "right-[2px]" : "left-[2px]"
          }`}
        />
      </div>
    </div>
  );
}
