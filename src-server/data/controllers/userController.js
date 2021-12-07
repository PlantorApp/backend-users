import mongoose from 'mongoose'
import { userSchema } from "../schemas/UserSchema.js"

const User = mongoose.model('User', userSchema)

// SENDGRID
import sgMail from '@sendgrid/mail'
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
sgMail.setApiKey("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")
// sgMail.setApiKey('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')

export const addNewUser = (req, res) => {
	let newUser = new User(req.body)

	newUser.save((err, user) => {
		if (err) {
			res.send(err)
		}
		res.json(user)
	})
}

export const getUsers = (req, res) => {
	User.find({}, (err, user) => {
		if (err) {
			res.send(err)
			console.log(err)
		}
		res.json(user)
	})
}

export const getUserByID = (req, res) => {
	User.findOne({ sub: req.params.sub }, (err, user) => {
		if (err) {
			res.send(err)
			console.log(`findById: Error`)
			// console.log(err)
		}
		res.json(user)
		// console.log(user)
	})
}

// export const getUserByEmail = (req, res) => {
// 	// console.log("email route")
// 	User.findOne({ email: req.params.email }, (err, user) => {
// 		if (err) {
// 			res.send(err)
// 		}
// 		res.json(user)
// 	})
// }

// export const updateUserByEmail = (req, res) => {
// 	User.findOneAndUpdate({ email: req.params.email }, req.body, { new: true, useFindAndModify: false }, (err, user) => {
// 		if (err) {
// 			res.send(err)
// 		}
// 		res.json(user)
// 	})
// }

export const updateUser = (req, res) => {
	User.findOneAndUpdate({ sub: req.params.sub }, req.body, { new: true, useFindAndModify: false }, (err, user) => {
		if (err) {
			res.send(err)
		}
		res.json(user)
	})
}

export const deleteUser = (req, res) => {
	User.remove({ sub: req.params.sub }, (err, user) => {
		if (err) {
			res.send(err)
		}
		res.json({ message: 'User Deleted'})
	})
}
export const sendMessage = (req, res) => {
	console.log('in sendMessage')
	const msg = {
		from: "DimpleDesk <noreply@dimpledesk.com>",
		to: req.body.to,
		cc: req.body.cc,
		bcc: "Sendgrid <sendgrid@dimpledesk.com>",
		replyTo: req.body.replyTo,
		subject: req.body.subject,
		text: req.body.message,
		html: req.body.message
	}
	console.log(msg)
	
	res.set({
		"Content-Type" : "application/json",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Credentials" : true
	})

	sgMail
		.send(msg)
		.then(() => {
				res.send("Email sent")
				// console.log('Email sent')
		})
		.catch((error) => {
			console.error(error)
		})
}
	
