/*this service holds a factory type service to hold data/behaviour about the song playing which as a service can be injected into every controller for the benefit of each view*/
(function() {

    function SongPlayer() {
        var SongPlayer = {}; /*like other service the intention is to create an object thats properties and methods will be available to whichever component decides to use the service*/
        
        var currentSong = null; /*this will hold song element (happens to be an object) from songs array which we can track song with*/
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null; /*just registering here, will always be some object*/

        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
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
        
        
        /*a method on the SongPlayer object (service) that will allow us to play a song*/
        SongPlayer.play = function(song) {
            if(currentSong !== song){ /*changing song(could be nothing to something)*/
                /*set the song - turn off the old, create the new*/
                setSong(song);
                currentBuzzObject.play();
                song.playing = true;
            
            } else if(currentSong === song){ /*this is whole function is connnected to play button so only applies when song is not already playing*/
                if(currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                    song.playing = true;
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