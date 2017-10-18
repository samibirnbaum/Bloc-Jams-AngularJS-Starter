(function() {

    function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum(); /*using a method which lives in the fixtures service on the fixtures object, which we now have access to on the controller becasue we injected it into the controller*/
    }

    
    angular
        .module("blocJams")
        .controller("AlbumCtrl",["Fixtures", AlbumCtrl]); /*injected fixtures service - which returns an object for use*/

})();