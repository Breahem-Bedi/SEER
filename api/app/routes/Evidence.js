const express = require('express');
const router = express.Router();
const {
  getEvidence,
  getEvidenceById,
  createEvidenceReview,
  moderateSubmission
} = require('../controllers/Evidence');
const { isAuthed, Roles } = require('../middleware/utils');

/* Get all evidence */
router.get('/', getEvidence);

/* Get specific evidence */
router.get('/:id', getEvidenceById);

/* Create evidence review */
router.post('/:id/reviews', isAuthed(), createEvidenceReview);

/* Moderate Submission */
router.post(
  '/:id/moderate',
  isAuthed([Roles.MODERATOR, Roles.ADMIN]),
  moderateSubmission
);

module.exports = router;
