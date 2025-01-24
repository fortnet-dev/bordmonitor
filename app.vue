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
		</div>

		<div class="controls">
			<label>
				Pixelate
				<input v-model="enablePixelate" type="checkbox" />
			</label>
			<label>
				Pixelate factor pre ({{ pixelateFactorPre }})
				<input v-model="pixelateFactorPre" type="range" min="0" max="1" step="0.01" />
			</label>
			<label>
				Pixelate factor post ({{ pixelateFactorPost }})
				<input v-model="pixelateFactorPost" type="range" min="0" max="1" step="0.01" />
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

.aspect-container {
	background: var(--background);
	aspect-ratio: 4 / 3;

	--height: 600px;
	height: var(--height);
	font-size: calc(var(--height) / 20);

	text-shadow: 1px 1px 2px black;
	font-family: monospace, cursive;

	display: flex;
	justify-content: center;
	align-items: center;

	-webkit-font-smoothing: none;
	// filter: url("#pixelate");
	// transform: scale3d(3, 3, 1);
}

.controls {
	display: flex;
	flex-direction: column;
}
</style>
