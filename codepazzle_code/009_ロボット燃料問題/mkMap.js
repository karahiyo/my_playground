//== 地図生成
function mkMap(map) {
	// ランダムのシードを設定
	var xors = new Xors(map.seed);

	// 縦横2倍でマップを初期化
	var w = map.w;
	var h = map.h;
	var arr = map.arr;
	for (var x = 0; x < w; x ++) {
		arr[x] = [];
		for (var y = 0; y < h * 2; y ++) {
			arr[x][y] = 0;
		}
	}

	// マップ生成
	for (var i = 0; i < map.key; i ++) {
		// キーポイントの作成
		var rX = xors.rand() % w;
		var rY = xors.rand() % h;
		var pos = {x: rX, y: rY};

		// マップ成長
		for (var j = 0; j < map.deep; j ++) {
			mapGrwth(pos, rX, rY);
		}
	}

	// マップ成長
	function mapGrwth(pos, bsX, bsY) {
		var mvR = xors.rand() % 10;
		var mvX = 0, mvY = 0;

		// キー ポイントの移動方向
		switch (mvR) {
		// 単純に移動
		case 0: case 1: mvX =  1; break;
		case 2: case 3: mvX = -1; break;
		case 4: case 5: mvY =  1; break;
		case 6: case 7: mvY = -1; break;

		// 中心に戻る
		case 8: mvX = (pos.x < bsX) ? 1
					: (pos.x > bsX) ? -1 : 0; break;
		case 9: mvY = (pos.y < bsY) ? 1
					: (pos.y > bsY) ? -1 : 0; break;
		}

		// キー ポイントの位置を移動
		pos.x = map.inW(pos.x + mvX);
		pos.y = map.inH(pos.y + mvY);

		// 造山運動
		arr[pos.x][pos.y] += 1;
	}

	// 最高高度計算
	var altMax = 1;	// 最高高度
	for (var x = 0; x < w; x ++) {
		for (var y = 0; y < h; y ++) {
			if (arr[x][y] > altMax) {
				altMax = arr[x][y];
			}
		}
	}

	// 高さ調整
	var sqrtAltMax = Math.sqrt(altMax);
	for (var x = 0; x < w; x ++) {
		for (var y = 0; y < h; y ++) {
			var sqrt = Math.sqrt(arr[x][y]);
			arr[x][y] = (sqrt / sqrtAltMax * map.stp)|0;
			arr[x][y] ++;
			if (arr[x][y] > map.stp) arr[x][y] = map.stp;
		}
	}
}

