/*jslint indent: 2, nomen: true, maxlen: 100 */
/*global require, applicationContext */

////////////////////////////////////////////////////////////////////////////////
/// @brief A TODO-List Foxx-Application written for ArangoDB
///
/// @file
///
/// DISCLAIMER
///
/// Copyright 2010-2012 triagens GmbH, Cologne, Germany
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
/// Copyright holder is triAGENS GmbH, Cologne, Germany
///
/// @author Michael Hackstein
/// @author Copyright 2011-2013, triAGENS GmbH, Cologne, Germany
////////////////////////////////////////////////////////////////////////////////

(function () {
  "use strict";
  var Foxx = require("org/arangodb/foxx"),
    ArangoError = require("org/arangodb").ArangoError,
    Todos = require("./repositories/todos").Repository,
    Todo = require("./models/todo").Model,
    app,
    todos;

  app = new Foxx.Application(applicationContext);

  todos = new Todos(app.collection("todos"), {
    model: Todo
  });

  /** Lists of all Todos
   *
   * This function simply returns the list of all todos.
   *
   * Defines a GET event for the URL: prefix + /todos.
   */

  app.get('/todos', function (req, res) {
    res.json(todos.list());
  });

  /** Creates a new Todo
   *
   * Creates a new Todo-Item. The information has to be in the
   * requestBody.
   *
   * Define a POST event for the URL: prefix + /todos.
   */

  app.post('/todos', function (req, res) {
    var content = req.body();
    res.json(todos.create(content));
  });

  /** Updates a Todo
   *
   * Changes a Todo-Item. The information has to be in the
   * requestBody.
   *
   * Define a PUT event for the URL: prefix + /todos/:todoid.
   */

  app.put("/todos/:id", function (req, res) {
    var id = req.params("id"),
      content = req.body();
    res.json(todos.update(id, content));
  }).pathParam("id", {
    description: "The id of the Todo-Item",
    type: "string"
  });

  /** Removes a Todo
   *
   * Removes a Todo-Item.
   *
   * Define a DELETE event for the URL: prefix + /todos/:todoid.
   */

  app.del("/todos/:id", function (req, res) {
    var id = req.params("id");
    res.json(todos.destroy(id));
  }).pathParam("id", {
    description: "The ID of the Todo-Item",
    type: "string"
  }).errorResponse(ArangoError, 404, "The document could not be found");
}());
