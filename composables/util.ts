export const enableArtificialDelay = ref(true)
export const artificialDelay = (t: number): Promise<void> => {
	if (!enableArtificialDelay.value) return Promise.resolve()

	return new Promise((r) => setTimeout(r, t))
}
