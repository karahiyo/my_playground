//== 敵の生成
function makeEnemies(seed, p, xors) {
	// 変数の初期化
	var xors = new Xors(seed);
	var eneArr = [];
	var eneNo = 0;
	var holeArr = [];
	var w = p.w, h = p.h;

	// 敵の寄り集まり視界範囲の2乗
	var rng = Math.pow(p.gthrRng, 2);

	// 計算量を減らすためのエリア分割用変数の初期化
	var sqSz = 20;	// エリア分割のドット数
	var sqWIn = Math.ceil(w / sqSz);
	var sqHIn = Math.ceil(h / sqSz);
	var sqW = sqWIn + 2;	// エリア数
	var sqH = sqHIn + 2;	// エリア数
		// エリア数を+2してあるのは、
		// エリアのループ処理のため
	var sqLen = sqW * sqH;
	var sqArr = [];
	for (var i = 0; i < sqLen; i ++) {sqArr[i] = [];}

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
			pos.sqX = (pos.x / sqSz)|0;
			pos.sqY = (pos.y / sqSz)|0;
			eneArr.push(pos);
		}
	}
	eneNo = eneArr.length;

	// 敵を、分割したエリアに分配
	for (var i = 0; i < eneNo; i ++) {
		var ene = eneArr[i];
		var pos = (ene.sqX + 1) + (ene.sqY + 1) * sqW;
		sqArr[pos].push(ene);
	}

	// エリアのループ処理
	for (var y = 0; y < sqH; y ++) {
		for (var x = 0; x < sqW; x ++) {
			// ループ位置でないなら飛ばす
			if (0 != x && sqW - 1 != x
			 && 0 != y && sqH - 1 != y) continue;

			// ループ部分の位置をディープコピー
			var pNow = x + y * sqW;
			var xRef = 1 + (x - 1 + sqWIn * 2) % sqWIn;
			var yRef = 1 + (y - 1 + sqHIn * 2) % sqHIn;
			var pRef = xRef + yRef * sqW;
			sqArr[pNow] = $.extend(true, [], sqArr[pRef]);

			// ループに当たる部分の座標の修正
			for (var i = 0; i < sqArr[pNow].length; i ++) {
				if (x == 0) {
					sqArr[pNow][i].x -= w;
				} else
				if (x == sqW - 1) {
					sqArr[pNow][i].x += w;
				}
				if (y == 0) {
					sqArr[pNow][i].y -= h;
				} else
				if (y == sqH - 1) {
					sqArr[pNow][i].y += h;
				}
			}
		}
	}

	// 周囲のエリアを見て、視界範囲内の平均値を計算
	var eneArrNew = [];
	for (var i = 0; i < eneNo; i ++) {
		// 近傍1のエリアを探索範囲に
		var ene = eneArr[i];
		var arr = [];
		for (var y = -1; y <= 1; y ++) {
			for (var x = -1; x <= 1; x ++) {
				var pos = (ene.sqX + 1 + x)
						+ (ene.sqY + 1 + y) * sqW;
				arr = arr.concat(sqArr[pos]);
			}
		}

		// 変数の初期化
		var arrSz = arr.length;
		var sumX = 0;
		var sumY = 0;
		var cnt = 0;

		// 視界範囲内の敵の平均値を算出
		for (var j = 0; j < arrSz; j ++) {
			var difX = arr[j].x - ene.x;
			var difY = arr[j].y - ene.y;

			if (difX * difX + difY * difY < rng) {
				sumX += arr[j].x;
				sumY += arr[j].y;
				cnt ++;
			}
		}

		// ループ部分も考慮して、座標を格納する
		eneArrNew[i] = {
			 x: (sumX / cnt + w) % w
			,y: (sumY / cnt + h) % h
			,hit: false
		};
	}
	eneArr = eneArrNew;

	return {eneArr: eneArr, holeArr: holeArr}
}

