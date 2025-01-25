<template>
	<button>
		<slot />
	</button>
</template>

<style scoped lang="scss">
button {
	padding: 0.125em 0.25em;
	border-top: 0.2em solid transparent;
	border-left: 0.2em solid transparent;
	border-right: 0.2em solid transparent;
	border-bottom: 0.2em solid transparent;

	&:hover {
		background: hsl(0deg 0% 100% / 0.125);
		border-top: 0.2em solid white;
		border-left: 0.2em solid white;
		border-right: 0.2em solid black;
		border-bottom: 0.2em solid black;
	}

	&:active {
		background: hsl(0deg 0% 100% / 0);

		border-top: 0.2em solid black;
		border-left: 0.2em solid black;
		border-right: 0.2em solid white;
		border-bottom: 0.2em solid white;
	}
}
</style>
