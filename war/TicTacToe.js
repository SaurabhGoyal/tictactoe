var url = "gameresponse.jsp";
$(function() {
	$("#gametable").hide();
	$("#firstyes").click(function(){
		$.fn.firstQuery(1);
	});
	$("#firstno").click(function(){
		$.fn.firstQuery(0);
	});
	$(".gametablebuttons").click(function(){
		//var sourceid = $(event.target).attr('id');
		$(this).text("X");
		var $ij = $(this).attr('id').substring(1);
		//alert(ij);
		$(this).secondQuery($ij);
	});
	$.fn.firstQuery = function(firstmove) {
		$("#gametable").show();
		$.get(url, {
			qtype:'1',
			first:firstmove
		}, function(data) {
			var $response = $('<div />').html(data);
			var $status = $response.find('#status')
			var $gametable = $response.find('#gametable');
			$("#status").html($($status).html());
			var ij = $($gametable).text();
			$("#b"+ij).text("O");
		}, 'html')
	}
	$.fn.secondQuery = function(ijval) {
		$.get(url, {
			qtype:'2',
			ij:ijval
		}, function(data) {
			var $response = $('<div />').html(data);
			var $status = $response.find('#status')
			var $gametable = $response.find('#gametable');
			$("#status").html($($status).html());
			var ij = $($gametable).text();
			$("#b"+ij).text("O");
		}, 'html')
	}
});
