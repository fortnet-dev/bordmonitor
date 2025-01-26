<template>
	<main>
		<h2>Einstellungen</h2>

		<div class="grid">
			<div class="left">
				<UiButton>Sprache</UiButton>
				<UiButton>Distanz</UiButton>
				<UiButton>Verbrauch</UiButton>
				<UiButton>Temperatur</UiButton>
				<UiButton>Uhr</UiButton>
				<UiButton>Memo</UiButton>
				<UiButton>Datum</UiButton>
				<UiButton>Audio-BC</UiButton>
			</div>
			<div class="right">
				<div class="row">
					<UiSelect :options="['D', 'GB', 'F']" />
					<UiSelect :options="['km', 'miles']" />
					<UiSelect :options="['l/100km', 'mpg', 'km/l']" />
					<UiSelect :options="['°C', '°F']" />
					<UiSelect :options="['24 Std', '12 Std', 'stellen']" />
					<UiSelect :options="['ein', 'aus']" />
					<UiSelect :options="['tt.mm', 'mm.tt', 'stellen']" />
					<UiSelect :options="['ein', 'aus']" />
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
