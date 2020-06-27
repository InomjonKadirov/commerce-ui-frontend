// Menu
export interface Menu {
  path?: string;
  title?: string;
  type?: string;
  megaMenu?: boolean;
  megaMenuType?: string; // small, medium, large
  image?: string;
  children?: Menu[];
}

export const MENUITEMS: Menu[] = [

	{
		title: 'Товары', type: 'sub', megaMenu: true, megaMenuType: 'large', children: [
	      { 
	      	title: 'mens-fashion',  type: 'link', children: [
		      	{ path: '/home/left-sidebar/collection/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'top',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'bottom',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'ethic-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'shirts',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'women-fashion',  type: 'link', children: [
		      	{ path: '/home/left-sidebar/collection/all', title: 'dresses',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'skirts',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'westarn-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'ethic-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'bottom-wear',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'kids-fashion',  type: 'link', children: [
		      	{ path: '/home/left-sidebar/collection/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'ethic-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'top',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'bottom-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'ethic-wear',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'accessories',  type: 'link', children: [
		      	{ path: '/home/left-sidebar/collection/all', title: 'fashion-jewellery',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'caps-and-hats',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'precious-jewellery',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'necklaces',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'earrings',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'rings-wrist-wear',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'men-accessories',  type: 'link', children: [
		      	{ path: '/home/left-sidebar/collection/all', title: 'ties',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'cufflinks',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'pockets-squares',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'helmets',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'scarves',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'phone-cases',  type: 'link' }
	      	]
	      },
	    ]
	},
]