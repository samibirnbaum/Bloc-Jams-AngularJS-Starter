/*this service holds a factory type service to hold data/behaviour about the song playing which as a service can be injected into every controller for the benefit of each view*/
(function() {

    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {}; /*like other service the intention is to create an object thats properties and methods will be available to whichever component decides to use the service*/
        
        /**PRIVATE ATTRIBUTES
        * @name currentBuzzObject  
        * @desc Buzz object audio file
        * @type {Object}

        * @name currentAlbum  
        * @desc Stores all the data about album including songs array
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        var currentBuzzObject = null; /*just registering here, will always be some object*/

        
        /**PRIVATE FUNCTIONS 
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject + tracks songs progress
        * @param {Object} song

        * @function playSong
        * @desc plays currentBuzzObject and changes property on song object which impacts ng-show
        * @param {Object} song
        
        * @function getSongIndex
        * @desc for whatever song is playing, it will give us its index in the songs array
        * @param {Number} song

        * @function stopSong
        * @desc stops currentBuzzObject and changes property on song object which impacts ng-show
        */
       
        var setSong = function(song) { /*only needed when changing songs*/
            //TURN OFF THE OLD
            if(currentBuzzObject){  /*if the current song was a song playing, quickly stop that song*/
                stopSong();
            }
            //CREATE THE NEW
            currentBuzzObject = new buzz.sound(song.audioUrl, { /*constructor function on the buzz library object to create new buzz object which we can then use the library with*/
                formats: ["mp3"],
                preload: true
            });
            //As it plays update current time
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {//time update change will sit on the $rootScope
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            SongPlayer.currentSong = song; /*holds song element in songs array - track song with this*/
        };

        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        
        
        /**PUBLIC ATTRIBUTES
        * @name currentSong
        * @desc song object with all song info
        * @type {Object}
        
        * @name currentTime
        * @desc current playback time (in seconds) of currenly playing song
        * @type {Number}
        */ 
        
        SongPlayer.currentSong = null; /*this will hold song element (happens to be an object) from songs array which we can track song with*/
        SongPlayer.currentTime = null;
        
        /**PUBLIC FUNCTIONS
        * @function play
        * @desc continue playing a paused song or play a brand new song
        * @param {Object} song

        * @function pause
        * @desc pause a currently playing song
        * @param {Object} song

        * @function previous
        * @desc stop current song and play previous one (stop all if click previous on song 1)

        * @function next
        * @desc stop current song and play next one (stop all if click next on song 5)

        * @function setCurrentTime
        * @desc on the buzz object (music file) set the current time to (time) in seconds
        * @param {Number} time
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong; 
            if(SongPlayer.currentSong !== song){ /*changing song(could be nothing to something)*/
                /*set the song - turn off the old, create the new*/
                setSong(song);
                playSong(song);
            
            } else if(SongPlayer.currentSong === song){ /*this is whole function is connnected to play button so only applies when song is not already playing*/
                if(currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong; //if variable song can be accessed (like it can from ng repeat in album view) use that
            currentBuzzObject.pause();             //if it cant be (like from playerBar view) make song the currentSong property (song object)
            song.playing = false;
        };

        SongPlayer.previous = function() {
            //access previous song index
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            //keep going previous, and click previous again on song 1 - stop everything
            if (currentSongIndex < 0){
                stopSong();
            }else{//song index not less than zero i.e. clicked previous on song other than 1
                //set all tracking var's to previous song using setSong method
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                //play that song
                playSong(song); 
            }
        };

        SongPlayer.next = function() {
            //access next song index
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            //if click next on last song - stop everything
            if(currentSongIndex > currentAlbum.songs.length-1){
                stopSong();
            }else{ //click next on another song
                var song = currentAlbum.songs[currentSongIndex]; //song object becomes song trying to get to
                setSong(song); //set all tracking var's based off that song
                //play that song
                playSong(song);
            }
        };

        SongPlayer.setCurrentTime = function(time) {
            if(currentBuzzObject){ //check there is a song that has been played and therefore is a buzz object
                currentBuzzObject.setTime(time); //sets the time on the song in seconds to (time) number
            }
        };
        
        return SongPlayer; /*once service is injected, you get the SongPlayer object with all its methods and properties*/
    }

    
    angular
        .module("blocJams")
        .factory("SongPlayer", ["$rootScope", "Fixtures", SongPlayer]);

})();