/***
 * 简单的图片懒加载插件
 * 
 * 使用方法:$(selector).lazyload(options);
 * 
 * options.container		{{Object}} 		: 滚动监听容器，默认window
 * options.data_src			{{String}} 		: 图片来源data-{{data_src}}，默认src，转成元素上的就是data-src
 * options.placeholder		{{String}} 		: 图片加载前显示的图片，建议使用较小的图片
 * options.error_img		{{String}} 		: 图片加载出错时显示的图片，默认null
 * options.preload_height	{{Number}} 		: 预加载高度，默认0，
 * options.onShow			{{Function}} 	: 滚动到可视区域后的处理函数，默认null
 * options.onLoad			{{Function}} 	: 图片加载完后处理函数，默认null
 * options.onError			{{Function}} 	: 图片加载出错后处理函数，函数会有一个参数，指向出错的图片src
 * 	
 * version	: 1.0.0-beta
 * Author	: jun.wang
 * Date		: 2016年5月23日
 * 
 */
(function($, window) {
	"use strict";
	
	$.fn.lazyload = JLazyload;
	
	function JLazyload(setting) {
		var options = null,
			//未加载的元素集合
			elements = this,
			$container = null;
		
		options = $.extend({
			
			container : window,
			
			data_src : "src",
			
			placeholder : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAG1BMVEX////MzMzS0tLy8vLY2Njr6+vl5eXf39/4+Pg2mpU1AAABSklEQVRYhe2TTU+DQBCGp6VQjt0FpUc20XIFYzwXTe/gxx0bC1fReKd48Wc7A42SLq1y1XkOm2GHJ5l3AgAMwzAMwzD/i5GvXcm+y58UK+s82r9SuhgiGaqMV1WPcilWWN2rsxBPmTVZRv7aDcF+keW+QV1TFiqDiZvHDliyCFolWJQObL1C9ClbH+o5PGZgeRD5MGkVF0wP4gTS5x6lTKh7hbtxqTZaxaFQCl+Y9ShqF9n+kLualBkVcUUz6Aq9LjCpELKpd/GpqM/f4+yAouDC3TxoiiXE6b7xPRgmbYe3O0r6dqcZTfwQDA9Hw21TbXYUVekGtXCx4zl1awnRks4vJT6gWDJXuH+vOFEwlcWio0RBvgl7FLgVNzhV7CaYZC2TjjIVuEbNOQoOZqfLQQp9YBh1CKWXP2n/y3HMayFfBxkMwzAM80f4BBz9MQwfVAomAAAAAElFTkSuQmCC",
			
			error_img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAG1BMVEX////MzMzf39/l5eXy8vLS0tLr6+vY2Nj4+Ph03YJfAAAB7UlEQVRYhe2VPW/bMBCGacuSNeZ1I8tjtQQZ3SVdraFAR3MpMloIoNlGi84yAv/vHD+OlEy58higfBcBPD68T5+FiIqKioqK+szKv8vidzd5bQ58YaICqRwwdLS9RmqP/IDWumddYASRDiFz+fJ2GtxJR5AEkpELih2Bsu/mWxEiNRpGKryqzxKFy2aBdYjIcmYRiktfzSW++riOAZJgw8iSvdXYuLjQBcgZW0bczSVW1pqTKUBOhWCk4ngyFILhfYAkeHSIxMGeAjuOaxcgZ3rZIpy9cm395SrCa+RE9bRIBvik9zau1wDJVNcsMkfJxw0e7PcQIGccHeLrxLXL9SNXyEmFb5HUTSe99Gge2QRIpm+NIWsT1zZALjpNi8w8MtNILnV7hkil638LmZvwBkhmEr6FNKY7A+RiCnMjfRroLkAqMyEOWQ2Quf2l9ZGF7V3YSt2XWvXsCklNeowkbn4pi72a0l2AVPjbKjVYte1BjaW3HJVTbW2Bp7a1BvT10Bt5Goot+e7rBsIjT7OF7j6ksSNP/SrFOMLiHqa8v9LBvhzZlg5JeH85d5OIsPsr90tgEqlN/y++p5NIAvzqxDvMnr0LoTWBgv4I/EqeRjKpK/os7kdEopg/Q/MY0lf+9vLznxeioqKiov4ffQCp4FK/801k7wAAAABJRU5ErkJggg==",
			
			preload_height : 0,
			
			onShow : null,
			
			onLoad : null,
		
			onError : null
			
		}, setting);
		
		$container = options.container ? $(options.container) : $(window);
		
		
		this.each(function() {
			
			var self = this, $self = $(this);
			
			self.loaded = false;
			
			if(!$self.attr("src") && $self.is("img") && options.placeholder){
				
				$self.attr("src", options.placeholder);
			}
			
			$self.one("show", function() {
				
				if(options.onShow){
					
					options.onShow.call(self);
				}
				
				$self.one('load', function(){
					self.loaded = true;
					//加载完了后删除，加快循环速度
					var tmp = $.grep(elements, function(ele) {
						return !ele.loaded;
					});
					
					elements = $(tmp);
						
					if(options.onLoad){
						
						options.onLoad.call(self);
					}
				});
				
				/**只执行一次，防止加载error_img的时候也出错导致图片闪动**/
				$self.one("error", function(){
					
					var src=this.src;
					
					if(options.error_img) {
						
						if($self.is("img")){
							
							$self.attr("src", options.error_img);
						}else {
							
							$self.css("background-image", "url('" + options.error_img + "')");
						}
					}
					
					if(options.onError)
						options.onError.call(self, src);
					
				});
				
				$self.attr("src", $self.data(options.data_src));
				
			});
			
		});
		
		function _checkload() {
			elements.each(function(){
				var $this = $(this), top;
				
				if(options.container === window || options.container===undefined) {
					
					top = $(window).scrollTop();
				}else {
					
					top = $container.offset().top;
				}
				
				if(top+$container.height() >= ($this.offset().top - options.preload_height)) {
					
					$this.trigger("show");
				}
			});
		}
		
		$(window).on("resize", function() {
			_checkload();
		});
		
		
		/**AMD support**/
		if ( typeof define === "function" && define.amd ) {
			var _this = this;
			
			define("fn-lazyload", [], function() {
				return _this;
			});
		}
		
		$(function() {
			//加载首屏
			_checkload();
			
			$container.on("scroll", function() {
				_checkload();
			});
		});
		
		return this;
	}
	
})(jQuery, window);
