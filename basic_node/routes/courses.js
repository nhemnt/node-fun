const express = require('express');
const router = express.Router();

const errorMessage = "Wrong Details!";
const courses = [
  { id: 1, name: 'course1' },  
  { id: 2, name: 'course2' },  
  { id: 3, name: 'course3' },  
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name || name.length < 3) return res.status(400).send(errorMessage);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

router.put('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');    

  const { name } = validateCourse(req.body); 
  if (!name) return res.status(400).send(errorMessage);
  
  course.name = req.body.name; 
  res.send(course);
});

router.delete('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');
  res.send(course);
});

module.exports = router; 