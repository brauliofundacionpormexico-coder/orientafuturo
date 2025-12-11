import React from 'react';
import { Sparkles, TrendingUp, DollarSign } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="mb-8 p-4 bg-white/50 rounded-full animate-bounce">
        <Sparkles className="w-10 h-10 text-indigo-600" />
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 pb-2">
        OrientaFuturo AI
      </h1>
      
      <p className="text-xl text-slate-600 max-w-2xl mb-12">
        Descubre tu camino ideal. Combinamos lo que te <strong>apasiona</strong> con las carreras de <strong>mayores ingresos</strong> del mercado actual utilizando Inteligencia Artificial.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full">
        <FeatureCard 
          icon={<Sparkles className="w-6 h-6 text-purple-500" />}
          title="Análisis de Pasión"
          desc="Entendemos lo que realmente te mueve."
        />
        <FeatureCard 
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
          title="Altos Ingresos"
          desc="Filtramos oportunidades con alto potencial económico."
        />
        <FeatureCard 
          icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
          title="Proyección Futura"
          desc="Carreras con alta demanda en la próxima década."
        />
      </div>

      <button 
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-1 focus:outline-none ring-offset-2 focus:ring-2"
      >
        <span>Comenzar Análisis Gratuito</span>
        <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
      </button>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
    <div className="mb-4 p-3 bg-slate-50 rounded-full">{icon}</div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-slate-500 text-sm">{desc}</p>
  </div>
);