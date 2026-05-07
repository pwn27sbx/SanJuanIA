import React, { useState, useEffect } from 'react';
import {
  Phone,
  Calendar,
  MapPin,
  Search,
  Menu,
  X,
  HeartPulse,
  Stethoscope,
  Baby,
  Activity,
  ShieldCheck,
  Clock,
  Users,
  Award,
  ArrowRight,
  MessageCircle,
  AlertTriangle,
  Sparkles,
  Bot,
  ClipboardList,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  Info,
  ShieldPlus,
  Apple,
  Utensils,
  Star,
  Smile
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // AI Feature States
  const [symptoms, setSymptoms] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // New AI Feature States: Appointment Prep
  const [prepReason, setPrepReason] = useState('');
  const [prepSpecialty, setPrepSpecialty] = useState('');
  const [prepResult, setPrepResult] = useState(null);
  const [isPrepLoading, setIsPrepLoading] = useState(false);
  const [prepError, setPrepError] = useState('');

  // New AI Feature States: Medical Dictionary
  const [medicalTerm, setMedicalTerm] = useState('');
  const [termExplanation, setTermExplanation] = useState(null);
  const [isTermLoading, setIsTermLoading] = useState(false);
  const [termError, setTermError] = useState('');

  // New AI Feature States: Preventive Health Planner
  const [prevAge, setPrevAge] = useState('');
  const [prevGender, setPrevGender] = useState('Femenino');
  const [prevHistory, setPrevHistory] = useState('');
  const [prevResult, setPrevResult] = useState(null);
  const [isPrevLoading, setIsPrevLoading] = useState(false);
  const [prevError, setPrevError] = useState('');

  // New AI Feature States: Nutrition & Recovery
  const [nutriCondition, setNutriCondition] = useState('');
  const [nutriResult, setNutriResult] = useState(null);
  const [isNutriLoading, setIsNutriLoading] = useState(false);
  const [nutriError, setNutriError] = useState('');

  // New AI Feature States: Maternity Companion
  const [pregWeeks, setPregWeeks] = useState('');
  const [pregFeeling, setPregFeeling] = useState('');
  const [pregResult, setPregResult] = useState(null);
  const [isPregLoading, setIsPregLoading] = useState(false);
  const [pregError, setPregError] = useState('');

  // New AI Feature States: Pediatric Assistant
  const [pedAge, setPedAge] = useState('');
  const [pedMilestone, setPedMilestone] = useState('');
  const [pedResult, setPedResult] = useState(null);
  const [isPedLoading, setIsPedLoading] = useState(false);
  const [pedError, setPedError] = useState('');

  // Handle scroll for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappLink = "https://wa.me/51958958124?text=Hola,%20deseo%20agendar%20una%20cita%20médica.";
  const phoneLink = "tel:054382400";
  const mapLink = "https://maps.google.com/?q=Av.+Ejército+1020,+Cayma,+Arequipa";

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;
    setIsLoading(true);
    setError('');
    setAiRecommendation(null);

    const apiKey = "AIzaSyCf7_VKhvyI9iOWR9TGD87QTWlw9T66WbI"; // API Key proveída por el entorno
    const promptText = `Actúa como un orientador médico empático de la Clínica San Juan de Dios Arequipa. Un paciente describe estos síntomas: "${symptoms}". Sugiere la especialidad médica más adecuada de esta lista: Medicina General, Pediatría, Cardiología, Gastroenterología, Traumatología, Ginecología, Neurología, Otorrinolaringología. Explica de manera breve, empática y en español por qué sugieres esta especialidad (máximo 2 líneas) invitándolo a agendar. NUNCA des un diagnóstico médico real.`;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let retries = 5;
    let delay = 1000;
    let success = false;

    while (retries > 0 && !success) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  especialidad: { type: "STRING" },
                  explicacion: { type: "STRING" }
                },
                required: ["especialidad", "explicacion"]
              }
            }
          })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonText) {
          setAiRecommendation(JSON.parse(jsonText));
          success = true;
        } else {
           throw new Error('Invalid response form API');
        }
      } catch (err) {
        retries--;
        if (retries === 0) {
          setError("Lo sentimos, en este momento no pudimos procesar tu consulta. Por favor contáctanos directamente vía WhatsApp para orientarte.");
        } else {
          await sleep(delay);
          delay *= 2;
        }
      }
    }
    setIsLoading(false);
  };

  const generatePrepList = async () => {
    if (!prepReason.trim() || !prepSpecialty) return;
    setIsPrepLoading(true);
    setPrepError('');
    setPrepResult(null);

    const apiKey = ""; // API Key proveída por el entorno
    const promptText = `Actúa como un asistente de atención al paciente de la Clínica San Juan de Dios Arequipa. Un paciente va a asistir a una cita de la especialidad de ${prepSpecialty} por el siguiente motivo: "${prepReason}". Genera una lista de preparación para su cita que incluya: 1) Documentos médicos que debería llevar (ej. exámenes de sangre previos, placas, lista de pastillas, etc). 2) Tres preguntas clave e inteligentes que el paciente debería hacerle al médico durante la consulta para aprovechar el tiempo. 3) Un breve consejo final empático en español.`;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let retries = 5;
    let delay = 1000;
    let success = false;

    while (retries > 0 && !success) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  documentos: { type: "ARRAY", items: { type: "STRING" } },
                  preguntas: { type: "ARRAY", items: { type: "STRING" } },
                  consejo: { type: "STRING" }
                },
                required: ["documentos", "preguntas", "consejo"]
              }
            }
          })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonText) {
          setPrepResult(JSON.parse(jsonText));
          success = true;
        } else {
           throw new Error('Invalid response from API');
        }
      } catch (err) {
        retries--;
        if (retries === 0) {
          setPrepError("No pudimos generar tu lista de preparación en este momento. Por favor, intenta de nuevo.");
        } else {
          await sleep(delay);
          delay *= 2;
        }
      }
    }
    setIsPrepLoading(false);
  };

  const explainMedicalTerm = async () => {
    if (!medicalTerm.trim()) return;
    setIsTermLoading(true);
    setTermError('');
    setTermExplanation(null);

    const apiKey = ""; // API Key proveída por el entorno
    const promptText = `Actúa como un educador en salud sumamente empático de la Clínica San Juan de Dios Arequipa. Un paciente está ansioso porque no entiende el siguiente término médico de sus recetas o exámenes: "${medicalTerm}". Explica qué significa este término en un lenguaje muy sencillo, cotidiano y tranquilizador (máximo 3 líneas). NUNCA des diagnósticos médicos. Añade una nota final recomendando consultar los resultados con su médico tratante.`;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let retries = 5;
    let delay = 1000;
    let success = false;

    while (retries > 0 && !success) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  categoria: { type: "STRING", description: "Ej: Examen, Condición, Anatomía, Tratamiento" },
                  explicacion: { type: "STRING" }
                },
                required: ["categoria", "explicacion"]
              }
            }
          })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonText) {
          setTermExplanation(JSON.parse(jsonText));
          success = true;
        } else {
           throw new Error('Invalid response from API');
        }
      } catch (err) {
        retries--;
        if (retries === 0) {
          setTermError("Ocurrió un error al intentar explicar el término. Por favor, intenta nuevamente.");
        } else {
          await sleep(delay);
          delay *= 2;
        }
      }
    }
    setIsTermLoading(false);
  };

  const generatePreventivePlan = async () => {
    if (!prevAge || !prevGender) return;
    setIsPrevLoading(true);
    setPrevError('');
    setPrevResult(null);

    const apiKey = ""; // API Key proveída por el entorno
    const promptText = `Actúa como un médico preventivo muy empático de la Clínica San Juan de Dios Arequipa. Un paciente tiene ${prevAge} años, género ${prevGender}, y los siguientes antecedentes familiares o hábitos: "${prevHistory || 'Ninguno en particular'}". Sugiere estrictamente 3 exámenes médicos de rutina o chequeos preventivos que debería considerar este año. Para cada uno, da el nombre del examen y una breve justificación (1 línea) de por qué es importante a su edad. Incluye un mensaje motivador final. Aclara sutilmente que es una guía preventiva general.`;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let retries = 5;
    let delay = 1000;
    let success = false;

    while (retries > 0 && !success) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  examenes: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        nombre: { type: "STRING" },
                        razon: { type: "STRING" }
                      }
                    }
                  },
                  mensaje: { type: "STRING" }
                },
                required: ["examenes", "mensaje"]
              }
            }
          })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonText) {
          setPrevResult(JSON.parse(jsonText));
          success = true;
        } else {
           throw new Error('Invalid response from API');
        }
      } catch (err) {
        retries--;
        if (retries === 0) {
          setPrevError("No pudimos generar tu plan preventivo. Por favor, intenta de nuevo.");
        } else {
          await sleep(delay);
          delay *= 2;
        }
      }
    }
    setIsPrevLoading(false);
  };

  const generateNutriGuide = async () => {
    if (!nutriCondition.trim()) return;
    setIsNutriLoading(true);
    setNutriError('');
    setNutriResult(null);

    const apiKey = ""; // API Key proveída por el entorno
    const promptText = `Actúa como un nutricionista clínico empático de la Clínica San Juan de Dios Arequipa. Un paciente busca recomendaciones alimentarias generales para la siguiente condición, síntoma o situación de salud: "${nutriCondition}". Proporciona una guía nutricional básica en español. Devuelve SOLO un objeto JSON con: "recomendados" (lista de 3 alimentos o grupos de alimentos recomendados), "evitar" (lista de 3 alimentos o grupos a evitar), "consejo" (un consejo de estilo de vida en 2 líneas), y "disclaimer" (recordatorio breve y amable de agendar cita médica).`;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let retries = 5;
    let delay = 1000;
    let success = false;

    while (retries > 0 && !success) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  recomendados: { type: "ARRAY", items: { type: "STRING" } },
                  evitar: { type: "ARRAY", items: { type: "STRING" } },
                  consejo: { type: "STRING" },
                  disclaimer: { type: "STRING" }
                },
                required: ["recomendados", "evitar", "consejo", "disclaimer"]
              }
            }
          })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonText) {
          setNutriResult(JSON.parse(jsonText));
          success = true;
        } else {
           throw new Error('Invalid response from API');
        }
      } catch (err) {
        retries--;
        if (retries === 0) {
          setNutriError("No pudimos generar la guía nutricional en este momento. Intenta de nuevo.");
        } else {
          await sleep(delay);
          delay *= 2;
        }
      }
    }
    setIsNutriLoading(false);
  };

  const generateMaternityGuide = async () => {
    if (!pregWeeks) return;
    setIsPregLoading(true);
    setPregError('');
    setPregResult(null);

    const apiKey = ""; // API Key proveída por el entorno
    const promptText = `Actúa como un obstetra y acompañante maternal muy empático de la Clínica San Juan de Dios Arequipa. Una futura mamá tiene ${pregWeeks} semanas de embarazo y menciona que se siente: "${pregFeeling || 'emocionada pero con dudas'}". Genera una guía rápida y cálida. Devuelve SOLO un objeto JSON con: "tamano_bebe" (ej: 'El bebé tiene el tamaño de un limón'), "desarrollo" (1 línea sobre qué se está desarrollando en el bebé esta semana), "consejo" (consejo empático y práctico para la madre basado en cómo se siente), y "pregunta_medico" (una pregunta inteligente para hacerle a su obstetra en su próximo control).`;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let retries = 5;
    let delay = 1000;
    let success = false;

    while (retries > 0 && !success) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  tamano_bebe: { type: "STRING" },
                  desarrollo: { type: "STRING" },
                  consejo: { type: "STRING" },
                  pregunta_medico: { type: "STRING" }
                },
                required: ["tamano_bebe", "desarrollo", "consejo", "pregunta_medico"]
              }
            }
          })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonText) {
          setPregResult(JSON.parse(jsonText));
          success = true;
        } else {
           throw new Error('Invalid response from API');
        }
      } catch (err) {
        retries--;
        if (retries === 0) {
          setPregError("No pudimos conectar con tu acompañante maternal. Por favor, intenta de nuevo.");
        } else {
          await sleep(delay);
          delay *= 2;
        }
      }
    }
    setIsPregLoading(false);
  };

  const generatePediatricGuide = async () => {
    if (!pedAge || !pedMilestone.trim()) return;
    setIsPedLoading(true);
    setPedError('');
    setPedResult(null);

    const apiKey = ""; // API Key proveída por el entorno
    const promptText = `Actúa como un pediatra empático de la Clínica San Juan de Dios Arequipa. Un padre/madre tiene un hijo de "${pedAge}" de edad y comenta lo siguiente sobre su desarrollo o comportamiento: "${pedMilestone}". Genera una guía rápida y tranquilizadora. Devuelve SOLO un objeto JSON con: "desarrollo" (explicación breve de lo que es normal a esta edad respecto a lo que comenta), "actividad" (un juego, tip o consejo práctico para estimularlo o ayudarlo en casa), y "consejo_medico" (recomendación amable de agendar su control de 'Niño Sano' o cita pediátrica).`;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let retries = 5;
    let delay = 1000;
    let success = false;

    while (retries > 0 && !success) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  desarrollo: { type: "STRING" },
                  actividad: { type: "STRING" },
                  consejo_medico: { type: "STRING" }
                },
                required: ["desarrollo", "actividad", "consejo_medico"]
              }
            }
          })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonText) {
          setPedResult(JSON.parse(jsonText));
          success = true;
        } else {
           throw new Error('Invalid response from API');
        }
      } catch (err) {
        retries--;
        if (retries === 0) {
          setPedError("No pudimos conectar con el asistente pediátrico. Por favor, intenta de nuevo.");
        } else {
          await sleep(delay);
          delay *= 2;
        }
      }
    }
    setIsPedLoading(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pb-16 md:pb-0">

      {/* 1. EMERGENCY QUICK-ACTION STRIP */}
      <div className="bg-red-700 text-white px-4 py-2 text-sm font-medium z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="animate-pulse" />
            <span><strong>Emergencias 24/7</strong> - Atención inmediata médica y pediátrica</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={phoneLink} className="flex items-center gap-1 hover:text-red-200 transition">
              <Phone size={14} /> 054 382400
            </a>
            <span className="hidden sm:inline">|</span>
            <a href={mapLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-red-200 transition">
              <MapPin size={14} /> Cayma, Arequipa
            </a>
          </div>
        </div>
      </div>

      {/* 2. STICKY HEADER */}
      <header className={`sticky top-0 w-full bg-white z-40 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <HeartPulse className="text-teal-600" size={32} />
              <div>
                <h1 className="font-bold text-xl text-teal-800 leading-tight">Clínica San Juan de Dios</h1>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Arequipa</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
              <a href="#especialidades" className="hover:text-teal-600 transition">Especialidades</a>
              <a href="#staff" className="hover:text-teal-600 transition">Staff Médico</a>
              <a href="#servicios" className="hover:text-teal-600 transition">Servicios</a>
              <a href="#pacientes" className="hover:text-teal-600 transition">Seguros</a>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a href={phoneLink} className="px-4 py-2 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition flex items-center gap-2">
                <Phone size={18} />
                Llamar Urgencia
              </a>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition shadow-sm hover:shadow-md flex items-center gap-2">
                <Calendar size={18} />
                Agendar Cita
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <a href={phoneLink} className="flex w-full items-center justify-center gap-2 bg-red-50 text-red-700 py-3 rounded-lg font-bold">
                <Phone size={20} /> Llamar a Emergencia (054 382400)
              </a>
              <nav className="flex flex-col space-y-3 font-medium text-lg text-gray-700 pt-2">
                <a href="#especialidades" className="py-2 border-b border-gray-50">Especialidades</a>
                <a href="#staff" className="py-2 border-b border-gray-50">Staff Médico</a>
                <a href="#servicios" className="py-2 border-b border-gray-50">Servicios e Infraestructura</a>
                <a href="#pacientes" className="py-2">Convenios y Seguros</a>
              </nav>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* 3. HERO SECTION */}
        <section className="relative bg-slate-50 overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-teal-50 rounded-l-full opacity-50 -z-0 hidden lg:block translate-x-1/3"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Copy */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-semibold mb-6">
                  <Award size={16} />
                  <span>70 años de excelencia médica en Arequipa</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Cuidando lo más valioso: <span className="text-teal-600">la salud de tu familia</span>.
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Accede a más de 200 especialistas de primer nivel, tecnología avanzada y atención de emergencias las 24 horas en el corazón de Cayma, con el trato humano que mereces.
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex justify-center items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <MessageCircle size={20} />
                    Agendar por WhatsApp
                  </a>
                  <a href="#staff" className="flex justify-center items-center gap-2 bg-white text-teal-700 border-2 border-teal-100 px-8 py-4 rounded-xl font-bold text-lg hover:border-teal-600 hover:bg-teal-50 transition">
                    <Search size={20} />
                    Buscar Especialista
                  </a>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Clock size={16} className="text-teal-500"/> Respuesta por WhatsApp en menos de 10 min.
                </p>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Médico sonriendo con paciente"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                </div>
                {/* Floating Trust Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Certificación</p>
                    <p className="font-bold text-gray-900">Atención Segura</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRUST PROOF (Barra de Autoridad) */}
        <section className="bg-white border-y border-gray-100 relative z-20 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-lg md:shadow-none md:rounded-none md:mt-0 md:mx-0 md:max-w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center divide-x-0 md:divide-x divide-gray-100">
              <div className="p-2">
                <div className="text-4xl font-bold text-teal-600 mb-2">+70</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Años de Trayectoria</div>
              </div>
              <div className="p-2">
                <div className="text-4xl font-bold text-teal-600 mb-2">+40</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Especialidades Médicas</div>
              </div>
              <div className="p-2">
                <div className="text-4xl font-bold text-teal-600 mb-2">+200</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Especialistas Expertos</div>
              </div>
              <div className="p-2">
                <div className="flex justify-center mb-2"><HeartPulse size={40} className="text-teal-600" /></div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Atención Humanizada</div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FIND A DOCTOR MODULE */}
        <section id="staff" className="py-16 md:py-24 bg-teal-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Encuentra al experto que necesitas</h3>
            <p className="text-teal-100 mb-8 text-lg">Nuestro staff subespecializado está listo para atenderte</p>

            <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none appearance-none font-medium text-gray-700">
                  <option value="">Selecciona Especialidad</option>
                  <option value="cardiologia">Cardiología</option>
                  <option value="pediatria">Pediatría</option>
                  <option value="gastroenterologia">Gastroenterología</option>
                  <option value="traumatologia">Traumatología</option>
                </select>
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Nombre del médico (Opcional)"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none font-medium"
                />
              </div>
              <button className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-800 transition">
                Buscar
              </button>
            </div>
          </div>
        </section>

        {/* 5.5 AI SYMPTOM CHECKER (Gemini API) */}
        <section className="py-12 bg-gradient-to-b from-teal-700 to-teal-800 border-t border-teal-600/50 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 opacity-10">
            <Bot size={200} />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Sparkles className="text-yellow-300" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Orientador Médico Inteligente</h3>
                  <p className="text-teal-100 text-sm">¿No sabes a qué especialista acudir? Describe tus malestares y nuestra IA te guiará.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Ej: Tengo un dolor fuerte en el pecho y me cuesta respirar cuando subo escaleras..."
                  className="flex-1 p-4 bg-white/90 focus:bg-white border-0 rounded-2xl focus:ring-4 focus:ring-teal-400 focus:outline-none resize-none text-gray-800 placeholder-gray-500 font-medium h-24"
                ></textarea>
                <button
                  onClick={analyzeSymptoms}
                  disabled={isLoading || !symptoms.trim()}
                  className="bg-yellow-400 text-teal-900 px-6 py-4 rounded-2xl font-bold hover:bg-yellow-300 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:w-auto"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-4 border-teal-900 border-t-transparent rounded-full animate-spin"></div>
                      Analizando...
                    </span>
                  ) : (
                    <>
                      ✨ Analizar
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-xl text-sm mb-4">
                  {error}
                </div>
              )}

              {aiRecommendation && (
                <div className="bg-white rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold tracking-wider text-teal-600 uppercase mb-1">Especialidad Sugerida:</p>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{aiRecommendation.especialidad}</h4>
                      <p className="text-gray-600 font-medium">{aiRecommendation.explicacion}</p>
                    </div>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 transition shadow flex items-center gap-2"
                    >
                      <Calendar size={18} />
                      Agendar Cita
                    </a>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 border-t border-gray-100 pt-4">
                    *Nota: Esta es una sugerencia guiada por Inteligencia Artificial y no constituye un diagnóstico médico. En caso de una emergencia real, por favor acude inmediatamente a nuestras instalaciones.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 6. SERVICIOS DESTACADOS */}
        <section id="especialidades" className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Especialidades y Servicios Complejos</h2>
              <p className="text-lg text-gray-600">Resolución médica integral con tecnología de punta y el mejor equipo profesional de la región sur.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100 cursor-pointer">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Baby size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Maternidad y Pediatría</h3>
                <p className="text-gray-600 mb-4 text-sm">Centro obstétrico moderno, UCIN y control integral del niño sano.</p>
                <div className="text-teal-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Conocer más <ArrowRight size={16} />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100 cursor-pointer">
                <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <HeartPulse size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cirugía y Hemodinamia</h3>
                <p className="text-gray-600 mb-4 text-sm">Centro Quirúrgico equipado para casos de alta complejidad y cardiología intervencionista.</p>
                <div className="text-teal-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Conocer más <ArrowRight size={16} />
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100 cursor-pointer">
                <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Activity size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Emergencia 24/7 y UCI</h3>
                <p className="text-gray-600 mb-4 text-sm">Shock Trauma y Unidad de Cuidados Intensivos adultos y pediátricos permanente.</p>
                <div className="text-teal-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Conocer más <ArrowRight size={16} />
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100 cursor-pointer">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Stethoscope size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ayuda al Diagnóstico</h3>
                <p className="text-gray-600 mb-4 text-sm">Medicina Nuclear, Endoscopia avanzada y laboratorio clínico especializado.</p>
                <div className="text-teal-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Conocer más <ArrowRight size={16} />
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button className="px-6 py-3 border-2 border-teal-600 text-teal-600 font-bold rounded-xl hover:bg-teal-50 transition">
                Ver las +40 Especialidades
              </button>
            </div>
          </div>
        </section>

        {/* 7. WHY CHOOSE US (Propuesta de Valor) */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Instalaciones modernas clínica"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -right-8 -bottom-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                  <div className="flex text-yellow-400 mb-2">
                    {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                  </div>
                  <p className="text-sm font-medium text-gray-700 italic">"La atención en emergencias fue rápida y los doctores mostraron mucha empatía."</p>
                  <p className="text-xs text-gray-500 mt-2 font-bold">— Paciente, Google Reviews</p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Medicina de vanguardia con trato genuinamente humano</h2>
                <p className="text-lg text-gray-600 mb-8">
                  El único modelo de salud en la región Arequipa que integra infraestructura médica de alta complejidad con un profundo acompañamiento humano y espiritual para ti y tu familia.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3">
                    <div className="mt-1 bg-teal-100 text-teal-600 p-1 rounded-full w-6 h-6 flex items-center justify-center shrink-0">✓</div>
                    <p className="text-gray-700"><strong>Infraestructura de punta:</strong> Quirófanos modernos, UCI y equipos de diagnóstico avanzado.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 bg-teal-100 text-teal-600 p-1 rounded-full w-6 h-6 flex items-center justify-center shrink-0">✓</div>
                    <p className="text-gray-700"><strong>Staff Subespecializado:</strong> Profesionales con formación internacional para resolver casos clínicos complejos.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 bg-teal-100 text-teal-600 p-1 rounded-full w-6 h-6 flex items-center justify-center shrink-0">✓</div>
                    <p className="text-gray-700"><strong>Acompañamiento Integral:</strong> Cuidado que atiende no solo lo físico, sino también lo emocional y espiritual de cada paciente.</p>
                  </li>
                </ul>
                <button className="text-teal-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Conoce nuestra historia <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 7.5 AI APPOINTMENT PREP (Gemini API) */}
        <section className="py-16 md:py-24 bg-slate-50 border-t border-gray-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-teal-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <ClipboardList size={150} />
              </div>

              <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center bg-teal-100 text-teal-700 p-3 rounded-full mb-4">
                    <Sparkles size={28} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ Preparador Inteligente de Consultas</h2>
                  <p className="text-lg text-gray-600">
                    Aprovecha al máximo tu tiempo con el médico. Cuéntanos tu motivo de visita y nuestra IA te generará una lista personalizada de qué llevar y qué preguntar.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Especialidad de tu cita</label>
                      <select
                        value={prepSpecialty}
                        onChange={(e) => setPrepSpecialty(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none bg-white text-gray-700"
                      >
                        <option value="">Selecciona la especialidad...</option>
                        <option value="Medicina General">Medicina General</option>
                        <option value="Cardiología">Cardiología</option>
                        <option value="Gastroenterología">Gastroenterología</option>
                        <option value="Pediatría">Pediatría</option>
                        <option value="Traumatología">Traumatología</option>
                        <option value="Ginecología">Ginecología</option>
                        <option value="Neurología">Neurología</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Motivo principal</label>
                      <input
                        type="text"
                        value={prepReason}
                        onChange={(e) => setPrepReason(e.target.value)}
                        placeholder="Ej. Chequeo anual, dolor de espalda..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none bg-white text-gray-700"
                      />
                    </div>
                  </div>
                  <button
                    onClick={generatePrepList}
                    disabled={isPrepLoading || !prepReason.trim() || !prepSpecialty}
                    className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {isPrepLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        Preparando recomendaciones...
                      </span>
                    ) : (
                      <>✨ Generar mi lista de preparación</>
                    )}
                  </button>
                  {prepError && (
                    <p className="text-red-500 mt-4 text-sm text-center font-medium">{prepError}</p>
                  )}
                </div>

                {prepResult && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                        <div className="flex items-center gap-2 text-teal-800 mb-4">
                          <ClipboardList size={24} />
                          <h4 className="font-bold text-lg">Qué documentos llevar</h4>
                        </div>
                        <ul className="space-y-3">
                          {prepResult.documentos.map((doc, index) => (
                            <li key={index} className="flex gap-3 text-gray-700">
                              <CheckCircle2 size={20} className="text-teal-500 shrink-0 mt-0.5" />
                              <span className="text-sm font-medium">{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                        <div className="flex items-center gap-2 text-orange-800 mb-4">
                          <HelpCircle size={24} />
                          <h4 className="font-bold text-lg">Preguntas clave para el doctor</h4>
                        </div>
                        <ul className="space-y-3">
                          {prepResult.preguntas.map((pregunta, index) => (
                            <li key={index} className="flex gap-3 text-gray-700">
                              <span className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{index + 1}</span>
                              <span className="text-sm font-medium">{pregunta}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-medium flex items-start gap-3 border border-blue-100">
                      <Bot size={20} className="shrink-0 mt-0.5" />
                      <p>{prepResult.consejo}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 7.75 AI MEDICAL DICTIONARY (Gemini API) */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-teal-600 font-bold mb-2">
                  <BookOpen size={20} />
                  <span>Atención Humanizada</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ Traductor Médico Simplificado</h2>
                <p className="text-gray-600 mb-6">
                  ¿Recibiste una orden médica o resultados de laboratorio con palabras difíciles de entender? Escribe el término técnico y nuestra IA te lo explicará en lenguaje claro y sencillo para tu tranquilidad.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={medicalTerm}
                      onChange={(e) => setMedicalTerm(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && explainMedicalTerm()}
                      placeholder="Ej: Ecografía Doppler, Leucocitos, Hemodinamia..."
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none font-medium text-gray-700"
                    />
                  </div>
                  <button
                    onClick={explainMedicalTerm}
                    disabled={isTermLoading || !medicalTerm.trim()}
                    className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    {isTermLoading ? (
                      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>✨ Traducir</>
                    )}
                  </button>
                </div>

                {termError && (
                  <p className="text-red-500 mt-3 text-sm font-medium">{termError}</p>
                )}

                {termExplanation && (
                  <div className="mt-6 bg-teal-50 rounded-2xl p-6 border border-teal-100 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-teal-200 text-teal-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {termExplanation.categoria}
                      </span>
                    </div>
                    <p className="text-gray-800 text-lg leading-relaxed mb-4">
                      {termExplanation.explicacion}
                    </p>
                    <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-teal-100 text-sm text-gray-600">
                      <Info size={18} className="text-teal-500 shrink-0 mt-0.5" />
                      <p>Recuerda: Esta información es referencial para ayudarte a entender mejor. Siempre debes interpretar tus resultados finales junto a tu especialista de la Clínica San Juan de Dios.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden md:flex flex-1 justify-center relative">
                <div className="absolute inset-0 bg-teal-100 rounded-full blur-3xl opacity-50"></div>
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Doctora explicando resultados"
                  className="rounded-2xl shadow-xl relative z-10 border-4 border-white transform rotate-3 hover:rotate-0 transition duration-500 w-4/5"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 7.85 AI PREVENTIVE HEALTH PLANNER (Gemini API) */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-white to-teal-50 border-t border-gray-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center">

              <div className="flex-1 w-full max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-semibold mb-6">
                  <ShieldPlus size={16} />
                  <span>Medicina Preventiva</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">✨ Planificador de Salud Preventiva</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  El mejor tratamiento es la prevención. Ingresa tu perfil básico y nuestra IA te sugerirá los exámenes de rutina que deberías realizarte este año para proteger tu bienestar a largo plazo.
                </p>

                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-50">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Edad</label>
                      <input
                        type="number"
                        min="18" max="100"
                        value={prevAge}
                        onChange={(e) => setPrevAge(e.target.value)}
                        placeholder="Ej: 45"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Género</label>
                      <select
                        value={prevGender}
                        onChange={(e) => setPrevGender(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 text-gray-700"
                      >
                        <option value="Femenino">Femenino</option>
                        <option value="Masculino">Masculino</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Antecedentes o Hábitos (Opcional)</label>
                    <input
                      type="text"
                      value={prevHistory}
                      onChange={(e) => setPrevHistory(e.target.value)}
                      placeholder="Ej: Fumo ocasionalmente, mi padre tuvo diabetes..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50"
                    />
                  </div>

                  <button
                    onClick={generatePreventivePlan}
                    disabled={isPrevLoading || !prevAge}
                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {isPrevLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        Diseñando plan preventivo...
                      </span>
                    ) : (
                      <>✨ Generar Mi Plan de Chequeos</>
                    )}
                  </button>
                  {prevError && (
                    <p className="text-red-500 mt-4 text-sm text-center font-medium">{prevError}</p>
                  )}
                </div>
              </div>

              <div className="flex-1 w-full max-w-2xl">
                {!prevResult && !isPrevLoading && (
                  <div className="h-full min-h-[300px] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-white/50">
                    <ShieldCheck size={64} className="text-indigo-200 mb-4" />
                    <h4 className="text-xl font-bold text-gray-400">Tu plan aparecerá aquí</h4>
                    <p className="text-gray-400 mt-2">Completa tus datos para descubrir qué chequeos priorizar este año.</p>
                  </div>
                )}

                {isPrevLoading && (
                  <div className="h-full min-h-[300px] rounded-3xl flex flex-col items-center justify-center bg-white shadow-xl border border-indigo-50 p-8">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-indigo-800 font-medium animate-pulse">Analizando factores de riesgo...</p>
                  </div>
                )}

                {prevResult && !isPrevLoading && (
                  <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-6 md:p-8 animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Activity className="text-indigo-600" /> Exámenes Sugeridos
                    </h3>

                    <div className="space-y-4 mb-8">
                      {prevResult.examenes.map((examen, index) => (
                        <div key={index} className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/50 flex gap-4">
                          <div className="bg-indigo-100 text-indigo-700 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">{examen.nombre}</h4>
                            <p className="text-gray-600 text-sm mt-1">{examen.razon}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-teal-50 border border-teal-100 p-4 rounded-2xl mb-6">
                      <p className="text-teal-800 font-medium text-sm flex gap-3 items-start">
                        <Bot className="shrink-0 mt-0.5 text-teal-600" size={20}/>
                        {prevResult.mensaje}
                      </p>
                    </div>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition shadow flex justify-center items-center gap-2"
                    >
                      <Calendar size={20} />
                      Cotizar Exámenes por WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 7.9 AI NUTRITION & RECOVERY GUIDE (Gemini API) */}
        <section className="py-16 md:py-24 bg-white border-t border-gray-100 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center bg-emerald-100 text-emerald-700 p-3 rounded-full mb-4">
                <Apple size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ Guía Inteligente de Nutrición y Recuperación</h2>
              <p className="text-lg text-gray-600">
                La alimentación es clave para tu salud. Ingresa una condición médica, síntoma o si estás en recuperación, y nuestra IA te dará pautas nutricionales generales al instante.
              </p>
            </div>

            <div className="bg-emerald-50/50 rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={nutriCondition}
                  onChange={(e) => setNutriCondition(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && generateNutriGuide()}
                  placeholder="Ej: Gastritis, Hipertensión, Post-operatorio de vesícula..."
                  className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-gray-800 font-medium"
                />
                <button
                  onClick={generateNutriGuide}
                  disabled={isNutriLoading || !nutriCondition.trim()}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:w-auto"
                >
                  {isNutriLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Consultando...
                    </span>
                  ) : (
                    <>✨ Obtener Guía</>
                  )}
                </button>
              </div>
              {nutriError && (
                <p className="text-red-500 mt-4 text-sm text-center font-medium">{nutriError}</p>
              )}
            </div>

            {nutriResult && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Apple size={100} />
                    </div>
                    <h4 className="font-bold text-emerald-800 text-lg mb-4 flex items-center gap-2">
                      <CheckCircle2 className="text-emerald-500" /> Alimentos Recomendados
                    </h4>
                    <ul className="space-y-3 relative z-10">
                      {nutriResult.recomendados.map((item, i) => (
                        <li key={i} className="flex gap-2 text-gray-700 font-medium text-sm">
                          <span className="text-emerald-500 font-bold">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-rose-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Utensils size={100} />
                    </div>
                    <h4 className="font-bold text-rose-800 text-lg mb-4 flex items-center gap-2">
                      <AlertTriangle className="text-rose-500" size={20} /> Moderar o Evitar
                    </h4>
                    <ul className="space-y-3 relative z-10">
                      {nutriResult.evitar.map((item, i) => (
                        <li key={i} className="flex gap-2 text-gray-700 font-medium text-sm">
                          <span className="text-rose-500 font-bold">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-4 flex gap-4 items-start">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full shrink-0">
                    <HeartPulse size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-indigo-900 mb-1">Consejo de Estilo de Vida</h5>
                    <p className="text-indigo-800 text-sm">{nutriResult.consejo}</p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-start gap-3">
                  <Info size={18} className="text-gray-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {nutriResult.disclaimer} Para recibir un plan nutricional 100% adaptado a tus necesidades fisiológicas, te recomendamos agendar una cita con nuestra especialidad de Nutrición.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 7.95 AI MATERNITY COMPANION (Gemini API) */}
        <section className="py-16 md:py-24 bg-rose-50 border-t border-rose-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-1/2 -right-24 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center bg-rose-100 text-rose-600 p-4 rounded-full mb-4 shadow-inner">
                  <Baby size={36} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">✨ Tu Acompañante de Maternidad</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Vive tu embarazo con tranquilidad. Dinos en qué semana estás y cómo te sientes, y recibe información instantánea sobre tu bebé y consejos para tu próxima cita en nuestro Centro Obstétrico.
                </p>
              </div>

              <div className="grid md:grid-cols-5 gap-6 mb-8">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Semana de embarazo</label>
                  <input
                    type="number"
                    min="1" max="42"
                    value={pregWeeks}
                    onChange={(e) => setPregWeeks(e.target.value)}
                    placeholder="Ej: 12"
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-rose-100 focus:border-rose-400 outline-none bg-white text-gray-800 text-lg font-medium text-center md:text-left"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-bold text-gray-700 mb-2">¿Cómo te sientes hoy? (Opcional)</label>
                  <input
                    type="text"
                    value={pregFeeling}
                    onChange={(e) => setPregFeeling(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && generateMaternityGuide()}
                    placeholder="Ej: Tengo muchas náuseas en la mañana..."
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-rose-100 focus:border-rose-400 outline-none bg-white text-gray-800 font-medium"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={generateMaternityGuide}
                  disabled={isPregLoading || !pregWeeks}
                  className="bg-rose-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-rose-600 transition shadow-lg hover:shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {isPregLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Conectando con tu bebé...
                    </span>
                  ) : (
                    <>✨ Descubrir esta semana</>
                  )}
                </button>
                {pregError && (
                  <p className="text-red-500 mt-4 text-sm font-medium">{pregError}</p>
                )}
              </div>

              {pregResult && (
                <div className="mt-10 pt-10 border-t border-rose-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Baby Info Card */}
                    <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 mix-blend-overlay">
                        <Baby size={120} />
                      </div>
                      <div className="relative z-10">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                          Semana {pregWeeks}
                        </span>
                        <h4 className="text-2xl font-bold mt-4 mb-2">Tu bebé es {pregResult.tamano_bebe}</h4>
                        <p className="text-rose-50 leading-relaxed font-medium">
                          {pregResult.desarrollo}
                        </p>
                      </div>
                    </div>

                    {/* Mom Advice Card */}
                    <div className="flex flex-col gap-4">
                      <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-sm flex items-start gap-4">
                        <div className="bg-rose-100 text-rose-600 p-3 rounded-full shrink-0">
                          <HeartPulse size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900 mb-1">Consejo para ti</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">{pregResult.consejo}</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-sm flex items-start gap-4">
                        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full shrink-0">
                          <HelpCircle size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900 mb-1">Pregúntale a tu obstetra</h5>
                          <p className="text-gray-600 text-sm leading-relaxed italic">"{pregResult.pregunta_medico}"</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white border-2 border-rose-500 text-rose-600 px-6 py-3 rounded-xl font-bold hover:bg-rose-50 transition shadow flex items-center gap-2"
                    >
                      <Calendar size={18} />
                      Agendar mi Control Prenatal
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 7.98 AI PEDIATRIC ASSISTANT (Gemini API) */}
        <section className="py-16 md:py-24 bg-sky-50 border-t border-sky-100 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">

              <div className="flex-1 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-semibold mb-6">
                  <Star size={16} />
                  <span>Control de Niño Sano</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-sky-950 mb-4">✨ Asistente de Desarrollo Pediátrico</h2>
                <p className="text-lg text-sky-800/80 mb-8 leading-relaxed">
                  ¿Tienes dudas sobre el desarrollo de tu pequeño? Ingresa su edad y cuéntanos qué está aprendiendo o qué comportamiento nuevo tiene. Nuestra IA te orientará basándose en hitos pediátricos.
                </p>

                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-sky-100">
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Edad de tu hijo/a</label>
                    <input
                      type="text"
                      value={pedAge}
                      onChange={(e) => setPedAge(e.target.value)}
                      placeholder="Ej: 8 meses, 2 años..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-400 outline-none bg-gray-50 text-gray-700 font-medium"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">¿Qué has notado o qué te preocupa?</label>
                    <textarea
                      value={pedMilestone}
                      onChange={(e) => setPedMilestone(e.target.value)}
                      placeholder="Ej: Empezó a caminar pero se cae mucho, o, hace muchos berrinches a la hora de comer..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-400 outline-none bg-gray-50 text-gray-700 font-medium h-24 resize-none"
                    ></textarea>
                  </div>

                  <button
                    onClick={generatePediatricGuide}
                    disabled={isPedLoading || !pedAge || !pedMilestone.trim()}
                    className="w-full bg-sky-600 text-white font-bold py-4 rounded-xl hover:bg-sky-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-md"
                  >
                    {isPedLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analizando desarrollo...
                      </span>
                    ) : (
                      <>✨ Consultar Desarrollo</>
                    )}
                  </button>
                  {pedError && (
                    <p className="text-red-500 mt-4 text-sm text-center font-medium">{pedError}</p>
                  )}
                </div>
              </div>

              <div className="flex-1 w-full">
                {!pedResult && !isPedLoading && (
                  <div className="h-full min-h-[300px] border-2 border-dashed border-sky-200 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-white/40">
                    <Smile size={64} className="text-sky-200 mb-4" />
                    <h4 className="text-xl font-bold text-sky-400">Su guía aparecerá aquí</h4>
                    <p className="text-sky-500/70 mt-2">Estamos listos para acompañarte en el crecimiento de tu pequeño.</p>
                  </div>
                )}

                {isPedLoading && (
                  <div className="h-full min-h-[300px] rounded-3xl flex flex-col items-center justify-center bg-white shadow-xl border border-sky-50 p-8">
                    <div className="w-16 h-16 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-sky-800 font-medium animate-pulse">Revisando hitos pediátricos...</p>
                  </div>
                )}

                {pedResult && !isPedLoading && (
                  <div className="bg-white rounded-3xl shadow-xl border border-sky-100 p-6 md:p-8 animate-in fade-in slide-in-from-left-8 duration-500">
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-5 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Star size={80} />
                      </div>
                      <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2 relative z-10">
                        <Info size={20} /> Entendiendo su desarrollo
                      </h4>
                      <p className="text-amber-900/80 text-sm leading-relaxed relative z-10">{pedResult.desarrollo}</p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-6">
                      <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                        <Smile size={20} /> Tip o Actividad en casa
                      </h4>
                      <p className="text-emerald-900/80 text-sm leading-relaxed">{pedResult.actividad}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex gap-3 items-start p-4 bg-sky-50 rounded-xl">
                        <Stethoscope className="text-sky-600 shrink-0 mt-1" size={20} />
                        <p className="text-sm font-medium text-sky-900">{pedResult.consejo_medico}</p>
                      </div>

                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-sky-600 text-white font-bold py-4 rounded-xl hover:bg-sky-700 transition shadow flex justify-center items-center gap-2"
                      >
                        <Calendar size={20} />
                        Agendar Control de Niño Sano
                      </a>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section className="bg-teal-50 py-16 md:py-24 border-y border-teal-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">¿Listo para priorizar tu salud?</h2>
            <p className="text-lg text-teal-700 mb-8">Agenda tu consulta hoy mismo. Nuestro equipo te guiará en el proceso rápidamente.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition shadow-lg flex items-center justify-center gap-2">
                <MessageCircle size={20} />
                Agendar por WhatsApp (958 958 124)
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 9. FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <HeartPulse className="text-teal-500" size={28} />
                <h4 className="font-bold text-xl text-white">Clínica SJD</h4>
              </div>
              <p className="text-sm mb-6 text-gray-400">Desde hace 70 años, brindando atención médica integral, segura y compasiva a las familias de Arequipa.</p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-teal-500" />
                <span>Av. Ejército 1020, Cayma, Arequipa</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Servicios Rápidos</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition">Emergencia 24 Horas</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Agendar Cita Médica</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Directorio Médico</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Programa de Maternidad</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Pacientes</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition">Seguros y EPS</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Derechos del Paciente</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Libro de Reclamaciones</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-teal-500" />
                  <span>Central: 054 382400</span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-teal-500" />
                  <span>Citas: 958 958 124</span>
                </li>
              </ul>
              <div className="mt-6 flex gap-4">
                {/* Social Placeholders */}
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition cursor-pointer">f</div>
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition cursor-pointer">in</div>
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition cursor-pointer">ig</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Clínica San Juan de Dios Arequipa. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Términos Legales</a>
              <a href="#" className="hover:text-white">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. STICKY MOBILE NAV (Bottom CTA Strategy) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex gap-2 z-50 pb-safe">
        <a
          href={phoneLink}
          className="flex-1 bg-red-600 text-white flex justify-center items-center gap-2 py-3 rounded-lg font-bold shadow-md active:bg-red-700"
        >
          <Phone size={18} />
          <span className="text-sm">Emergencia</span>
        </a>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-teal-600 text-white flex justify-center items-center gap-2 py-3 rounded-lg font-bold shadow-md active:bg-teal-700"
        >
          <MessageCircle size={18} />
          <span className="text-sm">Citas WhatsApp</span>
        </a>
      </div>

      {/* Estilo para asegurar que en dispositivos iOS con barra inferior haya margen */}
      <style dangerouslySetInnerHTML={{__html: `
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}} />
    </div>
  );
}
