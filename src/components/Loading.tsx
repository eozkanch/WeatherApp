/** Tam ekran yükleniyor göstergesi: uygulamanın koyu cam diline uygun, tek vurgu rengi. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-md"
    >
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-white/20 bg-white/10 px-10 py-8 shadow-2xl backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="h-12 w-12 animate-spin rounded-full border-[3px] border-white/20 border-t-sky-400 motion-reduce:animate-pulse"
        />
        <div className="text-center">
          <p className="text-base font-medium text-white">Loading weather</p>
          <p className="mt-1 text-sm text-white/60">Getting the latest forecast…</p>
        </div>
      </div>
    </div>
  );
}
