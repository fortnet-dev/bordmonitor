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
	<div class="bottom-bar">
		<div class="left">
			<span>{{ date }}</span>
			<span>{{ weekday }}</span>
		</div>
		<div class="right">
			<span class="time">{{ time }}</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.bottom-bar {
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
</style>
