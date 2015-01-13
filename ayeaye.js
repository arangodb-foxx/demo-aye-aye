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

  throw "banana";
  var Foxx = require("org/arangodb/foxx"),
    ArangoError = require("org/arangodb").ArangoError,
    Todos = require("./repositories/todos").Repository,
    Todo = require("./models/todo").Model,
    _ = require("underscore"),
    joi = require('joi'),
    todoId = {
      type: joi.string().description("The id of the Todo-Item")
    },
    controller,
    todos;

  controller = new Foxx.Controller(applicationContext);

  todos = new Todos(applicationContext.collection("todos"), {
    model: Todo
  });

  /** Lists of all Todos
   *
   * This function simply returns the list of all todos.
   */

  controller.get('/todos', function (req, res) {
    res.json(_.map(todos.all(), function (todo) {
      return todo.forClient();
    }));
  });

  /** Creates a new Todo
   *
   * Creates a new Todo-Item. The information has to be in the
   * requestBody.
   */

  controller.post('/todos', function (req, res) {
    var todo = req.params("todo");
    res.json(todos.save(todo).attributes);
  }).bodyParam("todo", "The Todo you want to create", Todo);






  /** Updates a Todo
   *
   * Changes a Todo-Item. The information has to be in the
   * requestBody.
   */
  controller.put("/todos/:id", function (req, res) {
    var id = req.params("id"),
      todo = req.params("todo");
    res.json(todos.replaceById(id, todo));
  }).pathParam("id", todoId)
  .bodyParam("todo", "The Todo you want your old one to be replaced with", Todo);

  /** Removes a Todo
   *
   * Removes a Todo-Item.
   */

  controller.del("/todos/:id", function (req, res) {
    var id = req.params("id");
    todos.removeById(id);
    res.json({ success: true });
  }).pathParam("id", todoId)
  .errorResponse(ArangoError, 404, "The document could not be found");
}());
