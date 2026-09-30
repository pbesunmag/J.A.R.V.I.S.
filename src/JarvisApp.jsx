import { useEffect, useState } from "react";

export default function JarvisApp() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  // Efecto para capturar el código de autorización cuando Spotify redirige de vuelta
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Limpiamos la URL para remover el parámetro ?code=...
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Canjeamos el código por el token de acceso
      exchangeCodeForToken(code);
    } else {
      // Comprobamos si ya tenemos un token guardado previamente
      const token = localStorage.getItem('spotify_access_token');
      if (token) setIsAuthenticated(true);
    }
  }, []);

  // Función para generar el code verifier para la autenticación PKCE de Spotify
  const generateCodeVerifier = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const values = crypto.getRandomValues(new Uint8Array(length));
    for (let i = 0; i < length; i++) {
      text += possible[values[i] % possible.length];
    }
    return text;
  };

  // Función para iniciar el flujo de autenticación con Spotify
  const handleSpotifyLogin = () => {
    const clientId = "e0b2a2ce4e2848269a5e6ef698180dcb"; // Reemplaza con tu Client ID
    const redirectUri = window.location.origin; 
    const scope = "user-read-playback-state user-modify-playback-state";

    const verifier = generateCodeVerifier(64);
    sessionStorage.setItem("spotify_code_verifier", verifier);

    window.crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(verifier)
    ).then(async (buffer) => {
      const base64Digest = btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      const args = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        code_challenge_method: "S256",
        code_challenge: base64Digest,
      });

      window.location = "https://accounts.spotify.com/authorize?" + args.toString();
    });
  };

  // Función para intercambiar el código por el token definitivo
  const exchangeCodeForToken = async (code) => {
    const clientId = "TU_CLIENT_ID"; // Reemplaza con tu Client ID
    const redirectUri = window.location.origin;
    const codeVerifier = sessionStorage.getItem("spotify_code_verifier");

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('spotify_access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('spotify_refresh_token', data.refresh_token);
        }
        setIsAuthenticated(true);
        console.log("¡Autenticación con Spotify completada con éxito!");
      } else {
        console.error("Error al obtener el token:", data);
      }
    } catch (error) {
      console.error("Error en la petición del token:", error);
    }
  };

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
        <p className="text-cyan-600 mt-2">
          {isAuthenticated ? "SPOTIFY: VINCULADO" : "SPOTIFY: DESCONECTADO"}
        </p>
        
        {/* Botón de vinculación con Spotify (cambia según el estado) */}
        {!isAuthenticated && (
          <button 
            onClick={handleSpotifyLogin}
            className="mt-3 px-3 py-1 bg-cyan-950/60 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black transition-all duration-300 rounded text-[10px] tracking-widest uppercase cursor-pointer"
          >
            Vincular Spotify
          </button>
        )}
      </div>

      {/* Interfaz Central (Centro exacto del reactor) */}
      <div className="relative z-10 flex items-center justify-center w-40 h-40">
        {/* Anillos de calibración rotatorios */}
        <div className="absolute w-72 h-72 border border-cyan-900/40 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none"></div>
        <div className="absolute w-56 h-56 border-l border-r border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite_reverse] pointer-events-none"></div>
        <div className="absolute w-40 h-40 border border-dashed border-cyan-400/20 rounded-full animate-[spin_15s_linear_infinite] pointer-events-none"></div>

        {/* Elemento web integrado de ElevenLabs */}
        <div className="relative z-50 flex items-center justify-center">
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