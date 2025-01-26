<template>
	<main>
		<h1>Menu</h1>

		<div class="grid">
			<div class="column">
				<UiButton>Bordcomputer</UiButton>
				<UiButton>GPS-Navigation</UiButton>
				<UiButton>Telefon</UiButton>
				<UiButton>Code</UiButton>
				<UiButton>
					<NuxtLink to="/settings">Einstellungen</NuxtLink>
				</UiButton>
			</div>
			<div class="column">
				<UiButton>TV</UiButton>
				<UiButton>DSP</UiButton>
				<UiButton>Standheiz./-lüftung</UiButton>
				<UiButton style="visibility: hidden">hidden</UiButton>
				<UiButton>Bildschirm aus</UiButton>
			</div>
		</div>
	</main>
</template>

<style scoped lang="scss">
main {
	align-items: center;
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
</style>
