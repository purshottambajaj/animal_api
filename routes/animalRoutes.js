const express = require('express');
const router = express.Router();
const Animal = require('../modles/animal');

// GET all animals
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new animal
router.post('/', async (req, res) => {
    const { id, name, species, age } = req.body;
  
    // Check if the animal already exists
    const existingAnimal = await Animal.findOne({ id: id });
    if (existingAnimal) {
      return res.status(400).json({ message: 'Animal already exists' });
    }
  
    // Create a new animal
    const animal = new Animal({
      id: id,       // Ensure 'id' is correctly defined in your schema
      name: name,
      species: species,
      age: age,
    });
  
    try {
      const newAnimal = await animal.save();
      res.status(201).json(newAnimal);
    } catch (err) {
      console.error(err);  // Log the error
      res.status(400).json({ message: err.message });
    }
  });
  

// PUT to update an animal
router.put('/:id', async (req, res) => {
  try {
    // Find the animal by its id
    const animal = await Animal.findOne({ id: req.params.id });
    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    // Update fields with request body values if provided
    animal.name = req.body.name || animal.name;
    animal.species = req.body.species || animal.species;
    animal.age = req.body.age || animal.age;

    // Save the updated animal
    const updatedAnimal = await animal.save();
    res.json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE an animal
router.delete('/:id', async (req, res) => {
  try {
    // Find and delete the animal by custom id
    const result = await Animal.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.json({ message: 'Animal deleted' });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
