import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { AssessmentForm } from './components/AssessmentForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { getCareerRecommendations } from './services/geminiService';
import { AppState, UserProfile, CareerSuggestion } from './types';
import { Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<AppState>(AppState.LANDING);
  const [recommendations, setRecommendations] = useState<CareerSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setState(AppState.ASSESSMENT);
    setError(null);
  };

  const handleAssessmentSubmit = async (data: UserProfile) => {
    setState(AppState.ANALYZING);
    try {
      const results = await getCareerRecommendations(data);
      if (results && results.length > 0) {
        setRecommendations(results);
        setState(AppState.RESULTS);
      } else {
        throw new Error("No se pudieron generar recomendaciones. Por favor intenta de nuevo.");
      }
    } catch (err) {
      console.error(err);
      setError("Hubo un error al conectar con la IA. Verifica tu API Key o intenta más tarde.");
      setState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setState(AppState.LANDING);
    setRecommendations([]);
    setError(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-bold text-xl tracking-tight text-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-serif">O</div>
          OrientaFuturo
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {state === AppState.LANDING && (
          <Landing onStart={handleStart} />
        )}

        {state === AppState.ASSESSMENT && (
          <AssessmentForm onSubmit={handleAssessmentSubmit} />
        )}

        {state === AppState.ANALYZING && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Analizando tu perfil...</h2>
            <p className="text-slate-600 max-w-md">
              Nuestra IA está cruzando tus pasiones con bases de datos de mercado laboral global para encontrar oportunidades de alto valor.
            </p>
          </div>
        )}

        {state === AppState.RESULTS && (
          <ResultsDashboard recommendations={recommendations} onReset={handleReset} />
        )}

        {state === AppState.ERROR && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Algo salió mal</h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <button 
              onClick={() => setState(AppState.ASSESSMENT)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        )}
      </main>
    </div>
  );
}