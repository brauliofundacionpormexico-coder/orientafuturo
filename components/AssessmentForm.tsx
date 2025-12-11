import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ArrowRight, Brain, Heart, Briefcase } from 'lucide-react';

interface AssessmentFormProps {
  onSubmit: (data: UserProfile) => void;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserProfile>({
    passions: '',
    skills: '',
    preferredWorkStyle: ''
  });

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onSubmit(formData);
  };

  const isCurrentStepValid = () => {
    if (step === 1) return formData.passions.length > 10;
    if (step === 2) return formData.skills.length > 5;
    if (step === 3) return formData.preferredWorkStyle.length > 3;
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto w-full glass-panel rounded-2xl p-8 shadow-xl mt-10">
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-2 flex-1 rounded-full mx-1 transition-all duration-500 ${i <= step ? 'bg-indigo-600' : 'bg-slate-200'}`} />
        ))}
      </div>

      <div className="min-h-[300px] flex flex-col">
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-rose-500" />
              <h2 className="text-2xl font-bold">¿Qué te apasiona?</h2>
            </div>
            <p className="text-slate-600 mb-6">Describe tus hobbies, temas de interés, o actividades donde pierdes la noción del tiempo. Sé detallado.</p>
            <textarea
              className="w-full h-40 p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 transition-colors resize-none bg-white/50"
              placeholder="Me encanta resolver problemas lógicos, leer sobre tecnología, ayudar a las personas a entender conceptos difíciles, jugar videojuegos de estrategia..."
              value={formData.passions}
              onChange={(e) => handleChange('passions', e.target.value)}
              autoFocus
            />
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl font-bold">Tus Habilidades Actuales</h2>
            </div>
            <p className="text-slate-600 mb-6">¿En qué eres bueno naturalmente? ¿Qué materias se te facilitaban en la escuela? ¿Qué habilidades técnicas o blandas tienes?</p>
            <textarea
              className="w-full h-40 p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 transition-colors resize-none bg-white/50"
              placeholder="Soy bueno con los números, tengo facilidad de palabra, sé un poco de programación, soy muy organizado..."
              value={formData.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
              autoFocus
            />
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-8 h-8 text-emerald-500" />
              <h2 className="text-2xl font-bold">Estilo de Vida Preferido</h2>
            </div>
            <p className="text-slate-600 mb-6">¿Prefieres trabajar remoto, en oficina, o en campo? ¿Te gusta trabajar solo o en equipo? ¿Buscas estabilidad o riesgo?</p>
            <textarea
              className="w-full h-40 p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 transition-colors resize-none bg-white/50"
              placeholder="Prefiero el trabajo remoto, me gusta colaborar pero necesito tiempo para concentrarme solo, busco un equilibrio entre vida personal y trabajo..."
              value={formData.preferredWorkStyle}
              onChange={(e) => handleChange('preferredWorkStyle', e.target.value)}
              autoFocus
            />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          disabled={!isCurrentStepValid()}
          className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
            isCurrentStepValid() 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {step === 3 ? 'Analizar Perfil' : 'Siguiente'}
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};