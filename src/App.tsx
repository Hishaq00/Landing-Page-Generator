import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Rocket, 
  Target, 
  Zap, 
  Copy, 
  Check, 
  Eye, 
  Code, 
  ArrowRight,
  Loader2,
  Layout
} from 'lucide-react';
import { generateLandingPage, LandingPageData } from './services/geminiService';

export default function App() {
  const [productName, setProductName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [keyFeature, setKeyFeature] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LandingPageData | null>(null);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !targetAudience || !keyFeature) return;

    setLoading(true);
    try {
      const data = await generateLandingPage(productName, targetAudience, keyFeature);
      setResult(data);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate landing page. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 p-4 md:p-8 selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-12 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Copywriting
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight"
          >
            SaaS <span className="gradient-text">Landing Page</span> Generator
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-xl text-lg"
          >
            Turn your product idea into a high-converting landing page in seconds. 
            Elite copy, modern design, ready to export.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 glass rounded-2xl p-6 space-y-6"
          >
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Rocket className="w-4 h-4" /> Product Name
                </label>
                <input 
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. FocusFlow"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Target Audience
                </label>
                <input 
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Remote Software Engineers"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Key Feature
                </label>
                <textarea 
                  value={keyFeature}
                  onChange={(e) => setKeyFeature(e.target.value)}
                  placeholder="e.g. AI-driven deep work scheduling that blocks distractions"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all min-h-[100px] resize-none"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Generate Page
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Results Area */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[600px] glass rounded-2xl flex flex-col items-center justify-center text-center p-8 border-dashed border-2 border-white/5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                    <Layout className="w-8 h-8 text-zinc-500" />
                  </div>
                  <h3 className="text-xl font-medium text-zinc-300 mb-2">Ready to Build</h3>
                  <p className="text-zinc-500 max-w-xs">
                    Fill in your product details to generate a high-converting landing page.
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* Copy Overview */}
                  <div className="glass rounded-2xl p-8 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-400 font-medium uppercase tracking-widest text-xs">
                        <Rocket className="w-3 h-3" /> {result.productName}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                        {result.headline}
                      </h2>
                      <p className="text-xl text-zinc-400 leading-relaxed">
                        {result.subheadline}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {result.features.map((feature, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="text-emerald-400 font-bold font-display text-lg">0{idx + 1}</div>
                          <h4 className="font-bold text-zinc-100">{feature.title}</h4>
                          <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2">
                        {result.cta}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* HTML Export Section */}
                  <div className="glass rounded-2xl overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setViewMode('preview')}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'preview' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'}`}
                        >
                          <Eye className="w-4 h-4" /> Preview
                        </button>
                        <button 
                          onClick={() => setViewMode('code')}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'code' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'}`}
                        >
                          <Code className="w-4 h-4" /> HTML Code
                        </button>
                      </div>
                      <button 
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 transition-all text-white"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy HTML'}
                      </button>
                    </div>

                    <div className="relative min-h-[500px] bg-white">
                      {viewMode === 'preview' ? (
                        <iframe 
                          srcDoc={result.html}
                          title="Landing Page Preview"
                          className="w-full h-[600px] border-none"
                        />
                      ) : (
                        <pre className="p-6 text-xs font-mono text-emerald-400 bg-zinc-950 overflow-auto max-h-[600px] w-full">
                          {result.html}
                        </pre>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
