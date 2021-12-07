import { 
	addNewUser, 
	getUsers, 
	getUserByID, 
	// getUserByEmail, 
	updateUser, 
	// updateUserByEmail, 
	deleteUser,
	sendMessage
} from '../controllers/userController.js';
import validateJwt from '../../../validateJwt.js';

const routes = (app) => {
	app.route('/users')
		.get(async (req, res, next) => {
			let isValidToken = false;
			const token = req.headers['authorization'];
			if(!token) {
				res.status(401).setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({AuthError: "No Token" }));
			} else {
				let result = await validateJwt(token);
				if(result?.iss === "https://accounts.google.com") {
					isValidToken = true;
				}
				if(isValidToken) {
					console.log(`Request from: ${req.originalUrl}`);
					console.log(`Request type: ${req.method}`);
					next();
				} else {
					res.status(401).setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({ AuthError: "Invalid Auth Token" }));
				}
			}
			// Middlware
		}, getUsers)
		// This is a post endpoint
		.post(addNewUser)

		// try {
	app.route('/users/:sub')
		// Get a specific user
		.get(async (req, res, next) => {
			let isValidToken = false;
			const token = req.headers['authorization'];
			if(!token) {
				res.status(401).setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({AuthError: "No Token" }));
			} else {
				let result = await validateJwt(token);
				if(result?.iss === "https://accounts.google.com") {
					isValidToken = true;
				}
				if(isValidToken) {
					console.log(`Request from: ${req.originalUrl}`);
					console.log(`Request type: ${req.method}`);
					next();
				} else {
					res.status(401).setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({ AuthError: "Invalid Auth Token" }));
				}
			}
			// Middlware
		}, getUserByID)
		// Update a specific user
		.put(async (req, res, next) => {
			let isValidToken = false;
			const token = req.headers['authorization'];
			if(!token) {
				res.status(401).setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({AuthError: "No Token" }));
			} else {
				let result = await validateJwt(token);
				if(result?.iss === "https://accounts.google.com") {
					isValidToken = true;
				}
				if(isValidToken) {
					console.log(`Request from: ${req.originalUrl}`);
					console.log(`Request type: ${req.method}`);
					next();
				} else {
					res.status(401).setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({ AuthError: "Invalid Auth Token" }));
				}
			}
			// Middlware
		}, updateUser)
		// Delete a specific user
		.delete(async (req, res, next) => {
			let isValidToken = false;
			const token = req.headers['authorization'];
			if(!token) {
				res.status(401).setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({AuthError: "No Token" }));
			} else {
				let result = await validateJwt(token);
				if(result?.iss === "https://accounts.google.com") {
					isValidToken = true;
				}
				if(isValidToken) {
					console.log(`Request from: ${req.originalUrl}`);
					console.log(`Request type: ${req.method}`);
					next();
				} else {
					res.status(401).setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({ AuthError: "Invalid Auth Token" }));
				}
			}
			// Middlware
		}, deleteUser)
		// } catch(e) {
		// 	app.route('/users/*')
		// 		.get((req, res) => {
		// 			console.log(`Request from: ${req.originalUrl}`)
		// 			console.log(`Request type: ${req.method}`) 
		// 			res.send({})
		// 			// res.send(`You try to ${req.method} from ${req.originalUrl}.`)
		// 		})
		// }

	// app.route('/email/:email')
	// 	// Get a specific user
	// 	.get(getUserByEmail)
	// 	.put(updateUserByEmail)

	// app.route('/sendmail')
	// 	.post(sendMessage)
	// 	.put(sendMessage)

	app.route('/*')
	.get((req, res) => {
		console.log(`Request from: ${req.originalUrl}`)
		console.log(`Request type: ${req.method}`) 
		res.send(`You try to ${req.method} from ${req.originalUrl}.`)
	})

	// app.route('/users/*')
	// 	.get((req, res) => {
	// 		console.log(`Request from: ${req.originalUrl}`)
	// 		console.log(`Request type: ${req.method}`) 
	// 		res.send(`You try to ${req.method} from ${req.originalUrl}.`)
	// 	})
}

export default routes
