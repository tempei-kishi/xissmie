/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { PrimaryColumn, Entity, Index, JoinColumn, Column, ManyToOne } from 'typeorm';
import { id } from './util/id.js';
import { MiAvatarDecoration } from './AvatarDecoration.js';
import { MiUser } from './User.js';

@Entity('user_owned_avatar_decoration')
@Index(['userId', 'avatarDecorationId'], { unique: true })
export class MiUserOwnedAvatarDecoration {
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
	public avatarDecorationId: MiAvatarDecoration['id'];

	@ManyToOne(type => MiAvatarDecoration, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public avatarDecoration: MiAvatarDecoration | null;
}
