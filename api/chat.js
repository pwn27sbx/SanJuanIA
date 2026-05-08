export default async function handler(req, res) {
  // Solo permitimos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, schema } = req.body;

  // Vercel leerá esto de tus "Environment Variables" en el dashboard
  // Asegúrate de que se llame exactamente VITE_GEMINI_API_KEY
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key no configurada en Vercel' });
  }

  try {
    // Usamos el endpoint v1 que es el más estable para gemini-1.5-flash
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error de Google:', data);
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: "Error interno en el servidor de la clínica" });
  }
}
