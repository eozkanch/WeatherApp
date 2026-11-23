/** Ortak buton stilleri (Link ve button için): tek vurgu rengi, net odak halkası. */
const base =
  'inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400';

export const primaryButton = `${base} bg-sky-500 text-slate-950 hover:bg-sky-400`;
export const secondaryButton = `${base} border border-white/15 bg-white/5 text-slate-50 hover:bg-white/10`;
