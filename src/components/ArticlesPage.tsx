import React, { useState } from 'react';
import { ARTICLES_DATA, type ArticleItem } from '../data/articlesData';
import { BookOpen, Clock, Calendar, User, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface ArticlesPageProps {
  isThai: boolean;
  onExploreCar?: (brandId: string) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ isThai, onExploreCar }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [readingArticle, setReadingArticle] = useState<ArticleItem | null>(null);

  const filteredArticles =
    selectedCategory === 'all'
      ? ARTICLES_DATA
      : ARTICLES_DATA.filter((a) => a.brandId === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Header Banner */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-amber-400 mb-4 shadow-sm">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isThai ? 'วารสารประวัติศาสตร์ & วิศวกรรมยานยนต์' : 'ENGINEERING & HISTORICAL JOURNAL'}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
          {isThai ? 'เบื้องหลังนวัตกรรมระดับตำนาน' : 'Milestones of Combustion Mastery'}
        </h1>
        <p className="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
          {isThai
            ? 'เจาะลึกปรัชญาการออกแบบ หลักอากาศพลศาสตร์ และนวัตกรรมเครื่องยนต์ที่พลิกโฉมหน้าประวัติศาสตร์ซูเปอร์คาร์โลก'
            : 'Deep dives into aerodynamic breakthroughs, acoustic physical tuning, and historical engineering rivalries that shaped automotive greatness.'}
        </p>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mt-8 flex-wrap justify-center">
          {[
            { id: 'all', label: isThai ? 'ทั้งหมด' : 'All Articles' },
            { id: 'porsche', label: 'Porsche' },
            { id: 'toyota', label: 'Toyota / Lexus' },
            { id: 'nissan', label: 'Nissan' },
            { id: 'lamborghini', label: 'Lamborghini' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-200 text-slate-900 shadow-md scale-105'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col justify-between glass-panel-hover"
          >
            <div>
              {/* Badge & Meta */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold text-[11px]">
                  {article.badge}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                {isThai ? article.title.th : article.title.en}
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mb-5 leading-relaxed">
                {isThai ? article.subtitle.th : article.subtitle.en}
              </p>

              {/* Summary */}
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 mb-5 text-slate-300 text-xs leading-relaxed">
                {isThai ? article.summary.th : article.summary.en}
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {isThai ? 'ไฮไลต์สำคัญ' : 'KEY HIGHLIGHTS'}
                </div>
                {article.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{isThai ? takeaway.th : takeaway.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400 flex items-center gap-1.5 font-mono">
                <User className="w-3.5 h-3.5" />
                {article.author}
              </span>
              <button
                onClick={() => setReadingArticle(article)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 transition-all"
              >
                <span>{isThai ? 'อ่านฉบับเต็ม' : 'READ FULL STORY'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Reading Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-10 text-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setReadingArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge & Dates */}
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/20 font-bold">
                {readingArticle.badge}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {readingArticle.publishDate}
              </span>
              <span>•</span>
              <span>{readingArticle.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
              {isThai ? readingArticle.title.th : readingArticle.title.en}
            </h1>
            <p className="text-slate-400 text-sm md:text-base mb-8 pb-6 border-b border-slate-800">
              {isThai ? readingArticle.subtitle.th : readingArticle.subtitle.en}
            </p>

            {/* Content Sections */}
            <div className="space-y-8">
              {readingArticle.contentSections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    {isThai ? sec.heading.th : sec.heading.en}
                  </h2>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm md:text-base leading-relaxed text-slate-300">
                      {isThai ? p.th : p.en}
                    </p>
                  ))}

                  {/* Optional Quote */}
                  {sec.quote && (
                    <blockquote className="p-4 md:p-6 rounded-2xl bg-slate-950/70 border-l-4 border-amber-500 my-4 text-slate-200">
                      <p className="italic text-sm md:text-base mb-2 font-serif">
                        "{isThai ? sec.quote.text.th : sec.quote.text.en}"
                      </p>
                      <cite className="text-xs font-mono text-slate-400 block not-italic font-bold">
                        — {sec.quote.author}
                      </cite>
                    </blockquote>
                  )}

                  {/* Optional Stats Highlights */}
                  {sec.stats && (
                    <div className="grid grid-cols-3 gap-3 my-4">
                      {sec.stats.map((st, stIdx) => (
                        <div key={stIdx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                          <div className="text-lg font-black text-amber-400 font-mono">{st.value}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{isThai ? st.label.th : st.label.en}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer Action */}
            <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {isThai ? 'เขียนโดย' : 'Written by'} <strong className="text-white">{readingArticle.author}</strong>
              </span>
              <div className="flex items-center gap-3">
                {onExploreCar && (
                  <button
                    onClick={() => {
                      const bId = readingArticle.brandId === 'general' ? 'porsche' : readingArticle.brandId;
                      setReadingArticle(null);
                      onExploreCar(bId);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all"
                  >
                    {isThai ? 'ดูโมเดล 3D รุ่นนี้' : 'VIEW 3D MODEL'}
                  </button>
                )}
                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                >
                  {isThai ? 'ปิด' : 'CLOSE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
