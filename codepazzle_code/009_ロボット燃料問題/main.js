$(function() {
	//== 地図設定
	var map = {
		 w: 120	// 横幅
		,h: 60	// 高さ
		,arr: []	// 配列
		,stp: 10	 // 移動コストのステップ。1～10。
		,key: 45	// 造山運動のキー ポイントの数
		,deep: 1000	// 造山運動の深度係数
		,seed: 0	// ランダムのシード
		,drwSz: 5	// 描画サイズ
		,strtRtX: 0.9	// 開始位置 比率X
		,strtRtY: 0.3	// 開始位置 比率Y
		,goalRtX: 0.1	// 終了位置 比率X
		,goalRtY: 0.7	// 終了位置 比率Y
		,inW: function(x) {	// 座標範囲 横
			if (x < 0) return 0;
			if (x >= this.w) return this.w - 1;
			return x;
		}
		,inH: function(y) {	// 座標範囲 縦
			if (y < 0) return 0;
			if (y >= this.h) return this.h - 1;
			return y;
		}
	};

	//== ロボット設定
	var Rbt = function() {
		// 開始位置と終了位置
		this.strtX = this.nowX = (map.w * map.strtRtX)|0;
		this.strtY = this.nowY = (map.h * map.strtRtY)|0;
		this.goalX = (map.w * map.goalRtX)|0;
		this.goalY = (map.h * map.goalRtY)|0;

		this.useFuel = 0;	// 使用燃料
		this.useStp = 0;	// 移動回数
		this.hstry = [];	// 履歴
		this.sccs = false;	// 到着成否
		this.mvMax = 500;	// 最大移動回数
	};
	var rYou, rCom;

	//== ロボット移動確認
	function chckMvRbt(rbt, fncMv) {
		// ロボットの移動
		var mvMax = 8;	// 最大移動回数
		var vwR = 1;	// 視界半径
		var vwRng = vwR * 2 + 1;	// 視界範囲マス数
		var w = map.w, h = map.h;

		rbtMvLoop:
		for (var i = 0; i < rbt.mvMax; i ++) {
			// 周辺マップの初期化
			var arnd = [vwRng];
			for (var x = 0; x < vwRng; x ++) {
				arnd[x] = [];
				for (var y = 0; y < vwRng; y ++) {
					var x2 = rbt.nowX + x - vwR;
					var y2 = rbt.nowY + y - vwR;
					if (x2 >= 0 && x2 < w
					 && y2 >= 0 && y2 < h) {
						arnd[x][y]
							= Math.pow(map.arr[x2][y2], 2);
					} else {
						arnd[x][y] = 99999;
					}
				}
			}

			// 移動の呼び出し
			var mvArr = fncMv(arnd, rbt.nowX, rbt.nowY
				,rbt.goalX, rbt.goalY, w, h);

			// 移動可能数以内か確認
			if (mvArr.length > mvMax) continue;

			// 移動コントローラーを使った移動
			var mvLen = mvArr.length;
			for (var m = 0; m < mvLen; m ++) {
				// 移動の初期化
				var mvX = 0;
				var mvY = 0;
				var mv = mvArr[m];
				if (mv == "u") {mvY = -1;} else
				if (mv == "d") {mvY =  1;} else
				if (mv == "l") {mvX = -1;} else
				if (mv == "r") {mvX =  1;}

				// 移動後の位置を計算
				rbt.nowX = map.inW(rbt.nowX += mvX);
				rbt.nowY = map.inH(rbt.nowY += mvY);
				rbt.hstry.push({x: rbt.nowX, y: rbt.nowY});

				// 消費燃料とステップの計算
				rbt.useFuel += Math.pow(
					map.arr[rbt.nowX][rbt.nowY], 2);
				rbt.useStp ++;

				// 終了判定
				if (rbt.nowX == rbt.goalX
				 && rbt.nowY == rbt.goalY) {
					rbt.sccs = true;
					break rbtMvLoop;
				}
			}
		}
	}

	//== ステータスの作成
	function mkStts(sccsY, sccsC, fuelY, fuelC, stpY, stpC) {
		var res = ["引き分け"];
		if (sccsY && fuelY < fuelC) {
			res[0] = "あなたの勝ち！";
		}
		if (! sccsY || fuelY > fuelC) {
			res[0] = "あなたの負け…orz";
		}
		res.push("到達成否：You " + sccsY + " / COM " + sccsC);
		res.push("消費燃料：You " + fuelY + " / COM " + fuelC);
		res.push("移動回数：You " + stpY + " / COM " + stpC);
		return res.join("\n");
	}

	//== ステータスの描画
	function drwStts(rYou, rCom) {
		var res = mkStts(rYou.sccs, rCom.sccs, rYou.useFuel
			,rCom.useFuel, rYou.useStp, rCom.useStp);
		$("#res").val(res);
	}

	//== 元コード
	var srcCom = null;

	//== コードを確認
	function chckCode() {
		// 初期化
		map.seed = $("#seed").val() * 1;
		mkMap(map);	// 地図生成
		$("#res").val("");	// 出力をクリア

		// 関数初期化
		var srcYou = $("#src").val();
		if (srcCom == null) srcCom = srcYou;
		var fncYou = codeToFnc(srcYou);
		var fncCom = codeToFnc(srcCom);

		// ロボット初期化
		rYou = new Rbt();
		rCom = new Rbt();

		// ロボット移動確認
		chckMvRbt(rYou, fncYou);
		chckMvRbt(rCom, fncCom);

		// 地図描画
		drwMap(map);

		// ロボット描画
		drwRbt(rYou, "#ff0000", map);
		drwRbt(rCom, "#0000ff", map);
		drwStts(rYou, rCom);
	}

	//== ボタンの処理を登録

	//== 「確認」ボタン
	$("#chck").click(chckCode);

	//== 「シードを+1して確認」ボタン
	$("#chckPls1").click(function() {
		$("#seed").val($("#seed").val() * 1 + 1);
		chckCode();
	});

	//== 「100回確認」ボタン
	$("#chck100").click(function() {
		tryLoop(100);
	});

	//== 「n回確認」ボタン
	$("#chckN").click(function() {
		tryLoop($("#tryNo").val() * 1);
	});

	//== 複数回試行
	function tryLoop(tryNo) {
		var tryCnt = 0;
		var rcrdArr = [];
		var sccsY = true, fuelY = 0, stpY = 0;
		var sccsC = true, fuelC = 0, stpC = 0;

		(function() {
			$("#chckPls1").click();
			rcrdArr.push($("#res").val());
			if (! rYou.sccs) sccsY = false;
			if (! rCom.sccs) sccsC = false;
			fuelY += rYou.useFuel;
			fuelC += rCom.useFuel;
			stpY += rYou.useStp;
			stpC += rCom.useStp;

			tryCnt ++;
			if (tryCnt < tryNo) {
				setTimeout(arguments.callee, 10);
				return;
			}

			var avrgFuelY = (fuelY / tryNo)|0;
			var avrgFuelC = (fuelC / tryNo)|0;
			var avrgStpY = (stpY / tryNo)|0;
			var avrgStpC = (stpC / tryNo)|0;
			var rcrdStr = ""
				+ "平均\n"
				+ mkStts(sccsY, sccsC, avrgFuelY
					,avrgFuelC, avrgStpY, avrgStpC)
				+ "\n--------------------\n\n"
			for (var i = 0; i < rcrdArr.length; i ++) {
				rcrdStr += (i + 1) + "回目\n"
					+ rcrdArr[i] + "\n\n";
			}
			$("#res").val(rcrdStr);
		})();
	}

	//== 初回時実行
	vwCode();	// 元の式を表示
	chckCode();	// コードを確認
});

