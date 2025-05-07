import { IconChartBar, IconUsers } from '@tabler/icons-react';
import {
	IconAperture,
	IconBox,
	IconCopy,
	IconLayoutDashboard,
	IconLogin,
	IconMoodHappy,
	IconShoppingCart,
	IconTypography,
	IconUserPlus,
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const MenuItems = [
	{
		navlabel: true,
		subheader: 'Dashboard',
	},
	{
		id: uniqueId(),
		title: 'Dashboard',
		icon: IconLayoutDashboard,
		href: '/dashboard',
	},
	{
		navlabel: true,
		subheader: 'E-commerce',
	},
	{
		id: uniqueId(),
		title: 'Products',
		icon: IconBox,
		href: '/products',
	},
	{
		id: uniqueId(),
		title: 'Orders',
		icon: IconShoppingCart,
		href: '/orders',
	},
	{
		id: uniqueId(),
		title: 'Customers',
		icon: IconUsers,
		href: '/customers',
	},
	{
		navlabel: true,
		subheader: 'Reports',
	},
	{
		id: uniqueId(),
		title: 'Analytics',
		icon: IconChartBar,
		href: '/analytics',
	},
];

export default MenuItems;
