/*jslint indent: 2, nomen: true, maxlen: 100 */
/*global require */

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
  
  const _ = require('lodash');
  const createRouter = require('@arangodb/foxx/router');
  const router = createRouter();
  module.context.use(router);

  const todos = module.context.collection('todos');

  var Todo = require("./models/todo").Model,
    joi = require('joi'),
    todoId = joi.string().description("The id of the Todo-Item");

  /** Lists of all Todos
   *
   * This function simply returns the list of all todos.
   */

  router.get('/ayeaye/todos', function (req, res) {
    res.json(_.map(todos.toArray(), function (todo) {
      return _.omit(todo, [ '_rev', '_id', '_oldRev' ]);
    }));
  });

  /** Creates a new Todo
   *
   * Creates a new Todo-Item. The information has to be in the
   * requestBody.
   */

  router.post('/ayeaye/todos', function (req, res) {
    res.json(_.omit(todos.insert(req.body), [ '_rev', '_id' ]));
  }).body(Todo);


  /** Updates a Todo
   *
   * Changes a Todo-Item. The information has to be in the
   * requestBody.
   */
  router.put('/ayeaye/todos/:id', function (req, res) {
    res.json(_.omit(todos.replace(req.param("id"), req.body), [ '_rev', '_id', '_oldRev' ]));
  }).pathParam("id", todoId).body(Todo);

  /** Removes a Todo
   *
   * Removes a Todo-Item.
   */

  router.delete('/ayeaye/todos/:id', function (req, res) {
    todos.remove(req.param("id"));
    res.json({ success: true });
  }).pathParam("id", todoId);
}());
