<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div>
	<MkAnimBg style="position: fixed; top: 0;"/>
	<div :class="$style.formContainer">
		<div :class="$style.form">
			{{ message }}
		</div>
	</div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MkAnimBg from '@/components/MkAnimBg.vue';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import { $i, login } from '@/account.js';

const id = new URLSearchParams(location.search).get('id');
const token = new URLSearchParams(location.search).get('token');

const message = ref('ログイン中...');

if ($i != null) {
	message.value = '既にログイン済みです';
} else if (id == null || token == null) {
	message.value = 'ログイン情報が不正です';
} else {
	login(token, undefined, false).then(() => {
		message.value = 'Xfolioへのログインが完了しました！';
	}).catch(() => {
		message.value = 'ログインに失敗しました';
	});
}

definePageMetadata(() => ({
	title: 'MiAuth',
	icon: 'ti ti-apps',
}));
</script>

<style lang="scss" module>
.formContainer {
	min-height: 100svh;
	padding: 32px 32px calc(env(safe-area-inset-bottom, 0px) + 32px) 32px;
	box-sizing: border-box;
	display: grid;
	place-content: center;
}

.form {
	position: relative;
	z-index: 10;
	border-radius: var(--MI-radius);
	background-color: var(--MI_THEME-panel);
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
	overflow: clip;
	max-width: 500px;
	width: calc(100vw - 64px);
	height: min(65svh, calc(100svh - calc(env(safe-area-inset-bottom, 0px) + 64px)));
	overflow-y: scroll;
	box-sizing: border-box;
	padding: 32px;
	text-align: center;
}
</style>
