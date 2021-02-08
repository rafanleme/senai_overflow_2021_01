const express = require("express");

const authMiddleware = require("./middleware/authorization");
const uploadQuestions = require("./middleware/uploadQuestions");

const studentController = require("./controllers/students");
const questionController = require("./controllers/questions");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feed");
const sessionController = require("./controllers/sessions");
const categoriesController = require("./controllers/categories");

const studentValidators = require("./validators/students");
const questionValidators = require("./validators/questions");
const answerValidators = require("./validators/answers");
const uploadFirebase = require("./services/uploadFirebase");

const routes = express.Router();

//rotas públicas
routes.post("/sessions", sessionController.store);
routes.post("/students", studentValidators.create, studentController.store);

routes.use(authMiddleware);

//rotas privadas

//rotas de alunos
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//rotas de perguntas
routes.post(
  "/questions",
  uploadQuestions,
  uploadFirebase,
  questionValidators.create,
  questionController.store
);
routes.delete("/questions/:id", questionController.delete);
routes.put("/questions/:id", questionController.update);

//rotas de respostas
routes.post(
  "/questions/:id/answers",
  answerValidators.create,
  answerController.store
);

//rotas do feed
routes.get("/feed", feedController.index);

//rotas de categorias
routes.get("/categories", categoriesController.index);

module.exports = routes;
