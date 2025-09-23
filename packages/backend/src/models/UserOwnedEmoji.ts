/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { PrimaryColumn, Entity, Index, JoinColumn, Column, ManyToOne } from 'typeorm';
import { id } from './util/id.js';
import { MiEmoji } from './Emoji.js';
import { MiUser } from './User.js';

@Entity('user_owned_emoji')
@Index(['userId', 'emojiId'], { unique: true })
export class MiUserOwnedEmoji {
	@PrimaryColumn(id())
	public id: string;

	@Column('timestamp with time zone', {
	})
	public purchasedAt: Date;

	@Index()
	@Column(id())
	public userId: MiUser['id'];

	@ManyToOne(type => MiUser, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public user: MiUser | null;

	@Column(id())
	public emojiId: MiEmoji['id'];

	@ManyToOne(type => MiEmoji, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public emoji: MiEmoji | null;
}
