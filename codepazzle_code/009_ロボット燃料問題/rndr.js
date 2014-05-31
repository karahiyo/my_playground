//== Context
var cntxt = null;

//== 地図の描画
function drwMap(map) {
	// 変数の初期化
	var cnvsW = map.w * map.drwSz;
	var cnvsH = map.h * map.drwSz;
	var cnvsArea = $("#cnvsArea").empty();

	// Canvas使用可能判定
	try {
		cntxt = $('<canvas '
			+ 'width="' + cnvsW + '" height="' + cnvsH + '">')
			.appendTo(cnvsArea)
			.get(0).getContext("2d");
		cntxt.font = "24px serif";
	} catch(e) {
		$("#cnvsArea")
		.text("このブラウザでは利用できません");
		return;
	}

	// 色の初期化
	var colMin = {r: 192, g: 255, b: 64};
	var colMax = {r:  80, g:  96, b: 32};
	var colDif = {};
	colDif.r = colMax.r - colMin.r;
	colDif.g = colMax.g - colMin.g;
	colDif.b = colMax.b - colMin.b;

	// 地図の描画
	for (var x = 0; x < map.w; x ++) {
		for (var y = 0; y < map.h; y ++) {
			var bs = map.arr[x][y] / map.stp;
			var r = colMin.r + (colDif.r * bs)|0;
			var g = colMin.g + (colDif.g * bs)|0;
			var b = colMin.b + (colDif.b * bs)|0;
			cntxt.fillStyle = "rgb("+r+","+g+","+b+")";
			cntxt.fillRect(x * map.drwSz, y * map.drwSz
				,map.drwSz, map.drwSz);
		}
	}
}

//== 円の描画
function fillR(x, y, r, col, map) {
	cntxt.fillStyle = col;
	cntxt.beginPath();
	cntxt.arc(
		 x * map.drwSz + map.drwSz / 2
		,y * map.drwSz + map.drwSz / 2
		,r * map.drwSz, 0, Math.PI * 2, true);
	cntxt.fill();
}

//== ロボットの描画
function drwRbt(rbt, col, map) {
	var r1 = map.drwSz / 2;
	var r2 = map.drwSz / 4;

	// 開始位置の描画
	fillR(rbt.strtX, rbt.strtY, 0.5, "#ff0000", map);
	cntxt.fillText("START",
		 rbt.strtX * map.drwSz - 30
		,rbt.strtY * map.drwSz - 6
	);

	// 移動の描画
	cntxt.strokeStyle = col;
	cntxt.fillStyle = col;
	for (var i = 0; i < rbt.hstry.length; i ++) {
		fillR(rbt.hstry[i].x, rbt.hstry[i].y, 0.25, col, map);
		if (i > 0) {
			cntxt.beginPath();
			cntxt.moveTo(
				 rbt.hstry[i - 1].x * map.drwSz + r1
				,rbt.hstry[i - 1].y * map.drwSz + r1
			);
			cntxt.lineTo(
				 rbt.hstry[i].x * map.drwSz + r1
				,rbt.hstry[i].y * map.drwSz + r1
			);
			cntxt.stroke();
		}
	}

	// 終了位置の描画
	fillR(rbt.goalX, rbt.goalY, 0.5, "#ff0000", map);
	cntxt.fillText("GOAL",
		 rbt.goalX * map.drwSz - 24
		,rbt.goalY * map.drwSz + 30
	);
}

