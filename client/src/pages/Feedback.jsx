// src/pages/Feedback.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Star, 
  ArrowLeft, 
  ThumbsUp, 
  Send,
  Sparkles
} from "lucide-react";

const TAGS = [
  "On Time", "Budget Issues", "Quality Concerns", "Eco-Friendly", 
  "Public Nuisance", "Great Progress", "Transparency"
];

export default function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get project name passed from previous page, or default
  const projectName = location.state?.projectName || "General Feedback";

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      navigate('/projects');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 flex items-center justify-center p-6 mt-20">
      
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        
        {/* Success Overlay */}
        {submitted ? (
          <div className="absolute inset-0 z-20 bg-[#020617] flex flex-col items-center justify-center text-center p-8">
             <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <ThumbsUp className="w-8 h-8 text-white" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">Feedback Received!</h2>
             <p className="text-slate-400">Thank you for contributing to public transparency.</p>
             <p className="text-xs text-slate-600 mt-8">Redirecting to projects...</p>
          </div>
        ) : null}

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/5 text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center mb-8 mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4">
            <MessageSquare className="w-3 h-3" /> CITIZEN FEEDBACK LOOP
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {projectName}
          </h1>
          <p className="text-slate-500 text-sm">Rate your satisfaction with this project.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Star Rating */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star 
                    className={`w-10 h-10 ${
                      star <= (hoverRating || rating) 
                        ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" 
                        : "fill-transparent text-slate-700"
                    } transition-colors duration-200`} 
                  />
                </button>
              ))}
            </div>
            <p className="text-sm font-medium text-slate-400 h-5">
              {['', 'Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'][hoverRating || rating]}
            </p>
          </div>

          {/* 2. Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">What stands out?</label>
            <div className="flex flex-wrap justify-center gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-white text-slate-900 border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                      : "bg-transparent text-slate-500 border-slate-800 hover:border-slate-600 hover:text-slate-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Comment */}
          <div className="relative">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all h-32 resize-none text-sm"
              placeholder="Share your detailed thoughts or suggestions..."
            />
            <Sparkles className="absolute bottom-4 right-4 w-4 h-4 text-slate-600 pointer-events-none" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={rating === 0}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Submit Feedback <Send className="w-4 h-4" />
          </button>

        </form>

      </motion.div>
    </div>
  );
}