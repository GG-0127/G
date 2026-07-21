import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, TrendingDown, BarChart3, Search, X, Filter, ArrowUp, ArrowDown } from 'lucide-react';
import { regions } from '@/data/regions';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';
import { RegionData } from '@/types';

const tierConfig = [
  { tier: 1, name: '地狱模式', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badgeVariant: 'red' as const },
  { tier: 2, name: '硬核卷王', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badgeVariant: 'orange' as const },
  { tier: 3, name: '中等挑战', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badgeVariant: 'yellow' as const },
  { tier: 4, name: '上岸友好', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badgeVariant: 'green' as const },
];

const tierNameMap: Record<number, string> = {
  1: '地狱模式',
  2: '硬核卷王',
  3: '中等挑战',
  4: '上岸友好',
};

const tierBadgeVariantMap: Record<number, 'red' | 'orange' | 'yellow' | 'green'> = {
  1: 'red',
  2: 'orange',
  3: 'yellow',
  4: 'green',
};

export default function RegionPage() {
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'competitionRatio' | 'entryScore'>('competitionRatio');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  const filtered = useMemo(() => {
    let result = [...regions];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((r) => r.province.toLowerCase().includes(q));
    }

    if (filterTier !== null) {
      result = result.filter((r) => r.tier === filterTier);
    }

    result.sort((a, b) => {
      const val = sortOrder === 'asc' ? 1 : -1;
      return (a[sortBy] - b[sortBy]) * val;
    });

    return result;
  }, [search, filterTier, sortBy, sortOrder]);

  const tierStats = useMemo(() => {
    return tierConfig.map((tc) => {
      const tierRegions = regions.filter((r) => r.tier === tc.tier);
      const avgRatio = tierRegions.length
        ? tierRegions.reduce((sum, r) => sum + r.competitionRatio, 0) / tierRegions.length
        : 0;
      return {
        ...tc,
        count: tierRegions.length,
        avgRatio: Math.round(avgRatio),
      };
    });
  }, []);

  const maxRatio = Math.max(...regions.map((r) => r.competitionRatio));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary-800">地区推荐</h1>
        <p className="mt-2 text-gray-500">
          基于2026年国考/省考数据，分析全国各省市竞争难度与上岸机会
        </p>
      </div>

      {/* Section 1: Tier List */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary-600" />
          <h2 className="font-serif text-xl font-bold text-primary-700">难度梯队排行榜</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tierStats.map((t) => (
            <motion.div
              key={t.tier}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilterTier(filterTier === t.tier ? null : t.tier)}
            >
              <Card
                className={`${t.bg} ${t.border} cursor-pointer border-2 transition-all ${
                  filterTier === t.tier ? 'ring-2 ring-offset-2 ' + t.text.replace('text-', 'ring-') : ''
                }`}
              >
                <div className="text-center">
                  <p className={`text-lg font-bold ${t.text}`}>{t.name}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-800">{t.count}</p>
                  <p className="text-sm text-gray-500">个省份</p>
                  <p className="mt-2 text-sm text-gray-500">
                    平均竞争比{' '}
                    <span className={`font-semibold ${t.text}`}>{t.avgRatio}:1</span>
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 2: Province List */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary-600" />
          <h2 className="font-serif text-xl font-bold text-primary-700">省份详情列表</h2>
        </div>

        {/* Search & Controls */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索省份..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-10 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Tabs & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterTier(null)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filterTier === null
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                全部
              </button>
              {tierConfig.map((t) => (
                <button
                  key={t.tier}
                  onClick={() => setFilterTier(filterTier === t.tier ? null : t.tier)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    filterTier === t.tier
                      ? `${t.bg} ${t.text} border ${t.border}`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5">
              <button
                onClick={() => {
                  if (sortBy === 'competitionRatio') {
                    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                  } else {
                    setSortBy('competitionRatio');
                    setSortOrder('desc');
                  }
                }}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  sortBy === 'competitionRatio'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                竞争比
                {sortBy === 'competitionRatio' &&
                  (sortOrder === 'desc' ? (
                    <ArrowDown className="h-3 w-3" />
                  ) : (
                    <ArrowUp className="h-3 w-3" />
                  ))}
              </button>
              <button
                onClick={() => {
                  if (sortBy === 'entryScore') {
                    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                  } else {
                    setSortBy('entryScore');
                    setSortOrder('desc');
                  }
                }}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  sortBy === 'entryScore'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                进面分
                {sortBy === 'entryScore' &&
                  (sortOrder === 'desc' ? (
                    <ArrowDown className="h-3 w-3" />
                  ) : (
                    <ArrowUp className="h-3 w-3" />
                  ))}
              </button>
            </div>
          </div>
        </div>

        {/* Province Cards Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Filter className="mx-auto mb-3 h-10 w-10" />
            <p>没有匹配的省份</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((region) => (
                <motion.div
                  key={region.province}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className="h-full cursor-pointer"
                    onClick={() => setSelectedRegion(region)}
                  >
                    {/* Province Name & Tier Badge */}
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="font-serif text-lg font-bold text-gray-800">
                        {region.province}
                      </h3>
                      <Badge variant={tierBadgeVariantMap[region.tier]}>
                        {tierNameMap[region.tier]}
                      </Badge>
                    </div>

                    {/* Competition Ratio Bar */}
                    <div className="mb-2">
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-gray-500">竞争比</span>
                        <span className="font-semibold text-gray-700">
                          {region.competitionRatio}:1
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(region.competitionRatio / maxRatio) * 100}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            region.tier <= 2
                              ? 'bg-red-400'
                              : region.tier === 3
                                ? 'bg-yellow-400'
                                : 'bg-green-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Entry Score */}
                    <div className="mb-3 flex items-center gap-2 text-sm">
                      <span className="text-gray-500">进面分</span>
                      <span className="font-semibold text-gray-700">
                        {region.entryScore}
                      </span>
                      <span className="text-xs text-gray-400">
                        (最高 {region.maxEntryScore})
                      </span>
                    </div>

                    {/* Tags */}
                    {region.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {region.tags.map((tag) => (
                          <Badge key={tag} variant="blue">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Province Detail Modal */}
      <Modal
        open={selectedRegion !== null}
        onClose={() => setSelectedRegion(null)}
        title={selectedRegion?.province}
      >
        {selectedRegion && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">招录规模</p>
                <p className="text-lg font-bold text-gray-800">
                  {selectedRegion.recruitmentScale.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">竞争比</p>
                <p className="text-lg font-bold text-gray-800">
                  {selectedRegion.competitionRatio}:1
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">平均进面分</p>
                <p className="text-lg font-bold text-gray-800">
                  {selectedRegion.entryScore}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">最高进面分</p>
                <p className="text-lg font-bold text-gray-800">
                  {selectedRegion.maxEntryScore}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">难度梯队</p>
                <Badge variant={tierBadgeVariantMap[selectedRegion.tier]}>
                  {tierNameMap[selectedRegion.tier]}
                </Badge>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">薪资范围</p>
                <p className="text-lg font-bold text-gray-800">
                  {selectedRegion.salaryRange}
                </p>
              </div>
            </div>

            {selectedRegion.tags.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">标签</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRegion.tags.map((tag) => (
                    <Badge key={tag} variant="blue">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">概述</p>
              <p className="text-sm leading-relaxed text-gray-600">
                {selectedRegion.description}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}