//= バイキュービック法のコード
function codeBicubic(imgSrc, imgDst) {
	// 変数の初期化
	var res = "";
	var startTime = +new Date();

	// 元の画素
	var col  = imgSrc.col;
	var srcW = imgSrc.w;
	var srcH = imgSrc.h;
	var srcArr = imgSrc.arr;

	// 補間後の画素
	var dstW = imgDst.w;
	var dstH = imgDst.h;
	var dstArr = imgDst.arr;

	// スケール
	var scaleX = (dstW - 1) / (srcW - 1);
	var scaleY = (dstH - 1) / (srcH - 1);

	// 計算方法
	var isSinc = false;

	// ウェイト計算式
	function wght(d) {
		if (isSinc) return sinc(d);

		if (d < 1) {
			// d <= 1.0  →  1 - 2 * d^2 + d^3
			return 1 - 2 * d * d + d * d * d;
		} else
		if (d < 2) {
			// 1.0 <= d <= 2.0  →  4 - 8 * d + 5 * d^2 - d^3
			return 4 - 8 * d + 5 * d * d - d * d * d;
		}
		// d >= 2.0  →  0
		return 0;
	}

	// 正規化sinc関数
	function sinc(d) {
		if (d == 0) return 1;
		return Math.sin(d * Math.PI) / (d * Math.PI);
	}

	// バイキュービック法
	for (var y = 0; y < dstH; y ++) {
		for (var x = 0; x < dstW; x ++) {
			// X4点、Y4点を取得
			var xArr = [];
			var yArr = [];
			xArr[1] = Math.floor(x / scaleX);
			yArr[1] = Math.floor(y / scaleY);

			xArr[0] = Math.max(0, xArr[1] - 1);
			yArr[0] = Math.max(0, yArr[1] - 1);
			xArr[2] = Math.min(srcW - 1, xArr[1] + 1);
			yArr[2] = Math.min(srcH - 1, yArr[1] + 1);
			xArr[3] = Math.min(srcW - 1, xArr[1] + 2);
			yArr[3] = Math.min(srcH - 1, yArr[1] + 2);

			// 比率点
			var rtX = x / scaleX - xArr[1];
			var rtY = y / scaleY - yArr[1];

			// 4*4=16マスの色を取得
			var colSum = [0, 0, 0];
			for (var yC = 0; yC < 4; yC ++) {
				for (var xC = 0; xC < 4; xC ++) {
					var rgb = srcArr[
						xArr[xC] + yArr[yC] * srcW
					];
					var dX = Math.abs(rtX - (xC - 1));
					var dY = Math.abs(rtY - (yC - 1));
					colSum[0] += rgb[0] * wght(dX) * wght(dY);
					colSum[1] += rgb[1] * wght(dX) * wght(dY);
					colSum[2] += rgb[2] * wght(dX) * wght(dY);
				}
			}

			// 色の合計
			for (var c = 0; c < col; c ++) {
				dstArr[x + y * dstW][c]
					= Math.min(255, colSum[c]);
			}
		}
	}

	var endTime = +new Date();
	console.log("計算時間：" + (endTime - startTime) + " msec");
}

