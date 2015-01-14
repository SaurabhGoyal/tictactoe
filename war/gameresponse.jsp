<%@ page import="com.ttt.mm.*" language="java"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	int qtype = Integer.parseInt(request.getParameter("qtype"));
	String rType1 = "rtype1";
	String rType2 = "rtype2";
	String splitter = ":||:";
	MiniMaxGame game = null;
	String statusResponse = "", gameTableResponse="";
	if (qtype == 1) {
		game = new MiniMaxGame();
		System.out.println("going to serialize");
		session.setAttribute("gameobject", game);
		System.out.println("serialized");
		int first = Integer.parseInt(request.getParameter("first"));
		game.startGame(first);
		if(first==0){
			Pair lastMove = game.latestPair;
			gameTableResponse = ""+(lastMove.i+1)+""+(lastMove.j+1)+"";
		}
		
		int status = game.afterMove();
		switch(status){
			case 0: statusResponse = "You lost."; break;
			case 1: statusResponse = "You won... I am not unbeatable apparently"; break;
			case 2: statusResponse = "It's a draw. You know your shit."; break;
			case 3: statusResponse = "Your turn ..."; break;
		}
	} else if (qtype == 2) {
		game = (MiniMaxGame) session.getAttribute("gameobject");
		String ij =  request.getParameter("ij");
		int ijint = Integer.parseInt(ij); 
		int i = ijint/10;
		int j = ijint%10;
		if(game == null) System.out.println("plz init game");
		game.humanMove(i,j);
		int status = game.afterMove();
		switch(status){
			case 0: statusResponse = "You lost."; break;
			case 1: statusResponse = "You won... I am not unbeatable apparently"; break;
			case 2: statusResponse = "It's a draw. You know your shit."; break;
			case 3: statusResponse = "Your turn ..."; break;
		}
		Pair lastMove = game.latestPair;
		gameTableResponse = ""+(lastMove.i+1)+""+(lastMove.j+1)+"";
	}
%>
<div id="status"><%= statusResponse %></div>
<div id="gametable"><%=gameTableResponse %></div>