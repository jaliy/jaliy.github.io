export default {
	getUrlParameter(){
 		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	   	let r = window.location.search.substr(1).match(reg);
	   	if (r!=null)
	   		return (r[2]);
	   	return null;
	}
}
