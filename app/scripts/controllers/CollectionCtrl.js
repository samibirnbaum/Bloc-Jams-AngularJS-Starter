(function() {

    function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(12); /*this controller is simplified to put the albums onto a property called albums*/
    }                                           /*the decisions and code of how many albums all happens in the Fixtures service*/

    
    angular
        .module("blocJams")
        .controller("CollectionCtrl", ["Fixtures", CollectionCtrl]);    

})();