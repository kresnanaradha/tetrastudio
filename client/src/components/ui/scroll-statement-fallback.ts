// Fallback GSAP untuk Scroll Statement, hanya dimuat bila CSS scroll-timeline tidak didukung.
// Semua tween dicakup ke elemen section, dan revert() membersihkan ScrollTrigger saat unmount.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function animate(scope: HTMLElement, line: string) {
  const ctx = gsap.context(() => {
    const items = gsap.utils.toArray<HTMLElement>('li', scope)
    gsap.set(items, { opacity: (i: number) => (i === 0 ? 1 : 0.2) })

    const dimmer = gsap
      .timeline()
      .to(items.slice(1), { opacity: 1, stagger: 0.5 })
      .to(items.slice(0, -1), { opacity: 0.2, stagger: 0.5 }, 0)

    ScrollTrigger.create({
      trigger: items[0],
      endTrigger: items[items.length - 1],
      start: `center ${line}`,
      end: `center ${line}`,
      animation: dimmer,
      scrub: 0.2,
    })
  }, scope)
  return () => ctx.revert()
}
