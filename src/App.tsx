import { useState } from "react";
import { Tabs } from "@/components/layout/Tabs";
import { GeneradorView } from "@/views/GeneradorView";
import { FavoritosView } from "@/views/FavoritosView";
import { useFavoritos } from "@/hooks/useFavoritos";
import { useWardrobe } from "@/hooks/useWardrobe";
import { ArmarioModal } from "@/components/armario/ArmarioModal";

export function App() {
  const [tab, setTab] = useState<"generador" | "favoritos">("generador");
  const { favoritos } = useFavoritos();
  const { prendas, agregarPrenda, eliminarPrenda, restablecerSemilla } = useWardrobe();
  const [armarioModalOpen, setArmarioModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F7F6F2] text-[#0E0E0E] flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-[520px]">
        {/* Pestañas superiores y barra de navegación */}
        <Tabs
          tabActivo={tab}
          onChangeTab={setTab}
          cantidadFavoritos={favoritos.length}
          onOpenArmario={() => setArmarioModalOpen(true)}
        />

        {/* Vista Activa */}
        {tab === "generador" ? (
          <GeneradorView />
        ) : (
          <FavoritosView onIrAlGenerador={() => setTab("generador")} />
        )}
      </div>

      {/* Modal de Armario */}
      <ArmarioModal
        isOpen={armarioModalOpen}
        onClose={() => setArmarioModalOpen(false)}
        prendas={prendas}
        onAgregarPrenda={agregarPrenda}
        onEliminarPrenda={eliminarPrenda}
        onRestablecerSemilla={restablecerSemilla}
      />
    </main>
  );
}

export default App;
