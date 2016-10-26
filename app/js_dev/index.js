var web = {
	/**
	 * DOMContentLoaded
	 * */
	init : function() {
		$(function() {
			web.ajaxLoadArticles();
		});
	},
	/**加载文章list*/
	ajaxLoadArticles:function() {
		$.ajax({
			url:"./app/json/article.json",
			dataType:"json"
		}).done(function(json) {
			web.render(json);
		});
	},
	/**渲染模版**/
	render : function(articles) {
		var template = document.getElementById('tplItem').innerHTML;
	  	var rendered = juicer(template, articles);
	  	$('#articles').append(rendered);
	}
};
(function() {
	web.init();
})();