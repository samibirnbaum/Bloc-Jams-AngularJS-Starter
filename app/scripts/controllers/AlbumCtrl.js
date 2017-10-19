(function() {

    function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum(); /*using a method which lives in the fixtures service on the fixtures object, which we now have access to on the controller becasue we injected it into the controller*/
        this.songPlayer = SongPlayer; /*saves the SongPlayer object (service) to a property on the controller object, making it accessible within the controller*/
    }

    
    angular
        .module("blocJams")
        .controller("AlbumCtrl",["Fixtures", "SongPlayer", AlbumCtrl]); /*injected fixtures service - which returns an object for use*/

})();