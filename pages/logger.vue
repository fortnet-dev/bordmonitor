<script setup lang="ts">
const linesToAdd = [
	`I want to fuck a toaster.`,
	`Just the thought of stuffing my dick in a tight little breadslot makes me rock hard.`,
	`I could fuck it on the counter, on the kitchen table, or anywhere else it wants.`,
	`I could dress up like a maintenence tech for some sensual roleplay beforehand.`,
	`I am a slave to the toaster's whim.`,
	`I want to stick my fingers inside the bread slot and whisper "yeah you like that you toasty bitch?" Then I want to mount it when it's good and teased and then gyrate my hips like a rabbit with tourettes until my melted cock explodes inside the toaster's tight slot.`,
	`When I'm done my dick will look like a burnt sausage that had it's casing popped open with melted cheese dripping out of it and the thought of that makes me want to break into a Walmart again.`,
	`Goddamn I want to fuck a toaster.`,
]

const logLines = ref<string[]>([])

const addLine = () => {
	logLines.value.push(linesToAdd[0])
}

onMounted(async () => {
	await artificialDelay(200)

	for (const line of linesToAdd) {
		await artificialDelay(50 + Math.round(Math.random() * 150))
		logLines.value.push(line)
	}
})
</script>

<template>
	<main>
		<h2>Logbuch</h2>

		<div class="log-container" @click="addLine">
			<div v-for="(line, index) in logLines" :key="line + index" class="line">
				{{ line }}
			</div>
		</div>
	</main>
</template>

<style scoped lang="scss">
.log-container {
	height: 100%;
	margin: 0.4em;
	padding: 0.2em;

	border-top: 0.2em solid white;
	border-left: 0.2em solid white;
	border-right: 0.2em solid black;
	border-bottom: 0.2em solid black;

	overflow: hidden;
	max-width: 100%;
	max-height: 100%;
	background: var(--background-light);

	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	.line {
		white-space: nowrap;
		font-size: 0.9em;
		color: var(--text-black);
		text-shadow: none;
	}
}
</style>
