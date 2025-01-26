<script setup lang="ts">
import "@fontsource-variable/jetbrains-mono"
import "~/assets/globals.scss"

const enablePixelate = ref(true)
const pixelateFactorPre = ref(0.35)
const pixelateFactorPost = ref(0.25)
</script>

<template>
	<div
		class="aspect-container"
		:style="{ filter: enablePixelate ? 'url(#pixelate)' : '' }"
	>
		<NuxtPage />
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
</template>

<style lang="scss">
#__nuxt {
	background: hsl(0deg 0% 20%);

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.aspect-container {
	position: relative;
	background: var(--background);
	aspect-ratio: 4 / 3;

	--height: min(600px, 95vh, calc(95vw / 4 * 3));
	height: var(--height);
	font-size: calc(var(--height) / 20);

	text-shadow: 1px 1px 2px black;
	font-weight: 400;

	font-family: "JetBrains Mono Variable", cursive;

	display: flex;
	align-items: center;
	flex-direction: column;

	-webkit-font-smoothing: none;
}

main {
	position: relative;
	height: 100%;
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
}

h1 {
	color: var(--accent-orange);
	text-shadow: none;
	margin: 0.5em 0;
	margin-bottom: 1em;
	font-weight: 300;
}

.bottom-bar {
	position: absolute;

	display: flex;
	justify-content: space-between;
	align-items: center;
	bottom: 0;
	width: 100%;

	background: var(--background-light);
	color: black;
	text-shadow: none;
	font-weight: 800;

	padding: 0 0.5em;

	.left {
		display: flex;
		gap: 2em;
		font-size: 1.05em;
	}

	.time {
		font-size: 1.5em;
		line-height: 1;
		margin-right: 0.5em;
		vertical-align: text-top;
		font-weight: 600;
	}
}

.controls {
	display: flex;
	flex-direction: column;
	width: 100%;
}
</style>
