"use strict";

var db = require("@arangodb").db,
    todos = module.context.collectionName("todos"),
    collection = db._collection(todos);

if (collection !== null) {
  collection.drop();
}
