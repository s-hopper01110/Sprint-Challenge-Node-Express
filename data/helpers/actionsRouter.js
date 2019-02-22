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
		res.status(400).json({ error: 'Please provide all requirements for the specified action.' });
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

actionRouter.delete('/:id', (req, res) => {
	const { id } = req.params;
	db
		.remove(id)
		.then((action) => {
			if (action) {
				res.status(204).end();
			} else {
				res.status(404).json({ success: false, message: 'The action with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The action could not be removed' });
		});
});

actionRouter.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	db
		.update( id, changes )
		.then((actionsUpdate) => {
			if (!actionsUpdate) {
				res.status(404).json({ success: false, message: 'The action with the specified ID does not exist.' });
			} else if ( !changes.description || !changes.project_id || !changes.notes || !changes.completed ) {
				return res.status(400).json({ success: false, message: 'Please provide all requirements for the specified action.' });
			} else {
				return res.status(200).json({ success: true, changes });
			}
		})
		.catch((err) => {
			res.status(500).json({ success: false, error: 'The action could not be modified.' });
		});
})





module.exports = actionRouter;