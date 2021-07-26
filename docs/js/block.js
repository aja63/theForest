const mapActual = document.getElementById("map");
const map = mapActual.getContext("2d");
const txt = document.getElementById("debug");





/* export default class Block{
	constructor(){
		this.color = "orange";
		
		this.x = 0;
		this.y = 0;
		this.w = Math.floor(Math.random()*1000);
		this.h = Math.floor(Math.random()*1000);
	}
	
	getSpawnPoint(){
		let points = [];
		let xPoint = Math.floor(Math.random()*2000);
		let yPoint = Math.floor(Math.random()*1000);
		if(1450>xPoint && 550<xPoint){if(800>yPoint && 200<yPoint){xPoint+=Math.floor(Math.random()*500); yPoint+=Math.floor(Math.random()*500)}};
		this.x = xPoint;
		this.y = yPoint;
	}
	
	draw(){
		map.fillStyle = this.color;
		map.fillRect(this.x, this.y, this.w, this.h)
	}
	
	
	
let X;
let img = new Image();
img.src = "tree.png";
img.onload = function(){
	X = map.createPattern(img, 'repeat');
	map.fillStyle = X;
	txt.innerHTML = map.fillStyle;
	
}

map.arc(300,300,300,0,2*Math.PI);
map.fill();
	
} */
	


export default class Block{
	constructor(bg){
			this.type = "";
			this.section = 0;
			this.color = bg;
			this.x = 0;
			this.y = 0;
			this.w = 0;
			this.h = 0;
			
			
			this.typeList = ["Tblock","square","circle","twoCircle","twoSquare","Rtriangle","Etriangle","Iblock"];
	}
	
	
	
	create(){
		this.setup(this.typeList);
		this.draw();
	}
	
	
	setup(typeList){
		this.type = typeList[Math.floor(Math.random()*typeList.length)];
		this.section = Math.floor(Math.random()*2+1);
		switch(this.section){
			case 1: this.x = Math.floor(Math.random()*400+10);this.y = Math.floor(Math.random()*400+10);this.w = Math.floor(Math.random()*500+200);this.h = Math.floor(Math.random()*700+200); break;
			case 2: this.x = Math.floor(Math.random()*300+1400); this.y = Math.floor(Math.random()*150);this.w = Math.floor(Math.random()*500+200);this.h = Math.floor(Math.random()*700+200); break;
		
		}
	}
	
	draw(){
		map.fillStyle = this.color;
		switch(this.type){ 
			case "Tblock": this.Tblock(); break;
			case "square": this.square(); break;
			case "circle": this.circle(); break;
			case "twoCircle": this.twoCircle(); break;
			case "twoSquare": this.twoSquare(); break;
			case "Rtriangle": this.Rtriangle(); break;
			case "Etriangle": this.Etriangle(); break;
			case "Iblock": this.Iblock(); break;
		}
	}
	
	
	
	Tblock(){
		map.moveTo(this.x,this.y);
		map.beginPath();
		map.lineTo(this.x+this.w, this.y);
		map.lineTo(this.x+this.w, this.y+(this.h/5));
		map.lineTo(this.x+((this.w/3)*2), this.y+(this.h/5));
		map.lineTo(this.x+((this.w/3)*2), this.y+((this.h/5)*4));
		map.lineTo(this.x+(this.w/3), this.y+((this.h/5)*4));
		map.lineTo(this.x+(this.w/3), this.y+(this.h/5));
		map.lineTo(this.x, this.y+(this.h/5));
		map.lineTo(this.x, this.y);
		map.closePath();
		map.fill();
	}
	
	square(){
		map.fillRect(this.x, this.y, this.w, this.h);
		map.fill();
	}
	
	circle(){
		map.arc(this.x,this.y,this.w,0,2*Math.PI);
		map.fill();
	}
	
	twoCircle(){
		map.arc(this.x,this.y+500,this.w/2,0,2*Math.PI)
		map.arc(this.x,this.y-500,this.w/2,0,2*Math.PI)
		map.fill();
	}
	
	twoSquare(){
		map.fillRect(this.x, this.y+500, this.w, this.h);
		map.fillRect(this.x, this.y-500, this.w, this.h);
		map.fill();
	}
	
	Rtriangle(){
		map.moveTo(this.x,this.y);
		map.beginPath();
		map.lineTo(this.x+this.w, this.y);
		map.lineTo(this.x, this.y+this.h);
		map.lineTo(this.x, this.y);
		map.closePath();
		map.fill();
	}
	
	Etriangle(){
		map.moveTo(this.x, this.y);
		map.beginPath();
		map.lineTo(this.x, this.y-this.h/2);
		map.lineTo(this.x+this.w, this.y);
		map.lineTo(this.x, this.y+this.h/2);
		map.closePath();
		map.fill();
	}
	
	Iblock(){
		map.moveTo(this.x,this.y);
		map.beginPath();
		map.lineTo(this.x+this.w, this.y);
		map.lineTo(this.x+this.w, this.y+(this.h/5));
		map.lineTo(this.x+((this.w/3)*2), this.y+(this.h/5));
		map.lineTo(this.x+((this.w/3)*2), this.y+((this.h/5)*4));
		map.lineTo(this.x+this.w, this.y+((this.h/5)*4));
		map.lineTo(this.x+this.w, this.y+this.h);
		map.lineTo(this.x, this.y+this.h);
		map.lineTo(this.x, this.y+((this.h/5)*4));
		map.lineTo(this.x+(this.w/3), this.y+((this.h/5)*4));
		map.lineTo(this.x+(this.w/3), this.y+(this.h/5));
		map.lineTo(this.x, this.y+(this.h/5));
		map.lineTo(this.x, this.y);
		map.closePath();
		map.fill();
	}
	
	
}
