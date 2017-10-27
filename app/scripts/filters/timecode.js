(function(){


    function timecode(){
        return function(seconds) { //this function just takes in the first OBLIGATORY argument the data of the code it was put on any other arguments would be OPTIONAL and added to the filter in the code timecode:optarg1
            var seconds = Number.parseFloat(seconds); //converts seconds which arrived as a string to floating point number

            if (Number.isNaN(seconds)) { //if the data is not a number, e.g. we dont have a currentBuzzObject with a currentTime yet, which probably just returns undefined, than just show 0:00
                return '0:00'; 
            }

            var wholeSeconds = Math.floor(seconds); //round the seconds down to whole seconds (no split)
            var minutes = Math.floor(wholeSeconds/60); //when seconds go above 60, dividing will give you minutes - always floored to only produces minute
            var remainingSeconds = wholeSeconds%60; //goes back to wholeSeconds to work out how many seconds in each minute

            var output = minutes + ":"; //minutes and colon ready for output

            if(remainingSeconds<10){
                output = output + "0"; //if the seconds are less than 10, just add in a stationery 0 before you add in the remaining seconds (looks nicer)
            }

            output = output + remainingSeconds; //adds on the remaining seconds to the "minutes:"


            return output;
        };
    }

    
    
    angular
        .module("blocJams")
        .filter("timecode", timecode); //like all componenes of a module, defined on the module


})();