const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./api/routes/index.js');

const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
	console.log(`Request_Endpoint: ${req.method} ${req.url}`);
	next();
});
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use(cors());

app.use('/api/v1/', api);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

app.get('*', (req, res) => {
	res.status(404).json({
		msg: 'Not Found'
	});
});

app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
