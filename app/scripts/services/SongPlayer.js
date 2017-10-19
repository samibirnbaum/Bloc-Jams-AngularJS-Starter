/*this service holds a factory type service to hold data/behaviour about the song playing which as a service can be injected into every controller for the benefit of each view*/
(function() {

    function SongPlayer() {
        var SongPlayer = {}; /*like other service the intention is to create an object thats properties and methods will be available to whichever component decides to use the service*/
        
        /**PRIVATE ATTRIBUTES
        * @name currentSong
        * @desc song object with all song info
        * @type {Object} 
        
        * @name currentBuzzObject  
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentSong = null; /*this will hold song element (happens to be an object) from songs array which we can track song with*/
        var currentBuzzObject = null; /*just registering here, will always be some object*/

        
        /**PRIVATE FUNCTIONS
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song

        * @function playSong
        * @desc plays currentBuzzObject and changes property on song object which impacts ng-show
        * @param {Object} song
        */
        var setSong = function(song) { /*only needed when changing songs*/
            //TURN OFF THE OLD
            if(currentBuzzObject){  /*if the current song was a song playing, quickly stop that song*/
                currentBuzzObject.stop();
                currentSong.playing = null; /*below we would have set current song to the song object so update the playing property on it*/
            }
            //CREATE THE NEW
            currentBuzzObject = new buzz.sound(song.audioUrl, { /*constructor function on the buzz library object to create new buzz object which we can then use the library with*/
                formats: ["mp3"],
                preload: true
            });
            currentSong = song; /*holds song element in songs array - track song with this*/
        };

        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        
        /**PUBLIC FUNCTIONS
        * @function play
        * @desc continue playing a paused song or play a brand new song
        * @param {Object} song

        * @function pause
        * @desc pause a currently playing song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if(currentSong !== song){ /*changing song(could be nothing to something)*/
                /*set the song - turn off the old, create the new*/
                setSong(song);
                playSong(song);
            
            } else if(currentSong === song){ /*this is whole function is connnected to play button so only applies when song is not already playing*/
                if(currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer; /*once service is injected, you get the SongPlayer object with all its methods and properties*/
    }

    
    angular
        .module("blocJams")
        .factory("SongPlayer", SongPlayer);

})();