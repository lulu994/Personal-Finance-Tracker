const express = require('express');
const entryController = require('../controllers/entryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Middleware to authenticate token for all entry-related routes
router.use(authMiddleware.authenticateToken);

router.post('/add-entry', entryController.addEntry);
router.get('/get-entries', entryController.getEntries);

module.exports = router;
