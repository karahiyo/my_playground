//= 元のコード
function originalCode(arnd, nowX, nowY, goalX, goalY, mapW, mapH) {
	// 変数の初期化
	var res = ["u"];
	var drcX = goalX - nowX;
	var drcY = goalY - nowY;
	var dstnc = Math.abs(drcX) + Math.abs(drcY);

	if (dstnc < 5) {
		// ゴールが近ければ、何も考えずゴールに向かう
		if (drcX < 0) {res = ["l"];} else
		if (drcX > 0) {res = ["r"];} else
		if (drcY < 0) {res = ["u"];} else
		if (drcY > 0) {res = ["d"];}
	} else
	if (drcX == 0) {
		// X位置がゴールのX位置と一致なので縦移動
		if (drcY < 0) {res = ["u"];} else
		if (drcY > 0) {res = ["d"];}
	} else
	if (drcY == 0) {
		// Y位置がゴールのY位置と一致なので横移動
		if (drcX < 0) {res = ["l"];} else
		if (drcX > 0) {res = ["r"];}
	} else {
		// ゴールから遠い場合
		var frstMv;
		if (Math.abs(drcX) > Math.abs(drcY)) {
			// 横方向の距離が遠い場合は、横移動優先
			if (drcX < 0) {frstMv = "l";} else
			if (drcX > 0) {frstMv = "r";} else
			if (drcY < 0) {frstMv = "u";} else
			if (drcY > 0) {frstMv = "d";}
		} else {
			// 縦方向の距離が遠い場合は、縦移動優先
			if (drcY < 0) {frstMv = "u";} else
			if (drcY > 0) {frstMv = "d";} else
			if (drcX < 0) {frstMv = "l";} else
			if (drcX > 0) {frstMv = "r";}
		}
		res = [frstMv];

		// 直進するよりも斜めに回り込んだ方がコストが
		// 安そうな場合は斜め移動。
		// ただし、ゴールから遠ざかる場合は除く。
		// 
		// 例）移動コストは以下の通り。
		// 
		//  1  1  4
		// 25 現  4
		//  4  4  4
		// 
		// ゴールが左上の場合、「左」に進む代わりに
		// 「上、左」と進む。

		// 斜め移動がコストパフォーマンスがよさそうか検討
		var rt = 1.3;	// コスト比率
		var a = arnd;	// 見やすいように短い文字で
		if (frstMv == "l") {
			if (a[0][1] * rt > a[1][0] + a[0][0] && drcY <= 0) {
				res = ["u", "l"];
			} else
			if (a[0][1] * rt > a[1][2] + a[0][2] && drcY >= 0) {
				res = ["d", "l"];
			}
		} else
		if (frstMv == "r") {
			if (a[2][1] * rt > a[1][0] + a[2][0] && drcY <= 0) {
				res = ["u", "r"];
			} else
			if (a[2][1] * rt > a[1][2] + a[2][2] && drcY >= 0) {
				res = ["d", "r"];
			}
		} else
		if (frstMv == "u") {
			if (a[1][0] * rt > a[0][1] + a[0][0] && drcX <= 0) {
				res = ["l", "u"];
			} else
			if (a[1][0] * rt > a[2][1] + a[2][0] && drcX >= 0) {
				res = ["r", "u"];
			}
		} else
		if (frstMv == "d") {
			if (a[1][2] * rt > a[0][1] + a[0][2] && drcX <= 0) {
				res = ["l", "d"];
			} else
			if (a[1][2] * rt > a[2][1] + a[2][2] && drcX >= 0) {
				res = ["r", "d"];
			}
		}
	}

	// 結果を戻して終了
	return res;
}

