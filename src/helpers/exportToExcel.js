function exportToExcel(htmlTable, contestTitle) {
	const baseUri = 'data:application/vnd.ms-excel;base64,';
	const template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
	
	const base64 = string => {
		return window.btoa(unescape(encodeURIComponent(string)))
	};

	const format = (s, c) => {
		return s.replace(/{(\w+)}/g, (m, p) => {
			return c[p];
		})
	};

	const downloadTable = url => {
		const link = document.createElement("a");
		link.download = "export.xlsx";
		link.href = url;
		link.click();
	}

	const ctx = {
		worksheet : contestTitle,
		table : htmlTable
	}
	const url = baseUri + base64(format(template, ctx));

	downloadTable(url);
}

export default exportToExcel;