# aye-aye
### A [TodoMVC](http://todomvc.com/) Foxx application written for ArangoDB.

The goal of Foxx apps implemented in [ArangoDB](https://github.com/triAGENS/ArangoDB) is to easily create simple REST interfaces. The included asset pipeline allows it to deliver complete single page applications (e.g. using [Backbone.js](http://www.backbonejs.org)) without a separate backend layer written in an arbitrary web framework. A Foxx app can be used to provide a basic application logic and a persistent data-storage in ArangoDB.

aye-aye is an introducing example for this. It consists of a simple frontend and backend component.


## Frontend

The backbone frontend is based on [TodoMVC's Backbone.js example](https://github.com/addyosmani/todomvc/tree/gh-pages/architecture-examples/backbone/). (All credits to the authors.) It shows how the MV* pattern is applied in Backbone.js.

The original persistance layer (backbone-local-storage) has been replaced to use the REST-Interface defined in the aye-aye-foxx. This was easily archived by adding an `url` function to all models and collections and removing the backbone-local-storage.


## Backend

The backend is a Foxx application written for [ArangoDB](https://github.com/triAGENS/ArangoDB). It consists of five parts:

### Manifest

The [manifest](manifest.json) is a general description of the Foxx application, including name and version. Also it defines the location of all files, including the assets to build the frontend.

### Setup

This [script](scripts/setup.js) is executed whenever the aye-aye is mounted to a path. It creates the collection for our ToDos.

### Teardown

This [script](scripts/teardown.js) is executed whenever a the aye-aye is uninstalled from a path. It drops the collection of ToDos.

### Models

Define the models that are executed within the Arango.
The `todos` model offers 4 functions:

* save: Store a new Todo.
* destroy: Remove the given Todo.
* list: Give a list of all Todos.
* update: Overwrite the given Todo.

### Libs

Further libraries, but this feature is not used in the aye-aye.

### The App

The `ayeaye.js` defines the REST interface.
At first it requires the `todo`-model and creates a new Foxx.
Then it defines the offered REST functions:

* `/todo` GET: Invokes todos.list
* `/todo` POST: Invokes todos.save
* `/todo/:id` PUT: Invokes todos.update
* `/todo/:id` DELETE: Invokes todo.destroy


## Installation

After [installing ArangoDB](http://www.arangodb.org/download), start your server and point it to the location of the cloned repository:

    $ arangod --javascript.dev-app-path /path/to/aye-aye /path/to/your/arango_db

Then start your Arango shell (`$ arangosh`) and run the following commands:

    arangosh> aal = require('org/arangodb/aal');
    arangosh> aal.installDevApp('aye-aye', '/todo');

In this case, aye-aye gets mounted to '/todo' as main directory (but you can of cause adjust the path to your liking). Point your browser to `http://localhost:8529/todo/` to run the application.


## License

This code is distributed under the [Apache License](http://www.apache.org/licenses/LICENSE-2.0).
