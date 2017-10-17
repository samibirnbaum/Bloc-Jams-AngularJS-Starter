(function() {

    function CollectionCtrl() {
        this.albums = []; /*each cell holds an enire album object with all the data - MODEL*/

        for (var i=0; i<12; i++) {
            this.albums.push(angular.copy(albumPicasso)); /*we are pushing the entire album object to a cell (12 of them)*/
        }                                                /*angular.copy creates a deep copy of the object because a simple copy is only a reference to the original object on the memory heap*/
    }

    
    angular
        .module("blocJams")
        .controller("CollectionCtrl", CollectionCtrl);    

})();