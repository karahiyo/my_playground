$(function() {
	//== マップ
	var map =
		[5,5,4,2,1,1,1,2,2,3
		,5,4,3,2,1,1,2,2,3,4
		,5,4,2,1,1,2,2,4,5,5
		,4,4,2,1,2,2,3,3,4,5
		,4,3,1,1,4,3,3,3,4,5
		,3,1,1,5,4,3,2,3,4,5
		,2,1,3,4,3,3,2,2,3,4
		,1,1,3,4,3,2,1,1,2,3
		,2,1,1,3,4,2,2,3,4,4
		,3,2,1,1,3,3,3,3,4,5];
	var mapSz = 10;
	var strt = {x: 4, y: 0};
	var goal = {x: 5, y: 9};

	//== 答え
	var ans = [4, 0, 4, 1, 4, 2, 3, 2, 3, 3, 3, 4, 2, 4, 2, 5,
		1, 5, 1, 6, 1, 7, 1, 8, 2, 8, 2, 9, 3, 9, 4, 9, 5, 9];

	//== コードを確認
	function chckCode() {
		// 初期化
		var src = $("#src").val();

		// 処理
		var res = execCode(src, [mapSz, mapSz, map,
			strt.x, strt.y, goal.x, goal.y]);

		// 判定
		var judg = "不正解";
		if (res.toString() == ans.toString()) judg = "正解";
		$("#stts").text(judg);

		drwMap(res, map, mapSz);	// マップを表示

		// 読みやすいように加工
		var arr = [];
		for (var i = 0; i < res.length; i += 2) {
			arr.push("x " + res[i] + ", y " + res[i + 1]);
		}

		// 結果を出力
		$("#res").val(arr.join("\n"));
	}

	//== ボタンの処理を登録
	$("#chck").click(chckCode);

	//== 初回時実行
	vwCode();	// 元の式を表示
	chckCode();	// コードを確認
});

