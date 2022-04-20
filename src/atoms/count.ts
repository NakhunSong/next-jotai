import { atom } from 'jotai'

export const countAtom = atom<number>(0)
export const fetchCountAtom = atom<number, string>(
  (get) => get(countAtom),
  async (_get, set, url) => {
    const res = await fetch(url)
    set(countAtom, (await res.json()).count * 2)
  }
)