/*jslint indent: 2, nomen: true, maxlen: 100, white: true, plusplus: true, unparam: true */
/*global exports, appCollection*/

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

(function () {
  "use strict";
  
  // Define the save functionality
  exports.save = function (content) {
    appCollection("todos").save(content);
  };
  
  // Define the functionality to remove one object from the collection
  exports.destroy = function (id) {
    appCollection("todos").remove(id);
  };
  
  // Define the functionality to display all elements in the collection
  exports.list = function () {
    appCollection("todos").toArray();
  };
  
  // Define the functionality to replace one document.
  exports.update = function (id, content) {
    appCollection("todos").replace(id, content);
  };
}());
