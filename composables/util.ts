export const wait = (t: number): Promise<void> => new Promise((r) => setTimeout(r, t))
