$(function() {
	// 元の画像
	var imgSrc = {};
	imgSrc.col = 3;
	imgSrc.w   = 12;
	imgSrc.h   = 12;

	var R = [255, 0, 0];
	var G = [0, 255, 0];
	var B = [0, 0, 255];
	imgSrc.arr = [
		R, G, B, R, G, B, R, G, B, R, G, B,
		G, B, R, G, B, R, G, B, R, G, B, R,
		B, R, G, B, R, G, B, R, G, B, R, G,
		R, G, B, R, G, B, R, G, B, R, G, B,
		G, B, R, G, B, R, G, B, R, G, B, R,
		B, R, G, B, R, G, B, R, G, B, R, G,
		R, G, B, R, G, B, R, G, B, R, G, B,
		G, B, R, G, B, R, G, B, R, G, B, R,
		B, R, G, B, R, G, B, R, G, B, R, G,
		R, G, B, R, G, B, R, G, B, R, G, B,
		G, B, R, G, B, R, G, B, R, G, B, R,
		B, R, G, B, R, G, B, R, G, B, R, G
	];

	// 作成画像
	var imgDst = {};
	imgDst.col = 3;
	imgDst.w   = 600;
	imgDst.h   = 100;

	imgDst.arr = [];
	for (var i = 0; i < imgDst.w * imgDst.h; i ++) {
		imgDst.arr[i] = new Array(imgDst.col);
	}

	//== コードを確認
	function chckCode() {
		// 初期化
		var src = $("#src").val();

		// 処理
		execCode(src, [imgSrc, imgDst]);	// 結果を取得

		// 結果を出力
		rndr(imgDst);
		$("#res").val(imgDst.arr);
	}

	//== ボタンの処理を登録
	$("#chck").click(chckCode);

	//== セレクトの処理を登録
	$("#codeType").change(function() {
		vwCode(eval($(this).val()));	// 元の式を表示
	});

	//== 初回時実行
	vwCode(codeNearestNeighbor);	// 元の式を表示
	chckCode();	// コードを確認
});

