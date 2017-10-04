
(function(){                       /*encapsulating module out of the global scope using iife*/

    function config ($stateProvider, $locationProvider) {  /*configuring default behaviour of a module with providers*/
        $locationProvider /*SET properties on the location object*/
            .html5mode ({
                enabled: true, /*disables hashbang url when user changes location*/
                requireBase: false            
            });
        $stateProvider /*SET default settings for the state*/
            .state("landing", { /*name of the state*/
                url: "/",       /*its url in the browser*/
                templateUrl: "/templates/landing.html" /*when you acces that url what template (state) it will activate*/
            })
            .state("album", {
                url: "/album",
                templateUrl: "/templates/album.html"
            });
        
    }
    
    angular
        .module("blocJams", ["ui.router"])
        .config(config);

})();