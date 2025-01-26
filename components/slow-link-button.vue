<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router"

const router = useRouter()
const props = defineProps<{ to?: RouteLocationRaw }>()

const loading = ref(false)
const onClick = async () => {
	loading.value = true

	await wait(250)
	if (props.to) await router.push(props.to)
	loading.value = false
}
</script>

<template>
	<UiButton :class="{ pressed: loading }" @click.prevent="onClick">
		<slot />
	</UiButton>
</template>
