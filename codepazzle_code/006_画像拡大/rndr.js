//== キャンバスに出力
function rndr(img) {
	// 変数の初期化
	var arr = img.arr;
	var w = img.w;
	var h = img.h;
	var cnvsArea = $("#cnvsArea").empty();
	var cntxt;

	// Canvas使用可能判定
	try {
		cntxt = $('<canvas '
			+ 'width="' + w + '" height="' + h + '">')
			.appendTo(cnvsArea)
			.get(0).getContext("2d");
	} catch(e) {
		cnvsArea.text("このブラウザでは利用できません");
		return;
	}

	// 描画
	var imgDt = cntxt.getImageData(0, 0, w, h);
	var dat = imgDt.data;
	for (var y = 0; y < h; y ++) {
		for (var x = 0; x < w; x ++) {
			var p = arr[x + y * w];
			var pos = (x + y * w) * 4;
			dat[pos + 0] = p[0];
			dat[pos + 1] = p[1];
			dat[pos + 2] = p[2];
			dat[pos + 3] = 255;
		}
	}
	cntxt.putImageData(imgDt, 0, 0);

	// デバッグ用：出力が小さい場合に拡大表示
	//cnvsArea.children("canvas").width(240).height(240);
}

