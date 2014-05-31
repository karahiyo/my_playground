//== 元の式を表示
function vwCode(code) {
	if (typeof code === "undefined") code = originalCode;
	var s = code.toString()
		.replace(/^(function )\S+?(\()/, "$1yourCode$2");
	$("#src").val(s);
}

//== 全角2文字でバイト数取得
function getByteLen(s) {
	// 関数部分を除去
	s = s
		.replace(/\r/g, "")
		.replace(/^.+?{|}\n*?$/g, "")
		.replace(/^\n+|\n+$/g, "");

	// 全角2文字でバイト数取得
	var len = 0;
	for (var i = 0; i < s.length; i ++) {
		len += (s.charCodeAt(i) > 255) ? 2 : 1;
	}
	return len;
}

//= コード実行
function execCode(code, args) {
	// コード実行確認
	var res = "";
	try {
		eval(code);
		if (! (args instanceof Array)) args = [];
		res = yourCode.apply(this, args);
	} catch(e) {
		alert(e);
	}
	return res;
}

//= 関数取得
function codeToFnc(code) {
	var res = "";
	try {
		eval(code);
		res = yourCode;
	} catch(e) {
		alert(e);
	}
	return res;
}

