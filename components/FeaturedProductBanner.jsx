export default function FeaturedProductBanner() {
  return (
    <section className="w-full bg-white px-4 py-8 md:px-8 md:py-12">
      <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[26px] border border-[#eadfd3] bg-[#f1e7df] px-4 py-5 shadow-[0_10px_30px_rgba(100,77,61,0.08)] md:px-6 md:py-7">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/15 to-transparent" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full max-w-[420px] items-center justify-center lg:justify-start">
            <div className="flex w-full max-w-[350px] items-center gap-4 rounded-[18px] border border-[#e6d7cc] bg-[#f8f4f1] p-3 shadow-sm">
              <div className="relative h-24 w-24 overflow-hidden rounded-[15px] border border-[#e9d9ce] bg-gradient-to-br from-[#f7e6dd] via-[#ecd6c3] to-[#f7f3ee]">
                <div className="absolute left-1/2 top-2 h-10 w-10 -translate-x-1/2 rounded-full bg-[#f5d7c7]" />
                <div className="absolute left-1/2 top-12 h-12 w-16 -translate-x-1/2 rounded-[14px] border border-[#d9b8a2] bg-[#fbe7d6]" />
                <div className="absolute bottom-2 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-[#e2b49a] opacity-70" />
              </div>

              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1f2a3a]">Classic Serum</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-[#4c4a46]">Moisturizing • Repairing</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[#4c4a46]">Brightening</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#7a6a60]">30ml • 1.05 FL OZ</p>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[220px] flex-1 items-center justify-center lg:min-h-[260px]">
            <div className="absolute left-[8%] top-[18%] h-24 w-24 rounded-full bg-[#f6efe8] shadow-[inset_0_0_0_1px_rgba(120,104,90,0.1)]" />
            <div className="absolute left-[14%] top-[40%] h-16 w-16 rounded-full bg-[#f8f3ee] border border-[#ddd0c6] shadow-[inset_0_0_0_1px_rgba(120,104,90,0.08)]" />

            <div className="absolute left-[40%] top-[18%] h-[160px] w-[130px] rounded-[18px_18px_8px_8px] border border-[#d9c9ba] bg-gradient-to-b from-[#f7f4f0] via-[#f5efe9] to-[#e8dccd] shadow-[inset_0_0_28px_rgba(255,255,255,0.5)] md:h-[190px] md:w-[165px]" />
            <div className="absolute left-[44.5%] top-[10%] h-[45px] w-[82px] rounded-t-[18px] border border-[#d6c7ba] bg-gradient-to-b from-[#f8f4ef] to-[#eaded0] md:w-[100px]" />
            <div className="absolute left-[42%] top-[105px] h-[70px] w-[110px] rounded-[14px] border border-[#d9c5b8] bg-gradient-to-b from-[#f0e3d7] to-[#e7d7c9] md:top-[125px] md:w-[130px]" />
            <div className="absolute left-[45%] top-[112px] h-[28px] w-[100px] rounded-[10px] border border-[#d4bca7] bg-[#f5f0eb] md:top-[135px] md:w-[120px]" />
            <div className="absolute left-[45%] top-[150px] h-[10px] w-[100px] rounded-full bg-[#d9b39b] opacity-70 md:top-[175px] md:w-[118px]" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
            {[
              { value: '92%', label: 'Smoother Skin' },
              { value: '81%', label: 'Fewer Wrinkles' },
              { value: '87%', label: 'Deep Hydration' },
              { value: '94%', label: 'Healthy Glow' }
            ].map((stat) => (
              <div
                key={stat.label}
                className="inline-flex items-center gap-2 rounded-full border border-[#d7c7bc] bg-white/70 px-4 py-2 text-sm text-[#2b2f38] shadow-sm backdrop-blur-sm"
              >
                <span className="text-[15px] font-semibold text-[#d5928d]">{stat.value}</span>
                <span className="text-[11px] uppercase tracking-[0.08em] text-[#2f3945]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
