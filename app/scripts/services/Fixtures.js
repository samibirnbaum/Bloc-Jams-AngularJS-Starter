/*this is a service which holds generic business logic, in this case the our album model/data*/
/*a service that provides us with our fixtures*/
(function() {

    function Fixtures() {
        var Fixtures = {};  /*this service holds an object which is returned*/
        
        var albumPicasso = {
            title: 'The Colors',
            artist: 'Pablo Picasso',
            label: 'Cubism',
            year: '1881',
            albumArtUrl: '/assets/images/album_covers/01.png',
            songs: [
              { title: 'Blue', duration: '161.71', audioUrl: '/assets/music/blue' },
              { title: 'Green', duration: '103.96', audioUrl: '/assets/music/green' },
              { title: 'Red', duration: '268.45', audioUrl: '/assets/music/red' },
              { title: 'Pink', duration: '153.14', audioUrl: '/assets/music/pink' },
              { title: 'Magenta', duration: '374.22', audioUrl: '/assets/music/magenta' }
            ]
         };
         
        var albumMarconi = {
            title: 'The Telephone',
            artist: 'Guglielmo Marconi',
            label: 'EM',
            year: '1909',
            albumArtUrl: '/assets/images/album_covers/20.png',
            songs: [
              { title: 'Hello, Operator?', duration: '1:01' },
              { title: 'Ring, ring, ring', duration: '5:01' },
              { title: 'Fits in your pocket', duration: '3:21' },
              { title: 'Can you hear me now?', duration: '3:14' },
              { title: 'Wrong phone number', duration: '2:15' }
            ]
        };
        
        Fixtures.getAlbum = function() { /*this is the only method that exists in our fixtures object*/
            return albumPicasso          /*and it returns the albumPicasso object that it has access to in its local scope*/
        };
        
        return Fixtures;    /*you get this object when you inject (use) this service*/
    }

    
    
    angular
        .module("blocJams")
        .factory("Fixtures", Fixtures); /*when you inject this service as a dependancy to a module or controller, that module or controller will have access to the Fixtures object which is automatically returned by this service*/


})();