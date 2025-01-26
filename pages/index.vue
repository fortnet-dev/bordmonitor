<script setup lang="ts">
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
	</main>
</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1em;

	.column {
		display: flex;
		flex-direction: column;
	}
}
</style>
