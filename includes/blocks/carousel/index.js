/**
 * WordPress dependencies
 */
const { __, _n, _nx, _x } = wp.i18n;
const { registerBlockType } = wp.blocks;
// const { withSelect } = wp.data;

/**
 * Block dependencies
 */
import edit from './edit';

/**
 * Register Block
 */
export default registerBlockType(
	'connections-directory/carousel',
	{
		title:       __( 'Carousel', 'connections' ),
		description: __( 'Display members of your team in a carousel.', 'connections' ),
		category:    'connections-directory',
		// icon:        giveLogo,
		keywords:    [
			'connections',
			__( 'carousel', 'connections' ),
			__( 'slider', 'connections' ),
		],
		supports:    {
			// Remove the support for the generated className.
			className:       false,
			// Remove the support for the custom className.
			customClassName: false,
			// Remove the support for editing the block using the block HTML editor.
			html:            false,
		},
		attributes:  {
			blocks:            {
				type:    'array',
				default:  [],
				source:  'meta',
				meta:    '_blocks'
			},
			blockId:           {
				type:    'string',
				// default: '',
			},
			borderColor:       {
				default: '#BABABA',
			},
			borderRadius:      {
				type:    'integer',
				default: 12,
			},
			borderWidth:       {
				type:    'integer',
				default: 1,
			},
			// carousels:         {
			// 	type:    'string',
			// 	default:  '[]',
			// 	source:  'meta',
			// 	meta:    '_cbd_carousel_blocks'
			// },
			categories:        {
				type:    'string',
				default: '[]',
			},
			categoriesExclude: {
				type:    'string',
				default: '[]',
			},
			categoriesIn:      {
				type:    'boolean',
				default: false,
			},
			displayDropShadow: {
				type:    'boolean',
				default: true,
			},
			displayEmail:      {
				type:    'boolean',
				default: true,
			},
			displayExcerpt:    {
				type:    'boolean',
				default: false,
			},
			displayPhone:      {
				type:    'boolean',
				default: true,
			},
			displaySocial:     {
				type:    'boolean',
				default: true,
			},
			displayTitle:      {
				type:    'boolean',
				default: true,
			},
			excerptWordLimit:  {
				type:    'string',
				default: '10',
			},
			imageBorderColor:  {
				default: '#BABABA',
			},
			imageBorderRadius: {
				type:    'integer',
				default: 0,
			},
			imageBorderWidth:  {
				type:    'integer',
				default: 0,
			},
			imageCropMode:     {
				type:    'string',
				default: '1',
			},
			imageShape:        {
				type:    'string',
				default: 'square',
			},
			imageType:         {
				type:    'string',
				default: 'photo',
			},
			// listType:          {
			// 	type:    'string',
			// 	default: 'all',
			// 	source:  'meta',
			// 	meta:    '_listType'
			// },
		},
		edit,
		save:        () => {
			// Server side rendering via shortcode.
			return null;
		},
	}
)
