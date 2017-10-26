(function() {

    function seekBar($document) {
        //Directive Definition Object DDO
        return { //returns an object that describes the directive's behavior to Angular's HTML compiler
            templateUrl: '/templates/directives/seek_bar.html', //when utilisted the directive will load this template
            replace: true, //true=replace directives actual element. false=replace contents within element
            restrict: 'E', //only usable as an element (which given these settings, its entirety will be replaced by above template)
            scope: { 
                onChange: "&" //a pipeline out for the on-change attribute whose "value" evaluates and invokes a function immediatley
            }, //creates isolated scope for any properties or methods within the directive (no inheritance from parent controller scope)
            link: function(scope, element, attributes) { //automatically generated on directives element - holds direct every time DOM manipulation logic
               
                /**PRIVATE ATTRIBUTES
                 * @name seekBar
                 * @desc JQ selection of directive element
                 * @type {Object}
                 */
                var seekBar = $(element); //the element that the directive is placed on wrapped in JQ object

                /**PRIVATE FUNCTIONS
                 * @function percentString
                 * @desc prepares scope value to be used as a percentage in CSS
                 
                 * @function calculatePercent
                 * @desc takes raw event value from seekBar event and returns as decimal point percentage
                 * @param {jQuery Object} seekBar
                 * @param {jQuery Object} event
                 */
                //change value to percentage
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };

                var calculatePercent = function(seekBar, event) { //takes in the seekbar *JQ*element itself and where the click event took place
                    var offsetX = event.pageX - seekBar.offset().left; //offsetx pixel value from beginning of seekbar
                    var seekBarWidth = seekBar.width(); //returns pixel value of element width
                    var offsetXPercent = offsetX / seekBarWidth; //divides them to give number between 0and1
                    offsetXPercent = Math.max(0, offsetXPercent);
                    offsetXPercent = Math.min(1, offsetXPercent); //ensure figure between 0and1 (useful for when dragging goes too far - because can drag anywhere on the doccument)
                    return offsetXPercent;            
                };

                var notifyOnChange = function(newValue) {
                    if(typeof scope.onChange === "function"){
                        scope.onChange({value: newValue});//here we define the value of the value argument which is called in onChange on the html
                    }
                };

                /**PUBLIC ATTRIBUTES
                 * @name value
                 * @desc destination of seek bar based on user events
                 * @type {Number}
                 
                 * @name max
                 * @desc maxiumum value of seek bar movement
                 * @type {Number} 
                 */
                //these values exist here because Ang will check for model updates and then alter the view accordingly
                //because only public properties are bound to the view from the model
                scope.value = 0;
                scope.max = 100;

                //observes the above attributes in the view for value changes and applies that value change to the public attributes here
                attributes.$observe("value", function(newValue){
                    scope.value = newValue;
                });

                attributes.$observe("max", function(newValue){
                    scope.max = newvalue;
                });
 
                
                /**PUBLIC FUNCTIONS
                 * @function fillStyle
                 * @desc sole purpose to change the css using scope.value and scope.max
                  
                 * @function onClickSeekBar
                 * @desc when click event happens on seek bar this function fires and changes scope.value (which will the change the view following $digest call at end of JS turn)
                 * @param {jQuery Object} event
                 
                 * @function trackThumb
                 * @desc when mousedown event occurs this listeners and their functions fire up for mousemove and mouseup
                 */
                //style the fill element on the DOM using that percentage
                scope.fillStyle = function(){
                    return {width: percentString()}; //must be object like this for ng-style directive which changes the css
                };

                scope.thumbStyle = function(){
                    return {left: percentString()}
                };

                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event); //returns decimal number based on clickevent
                    scope.value = percent * scope.max; //turns decimal number into value
                    notifyOnChange(scope.value); //when update scope.value update the value in onChange attribute
                };

                //when mouse goes down on the thumb listen to mousemove, when mouse goes up, stop listening
                scope.trackThumb = function() {
                    $document.bind("mousemove.thumb", function(event){ //tracks mousemove event
                        var percent = calculatePercent(seekBar, event); //calculates number between 0and1 of where you drag
                        scope.$apply(function(){
                            scope.value = percent * scope.max; //turns decimal into value number which can be used as % in css
                            notifyOnChange(scope.value);
                        });
                    });

                    $document.bind("mouseup.thumb", function(){ //on mouse up event
                        $document.unbind("mousemove.thumb"); //stop tracking mousemove
                        $document.unbind("mouseup.thumb"); //stop listening for mouseup, because only need to listen for that after mouse has gone down
                    });
                };

            }
        };
    }

    
    angular
        .module("blocJams")
        .directive("seekBar",["$document", seekBar]); //name of directive and callback directive definition object DDO
})();