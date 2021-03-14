import React from 'react'

const ContestTableTd = ({ children, className, styles = {} }) => {
	let fullClassName = 'contest-table__cell';

	if (className)
		fullClassName += ' ' + className;

	return (
		<td
			style={styles}
			className={fullClassName}
		>
			{children}
		</td>
	)
}

export default ContestTableTd;