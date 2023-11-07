import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './style.css'

const propTypes = {
	/**
	 * Specifies size as small | large for the spinner.
	 * @type ('sm'|'lg')
	 * @default ('md')
	 */
	size: PropTypes.oneOf(['sm', 'lg', 'md']),

	/**
	 * Specifies the motion color
	 * @default ('#267CB2')
	 */
	color: PropTypes.string,

	/**
	 * Specifies the circle color
	 * @default ('#DEDEDE')
	 */
	circleColor: PropTypes.string,

	/**
	 * Disables spinner wrapper
	 * @default ('false')
	 */
	disableWrapper: PropTypes.bool
}

const defaultProps = {
	size: 'md',
	color: '#267CB2',
	circleColor: '#DEDEDE',
	disableWrapper: false
}

const spinnerClassprefix = 'spinner'

const Spinner = (props) => {
	let { size, classes, color, circleColor, disableWrapper, children, ...attributes } = props

	const classList = classNames('spinner', classes, size && `${size}`)

	let style = {}
	style['borderColor'] = circleColor ? circleColor : defaultProps.circleColor
	style['borderTopColor'] = color ? color : defaultProps.color

	return (
		<div className={disableWrapper ? '' : 'spinner-wrapper flex-center'}>
			{children ? children : !disableWrapper && <div className='empty-string'>&nbsp;</div>} <div className={classList} style={style} {...attributes}></div>
		</div>
	)
}

Spinner.propTypes = propTypes
Spinner.defaultProps = defaultProps

export default Spinner
