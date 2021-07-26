const mapActual = document.getElementById("map");
const map = mapActual.getContext("2d");
const txt = document.getElementById("debug");

import Wolf from "./wolf.js";
import Bear from "./bear.js";
import Block from "./block.js";


export const wolfList = [];
export const bearList = [];
export let level = 1;

/* function getSpawnPoint(){
	let points = []
	let xPoint = Math.floor(Math.random()*2000);
	let yPoint = Math.floor(Math.random()*1000);
	if(1450>xPoint && 550<xPoint){if(800>yPoint && 200<yPoint){xPoint+=Math.floor(Math.random()*500); yPoint+=Math.floor(Math.random()*500)}};
	points.push(xPoint);
	points.push(yPoint);
	return points;
} */

function getSpawnPoint(){
	let points = [];
	let spawnSide = Math.floor(Math.random()*3+1);
	switch(spawnSide){
		case 1: points.push(Math.floor(Math.random()*2000)); points.push(-10);
		case 2: points.push(Math.floor(Math.random()*2000)); points.push(1000);
		case 3: points.push(-10); points.push(Math.floor(Math.random()*900));
		case 4: points.push(2000); points.push(Math.floor(Math.random()*900));
	}
	return points;
}



function spawnWolves(maxWolves){
	let levelCred = 0;
	while(levelCred < maxWolves){
		let points = getSpawnPoint();
		wolfList.push(new Wolf(points[0], points[1]));
		levelCred++;
	}
}




function spawnBears(maxBears){
	let levelCred = 0;
	while(levelCred < maxBears){
		let points = getSpawnPoint();
		bearList.push(new Bear(points[0], points[1]));
		levelCred++;
	}
}




/* function drawBlocks(){
	let blockCount = 0;
	while(blockCount < 5){
		let block = new Block(); 
		block.getSpawnPoint();
		block.draw();
		blockCount++;
	}
}


	giveColor(){
		const bgImg = new Image();
		bgImg.src = "tree.png";
		bg.onload = function(){
			let bg = map.createPattern(img, 'repeat');
			this.color = bg;
		}
	}
drawBlocks(); */


let bg;
const bgImg = new Image();
bgImg.src = "tree.png";
bgImg.onload = function(){
bg = map.createPattern(bgImg, 'repeat');
}


function drawBlocks(){
	let blockCount = 0;
	while(blockCount < 7){
		let block = new Block(bg);
		block.create();
		blockCount++;
	}
}




export function spawnCaps(){
	let X = (level*5)/3;
	let Y = X-Math.floor(Math.random()*X+X/2); 
	return [X, Y];
}

export function generate() {
	setTimeout(function(){
		let cap = spawnCaps();
		drawBlocks();
		spawnWolves(cap[0]); 
		spawnBears(cap[1]);
	},250);
}


export function nextLevel(){
	wolfList.length = 0;
	bearList.length = 0;
	map.clearRect(0,0,2000,1000);
	level++;
	generate();
}