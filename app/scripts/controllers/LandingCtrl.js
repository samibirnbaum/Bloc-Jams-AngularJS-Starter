(function () {      /*encapsulated code out of the global scope using an iife*/

    function LandingCtrl() {    /*holds ctrl business logic/model which will be instantiated as an object, on the Angular built in $scope object*/
        this.heroTitle = "Turn the Music Up!";
    }

    angular
        .module("blocJams") /*this does not set a new module because the module was set in app.js - we are just getting it here so we can add a controller to it*/
        .controller("LandingCtrl", LandingCtrl); /*controller is a CF so capitalised not camel case*/

})();