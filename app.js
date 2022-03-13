const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	flash = require('connect-flash');
var razorpay = require('razorpay');
var port = process.env.PORT || 3000;

mongoose
	.connect('mongodb+srv://kunal-kariwala:kunal@123@cluster0.wqrou.mongodb.net/<Appoyo>?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('connected to DB!');
	})
	.catch(err => {
		console.log('error message:' + err.message);
	});
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use('/web', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create_order', function (req, res) {
	let instance = new razorpay({
		key_id: 'rzp_test_3F8LHVYduGxiRr',
		key_secret: 'cprA9A7J3Sa3SvjJpWwIkmKg',
	});

	instance.orders.create(
		{
			amount: 1000 * 100,
			currency: 'INR',
		},
		function (err, order) {
			if (err) {
				console.log('error', err);
				res.json({ success: 0, message: 'Sorry there is some error' });
			} else {
				console.log(order);
				res.json({ success: 1, message: 'Success', orderId: order.id });
			}
		}
	);
});
app.get('/payment', function (req, res) {
	res.render('paymentattmpt.ejs');
});
app.get('/', function (req, res) {
	res.render('home.ejs');
});
app.get('/main', function (req, res) {
	res.render('home2.ejs');
});
app.get('/causes', function (req, res) {
	res.render('causes.ejs');
});

app.get('/womendev', function (req, res) {
	res.render('Womendevelopment.ejs');
});

app.get('/womendev/ngos', function (req, res) {
	res.render('showngos.ejs');
});

app.get('/womendev/sewa', function (req, res) {
	res.render('sewa.ejs');
});

app.get('/womendev/afterdonation', function (req, res) {
	res.render('afterdonation.ejs');
});
app.listen(port, function () {
	console.log('Server Has Started!');
});
