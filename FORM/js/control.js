define([]
	,function(){
		return{
			loadList:function($element){
				$.each($element, function(index, value){
					$(value).material_select();
				});
			},
		}
});