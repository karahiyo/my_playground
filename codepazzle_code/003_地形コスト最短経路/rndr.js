//== マップを表示
function drwMap(rout, map, mapSz) {
	// 変数の初期化
	var bsSz = 20;
	var cnvsW = mapSz * bsSz;
	var cnvsH = mapSz * bsSz;
	var cnvsArea = $("#cnvsArea").empty();
	var cntxt;

	// Canvas使用可能判定
	try {
		cntxt = $('<canvas '
			+ 'width="' + cnvsW + '" height="' + cnvsH + '">')
			.appendTo(cnvsArea)
			.get(0).getContext("2d");
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
	for (var x = 0; x < mapSz; x ++) {
		for (var y = 0; y < mapSz; y ++) {
			var bs = map[x + y * mapSz] / 5;
			var r = colMin.r + (colDif.r * bs)|0;
			var g = colMin.g + (colDif.g * bs)|0;
			var b = colMin.b + (colDif.b * bs)|0;
			cntxt.fillStyle = "rgb("+r+","+g+","+b+")";
			cntxt.fillRect(x * bsSz, y * bsSz, bsSz, bsSz);
		}
	}

	// 経路の描画
	cntxt.fillStyle = "#ff0000";
	for (var i = 0; i < rout.length; i += 2) {
		var x = (rout[i]      + 0.25) * bsSz;
		var y = (rout[i + 1]  + 0.25) * bsSz;
		cntxt.fillRect(x, y, bsSz * 0.5, bsSz * 0.5);
	}
}

