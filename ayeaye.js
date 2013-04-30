/*jslint indent: 2, nomen: true, maxlen: 100, white: true, plusplus: true, unparam: true */
/*global todos*/
/*global require, applicationContext, repositories*/

////////////////////////////////////////////////////////////////////////////////
/// @brief A TODO-List Foxx-Application written for ArangoDB
///
/// @file
///
/// DISCLAIMER
///
/// The MIT License (MIT)
/// 
/// Copyright (c) 2010-2013 triagens GmbH, Cologne, Germany
/// 
/// Permission is hereby granted, free of charge, to any person obtaining a copy
/// of this software and associated documentation files (the "Software"), to deal
/// in the Software without restriction, including without limitation the rights
/// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
/// copies of the Software, and to permit persons to whom the Software is
/// furnished to do so, subject to the following conditions:
/// 
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
/// 
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
/// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
/// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
/// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
/// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
/// THE SOFTWARE.
///
/// Copyright holder is triAGENS GmbH, Cologne, Germany
///
/// @author Michael Hackstein
/// @author Copyright 2011-2013, triAGENS GmbH, Cologne, Germany
////////////////////////////////////////////////////////////////////////////////

(function() {
  "use strict";

  // Initialise a new FoxxApplication called app under the urlPrefix: "ayeaye".
  var FoxxApplication = require("org/arangodb/foxx").Application,
    app = new FoxxApplication();

  // Register a repository with the name todos
  // which uses a self implemented model and an repository
  app.registerRepository(
    "todos",
    {
      repository: "repositories/todos"
    }
  );
  
  // Define a GET event for the URL: prefix + /todos
  // This is used to retrieve the complete list of Todos.
  app.get('/todos', function (req, res) {
    // Return the complete content of the Todos-Collection
    res.json(repositories.todos.list());
  }).nickname("todos")
  .summary("List of all Todos.")
  .notes("This function simply returns the list of all todos"); 

  // Define a POST event for the URL: prefix + /todos
  // This is used to create a new Todo.
  app.post('/todos', function (req, res) {
    var content = JSON.parse(req.requestBody),
      todo = new repositories.todos.modelPrototype(content);
    // Trigger the save event of the model with
    // the given Request Body and return the result.
    res.json(repositories.todos.save(todo));
  }).nickname("todos")
  .summary("Create a new Todo")
  .notes("Creates a new Todo-Item. The information has to be in the requestBody."); 

  // Define a PUT event for the URL: prefix + /todos/:todoid
  // This is used to update an existing Todo.
  app.put("/todos/:id", function (req, res) {
    var id = req.params("id"),
      content = JSON.parse(req.requestBody),
      todo = new repositories.todos.modelPrototype(content);
    // Trigger the update event of the model with
    // the given Request Body and id.
    // Then return the result.
    res.json(repositories.todos.update(id, todo));
  }).nickname("todos")
  .summary("Update a Todo")
  .notes("Changes a Todo-Item. The information has to be in the requestBody."); 
  

  // Define a DELETE event for the URL: prefix + /todos/:todoid
  // This is used to remove an existing Todo.
  app['delete']("/todos/:id", function (req, res) {
    var id = req.params("id");
    // Trigger the remove event in the collection with
    // the given id and return the result.
    res.json(repositories.todos.destroy(id));
  }).nickname("todos")
  .pathParam("id", {
    description: "The id of the Todo-Item",
    dataType: "string",
    required: true,
    multiple: false
  })
  .summary("Removes a Todo")
  .notes("Removes a Todo-Item."); 
  

  // Start the todo-list application.
  // Remember to give the applicationContext.
  app.start(applicationContext);
}());
