var url = "gameresponse.jsp";
$(function() {
	$("#gametable *").prop("disabled",true);
	$("#firstyes").click(function(){
		$.fn.firstQuery(1);
	});
	$("#firstno").click(function(){
		$.fn.firstQuery(0);
	});
	$(".gametablebuttons").click(function(){
		$(this).text("X").prop("disabled", true);
		var $ij = $(this).attr('id').substring(1);
		$("#status").text("Thinking...");
		$(this).secondQuery($ij);
	});
	$.fn.firstQuery = function(firstmove) {
		$("#status").text("Loading the game...");
		$("#gametable *").prop("disabled",false);
		$.get(url, {
			qtype:'1',
			first:firstmove
		}, function(data) {
			$("mainbody").processData(data);
		}, 'html')
	}
	$.fn.secondQuery = function(ijval) {
		$.get(url, {
			qtype:'2',
			ij:ijval
		}, function(data) {
			$("mainbody").processData(data);
		}, 'html')
	}
	$.fn.processData = function(data) {
		var $response = $('<div />').html(data);
		var $status = $response.find('#status')
		var $gametable = $response.find('#gametable');
		var $statuscode = $response.find('#statuscode');
		$("#status").html($($status).html());
		var ij = $($gametable).text();
		var sc = $($statuscode).text();
		$("#b"+ij).text("O").prop("disabled", true);
		if(sc!=3) $("#gametable *").prop("disabled",true);
	}
});
