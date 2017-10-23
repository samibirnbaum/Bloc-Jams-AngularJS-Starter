//controller for the player bar template
(function() {

    function PlayerBarCtrl(Fixtures, SongPlayer){ //injected services with generic logic
        this.albumData = Fixtures.getAlbum();     //taken album data from fixtures service and stored it in controller under controllers own property
        this.songPlayer = SongPlayer;             //store SongPlayer object (service) on controller object
    }

    angular
        .module("blocJams")
        .controller("PlayerBarCtrl" ,["Fixtures", "SongPlayer", PlayerBarCtrl]);


})();