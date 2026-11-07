// Satu pintu untuk analitik. Alat analitik belum dipilih (TODO: Plausible atau GA4).
// Saat alat dipilih, panggil API-nya di sini, misalnya window.plausible?.(event, { props: params }).
export function track(event: string, params: Record<string, string> = {}) {
  if (import.meta.env.DEV) console.info('[track]', event, params)
}
