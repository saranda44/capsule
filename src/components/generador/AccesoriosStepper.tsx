interface AccesoriosStepperProps {
  cantidad: number;
  onChange: (nuevaCantidad: number) => void;
}

export function AccesoriosStepper({ cantidad, onChange }: AccesoriosStepperProps) {
  const handleIncrement = () => {
    if (cantidad < 4) {
      onChange(cantidad + 1);
    }
  };

  const handleDecrement = () => {
    if (cantidad > 0) {
      onChange(cantidad - 1);
    }
  };

  return (
    <div className="flex justify-between items-center w-full max-w-[500px] my-4 select-none">
      <span className="font-mono text-xs text-[#0E0E0E]">accesorios</span>
      <div className="flex items-center border border-[#0E0E0E] rounded-[2px]">
        <span className="font-mono text-xs px-2.5 py-1">{cantidad}</span>
        <div className="flex flex-col border-l border-[#0E0E0E] leading-none">
          <button
            type="button"
            onClick={handleIncrement}
            disabled={cantidad >= 4}
            className="text-[9px] px-1.5 py-0.5 hover:bg-[#0E0E0E]/5 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            &#9650;
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            disabled={cantidad <= 0}
            className="text-[9px] px-1.5 py-0.5 border-t border-[#0E0E0E] hover:bg-[#0E0E0E]/5 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            &#9660;
          </button>
        </div>
      </div>
    </div>
  );
}
