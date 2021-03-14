function createWbStyles(wb) {
	const defaultStyle = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#000000',
			size: 12,
		}
	});
	const floatNumberStyle = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#000000',
			size: 12,
		},
		numberFormat: '#,##0.00'
	});
	const rewardNumberStyle = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#000000',
			size: 12,
		},
		numberFormat: '#,##0'
	});
	const rewardNumberStyleBold = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#000000',
			size: 12,
			bold: true,
		},
		numberFormat: '#,##0'
	});
	const headerStyle = wb.createStyle({
		font: {
			color: '#5287C3',
			size: 24,
			underline: true,
		},
	});
	const tableHeaderStyle = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#303030',
			bold: true,
			size: 12,
		},
		numberFormat: '#,##0.00'
	});
	const linkStyle = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#0F8CFF',
			size: 12,
			underline: true,
		},
	});
	const walletStyle = wb.createStyle({
		font: {
			color: '#0F8CFF',
			size: 12,
			underline: true,
		},
	});
	const greenCellStyle = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#0D9F1C',
			size: 12,
		}
	});
	const redCellStyle = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#D20808',
			size: 12,
		}
	});
	
	const greenCellStyleDark = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#0D9F1C',
			size: 12,
		},
		fill: {
			type: 'pattern',
			patternType: 'solid',
			bgColor: '#EAEAEA',
			fgColor: '#EAEAEA',
		},
		border: {
			left: { color: '#c0c0c0', style: 'thin' },
			right: { color: '#c0c0c0', style: 'thin' },
			top: { color: '#c0c0c0', style: 'thin' },
			bottom: { color: '#c0c0c0', style: 'thin' }
		}
	});
	const redCellStyleDark = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#D20808',
			size: 12,
		},
		fill: {
			type: 'pattern',
			patternType: 'solid',
			bgColor: '#EAEAEA',
			fgColor: '#EAEAEA',
		},
		border: {
			left: { color: '#c0c0c0', style: 'thin' },
			right: { color: '#c0c0c0', style: 'thin' },
			top: { color: '#c0c0c0', style: 'thin' },
			bottom: { color: '#c0c0c0', style: 'thin' }
		}
	});
	const linkStyleDark = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#0F8CFF',
			size: 12,
			underline: true,
		},
		fill: {
			type: 'pattern',
			patternType: 'solid',
			bgColor: '#EAEAEA',
			fgColor: '#EAEAEA',
		},
		border: {
			left: { color: '#c0c0c0', style: 'thin' },
			right: { color: '#c0c0c0', style: 'thin' },
			top: { color: '#c0c0c0', style: 'thin' },
			bottom: { color: '#c0c0c0', style: 'thin' }
		}
	});
	const walletStyleDark = wb.createStyle({
		font: {
			color: '#0F8CFF',
			size: 12,
			underline: true,
		},
		fill: {
			type: 'pattern',
			patternType: 'solid',
			bgColor: '#EAEAEA',
			fgColor: '#EAEAEA',
		},
		border: {
			left: { color: '#c0c0c0', style: 'thin' },
			right: { color: '#c0c0c0', style: 'thin' },
			top: { color: '#c0c0c0', style: 'thin' },
			bottom: { color: '#c0c0c0', style: 'thin' }
		}
	});
	const defaultStyleDark = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#000000',
			size: 12,
		},
		fill: {
			type: 'pattern',
			patternType: 'solid',
			bgColor: '#EAEAEA',
			fgColor: '#EAEAEA',
		},
		border: {
			left: { color: '#c0c0c0', style: 'thin' },
			right: { color: '#c0c0c0', style: 'thin' },
			top: { color: '#c0c0c0', style: 'thin' },
			bottom: { color: '#c0c0c0', style: 'thin' }
		}
	});
	const floatNumberStyleDark = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#000000',
			size: 12,
		},
		numberFormat: '#,##0.00',
		fill: {
			type: 'pattern',
			patternType: 'solid',
			bgColor: '#EAEAEA',
			fgColor: '#EAEAEA',
		},
		border: {
			left: { color: '#c0c0c0', style: 'thin' },
			right: { color: '#c0c0c0', style: 'thin' },
			top: { color: '#c0c0c0', style: 'thin' },
			bottom: { color: '#c0c0c0', style: 'thin' }
		}
	});
	const rewardNumberStyleDark = wb.createStyle({
		alignment: {
			horizontal: 'center',
		},
		font: {
			color: '#000000',
			size: 12,
		},
		numberFormat: '#,##0',
		fill: {
			type: 'pattern',
			patternType: 'solid',
			bgColor: '#EAEAEA',
			fgColor: '#EAEAEA',
		},
		border: {
			left: { color: '#c0c0c0', style: 'thin' },
			right: { color: '#c0c0c0', style: 'thin' },
			top: { color: '#c0c0c0', style: 'thin' },
			bottom: { color: '#c0c0c0', style: 'thin' }
		}
	});

	return {
		defaultStyle,
		rewardNumberStyle,
		rewardNumberStyleBold,
		floatNumberStyle,
		headerStyle,
		tableHeaderStyle,
		linkStyle,
		walletStyle,
		greenCellStyle,
		redCellStyle,
		defaultStyleDark,
		greenCellStyleDark,
		redCellStyleDark,
		linkStyleDark,
		walletStyleDark,
		floatNumberStyleDark,
		rewardNumberStyleDark,
	}
}

module.exports = createWbStyles;