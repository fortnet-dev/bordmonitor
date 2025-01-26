<script setup lang="ts">
import "@fontsource-variable/jetbrains-mono"
import "~/assets/globals.scss"

const enablePixelate = ref(true)
const pixelateFactorPre = ref(0.35)
const pixelateFactorPost = ref(0.25)

const timestamp = ref(new Date())
useIntervalFn(() => {
	timestamp.value = new Date()
}, 1000)

const timeFormatter = new Intl.DateTimeFormat("de-DE", {
	hour: "numeric",
	minute: "numeric",
})
const dateFormatter = new Intl.DateTimeFormat("de-DE", {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
})
const weekdayFormatter = new Intl.DateTimeFormat("de-DE", {
	weekday: "long",
})
const date = computed(() => {
	return dateFormatter.format(timestamp.value)
})
const weekday = computed(() => {
	return weekdayFormatter.format(timestamp.value)
})
const time = computed(() => {
	return timeFormatter.format(timestamp.value)
})
</script>

<template>
	<main>
		<div
			class="aspect-container"
			:style="{ filter: enablePixelate ? 'url(#pixelate)' : '' }"
		>
			<h1>MENU</h1>

			<div class="grid">
				<div class="column">
					<UiButton>Bordcomputer</UiButton>
					<UiButton>GPS-Navigation</UiButton>
					<UiButton>Telefon</UiButton>
					<UiButton>Code</UiButton>
					<UiButton>Einstellungen</UiButton>
				</div>
				<div class="column">
					<UiButton>TV</UiButton>
					<UiButton>DSP</UiButton>
					<UiButton>Standheiz./-lüftung</UiButton>
					<UiButton style="visibility: hidden">hidden</UiButton>
					<UiButton>Bildschirm aus</UiButton>
				</div>
			</div>

			<div class="bottom-bar">
				<div class="left">
					<span>{{ date }}</span>
					<span>{{ weekday }}</span>
				</div>
				<div class="right">
					<span class="time">{{ time }}</span>
				</div>
			</div>
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

.grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1em;

	.column {
		display: flex;
		flex-direction: column;
	}
}

h1 {
	color: var(--accent-orange);
	text-shadow: none;
	margin: 0.5em 0;
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
}
</style>
