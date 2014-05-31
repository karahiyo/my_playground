//== キャンバスに出力
function rndr(s) {
	// 変数の初期化
	s = s.replace(/\r/g, "");
	var arr = s.split("\n");
	var w = 0;
	var h = arr.length;
	var cnvsArea = $("#cnvsArea").empty();
	var cntxt;
	var colBs = 64 * 1.5;
	var bsSz = 6;

	// 文字列を画素配列に変換
	for (var y = 0; y < h; y ++) {
		arr[y] = arr[y].split(",");
		if (arr[y].length > w) w = arr[y].length;
	}

	// Canvas使用可能判定
	try {
		cntxt = $('<canvas '
			+ 'width="' + w * bsSz + '" '
			+ 'height="' + h * bsSz + '">')
			.appendTo(cnvsArea)
			.get(0).getContext("2d");
	} catch(e) {
		$("#cnvsArea")
		.text("このブラウザでは利用できません");
		return;
	}

	// 描画
	for (var y = 0; y < h; y ++) {
		for (var x = 0; x < w; x ++) {
			var cell = arr[y][x] * 1;
			cntxt.fillStyle = createGradCol(cell, colBs);
			cntxt.fillRect(x * bsSz, y * bsSz , bsSz, bsSz);
		}
	}
}

//== グラデーション作成
function createGradCol(no, max) {
	var hsv = ColUtl.rgbPrm2hsv(255, 0, 0);
	hsv.h = Math.floor(360 * no / max);
	var res = ColUtl.hsv2html(hsv);
	return res;
}

