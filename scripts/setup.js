"use strict";

var db = require("@arangodb").db,
    todos = module.context.collectionName("todos");

if (db._collection(todos) === null) {
  db._create(todos);
} 
