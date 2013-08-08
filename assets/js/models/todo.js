/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  // Todo Model
  // ----------

  // Our basic **Todo** model has `title`, `order`, and `completed` attributes.
  app.Todo = Backbone.Model.extend({
    // Default attributes for the todo
    // and ensure that each todo created has `title` and `completed` keys.
    defaults: {
      title: '',
      completed: false
    },

    // Added by mchacki
    // URL points to the Aye-Aye Application
    url: function() {
      if (this.get("_key") !== undefined) {
        // If the Todo-Event is existing it has a _key attribute,
        // so we can use the id route.
        return "ayeaye/todos/" + this.get("_key");
      }
      // If we create a new Todo-Event we send the POST without the id.
      return "ayeaye/todos";
    },

    // Added by mchacki
    // Overwritten the isNew check of Backbone.
    // The ArangoDB creates a unique _id for ids
    // not an id as expected by backbone.
    isNew: function() {
      return this.get("_id") === undefined || this.get("_id") === null;
    },

    // Toggle the `completed` state of this todo item.
    toggle: function () {
      this.save({
        completed: !this.get('completed')
      });
    }
  });
})();
