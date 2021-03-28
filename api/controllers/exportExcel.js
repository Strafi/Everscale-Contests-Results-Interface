const xl = require('excel4node');
const createWbStyles = require('./helpers/createWbStyles.js')
const { EXPLORER_BASE_URL } = require('../../client/src/constants/index.js');

const SUBMISSIONS_SHEET_NAME = 'Submissions';
const JURY_SHEET_NAME = 'Jury';
const PAYOUTS_SHEET_NAME = 'Payouts';
const START_ROW_FOR_TABLE = 5;
const PAYOUT_MODIFIER = 1000000000;

const exportExcel = (req, res, next) => {
	try {
		const {
			title,
			link,
			submissions,
			jury,
			juryRewardPercent,
		} = req.body;
		const wb = new xl.Workbook({
			defaultFont: {
				name: 'Arial',
			}
		});
		const SubmissionsSheet = wb.addWorksheet(SUBMISSIONS_SHEET_NAME, {
			sheetFormat: {
				baseColWidth: 12,
			}
		});
		const JurySheet = wb.addWorksheet(JURY_SHEET_NAME, {
			sheetFormat: {
				baseColWidth: 12,
			}
		});
		const PayoutsSheet = wb.addWorksheet(PAYOUTS_SHEET_NAME, {
			sheetFormat: {
				baseColWidth: 12,
			}
		});

		const {
			defaultStyle,
			floatNumberStyle,
			headerStyle,
			tableHeaderStyle,
			tableFooterStyle,
			linkStyle,
			walletStyle,
			greenCellStyle,
			redCellStyle,
			payoutsStyle,
			rewardNumberStyle,
			defaultStyleDark,
			greenCellStyleDark,
			redCellStyleDark,
			linkStyleDark,
			walletStyleDark,
			floatNumberStyleDark,
			rewardNumberStyleDark,
		} = createWbStyles(wb);

		SubmissionsSheet.column(2).setWidth(18);
		SubmissionsSheet.column(3).setWidth(18);
		SubmissionsSheet.column(4).setWidth(14);
		SubmissionsSheet.column(7).setWidth(85);
		SubmissionsSheet.row(2).setHeight(30);
		SubmissionsSheet.cell(2, 1, 2, 7, true).link(link, title).style(headerStyle);
		SubmissionsSheet.cell(4, 1).string('Place').style(tableHeaderStyle);
		SubmissionsSheet.cell(4, 2).string('Reward').style(tableHeaderStyle);
		SubmissionsSheet.cell(4, 3).string('Submission No').style(tableHeaderStyle);
		SubmissionsSheet.cell(4, 4).string('Avg. Score').style(tableHeaderStyle);
		SubmissionsSheet.cell(4, 5).string('Accepted').style(tableHeaderStyle);
		SubmissionsSheet.cell(4, 6).string('Rejected').style(tableHeaderStyle);
		SubmissionsSheet.cell(4, 7).string('Wallet').style(tableHeaderStyle);

		let baseRowForCycle = START_ROW_FOR_TABLE;
		submissions.forEach((subm, index) => {
			const isLight = !(index % 2 === 0 || index === 0);
			SubmissionsSheet.cell(baseRowForCycle, 1).number(subm.place).style(isLight ? defaultStyle : defaultStyleDark);
			SubmissionsSheet.cell(baseRowForCycle, 2).number(subm.reward).style(isLight ? rewardNumberStyle : rewardNumberStyleDark);
			SubmissionsSheet.cell(baseRowForCycle, 3).link(subm.link, `${subm.id}`).style(isLight ? linkStyle : linkStyleDark);
			SubmissionsSheet.cell(baseRowForCycle, 4).number(subm.score).style(isLight ? floatNumberStyle : floatNumberStyleDark);
			SubmissionsSheet.cell(baseRowForCycle, 5).number(subm.acceptAmount).style(isLight ? greenCellStyle : greenCellStyleDark);
			SubmissionsSheet.cell(baseRowForCycle, 6).number(subm.rejectAmount).style(isLight ? redCellStyle : redCellStyleDark);
			SubmissionsSheet.cell(baseRowForCycle, 7).link(`${EXPLORER_BASE_URL}${subm.address}`, subm.address).style(isLight ? walletStyle : walletStyleDark);
			baseRowForCycle++;
		})
		const colSubmReward = xl.getExcelAlpha(2);
		const rowSubmReward = baseRowForCycle;
		SubmissionsSheet.cell(baseRowForCycle, 1).string('Total:').style(tableFooterStyle);
		SubmissionsSheet.cell(baseRowForCycle, 2)
			.formula(`SUM(${colSubmReward}${START_ROW_FOR_TABLE}: ${colSubmReward}${rowSubmReward - 1})`)
			.style(tableFooterStyle);
		SubmissionsSheet.cell(baseRowForCycle, 3, baseRowForCycle, 7).style(tableFooterStyle);

		JurySheet.column(2).setWidth(18);
		JurySheet.column(3).setWidth(18);
		JurySheet.column(4).setWidth(14);
		JurySheet.column(7).setWidth(85);
		JurySheet.row(2).setHeight(30);
		JurySheet.cell(2, 1, 2, 7, true).link(link, 'Jury Rewards').style(headerStyle);
		JurySheet.cell(4, 1).string('Jury No').style(tableHeaderStyle);
		JurySheet.cell(4, 2).string('Reward').style(tableHeaderStyle);
		JurySheet.cell(4, 3).string('Votes Count').style(tableHeaderStyle);
		JurySheet.cell(4, 4).string('Accepted').style(tableHeaderStyle);
		JurySheet.cell(4, 5).string('Abstained').style(tableHeaderStyle);
		JurySheet.cell(4, 6).string('Rejected').style(tableHeaderStyle);
		JurySheet.cell(4, 7).string('Wallet').style(tableHeaderStyle);

		baseRowForCycle = START_ROW_FOR_TABLE;
		const lastJuryRow = baseRowForCycle + jury.length;
		const colJurTotal = xl.getExcelAlpha(3);
		const colJurAbst = xl.getExcelAlpha(5);
		jury.forEach((jur, index) => {
			const isLight = !(index % 2 === 0 || index === 0);
			JurySheet.cell(baseRowForCycle, 1).number(jur.id).style(isLight ? defaultStyle : defaultStyleDark);
			const totalSubmRewardCell = `${SUBMISSIONS_SHEET_NAME}!$${colSubmReward}$${rowSubmReward}`;
			const juryRewardMultiplier = juryRewardPercent ? juryRewardPercent / 100 : 0;
			JurySheet.cell(baseRowForCycle, 2)
				.formula(`IF(${totalSubmRewardCell}>0,(${colJurTotal}${baseRowForCycle}-${colJurAbst}${baseRowForCycle})/($${colJurTotal}$${lastJuryRow}-$${colJurAbst}$${lastJuryRow})*${totalSubmRewardCell}*${juryRewardMultiplier}, 0)`)
				.style(isLight ? floatNumberStyle : floatNumberStyleDark);
			JurySheet.cell(baseRowForCycle, 3).number(jur.totalVotes).style(isLight ? defaultStyle : defaultStyleDark);
			JurySheet.cell(baseRowForCycle, 4).number(jur.acceptAmount).style(isLight ? greenCellStyle : greenCellStyleDark);
			JurySheet.cell(baseRowForCycle, 5).number(jur.abstainAmount).style(isLight ? defaultStyle : defaultStyleDark);
			JurySheet.cell(baseRowForCycle, 6).number(jur.rejectAmount).style(isLight ? redCellStyle : redCellStyleDark);
			JurySheet.cell(baseRowForCycle, 7).link(`${EXPLORER_BASE_URL}${jur.address}`, jur.address).style(isLight ? walletStyle : walletStyleDark);
			baseRowForCycle++;
		});
		JurySheet.cell(baseRowForCycle, 1).string('Total:').style(tableFooterStyle);
		JurySheet.cell(baseRowForCycle, 2)
			.formula(`SUM(${colSubmReward}${START_ROW_FOR_TABLE}: ${colSubmReward}${baseRowForCycle - 1})`)
			.style(tableHeaderStyle);
		JurySheet.cell(baseRowForCycle, 3)
			.formula(`SUM(${colJurTotal}${START_ROW_FOR_TABLE}: ${colJurTotal}${baseRowForCycle - 1})`)
			.style(tableFooterStyle);
		JurySheet.cell(baseRowForCycle, 4)
			.formula(`SUM(${xl.getExcelAlpha(4)}${START_ROW_FOR_TABLE}: ${xl.getExcelAlpha(4)}${baseRowForCycle - 1})`)
			.style(tableFooterStyle);
		JurySheet.cell(baseRowForCycle, 5)
			.formula(`SUM(${colJurAbst}${START_ROW_FOR_TABLE}: ${colJurAbst}${baseRowForCycle - 1})`)
			.style(tableFooterStyle);
		JurySheet.cell(baseRowForCycle, 6)
			.formula(`SUM(${xl.getExcelAlpha(6)}${START_ROW_FOR_TABLE}: ${xl.getExcelAlpha(6)}${baseRowForCycle - 1})`)
			.style(tableFooterStyle);
		JurySheet.cell(baseRowForCycle, 7).style(tableFooterStyle);

		PayoutsSheet.column(1).setWidth(85);
		PayoutsSheet.column(2).setWidth(25);
		baseRowForCycle = 1;
		let refTableRowForCycle = START_ROW_FOR_TABLE;
		submissions.forEach(subm => {
			if (subm.reward) {
				PayoutsSheet.cell(baseRowForCycle, 1)
					.formula(`${SUBMISSIONS_SHEET_NAME}!$${xl.getExcelAlpha(7)}$${refTableRowForCycle}`)
					.style(walletStyle);
				PayoutsSheet.cell(baseRowForCycle, 2)
					.formula(`${SUBMISSIONS_SHEET_NAME}!$${colSubmReward}$${refTableRowForCycle}*${PAYOUT_MODIFIER}`)
					.style(payoutsStyle);
				baseRowForCycle++;
			}
			refTableRowForCycle++;
		})

		refTableRowForCycle = START_ROW_FOR_TABLE;
		jury.forEach(() => {
			PayoutsSheet.cell(baseRowForCycle, 1)
				.formula(`${JURY_SHEET_NAME}!$${xl.getExcelAlpha(7)}$${refTableRowForCycle}`)
				.style(walletStyle);
			PayoutsSheet.cell(baseRowForCycle, 2)
				.formula(`${JURY_SHEET_NAME}!$${colSubmReward}$${refTableRowForCycle}*${PAYOUT_MODIFIER}`)
				.style(payoutsStyle);
			baseRowForCycle++;
			refTableRowForCycle++;
		})
		
		wb.write(`${title}.xlsx`, res);
	} catch(err) {
		console.error(err);

		res.status(500).json({
			body: 'Internal error while parsing results table'
		});
	}
};

module.exports = exportExcel;
