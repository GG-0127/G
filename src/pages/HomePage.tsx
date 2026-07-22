import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, MapPin, Briefcase, Users, TrendingUp, Clock, Newspaper, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { hotNews } from '@/data/news';

const modules = [
  {
    title: '知识题库',
    link: '/question-bank',
    icon: BookOpen,
    description: '行测六大模块 + 申论五大题型，系统学习知识点，在线答题练习',
    color: 'primary-600',
    bgColor: 'bg-primary-600/10',
    textColor: 'text-primary-600',
    stats: '11个模块 · 50+道题目',
  },
  {
    title: '注意事项',
    link: '/tips',
    icon: Lightbulb,
    description: '报考流程、时间节点、国省考对比、备考策略，一站式备考指南',
    color: 'gold-500',
    bgColor: 'bg-gold-500/10',
    textColor: 'text-gold-500',
    stats: '9步流程 · 15条攻略',
  },
  {
    title: '地区推荐',
    link: '/region',
    icon: MapPin,
    description: '全国31省市竞争分析，进面分数线对比，帮你科学选择报考地区',
    color: 'emerald-600',
    bgColor: 'bg-emerald-600/10',
    textColor: 'text-emerald-600',
    stats: '31省市 · 4大梯队',
  },
  {
    title: '岗位推荐',
    link: '/position',
    icon: Briefcase,
    description: '基于个人条件智能匹配岗位，国考/省考/选调生多维对比分析',
    color: 'violet-600',
    bgColor: 'bg-violet-600/10',
    textColor: 'text-violet-600',
    stats: '10类岗位 · 精准匹配',
  },
];

const bottomStats = [
  {
    icon: Users,
    title: '2026国考招录',
    value: '3.81万人',
    desc: '规模持续扩大',
  },
  {
    icon: TrendingUp,
    title: '平均竞争比',
    value: '约98:1',
    desc: '热门岗超200:1',
  },
  {
    icon: Clock,
    title: '备考周期',
    value: '3-6个月',
    desc: '系统备考更高效',
  },
];

export default function HomePage() {
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const examDate = new Date('2026-11-28');
    const updateCountdown = () => {
      const now = new Date();
      const diff = examDate.getTime() - now.getTime();
      setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 px-4 py-20 sm:px-6 lg:px-8">
        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.25) 1px, transparent 1px)',
            backgroundSize: '60px 60px, 80px 80px, 100px 100px',
          }}
        />
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-5xl font-black text-white md:text-6xl">
            考公助手
          </h1>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-gold-400 to-gold-500" />
          <p className="mt-6 text-xl text-white/80">
            一站式公务员考试信息服务平台
          </p>

          {/* Countdown Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-10 max-w-sm rounded-2xl border-2 border-gold-400/50 bg-white px-6 py-5 shadow-lg shadow-black/10"
          >
            <p className="text-sm font-medium text-gray-500">
              距离2026国考还有
            </p>
            <p className="mt-1 font-serif text-4xl font-black text-primary-700">
              {daysLeft}
              <span className="ml-1 text-xl font-bold text-gray-600">天</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Module Cards Section */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-bold text-primary-800">
            备考工具箱
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {modules.map((mod, index) => (
              <Link key={mod.link} to={mod.link}>
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="flex h-full flex-col rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm transition-shadow"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${mod.bgColor}`}
                  >
                    <mod.icon className={`h-7 w-7 ${mod.textColor}`} />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-bold text-gray-900">
                    {mod.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                    {mod.description}
                  </p>
                  <span className="mt-4 inline-block self-start rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                    {mod.stats}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot News Section */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <Newspaper className="w-6 h-6 text-primary-600" />
            <h2 className="font-serif text-2xl font-bold text-primary-800">考公热点</h2>
            <span className="text-xs text-gray-400 ml-2">每日更新</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.4 }}
                className="group rounded-xl border border-gray-100 bg-gray-50 p-5 hover:border-primary-200 hover:bg-primary-50/30 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${news.tagColor}`}>
                    {news.tag}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0">{news.date}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-gray-800 group-hover:text-primary-700 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {news.summary}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                  <ExternalLink className="w-3 h-3" />
                  <span>{news.source}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Info Section */}
      <section className="bg-gray-100 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {bottomStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + 0.1 * index, duration: 0.5 }}
              className="flex flex-col items-center rounded-xl bg-white px-6 py-8 text-center shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600/10">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-500">
                {stat.title}
              </h3>
              <p className="mt-2 text-2xl font-bold text-primary-700">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-gray-400">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}