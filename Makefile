.PHONY: all assets

all: assets

assets:
	test -d files || mkdir files
	cp assets/index.html files/index.html

	test -d files/components/todomvc-common || mkdir -p files/components/todomvc-common
	cp assets/components/todomvc-common/base.css files/components/todomvc-common/base.css

	cat \
	  assets/components/js/underscore/*.js \
	  assets/components/js/jquery/*.js \
	  assets/components/js/backbone/*.js \
	  assets/components/js/todomvc-common/*.js \
	  assets/js/models/*.js \
	  assets/js/collections/*.js \
	  assets/js/views/*.js \
	  assets/js/routers/*.js \
	  assets/js/app.js \
        > files/apps.js
