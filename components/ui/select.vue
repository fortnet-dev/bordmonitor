<script setup lang="ts">
const props = defineProps({
	options: {
		type: Array as PropType<string[]>,
		required: true,
	},
})
const modelValue = defineModel({
	type: Number,
	required: true,
})
</script>

<template>
	<div class="select">
		<div
			v-for="(option, index) in props.options"
			:key="option + index"
			class="option"
			:class="{ selected: index === modelValue }"
			@click="modelValue = index"
		>
			{{ option }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.select {
	width: 100%;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr;

	padding: 0 0.5em;
}

.option {
	line-height: 1.2;
	margin: 0.2em 0;

	&:not(.selected) {
		text-shadow: none;
		font-weight: 800;
		color: var(--text-black);
	}

	&.selected {
		color: var(--text-active);
	}
}
</style>
