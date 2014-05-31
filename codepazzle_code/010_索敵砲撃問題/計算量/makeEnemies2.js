//== 敵の生成（計算量削減なし）
function makeEnemies2(seed, p, xors) {
	// 処理時間と判定回数
	var startTime = +new Date();
	var chckCnt = 0;

	// 変数の初期化
	var xors = new Xors(seed);
	var eneArr = [];
	var eneNo = 0;
	var holeArr = [];
	var w = p.w, h = p.h;

	// 敵の寄り集まり視界範囲の2乗
	var gthrRng = p.gthrRng;
	var rng = Math.pow(p.gthrRng, 2);

	// 巣穴の初期化
	for (var i = 0; i < p.hole; i ++) {
		var hole = {
			 x: xors.rand() % w
			,y: xors.rand() % h
		};
		holeArr.push(hole);

		// 敵の初期化
		for (var j = 0; j < p.holeEne; j ++) {
			// 位置の初期化
			var pos = {x: hole.x, y: hole.y};

			// 移動
			var mv = xors.rand() % p.mvMax + 1;
			var dir = xors.rand() % 2;
			for (var m = 0; m < mv; m ++) {
				pos.x += xors.rand() % p.mvX * 2 - p.mvX;
				pos.y += xors.rand() % p.mvY * 2 - p.mvY;
			}

			// 座標の格納
			pos.x = (pos.x + w * p.mvMax) % w;
			pos.y = (pos.y + h * p.mvMax) % h;
			eneArr.push(pos);
		}
	}
	eneNo = eneArr.length;

	// 周囲のエリアを見て、視界範囲内の平均値を計算
	var eneArrNew = [];
	for (var i = 0; i < eneNo; i ++) {
		// 変数の初期化
		var ene1 = eneArr[i];
		var e1x = ene1.x;
		var e1y = ene1.y;

		var sumX = 0;
		var sumY = 0;
		var cnt = 0;

		// 視界範囲内の敵の平均値を算出
		for (var j = 0; j < eneNo; j ++) {
			// 変数の初期化
			var ene2 = eneArr[j];
			var e2x = ene2.x;
			var e2y = ene2.y;

			if (e1x <= gthrRng && e2x + gthrRng >= w) e2x -= w;
			if (e1y <= gthrRng && e2y + gthrRng >= h) e2y -= h;

			if (e1x + gthrRng >= w && e2x <= gthrRng) e2x += w;
			if (e1y + gthrRng >= h && e2y <= gthrRng) e2y += h;

			var difX = e1x - e2x;
			var difY = e1y - e2y;

			chckCnt ++;	// 判定回数をカウント
			if (difX * difX + difY * difY < rng) {
				sumX += e2x + w;
				sumY += e2y + h;
				cnt ++;
			}
		}

		// ループ部分も考慮して、平均値の座標を格納する
		eneArrNew[i] = {
			 x: (sumX / cnt + w) % w
			,y: (sumY / cnt + h) % h
			,hit: false
		};
	}
	eneArr = eneArrNew;

	// 処理時間と判定回数の出力
	var endTime = +new Date();
	console.log("計算時間：" + (endTime - startTime) + " msec");
	console.log("判定回数：" + chckCnt + "回");

	return {eneArr: eneArr, holeArr: holeArr}
}

