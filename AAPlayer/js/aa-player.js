(function(window) {
	"use strict";
	
	var _merge = function(target) {
		for (var i = 1, j = arguments.length; i < j; i++) {
			var source = arguments[i];
			for (var prop in source) {
				if (source.hasOwnProperty(prop)) {
					var value = source[prop];
					if (value !== undefined) {
						target[prop] = value;
					}
				}
			}
		}

		return target;
	};
	var util = {
		formatSeconds:function(value) {
			var theTime = parseInt(value); 
			var minute = 0;
			var hour = 0; 
			
			if(theTime > 60) {
				minute = parseInt(theTime/60); 
				theTime = parseInt(theTime%60); 
				if(minute > 60) { 
					hour = parseInt(minute/60); 
					minute = parseInt(minute%60); 
				} 
			} 
			var result = "" + parseInt(theTime); 
			if(minute > 0) { 
				result = parseInt(minute)+":"+result; 
			}else {
				result = "00:" + result;
			}
			if(hour > 0) { 
				result = parseInt(hour)+":"+result; 
			}
			return result; 
		}
	};
	
	var AAPlayer = function(options) {
		
		var template = [
			       '	<video class="J_aa_video" src="{{aa-src}}" control="false" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-playsinline></video>',
			       '	<div class="J_aa_play aa-player-pause">',
			       '		<a class="J_aa_icon aa-player-button aa-player-button-play" href="javascript:;"></a>',
			       '	</div>',
			       '	<div class="J_aa_controlbar aa-player-control-bar">',
			       '		<div class="J_aa_process aa-player-process"><span class="aa-process"><em></em></span></div>',
			       '		<a class="J_aa_control aa-player-button aa-player-button-play" href="javascript:;"></a>',
			       '		<div class="aa-player-time"><span class="J_aa_played">00:00</span> / <span class="J_total">00:00</span></div>',
			       '	</div>',
			       '	<div class="J_aa_loading aa-player-loading"><div class="aa-player-loading-eff"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div>',
			       ].join("");
			       
		
		this.options = _merge({}, this.options, options);
		
		this.container = document.createElement("div");
		this.container.className="J_aa_container aa-player-container";
		this.container.innerHTML = template.replace(/{{aa-src}}/g, this.options.src);
		
		this._video = this.container.querySelector(".J_aa_video");
		this._process = this.container.querySelector(".J_aa_process").querySelector("span");
		this._played = this.container.querySelector(".J_aa_played");

		if(this.options.width) {
			this.container.style.width = typeof this.options.width==="number"?(this.options.width+"px"):this.options.width;
		}
		if(this.options.height) {
			this.container.style.height = typeof this.options.height==="number"?(this.options.height+"px"):this.options.height;
		}
		
		this.options.el.appendChild(this.container);
		
		this._init();
		
		return this;
	}
	
	AAPlayer.prototype = {
		options:{
			el:null,
			
			src:null,
			
			width:"100%",
			
			height:"100%",
			
			hideCtrl: true,
			
			hideTime:1000,
			
			autoplay:false
		},
			
		container: null,
		
		_video: null,
		
		_process: null,
		
		_played: null,
		
		_timer: null,
		
		_init: function() {
			
			var _self = this;
			
			//显示时长
			this._video.addEventListener("loadedmetadata", function() {
				_self.container.querySelector(".J_total").innerText = util.formatSeconds(_self._video.duration);
				
			});
			
			this._video.onplay=function() {
				var btnControl = _self.container.querySelector(".J_aa_control");
				
				_self.container.querySelector(".J_aa_icon").style.display = "none";
				
				btnControl.className = btnControl.className.replace(/aa-player-button-play/g,"aa-player-button-pause");
			};
			this._video.onpause=function() {
				var btnControl = _self.container.querySelector(".J_aa_control");
				
				_self.container.querySelector(".J_aa_icon").style.display = "block";
				
				btnControl.className = btnControl.className.replace(/aa-player-button-pause/g,"aa-player-button-play");
			};
			
			//播放&&暂停
			this.container.querySelector(".J_aa_play").addEventListener("click", function() {
				_self._video.paused ? _self.play() : _self.pause();
			}, false);
			this.container.querySelector(".J_aa_control").addEventListener("click", function() {
				_self._video.paused ? _self.play() : _self.pause();
			}, false);
			
			_self._doProcess();
			
			_self._updateTime();
			
			_self._loading();

			if(_self.options.hideCtrl){
				_self._hideCtrl();
			}
		},
		/**
		 * 播放API
		 */
		play: function() {
			this._video.play();
		},
		/***
		 * 暂停API
		 */
		pause: function() {
			this._video.pause();
		},
		/**
		 * 更新已播放时间
		 */
		_updateTime: function() {
			var _self = this;
			this._video.addEventListener("timeupdate", function() {

				var curTime = _self._video.currentTime * 1000,
					totalTime = _self._video.duration * 1000;
				var percent = (curTime/totalTime) * 100;
				
				_self._process.style.width=percent + "%";
				_self._played.innerText = util.formatSeconds(_self._video.currentTime);
			}, false);
			
		},

		//点击进度条
		_doProcess: function() {
			var _self = this;
			_self.container.querySelector(".J_aa_process").addEventListener("click", function(e) {
				var width = e.clientX - this.getBoundingClientRect().left;
				
				var per = (width * 100) / (this.offsetWidth*100);
				
				_self._video.currentTime = _self._video.duration * per;
			}, false);
		},
		/**
		 * 处理loading加载
		 */
		_loading: function() {
			var _self = this;
			this._video.addEventListener("waiting", function() {
				_self.container.querySelector(".J_aa_loading").style.display="flex";
			}, false);
			this._video.addEventListener("playing", function() {
				_self.container.querySelector(".J_aa_loading").style.display="none";
			}, false);
		},
		/**
		 * 隐藏Control Bar
		 */
		_hideCtrl: function() {
			var _self = this;
			
			this.container.addEventListener("mouseover", function() {
				
				clearTimeout(_self._timer);
				
				_self.container.querySelector(".J_aa_controlbar").style.opacity = ".8";
				
			}, false);
			
			this.container.addEventListener("mouseout", function() {
				
				if(!_self._video.paused){
					
					_self._timer = setTimeout(function(){
						
						_self.container.querySelector(".J_aa_controlbar").style.opacity = "0";
						
					}, _self.options.hideTime);
				}
			}, false);
		}
	}
	
	window.AAPlayer = AAPlayer;
	
})(window);