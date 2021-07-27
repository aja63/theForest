const mapActual = document.getElementById("map");
const map = mapActual.getContext("2d");
const txt = document.getElementById("debug");

export default class Player{
	constructor(x,y){
		this.size = 50;
		this.x = x;
		this.y = y;
		this.speed = 4;
		this.color = "blue";
		
		this.w = false;
		this.a = false;
		this.s = false;
		this.d = false;
		
		this.hp = 1000;
		this.kills = 0;
		this.totalKills = 0;
		this.attackCD = false;
	}
	
	
	
	draw(){
		let xPath = [this.size/2,-this.size/2,this.size, this.size, -this.size/2, this.size/2, -this.size, -this.size];
		let yPath = [this.size,this.size,-this.size/2,this.size/2,-this.size,-this.size,this.size/2,-this.size/2];
		map.beginPath();
		for(let pen = 0; pen < xPath.length; pen++){
			map.lineTo(this.x,this.y);
			this.x += xPath[pen];
			this.y += yPath[pen];
		}
		map.closePath();
		map.fillStyle = this.color;
		map.fill();
	}
	
	erase(){
		map.clearRect(this.x-1, this.y-1, this.size*2+2, this.size*2+2);
	}
	
	input(key){
		switch(key){
			case 83: this.w = true; break;
			case 91: this.a = true; break;
			case 89: this.s = true; break;
			case 67: this.d = true; break;
			case 32: this.attack(); break;
		}
	}
	inputStop(key){
		switch(key){
			case 83: this.w = false; break;
			case 91: this.a = false; break;
			case 89: this.s = false; break;
			case 67: this.d = false; break;
		}
	}
	
	
	move(){
		if(this.w == true){this.moveUp()};
		if(this.a == true){this.moveLeft()};
		if(this.s == true){this.moveDown()};
		if(this.d == true){this.moveRight()};
	}
	
	moveUp(){
	if(this.y > 3){this.erase();if(this.collision(map.getImageData(this.x-1, this.y-1-this.speed, this.size*2+2, this.size*2+2).data) == false){this.y-=this.speed};this.draw();};
	}
	
	moveLeft(){
	if(this.x > 3){this.erase();if(this.collision(map.getImageData(this.x-1-this.speed, this.y-1, this.size*2+2, this.size*2+2).data) == false){this.x-=this.speed};this.draw();};
	}
	
	moveDown(){
	if(this.y < 900){this.erase();if(this.collision(map.getImageData(this.x-1, this.y-1+this.speed, this.size*2+2, this.size*2+2).data) == false){this.y+=this.speed};this.draw();};
	}
	
	moveRight(){
	if(this.x < 1900){this.erase();if(this.collision(map.getImageData(this.x-1+this.speed, this.y-1, this.size*2+2, this.size*2+2).data) == false){this.x+=this.speed};this.draw();};
	}
	
	/* check(){
		let checkInterior = setInterval(function(){
			txt.innerHTML += map.getImageData(10,10,10,10);
		 txt.innerHTML = map.getImageData(this.x-1, this.y-1, this.size*2+2, this.size*2+2) 
		}, 1000);
	} */
	
	checkCol(){
		const colors = map.getImageData(this.x-1, this.y-1, this.size*2+2, this.size*2+2).data;
		return this.collision(colors);
	}
	
	collision(colors){
		for(let pixle = 3;pixle<colors.length;pixle+=4){
			if(colors[pixle] != 0){
				let pixleRGB = [colors[pixle-3],colors[pixle-2],colors[pixle-1]];
				if(this.checkPixle(pixleRGB) == true){return true};
			}
		}
		return false;
	}
	
	checkPixle(pixleRGB){
		if(pixleRGB[0] == "128" && pixleRGB[1] == "235" && pixleRGB[2] == "93"){
			return true;
		}
	}
	
	
	damage(){
		this.hp -= 1;
	}
	
	attack(){
		if(this.attackCD == false){
			
		map.fillStyle = "purple";
		let player = this;
		let xpos = this.x;
		let ypos = this.y;
		let size = this.size;
		setTimeout(function(){
			map.clearRect(xpos-10, ypos-70, size*2+20, 70);
			map.clearRect(xpos-70, ypos-10, 70, size*2+20);
			map.clearRect(xpos-10, ypos+size*2, size*2+20, 70);
			map.clearRect(xpos+size*2, ypos-10, 70, size*2+20); 
		}, 100);
		
		let cd = this.attackCD;
		setTimeout(function(){player.attackCD = false},500);
		
		if(this.w == true){map.fillRect(this.x-10, this.y-70, this.size*2+20, 70)};
		if(this.a == true){map.fillRect(this.x-70, this.y-10, 70, this.size*2+20)};
		if(this.s == true){map.fillRect(this.x-10, this.y+this.size*2, this.size*2+20, 70)};
		if(this.d == true){map.fillRect(this.x+this.size*2, this.y-10, 70, this.size*2+20)};
		this.attackCD = true;
		
		
		
	}
	
	}
}
