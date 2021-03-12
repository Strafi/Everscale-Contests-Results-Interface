import React from 'react'

const ContestTableTh = ({ children, className, onClick = () => false, styles = {} }) => {
	let fullClassName = 'contest-table__cell contest-table__cell--th';

	if (className)
		fullClassName += ' ' + className;

	return (
		<th
			style={styles}
			onClick={onClick}
			className={fullClassName}
			align='center'
		>
			{children}
		</th>
	)
}

export default ContestTableTh;