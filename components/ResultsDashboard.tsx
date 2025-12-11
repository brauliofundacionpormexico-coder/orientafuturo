import React, { useState } from 'react';
import { CareerSuggestion } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { ChevronDown, ChevronUp, DollarSign, BookOpen, TrendingUp, Star } from 'lucide-react';

interface ResultsDashboardProps {
  recommendations: CareerSuggestion[];
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ recommendations, onReset }) => {
  const [expandedId, setExpandedId] = useState<number | null>(0);

  // Prepare chart data
  const chartData = recommendations.map(rec => ({
    name: rec.title.split(' ')[0], // Short name
    score: rec.matchScore,
    fullTitle: rec.title
  }));

  return (
    <div className="max-w-6xl mx-auto w-full px-4 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Tu Futuro Profesional</h2>
          <p className="text-slate-600">Hemos encontrado {recommendations.length} caminos de alto valor para ti.</p>
        </div>
        <button onClick={onReset} className="text-indigo-600 font-medium hover:underline">
          Volver a empezar
        </button>
      </div>

      {/* Match Score Chart */}
      <div className="mb-12 glass-panel p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-700">Índice de Compatibilidad</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
               <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" width={100} tick={{fill: '#475569', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#818cf8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((rec, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 ${
              expandedId === index ? 'ring-2 ring-indigo-500 shadow-xl' : 'hover:shadow-md'
            }`}
          >
            <div 
              className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              onClick={() => setExpandedId(expandedId === index ? null : index)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-slate-800">{rec.title}</h3>
                  {index === 0 && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Top Choice
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-sm line-clamp-1">{rec.description}</p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex flex-col items-end">
                  <span className="text-slate-400 font-medium text-xs uppercase tracking-wider">Salario Est.</span>
                  <span className="font-bold text-emerald-600">{rec.salaryRangeUSD}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-slate-400 font-medium text-xs uppercase tracking-wider">Compatibilidad</span>
                  <div className="flex items-center gap-1 font-bold text-indigo-600">
                    <span className="text-lg">{rec.matchScore}%</span>
                  </div>
                </div>
                {expandedId === index ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === index && (
              <div className="px-6 pb-6 pt-0 animate-fade-in border-t border-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-3">
                      <BookOpen className="w-4 h-4 text-indigo-500" /> Ruta Educativa
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{rec.educationPath}</p>

                    <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-3">
                      <TrendingUp className="w-4 h-4 text-blue-500" /> Por qué te conviene
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{rec.whyItFits}</p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-xl">
                    <h4 className="font-semibold text-slate-800 mb-3">Habilidades Clave</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {rec.requiredSkills.map((skill, i) => (
                        <span key={i} className="bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                      <span className="text-sm font-medium text-slate-600">Demanda Futura</span>
                      <span className={`text-sm font-bold ${
                        rec.growthOutlook.includes('Very High') || rec.growthOutlook.includes('Alta') 
                          ? 'text-green-600' 
                          : 'text-blue-600'
                      }`}>
                        {rec.growthOutlook}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};