/**
 * External dependencies
 */
const { get } = lodash;

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { select, withSelect } = wp.data;
const { Spinner } = wp.components;

/**
 * Internal dependencies
 */
const { TreeSelect } = wp.components;

// Import components
import {buildTermsTree} from '../utils/terms';

function PageSelect( {
	                     postType = 'page',
	                     label,
	                     value,
	                     noOptionLabel,
	                     options,
	                     onChange,
	                     ...props
                     } ) {

	if ( null === options ) {
		return (
			<p>
				<Spinner />
				{ __( 'Loading Data', 'connections' ) }
			</p>
		);
	}

	const { getPostType } = select( 'core' );

	const postTypeMeta   = getPostType( postType );
	const isHierarchical = get( postTypeMeta, [ 'hierarchical' ], false );
	const pageItems      = options || [];
	let   pagesTree      = [];

	if ( ! pageItems.length ) {

		return null;
	}

	if ( isHierarchical ) {

		pagesTree = buildTermsTree( pageItems.map( ( item ) => ({
			id:     item.id,
			parent: item.parent,
			name:   item.title.raw ? item.title.raw : `#${item.id} (${__( 'no title' )})`,
		}) ) );

	} else {

		pagesTree = pageItems.map( ( item ) => ({
			id:     item.id,
			name:   item.title.raw ? item.title.raw : `#${item.id} (${__( 'no title' )})`,
		}) );
	}

	return (
		<TreeSelect
			className="connections-directory--attributes__home_id"
			label={label}
			noOptionLabel={noOptionLabel}
			tree={pagesTree}
			selectedId={value}
			onChange={onChange}
			{...props}
		/>
	);
}

const applyWithSelect = withSelect( ( select, ownProps ) => {

	const { getEntityRecords } = select( 'core' );
	const { getCurrentPostId } = select( 'core/editor' );

	const postType = typeof ownProps.postType === 'undefined' ? 'page' : ownProps.postType;
	const postId   = getCurrentPostId();

	const query = {
		per_page:       -1,
		exclude:        postId,
		parent_exclude: postId,
		orderby:        'title',
		order:          'asc',
	};

	return {
		options: getEntityRecords( 'postType', postType, query ),
	};
} );

// const renderedSelect = applyWithSelect( PageSelect );

// export { renderedSelect as PageSelect };
export default applyWithSelect( PageSelect );
