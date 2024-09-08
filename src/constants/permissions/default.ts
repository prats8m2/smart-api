const ALL_PERMISSION = [
	{
		category: 'ACCOUNT',
		categoryId: 1,
		permissions: [
			'ADD-ACCOUNT',
			'UPDATE-ACCOUNT',
			'DELETE-ACCOUNT',
			'LIST-ACCOUNT',
			'VIEW-ACCOUNT',
		],
	},
	{
		category: 'SITE',
		categoryId: 2,
		permissions: [
			'ADD-SITE',
			'UPDATE-SITE',
			'DELETE-SITE',
			'LIST-SITE',
			'VIEW-SITE',
		],
	},
	{
		category: 'ROLE',
		categoryId: 3,
		permissions: [
			'ADD-ROLE',
			'UPDATE-ROLE',
			'DELETE-ROLE',
			'LIST-ROLE',
			'VIEW-ROLE',
			'LIST-PERMISSION',
		],
	},
	{
		category: 'STAFF',
		categoryId: 4,
		permissions: [
			'ADD-STAFF',
			'UPDATE-STAFF',
			'DELETE-STAFF',
			'LIST-STAFF',
			'VIEW-STAFF',
		],
	},
	{
		category: 'DEVICE',
		categoryId: 5,
		permissions: [
			'ADD-DEVICE',
			'UPDATE-DEVICE',
			'DELETE-DEVICE',
			'LIST-DEVICE',
			'VIEW-DEVICE',
		],
	},
	{
		category: 'MENU',
		categoryId: 6,
		permissions: [
			'ADD-MENU',
			'UPDATE-MENU',
			'DELETE-MENU',
			'LIST-MENU',
			'VIEW-MENU',
		],
	},
	{
		category: 'ROOM',
		categoryId: 7,
		permissions: [
			'ADD-ROOM',
			'UPDATE-ROOM',
			'DELETE-ROOM',
			'LIST-ROOM',
			'VIEW-ROOM',
		],
	},
	{
		category: 'TABLE',
		categoryId: 8,
		permissions: [
			'ADD-TABLE',
			'UPDATE-TABLE',
			'DELETE-TABLE',
			'LIST-TABLE',
			'VIEW-TABLE',
		],
	},
	{
		category: 'PRODUCT',
		categoryId: 9,
		permissions: [
			'ADD-PRODUCT',
			'UPDATE-PRODUCT',
			'DELETE-PRODUCT',
			'LIST-PRODUCT',
			'VIEW-PRODUCT',
		],
	},
	{
		category: 'CATEGORY',
		categoryId: 10,
		permissions: [
			'ADD-CATEGORY',
			'UPDATE-CATEGORY',
			'DELETE-CATEGORY',
			'LIST-CATEGORY',
			'VIEW-CATEGORY',
		],
	},
	{
		category: 'ORDER',
		categoryId: 11,
		permissions: [
			'ADD-ORDER',
			'UPDATE-ORDER',
			'DELETE-ORDER',
			'LIST-ORDER',
			'VIEW-ORDER',
			'UPDATE-ORDER-STATUS',
			'MARK-ORDER-COMPLETE',
		],
	},
	{
		category: 'EVENT',
		categoryId: 12,
		permissions: [
			'ADD-EVENT',
			'UPDATE-EVENT',
			'DELETE-EVENT',
			'LIST-EVENT',
			'VIEW-EVENT',
		],
	},
	{
		category: 'FEEDBACK',
		categoryId: 13,
		permissions: ['ADD-FEEDBACK', 'DELETE-FEEDBACK', 'LIST-FEEDBACK'],
	},
	{
		category: 'SESSION',
		categoryId: 14,
		permissions: ['LIST-SESSION', 'TERMINATE-SESSION'],
	},
];

export default ALL_PERMISSION;
