const express = require('express');

const db = require('../helpers/actionModel.js');

const actionRouter = express.Router();

//GET:

actionRouter.get('/', (req, res) => {
	db
		.get()
		.then((actions) => {
			res.status(200).json({ success: true, actions });
		}) 
		.catch((err) => {
			res.status(500).json({ success: false, message: 'The actions could not be retrieved.' });
		});
});

//GET:

actionRouter.get('/:id', (req, res) => {
	const { id } = req.params;

	db
		.get(id)
		.then((actions) => {
			if (actions) {
				res.status(201).json({ success: true, actions });
			} else {
				res.status(404).json({ success: false, message: 'The actions with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ success: false, error: 'The actions could not be retrieved.' });
		});
});

//POST:

actionRouter.post('/', (req, res) => {
	const { description, project_id, notes, completed } = req.body;
	if ( !description || !project_id || !notes || !completed ) {
		res.status(400).json({ error: 'Please provide name of the all requirements for actions.' });
	} else {
		db
			.insert({ description, project_id, notes, completed })
			.then((actions) => {
				res.status(201).json(actions);
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error retrieving actions ' });
			});
	}
});





module.exports = actionRouter;