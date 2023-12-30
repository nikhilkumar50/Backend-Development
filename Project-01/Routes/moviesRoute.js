const express = require("express");
const router = express.Router();
const users = require("../MOCK_DATA.json");
const fs = require("fs");
const {
  getIndividualUser,
  updateUser,
  deleteUser,
  getAllusers,
  createUser,
  checkId,
  validateBody
} = require("../controllers/moviesController");

router.param("id", checkId);

router
  .route("/:id")
  .get(getIndividualUser)
  .patch(updateUser)
  .delete(deleteUser);

router.route("/")
.get(getAllusers)
.post(validateBody,createUser);

module.exports = router;
 