/*this service holds a factory type service to hold data/behaviour about the song playing which as a service can be injected into every controller for the benefit of each view*/
(function() {

    function SongPlayer(Fixtures) {
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
        * @function getSongIndex
        * @desc for whatever song is playing, it will give us its index in the songs array
        * @param {Number} song
        
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song

        * @function playSong
        * @desc plays currentBuzzObject and changes property on song object which impacts ng-show
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        var setSong = function(song) { /*only needed when changing songs*/
            //TURN OFF THE OLD
            if(currentBuzzObject){  /*if the current song was a song playing, quickly stop that song*/
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null; /*below we would have set current song to the song object so update the playing property on it*/
            }
            //CREATE THE NEW
            currentBuzzObject = new buzz.sound(song.audioUrl, { /*constructor function on the buzz library object to create new buzz object which we can then use the library with*/
                formats: ["mp3"],
                preload: true
            });
            SongPlayer.currentSong = song; /*holds song element in songs array - track song with this*/
        };

        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        
        /**PUBLIC ATTRIBUTES
        * @name currentSong
        * @desc song object with all song info
        * @type {Object} 
        */
        
        SongPlayer.currentSong = null; /*this will hold song element (happens to be an object) from songs array which we can track song with*/
        
        
        /**PUBLIC FUNCTIONS
        * @function play
        * @desc continue playing a paused song or play a brand new song
        * @param {Object} song

        * @function pause
        * @desc pause a currently playing song
        * @param {Object} song

        * @function previous
        * @desc stop current song and play previous one (stop all if click previous on song 1)
        * @param {Object} song
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
                currentBuzzObject.stop(); //stop song 1 but dont change to any differet song object or index
                SongPlayer.currentSong.playing = null; //change property on song 1 objcect to reflect nothing playing
            }else{//song index not less than zero i.e. clicked previous on song other than 1
                //set all tracking var's to previous song using setSong method
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                //play that song
                playSong(song); 
            }
        };
        
        return SongPlayer; /*once service is injected, you get the SongPlayer object with all its methods and properties*/
    }

    
    angular
        .module("blocJams")
        .factory("SongPlayer", ["Fixtures", SongPlayer]);

})();