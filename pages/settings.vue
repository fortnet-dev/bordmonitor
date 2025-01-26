<script setup lang="ts">
const settings = reactive({
	Sprache: {
		value: -1,
		options: ["D", "GB", "F"],
	},
	Distanz: {
		value: -1,
		options: ["km", "miles"],
	},
	Verbrauch: {
		value: -1,
		options: ["l/100km", "mpg", "km/l"],
	},
	Temperatur: {
		value: -1,
		options: ["°C", "°F"],
	},
	Uhr: {
		value: -1,
		options: ["24 Std", "12 Std", "stellen"],
	},
	Memo: {
		value: -1,
		options: ["ein", "aus"],
	},
	Datum: {
		value: -1,
		options: ["tt.mm", "mm.tt", "stellen"],
	},
	"Audio-BC": {
		value: -1,
		options: ["ein", "aus"],
	},
})

onMounted(async () => {
	await wait(250)

	for (const key of Object.keys(settings) as (keyof typeof settings)[]) {
		await wait(10)
		settings[key].value = Math.floor(Math.random() * settings[key].options.length)
	}
})
</script>

<template>
	<main>
		<h2>Einstellungen</h2>

		<div class="grid">
			<div class="left">
				<UiButton v-for="(_, key) in settings" :key="key">{{ key }}</UiButton>
			</div>
			<div class="right">
				<div class="row">
					<UiSelect
						v-for="(setting, key) in settings"
						:key="key"
						v-model="setting.value"
						:options="setting.options"
					/>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: 0.25fr 1fr;
	height: 100%;
	padding: 0.2em;

	.left {
		display: flex;
		flex-direction: column;
		border-block: 0.2em solid transparent;

		button {
			padding-block: 0;
			line-height: 1.2;
		}
	}

	.right {
		border-top: 0.2em solid white;
		border-left: 0.2em solid white;
		border-right: 0.2em solid black;
		border-bottom: 0.2em solid black;
	}
}
</style>
