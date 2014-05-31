//= 元のコード
function originalCode(arg) {
	// 引数を展開
	var w = arg.w;
	var h = arg.h;
	var cnt = arg.cnt;
	var rngOut = arg.rngOut;	// 爆弾降下で見える視界範囲
	var rngIn = arg.rngIn;		// 爆弾降下で敵を倒せる範囲
	var saveDat   = arg.saveDat;
	var hitEnemy  = arg.hitEnemy;
	var viewEnemy = arg.viewEnemy;
		// hitEnemy, viewEnemyは配列
		// {x: num, y: num, hit: boolen}が格納

	// 次回に引き継げる保存用データ
	if (arg.saveDat == null) {arg.saveDat = [];}

	// 索敵範囲内の倒していない敵の平均位置を算出
	var arr = [];
	var sumX = 0, sumY = 0;
	for (var i = 0; i < viewEnemy.length; i ++) {
		var ene = viewEnemy[i];
		if (! ene.hit) {
			arr.push(ene);
			sumX += ene.x;
			sumY += ene.y;
		}
	}

	// 砲撃位置
	var x, y;
	if (arr.length <= 80) {
		x = ((Math.random() * (w - rngIn * 2))|0) + rngIn;
		y = ((Math.random() * (h - rngIn * 2))|0) + rngIn;
	} else {
		x = arg.x;
		y = arg.y;
		var avrX = sumX / arr.length;
		var avrY = sumY / arr.length;
		var r = Math.atan2(avrY - y, avrX - x);

		// 平均の高い方に移動
		x += (rngIn * 2 * Math.cos(r))|0;
		y += (rngIn * 2 * Math.sin(r))|0;
	}

	// 砲撃位置
	arg.x = x;
	arg.y = y;
	arg.saveDat.push({x: x, y: y});

	// 最後の砲撃時に履歴出力
	if (cnt == 19) {
		for (var i = 0; i < arg.saveDat.length; i ++) {
			var dat = arg.saveDat[i];
			console.log(i + " " + dat.x + " " + dat.y);
		}
	}

	// 結果の配列を戻して終了
	return arg;
}

