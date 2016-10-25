var note={
	init : function() {
		this.envInit();
		this.bind();
		this.renderList();
	},
	envInit : function() {
		if(window.localStorage){
			if(!localStorage.notes){
				localStorage.setItem("notes",JSON.stringify([]));
			}
		}
	},
	renderList : function() {
		var notes = {
			notes : JSON.parse(localStorage.notes)
		};
		
		var template = document.getElementById('tplItem').innerHTML;
	  	var rendered = juicer(template, notes);
	  	$('#articles').html(rendered);
	},
	bind : function() {
		document.getElementById("btnAdd").addEventListener("click", function() {
			note.events.onClickAdd();
		}, false);
		
		document.getElementById("btnClose").addEventListener("click",function() {
			$("#form").fadeToggle();
		},false);
		
		document.getElementById("btnSubmit").addEventListener("click", function() {
			note.events.onSubmitForm();
		}, false);
	},
	events : {
		onClickAdd : function() {
			$("#form").fadeToggle();
		},
		onSubmitForm : function() {
			var title = document.getElementById("iptTitle"), 
				content=document.getElementById("iptContent");
			
			if(title.value=="" || content.value=="") {
				return ;
			}
			var notes = JSON.parse(localStorage.notes);
			var nt = new Note(title.value, content.value);
			
			notes.push(nt);
			localStorage.notes = JSON.stringify(notes);
			title.value="";
			content.value="";
			$("#form").fadeToggle();
			note.renderList();
		}
	}
};
function Note(title, content, id) {
	this.title = title;
	this.content = content;
	this.url="pages/note.html?id=";
	return this;
}

(function(){
	window.addEventListener("DOMContentLoaded",function() {
		note.init();
	}, false);
})();
