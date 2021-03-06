
(function(){                       /*encapsulating module out of the global scope using iife*/

    function config ($stateProvider, $locationProvider) {  /*configuring default behaviour of a module with providers*/
        $locationProvider /*SET properties on the location object*/
            .html5Mode({
                enabled: true, /*disables hashbang url when user changes location*/
                requireBase: false            
            });
        $stateProvider /*SET default settings for the state*/ /*manipulate the url to load in a template*/
            .state("landing", { /*name of the state*/
                url: "/",       /*its url in the browser*/
                controller: "LandingCtrl as landing",
                templateUrl: "/templates/landing.html" /*for this landing state, this is the template html*/
            })
            .state("album", {
                url: "/album",
                controller: "AlbumCtrl as album",
                templateUrl: "/templates/album.html"
            })
            .state("collection", {
                url: "/collection",
                controller: "CollectionCtrl as collection",
                templateUrl: "/templates/collection.html"
            });
        
    }
    
    angular
        .module("blocJams", ["ui.router"])
        .config(config); /*our providers (configuration) added to the root module here*/

})();