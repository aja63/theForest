const mapActual = document.getElementById("map");
const map = mapActual.getContext("2d");
const txt = document.getElementById("debug");

import {player as player} from "./scripts.js";

export default class Wolf{
	constructor(x,y){
			this.alive = true;
			this.size = 40;
			this.x = x;
			this.y = y;
			this.speed = 2;
			this.color = "grey";
	}
	
	draw(){
		this.damage();
		if(this.alive == true){		
			let xPath = [this.size/2,this.size/4,this.size/2,this.size/4,this.size/2,-this.size,-this.size];
			let yPath = [-this.size-10,this.size/2,0,-this.size/2,this.size+10,this.size,-this.size];
			map.beginPath();
			for(let pen = 0; pen < xPath.length; pen++){
				map.lineTo(this.x, this.y);
				this.x+=xPath[pen];
				this.y+=yPath[pen];
			}
			map.closePath();
			map.fillStyle = this.color;
			map.fill();
			map.fillStyle = "red";
			map.fillRect(this.x+25,this.y-10,10,10);
			map.fillRect(this.x+45,this.y-10,10,10);
		}
	}
	
	erase(){
		map.clearRect(this.x, this.y-this.size-10, this.size*2,this.size*2+10);
	}
	
	detectPlayer(player){
		if(this.x<player.x+10){
			this.erase();
			this.x+=this.speed;
			this.draw();
		}
		else{
			this.erase();
			this.x-=this.speed;
			this.draw();
		}
		
		if(this.y<player.y+55){
			this.erase();
			this.y+=this.speed;
			this.draw();
		}
		else{
			this.erase();
			this.y-=this.speed;
			this.draw();
		}
	}
	
	damage(){
		let colorList = map.getImageData(this.x, this.y-this.size-10, this.size*2,this.size*2+10).data;
		if(this.collision(colorList) == true){txt.innerHTML = player.x;};
	}
	
	collision(colorList){
		for(let pixle = 3; pixle < colorList.length; pixle+=4){
			if(colorList[pixle] != 0){
				let pixleColor = [colorList[pixle - 3], colorList[pixle - 2], colorList[pixle - 1]];
				this.colorCheck(pixleColor);
			}
		}
		if(this.alive == false){player.kills++;};
	}
	
	colorCheck(pixleColor){
		if(pixleColor[0] == "0" && pixleColor[1] == "0" && pixleColor[2] == "255"){
			player.damage();
		}
		if(pixleColor[0] == "128" && pixleColor[1] == "0" && pixleColor[2] == "128"){
			this.alive = false;
		}
	}

}