import Vue from "vue";

const AlertVue = Vue.extend(require('./alert.vue'));




let Alert = (options = {}) => {
	
    let title = options.title || "提示",
        message = typeof options === 'string' ? options : options.message;
        
        
    return new Promise((resolve, reject) => {
    	let ins = new AlertVue({
			el : document.createElement("div")
		});
		
		ins.message = message;
		ins.title = title;
		ins.onOk = function() {
			ins.visible = false;
    		resolve();
		}
		document.body.appendChild(ins.$el);
	
		Vue.nextTick(function () {
		  	ins.visible = true;
		});
    });
}

export default Alert;