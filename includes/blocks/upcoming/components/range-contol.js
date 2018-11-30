/**
 * External dependencies
 */
import classnames from 'classnames';
const { isFinite } = lodash;

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { withInstanceId } = wp.compose;

/**
 * Internal dependencies
 */
const { BaseControl, Button, Dashicon } = wp.components;

function RangeControl( {
	                       className,
	                       label,
	                       value,
	                       instanceId,
	                       onChange,
	                       beforeIcon,
	                       afterIcon,
	                       help,
	                       allowReset,
	                       initialPosition,
	                       ...props
                       } ) {
	const id = `inspector-range-control-${ instanceId }`;
	const resetValue = () => onChange();
	const onChangeValue = ( event ) => {
		const newValue = event.target.value;
		if ( newValue === '' ) {
			resetValue();
			return;
		}
		onChange( Number( newValue ) );
	};
	const initialSliderValue = isFinite( value ) ? value : initialPosition || '';

	return (
		<BaseControl
			label={ label }
			id={ id }
			help={ help }
			className={ classnames( 'components-range-control', className ) }
		>
			{ beforeIcon && <Dashicon icon={ beforeIcon } /> }
			<input
				className="components-range-control__slider"
				id={ id }
				type="range"
				value={ initialSliderValue }
				onChange={ onChangeValue }
				aria-describedby={ !! help ? id + '__help' : undefined }
				{ ...props } />
			{ afterIcon && <Dashicon icon={ afterIcon } /> }
			<input
				className="components-range-control__number"
				type="number"
				onChange={ onChangeValue }
				aria-label={ label }
				value={ initialSliderValue }
				{ ...props }
			/>
			{ allowReset &&
			<Button onClick={ resetValue } disabled={ value === undefined }>
				{ __( 'Reset' ) }
			</Button>
			}
		</BaseControl>
	);
}

const asInstance = withInstanceId( RangeControl );

export { asInstance as RangeControl };
// export default withInstanceId( RangeControl );
