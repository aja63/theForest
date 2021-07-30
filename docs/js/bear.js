const mapActual = document.getElementById("map");
const map = mapActual.getContext("2d");
const txt = document.getElementById("debug");

import {player as player} from "./scripts.js";

export default class bear{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.size = 50;
		this.speed = 3;
		this.alive = true;
	}
	
	draw(){
		this.damage();
		if(this.alive == true){
		
		map.beginPath();
		map.fillStyle = "black";
		map.moveTo(this.x,this.y);
		map.bezierCurveTo(this.x,this.y-100,this.x+100,this.y-100,this.x+100,this.y);
		map.bezierCurveTo(this.x+80,this.y+20,this.x+20,this.y+20,this.x,this.y); 
		map.closePath();
		map.arc(this.x+25,this.y-70,20,0,2*Math.PI);
		map.arc(this.x+75,this.y-70,20,0,2*Math.PI);
		map.fill();
		
		map.beginPath();
		map.fillStyle = "red";
		map.moveTo(this.x+30,this.y-10);
		map.bezierCurveTo(this.x+30,this.y-50,this.x+70,this.y-50,this.x+70,this.y-10);
		map.bezierCurveTo(this.x+60,this.y+5,this.x+40,this.y+5,this.x+30,this.y-10);
		map.fill();
		map.closePath();

		map.fillRect(this.x+30,this.y-50,10,10);
		map.fillRect(this.x+60,this.y-50,10,10);
		
		map.fillStyle = "black";
		map.beginPath();
		map.arc(this.x+50,this.y-25,5,0,2*Math.PI);
		map.fill();
		
		}
	}
	
	erase(){
		map.fillStyle = "purple";
		map.clearRect(this.x,this.y-100,100,120);
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
		let colorList = map.getImageData(this.x,this.y-100,100,120).data;
		if(this.collision(colorList) == true){txt.innerHTML = player.x;};
	}
	
	collision(colorList){
		for(let pixle = 3; pixle < colorList.length; pixle+=4){
			if(colorList[pixle] != 0){
				let pixleColor = [colorList[pixle - 3], colorList[pixle - 2], colorList[pixle - 1]];
				this.colorCheck(pixleColor);
			}
		}
		if(this.alive == false){player.kills++};
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