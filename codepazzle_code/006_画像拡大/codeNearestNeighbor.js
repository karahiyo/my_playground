//= ニアレストネイバー法のコード
function codeNearestNeighbor(imgSrc, imgDst) {
	// 変数の初期化
	var res = "";

	// 元の画素
	var col  = imgSrc.col;
	var srcW = imgSrc.w;
	var srcH = imgSrc.h;
	var srcArr = imgSrc.arr;

	// 補間後の画素
	var dstW = imgDst.w;
	var dstH = imgDst.h;
	var dstArr = imgDst.arr;

	// ニアレストネイバー法
	for (var y = 0; y < dstH; y ++) {
		for (var x = 0; x < dstW; x ++) {
			var x0 = Math.floor(x / (dstW / srcW));
			var y0 = Math.floor(y / (dstH / srcH));

			var col0 = srcArr[x0 + y0 * srcW];

			for (var c = 0; c < col; c ++) {
				dstArr[x + y * dstW][c] = col0[c];
			}
		}
	}
}

