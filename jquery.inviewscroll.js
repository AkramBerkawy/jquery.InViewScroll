(function($) {

function  checkInView(eleme,containere,partial)
{
    var container = $(containere);
	var elem = $(eleme);
	if(container.find(elem).length == 0)
		return false;
    var contHeight = container.height();
    var contTop = container.scrollTop();
    var contBottom = contTop + contHeight ;
 
    var elemTop = elem.offset().top - container.offset().top;
    var elemBottom = elemTop + elem.height();
    
    var isTotal = (elemTop >= 0 && elemBottom <=contHeight);
    var isPart = ((elemTop < 0 && elemBottom > 0 ) || (elemTop > 0 && elemTop <= container.height())) && partial ;
    
    return  isTotal  || isPart ;
}
	function OnViewChange(container,element,callback,onout,partial)
	{
		var state = checkInView(element,container,partial);
		var onState = onout;
			$(container).scroll(function(){
				var oldState = state;
				state = checkInView(element,container,partial);
				if(state != oldState && state === onState)
					callback.call(element);
			});
	}
    $.fn.outview = function(container,callback,options) {
		$.each(this,function(i,element){
			options = options || {};
			var partial = options.partial || false;
			OnViewChange(container,element,callback,false,partial);
		});
    }
	
    $.fn.inview = function(container,callback,options) {
		$.each(this,function(i,element){
			options = options || {};
			var partial = options.partial || false;
			OnViewChange(container,element,callback,true,partial);
		});
    }
	
	$.fn.isinview = function(container){
		return checkInView(this,container);
	}

}(jQuery));