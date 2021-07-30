const mapActual = document.getElementById("map");
const map = mapActual.getContext("2d");
const txt = document.getElementById("debug");


import Player from "./player.js";
import * as level from "./level.js";



export const player = new Player(1000,500);
let playerDeath = setInterval(function(){if(player.hp < 0){clearInterval(playerDeath); alert("you are dead -- kills:"+player.totalKills);location.href = 'index.html'}},1);


function checkWin(){
	player.kills = 0;
	for(let wolf of level.wolfList){if(wolf.alive == false){player.kills++}};
	for(let bear of level.bearList){if(bear.alive == false){player.kills++}};
	if(player.kills+1> level.wolfList.length+level.bearList.length){level.nextLevel(player); player.totalKills+=player.kills; player.kills = 0 };
}


let playerWin = setInterval(function(){checkWin()},500);


document.addEventListener("keydown", input);
document.addEventListener("keyup", inputStop);

function input(pressedKey){
	let key = pressedKey.keyCode;
	player.input(key);
}

function inputStop(pressedKey){
	let key = pressedKey.keyCode;
	player.inputStop(key);
}

function animation(){
	window.requestAnimationFrame(animation);
	player.move();
	for(let wolf of level.wolfList){if(wolf.alive == true){wolf.detectPlayer(player)}};
	for(let bear of level.bearList){if(bear.alive == true){bear.detectPlayer(player)}};
}
window.requestAnimationFrame(animation);

level.generate(player);