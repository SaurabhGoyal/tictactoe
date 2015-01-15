var url = "gameresponse.jsp";
var gameActive = 0;
var elem = "<font><a href='/'><button class='btn btn-success'>Play Again</button></a></font>"
$(function() {
	$("#gametable *").prop("disabled", true);
	$("#gametable").click(function() {
		if (gameActive == 0) {
		     $("#status").effect("bounce", { times:5 },200);
		}
	});
	$("#firstyes").click(function() {
		$.fn.firstQuery(1);
	});
	$("#firstno").click(function() {
		$.fn.firstQuery(0);
	});
	$(".gametablebuttons").click(function() {
		$("#gametable *").prop("disabled", true);
		var $ij = $(this).attr('id').substring(1);
		$("#status").text("Thinking...");
		$(this).secondQuery($ij);
		$(this).text("X").prop("disabled", true);
	});
	$.fn.firstQuery = function(firstmove) {
		$("#status").text("Loading the game...");
		$.get(url, {
			qtype : '1',
			first : firstmove
		}, function(data) {
			$("mainbody").processDataFirst(data);
		}, 'html')
	}
	$.fn.secondQuery = function(ijval) {
		$.get(url, {
			qtype : '2',
			ij : ijval
		}, function(data) {
			$("mainbody").processDataSecond(data);
		}, 'html')
	}
	$.fn.processDataFirst = function(data) {
		var $response = $('<div />').html(data);
		var $status = $response.find('#status')
		var $gametable = $response.find('#gametable');
		var $statuscode = $response.find('#statuscode');
		$("#status").html($($status).html());
		var ij = $($gametable).text();
		var sc = $($statuscode).text();
		gameActive = 1;
		$("#gametable *").prop("disabled", false);
		$("#b" + ij).text("O").prop("disabled", true);
		if (sc != 3)
			$("#gametable *").prop("disabled", true);
	}
	$.fn.processDataSecond = function(data) {
		var $response = $('<div />').html(data);
		var $status = $response.find('#status')
		var $gametable = $response.find('#gametable');
		var $statuscode = $response.find('#statuscode');
		$("#status").html($($status).html());
		var ij = $($gametable).text();
		var sc = $($statuscode).text();
		$("#b" + ij).text("O").prop("disabled", true);
		$("#gametable").unlock();
		if (sc != 3) {
			$("#gametable *").prop("disabled", true);
			$("#status").append(" "+elem);
			gameActive = 0;
		}
	}
	$.fn.unlock = function() {
		var $children = $('#gametable').find("button");
		$.each($children, function() {
			if ($(this).text().length == 0)
				$(this).prop("disabled", false);
		});
	}
});
