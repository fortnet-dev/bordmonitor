<template>
	<main>
		<h1>Menu</h1>

		<div class="grid">
			<div class="column">
				<SlowLinkButton>Bordcomputer</SlowLinkButton>
				<SlowLinkButton>GPS-Navigation</SlowLinkButton>
				<SlowLinkButton>Telefon</SlowLinkButton>
				<SlowLinkButton>Code</SlowLinkButton>
				<SlowLinkButton to="/settings">Einstellungen</SlowLinkButton>
			</div>
			<div class="column">
				<SlowLinkButton>TV</SlowLinkButton>
				<SlowLinkButton>DSP</SlowLinkButton>
				<SlowLinkButton>Standheiz./-lüftung</SlowLinkButton>
				<SlowLinkButton style="visibility: hidden">hidden</SlowLinkButton>
				<SlowLinkButton>Bildschirm aus</SlowLinkButton>
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
