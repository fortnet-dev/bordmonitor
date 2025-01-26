<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router"

const router = useRouter()
const props = defineProps<{ to?: RouteLocationRaw }>()

const loading = ref(false)
const onClick = async () => {
	loading.value = true

	if (props.to) await router.push(props.to)

	await artificialDelay(250)
	loading.value = false
}
</script>

<template>
	<UiButton :class="{ pressed: loading }" @click.prevent="onClick">
		<slot />
	</UiButton>
</template>
