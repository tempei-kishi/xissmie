/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { Endpoint } from '@/server/api/endpoint-base.js';
import type { XissmeLoginTokensRepository } from '@/models/_.js';
import { DI } from '@/di-symbols.js';
import { ApiError } from '@/server/api/error.js';

export const meta = {
	tags: ['admin'],

	requireCredential: true,
	requireAdmin: true,
	kind: 'read:admin:account',

	errors: {
		notFound: {
			message: 'Token not found.',
			code: 'NOT_FOUND',
			id: '5a021977-aeb8-4c70-9e53-fa97be75c07d',
		},
	},
	res: {
		type: 'object',
		optional: false, nullable: false,
		properties: {
			loginToken: {
				type: 'string',
				optional: false, nullable: false,
			},
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		userId: { type: 'string', format: 'misskey:id' },
	},
	required: ['userId'],
} as const;

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> { // eslint-disable-line import/no-default-export
	constructor(
		@Inject(DI.xissmeLoginTokensRepository)
		private xissmeLoginTokensRepository: XissmeLoginTokensRepository,
	) {
		super(meta, paramDef, async (ps, me) => {
			const token = await this.xissmeLoginTokensRepository.findOneBy({
				userId: ps.userId,
			});

			if (token == null) {
				throw new ApiError(meta.errors.notFound);
			}

			return {
				loginToken: token.token,
			};
		});
	}
}
