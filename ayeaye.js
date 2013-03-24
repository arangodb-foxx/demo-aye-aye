/*jslint indent: 2, nomen: true, maxlen: 100, white: true, plusplus: true, unparam: true */
/*global todos*/
/*global require, applicationContext*/

////////////////////////////////////////////////////////////////////////////////
/// @brief A TODO-List Foxx-Application written for ArangoDB
///
/// @file
///
/// DISCLAIMER
///
/// Copyright 2010-2013 triagens GmbH, Cologne, Germany
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

(function() {
  "use strict";

  // Initialise a new FoxxApplication called app under the urlPrefix: "ayeaye".
  var FoxxApplication = require("org/arangodb/foxx").FoxxApplication,
    app = new FoxxApplication({
      urlPrefix: "ayeaye"
    });

  
  app.models = {
    todos: "models/todos"
  };
  
  // Define a GET event for the URL: prefix + /todos
  // This is used to retrieve the complete list of Todos.
  app.get('/todos', function (req, res) {
    // Return the complete content of the Todos-Collection
    res.json(todos.list());
  });  

  // Define a POST event for the URL: prefix + /todos
  // This is used to create a new Todo.
  app.post('/todos', function (req, res) {
    var content = JSON.parse(req.requestBody);
    // Trigger the save event of the model with
    // the given Request Body and return the result.
    res.json(todos.save(content));
  });

  // Define a PUT event for the URL: prefix + /todos/:todoid
  // This is used to update an existing Todo.
  app.put("/todos/:id", function (req, res) {
    var id = req.params("id"),
      content = JSON.parse(req.requestBody);
    // Trigger the update event of the model with
    // the given Request Body and id.
    // Then return the result.
    res.json(todos.update(id, content));
  });

  // Define a DELETE event for the URL: prefix + /todos/:todoid
  // This is used to remove an existing Todo.
  app['delete']("/todos/:id", function (req, res) {
    var id = req.params("id");
    // Trigger the remove event in the collection with
    // the given id and return the result.
    res.json(todos.destroy(id));
  });

  // Start the todo-list application.
  // Remember to give the applicationContext.
  app.start(applicationContext);
}());