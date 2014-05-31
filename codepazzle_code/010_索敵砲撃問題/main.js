$(function() {
	//== 爆弾処理（複数回）
	window.execBomb = function(argFnc) {
		for (var i = 0; i < p.bomb; i ++) {
			argGm = argFnc(argGm);
			execBombOnce(argGm);
		}
	}

	//== 爆弾処理（1回分）
	window.execBombOnce = function(arg) {
		var x = arg.x;
		var y = arg.y;
		bombPos.push({x: arg.x, y: arg.y});

		// 変数の初期化
		var rngOut2 = p.rngOut * p.rngOut;
		var rngIn2  = p.rngIn  * p.rngIn;

		arg.hitEnemy = [];
		arg.viewEnemy = [];

		// 爆弾処理
		for (var i = 0; i < eneArr.length; i ++) {
			var ene = eneArr[i];
			var difX = x - ene.x; difX = difX * difX;
			var difY = y - ene.y; difY = difY * difY;

			if (difX + difY <= rngIn2) {
				if (! ene.hit) {
					ene.hit = true;
					arg.hitEnemy.push($.extend({}, ene));
				}
			}
			if (difX + difY <= rngOut2) {
				arg.viewEnemy.push($.extend({}, ene));
			}
		}
		arg.cnt ++;
		return arg;
	}

	//== 得点取得
	window.getPnt = function() {
		var pnt = 0;
		for (var i = 0; i < eneArr.length; i ++) {
			if (eneArr[i].hit) pnt++;
		}
		return pnt;
	}

	//== 設定の初期化
	var eneArr  = [];
	var argGm   = {};
	var bombPos = [];
	var holeArr = [];
	var p = new P();

	//== パラメータの出力
	function outPrmStr() {
		var tgt = $(":input[id^=_p_]");
		tgt.each(function() {
			var obj = $(this);
			var nm = obj.attr("id").replace(/^_p_/, "");
			eval("obj.val(p." + nm + " * 1)");
		});
	}

	//== パラメータの反映
	$("#btnChngPrm").click(function() {
		var tgt = $(":input[id^=_p_]");
		tgt.each(function() {
			var obj = $(this);
			var nm = obj.attr("id").replace(/^_p_/, "");
			eval("p." + nm + " = " + obj.val() + " * 1");
		});
		chckCode();
	});

	//= 初期化と生成

	//== 初期化
	function init(seed) {
		// 変数の初期化
		bombPos = [];

		// 敵の生成
		var res = makeEnemies(seed, p);
		eneArr = res.eneArr;
		holeArr = res.holeArr;

		// 引数の初期化
		argGm.w = p.w;
		argGm.h = p.h;
		argGm.x = 0;
		argGm.y = 0;
		argGm.rngOut = p.rngOut;
		argGm.rngIn  = p.rngIn;
		argGm.cnt = 0;
		argGm.hitEnemy = [];
		argGm.viewEnemy = [];
		argGm.saveDat = null;
	}

	//= 表示系

	//== コードを確認
	function chckCode() {
		// 初期化
		init($("#seed").val() * 1);

		// 取得して実行
		var src = $('#src').val();
		var fnc = codeToFnc(src);
		execBomb(fnc);
		var res = getPnt();

		$("#res").val(res);

		// 表示をレンダリング
		rndr(p, bombPos, eneArr, holeArr);
	}

	//== 「確認」ボタン
	$("#chck").click(chckCode);

	//== 「シードを+1して確認」ボタン
	$("#chckPls1").click(function() {
		$("#seed").val($("#seed").val() * 1 + 1);
		chckCode();
	});

	//== 「100回確認」ボタン
	$("#chck100").click(function() {
		trySum(100);
	});

	//== 「n回確認」ボタン
	$("#chckN").click(function() {
		trySum($("#tryNo").val() * 1);
	});

	//== 複数回試行
	function trySum(tryNo) {
		var tryCnt = 0;
		var rcrdArr = [];
		var rcrdSum = 0;
		var tmStrt = +new Date();

		(function() {
			$("#chckCodePlus1").click();
			var res = ~~$("#res").val();
			rcrdArr.push(res);
			rcrdSum += res;
			tryCnt ++;
			if (tryCnt < tryNo) {
				setTimeout(arguments.callee, 10);
				return;
			}

			var tmEnd = +new Date();
			var tmDifSec = ((tmEnd - tmStrt)/1000).toFixed(4);
			var rcrdStr = ""
				+ "Sum : " + rcrdSum + "\n"
				+ "Cnt : " + tryNo + "\n"
				+ "Avr : " + Math.floor(rcrdSum/tryNo) + "\n"
				+ "SumTime(sec) : " + tmDifSec + "\n"
				+ "--------------------\n"
			for (var i = 0; i < rcrdArr.length; i ++) {
				rcrdStr += i + " : " + rcrdArr[i] + "\n";
			}
			$("#res").val(rcrdStr);
		})();
	}

	//= 初回時実行
	vwCode();		// 元の式を表示
	outPrmStr();	// パラメータの出力
	chckCode();		// 元の式を実行
});

