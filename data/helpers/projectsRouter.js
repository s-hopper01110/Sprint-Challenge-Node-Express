const express = require('express');

const db = require('../helpers/projectModel.js');

const projectRouter = express.Router();


//GET:

projectRouter.get('/', (req, res) => {
	db
		.get()
		.then((projects) => {
			res.status(200).json({ success: true, projects });
		}) 
		.catch((err) => {
			res.status(500).json({ success: false, message: 'The projects could not be retrieved.' });
		});
});

//GET:

projectRouter.get('/:id', (req, res) => {
	const { id } = req.params;

	db
		.get(id)
		.then((projects) => {
			if (projects) {
				res.status(201).json({ success: true, projects });
			} else {
				res.status(404).json({ success: false, message: 'The projects with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ success: false, error: 'The project requested could not be retrieved.' });
		});
});

//POST:

projectRouter.post('/', (req, res) => {
	const { name, description, completed } = req.body;
	if ( !name || !description || !completed ) {
		res.status(400).json({ error: 'Please provide all requirements for the specified project.' });
	} else {
		db
			.insert({ name, description, completed })
			.then((projects) => {
				res.status(201).json(projects);
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error retrieving the project. ' });
			});
	}
});

//DELETE:

projectRouter.delete('/:id', (req, res) => {
	const { id } = req.params;
	db
		.remove(id)
		.then((project) => {
			if (project) {
				res.status(204).end();
			} else {
				res.status(404).json({ success: false, message: 'The project with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The project requested could not be removed.' });
		});
});

//PUT:

projectRouter.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	db
		.update( id, changes )
		.then((projectsUpdate) => {
			if (!projectsUpdate) {
				res.status(404).json({ success: false, message: 'The project with the specified ID does not exist.' });
			} else if (!changes.name || !changes.description || !changes.completed ) {
				return res.status(400).json({ success: false, message: 'Please provide all requirements for the specified project.' });
			} else {
				return res.status(200).json({ success: true, changes });
			}
		})
		.catch((err) => {
			res.status(500).json({ success: false, error: 'The project requested could not be modified.' });
		});
})






module.exports = projectRouter;