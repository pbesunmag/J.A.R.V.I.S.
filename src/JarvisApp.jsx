import { useEffect, useState } from "react";

export default function JarvisApp() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-mono text-cyan-500 selection:bg-cyan-900 flex flex-col items-center justify-center">
      {/* Fondo holográfico de escáner */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent_100%)]"></div>

      {/* Resplandor del núcleo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Telemetría Superior Izquierda */}
      <div className="absolute top-8 left-8 text-xs tracking-[0.3em] opacity-80 space-y-1">
        <p className="text-cyan-300 font-bold">
          SISTEMA: J.A.R.V.I.S. MARK VII
        </p>
        <p>OPERADOR: POL BASTIDA</p>
        <p className="animate-pulse text-cyan-600 mt-2">ESTADO: EN LÍNEA</p>
      </div>

      {/* Telemetría Superior Derecha */}
      <div className="absolute top-8 right-8 text-xs tracking-[0.3em] opacity-80 text-right space-y-1">
        <p className="text-cyan-300">{time}</p>
        <p>ENRUTAMIENTO AUDIO: SONY WF</p>
        <p className="text-cyan-600 mt-2">CONEXIÓN SATELITAL ÓPTIMA</p>
      </div>

      {/* Interfaz Central (Centro exacto del reactor) */}
      <div className="relative z-10 flex items-center justify-center w-40 h-40">
        {/* Anillos de calibración rotatorios */}
        <div className="absolute w-72 h-72 border border-cyan-900/40 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none"></div>
        <div className="absolute w-56 h-56 border-l border-r border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite_reverse] pointer-events-none"></div>
        <div className="absolute w-40 h-40 border border-dashed border-cyan-400/20 rounded-full animate-[spin_15s_linear_infinite] pointer-events-none"></div>

        {/* Elemento web integrado de ElevenLabs */}
        <div className="relative z-50 felx items-center justify-center">
          <elevenlabs-convai agent-id="agent_8001m3q4z8pbfzbvxvfmx8t0762x"></elevenlabs-convai>
          <script
            src="https://unpkg.com/@elevenlabs/convai-widget-embed"
            async
            type="text/javascript"
          ></script>
        </div>
      </div>

      {/* Registros de procesamiento inferiores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-widest opacity-50 uppercase text-center flex flex-col items-center">
        <div className="w-64 h-[1px] bg-cyan-900/50 mb-4"></div>
        <p>Inicializando protocolo de ilusión... Motores de síntesis listos.</p>
        <p className="mt-1">Esperando entrada de voz.</p>
      </div>
    </div>
  );
}
