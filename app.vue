<script setup lang="ts">
import { UiButton } from "#components"
import "~/assets/globals.scss"

const enablePixelate = ref(true)
const pixelateFactorPre = ref(0.35)
const pixelateFactorPost = ref(0.25)
</script>

<template>
	<main>
		<div
			class="aspect-container"
			:style="{ filter: enablePixelate ? 'url(#pixelate)' : '' }"
		>
			<UiButton>Bordcomputer</UiButton>
			<UiButton>GPS-Navigation</UiButton>
		</div>

		<div class="controls">
			<label>
				<input v-model="enablePixelate" type="checkbox" />
				Pixelate
			</label>
			<label>
				<input v-model="pixelateFactorPre" type="range" min="0" max="1" step="0.01" />
				Pixelate factor pre ({{ pixelateFactorPre }})
			</label>
			<label>
				<input v-model="pixelateFactorPost" type="range" min="0" max="1" step="0.01" />
				Pixelate factor post ({{ pixelateFactorPost }})
			</label>
		</div>

		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
			<defs>
				<filter id="pixelate" x="0" y="0">
					<feFlood
						x="2"
						y="2"
						:height="1 * pixelateFactorPre"
						:width="1 * pixelateFactorPre"
					/>
					<feComposite :width="5 * pixelateFactorPre" :height="5 * pixelateFactorPre" />
					<feTile result="a" />
					<feComposite in="SourceGraphic" in2="a" operator="in" />
					<feMorphology operator="dilate" :radius="2.5 * pixelateFactorPost" />
				</filter>
			</defs>
		</svg>
	</main>
</template>

<style scoped lang="scss">
main {
	background: hsl(0deg 0% 20%);

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

@font-face {
	font-family: "Roboto Mono Variable";
	font-style: normal;
	font-display: swap;
	font-weight: 100 700;
	src: url(https://cdn.jsdelivr.net/fontsource/fonts/roboto-mono:vf@latest/latin-wght-normal.woff2)
		format("woff2-variations");
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
		U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
		U+FEFF, U+FFFD;
}

.aspect-container {
	background: var(--background);
	aspect-ratio: 4 / 3;

	--height: 600px;
	height: var(--height);
	font-size: calc(var(--height) / 20);

	text-shadow: 1px 1px 2px black;
	font-family: "Roboto Mono Variable", cursive;

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1em;

	-webkit-font-smoothing: none;
	// filter: url("#pixelate");
	// transform: scale3d(3, 3, 1);
}

.controls {
	display: flex;
	flex-direction: column;
}
</style>
