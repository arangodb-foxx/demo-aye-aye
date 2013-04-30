/*jslint indent: 2, nomen: true, maxlen: 100, white: true, plusplus: true, unparam: true */
/*global require, exports*/

////////////////////////////////////////////////////////////////////////////////
/// @brief A TODO-List Foxx-Application written for ArangoDB
///
/// @file This Document represents the repository communicating with ArangoDB
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


(function () {
  "use strict";
  
  var _ = require("underscore"),
    Foxx = require("org/arangodb/foxx"),
    Ayeaye_Repository = Foxx.Repository.extend({
      // Define the save functionality
      save: function (content) {
        this.collection.save(content.toJSON());
      },
      // Define the functionality to remove one object from the collection
      destroy: function (id) {
        this.collection.remove(id);
      },
      // Define the functionality to display all elements in the collection
      list: function () {
        var self = this;
        return _.map(this.collection.toArray(), function(o) {
          return new self.modelPrototype(o);
        });
      },
      // Define the functionality to replace one document.
      update: function (id, content) {
        this.collection.replace(id, content);
      }
    });
  exports.Repository = Ayeaye_Repository;
  
}());
