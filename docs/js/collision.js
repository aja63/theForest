import {player as player} from "./scripts.js";


function damage(x,y,w,h){
	let colorList = map.getImageData(x,y,w.h).data;
	if(this.collision(colorList) == true){txt.innerHTML = player.x;};
}

function collision(colorList){
	for(let pixle = 3; pixle < colorList.length; pixle+=4){
		if(colorList[pixle] != 0){
			let pixleColor = [colorList[pixle - 3], colorList[pixle - 2], colorList[pixle - 1]];
			this.colorCheck(pixleColor);
		}
	}
}

function colorCheck(pixleColor){
	if(pixleColor[0] == "0" && pixleColor[1] == "0" && pixleColor[2] == "255"){
		player.damage();
	}
}