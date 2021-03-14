const exportExcel = (req, res, next) => {
	console.log(req);

    res.status(200).json({
        body: 'Hello from the server!'
    });
};

module.exports = exportExcel;
