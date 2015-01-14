package com.ttt.mm;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class MiniMaxGame implements Serializable {

	//private static final long serialVersionUID = 1L;
	public char[][] grid;
	public List<Pair> availablePairs;
	public char computer;
	public char human;
	public Pair latestPair;

	public void startGame(int first) {
		grid = new char[3][3];
		computer = 'x';
		human = 'o';
		latestPair = null;
		availablePairs = new ArrayList<Pair>();
		for (int i = 0; i < 3; i++)
			for (int j = 0; j < 3; j++)
				availablePairs.add(new Pair(i, j));
		if (first == 0){
			Pair firstPair = new Pair(0, 0); 
			playMove(firstPair, computer);
			latestPair = firstPair;
		}
	}

	public void computerMove() {
		Move bestMove = getBestMove(0);
		playMove(bestMove.position, computer);
		latestPair = bestMove.position;
	}

	public void humanMove(int i, int j) {
		playMove(new Pair(i - 1, j - 1), human);
		int status = afterMove();
		if (status == 3)
			computerMove();
	}

	public int afterMove() {
		if (isWin())
			return 0;
		else if (isLoss())
			return 1;
		else if (availablePairs.isEmpty())
			return 2;
		return 3;
	}

	public void playMove(Pair position, char player) {
		grid[position.i][position.j] = player;
		availablePairs.remove(position);
	}

	public void undoMove(Pair position) {
		grid[position.i][position.j] = '\0';
		availablePairs.add(position);
	}

	public Move getBestMove(int depth) {
		Pair minPair = new Pair(), maxPair = new Pair();
		int minScore = 999, maxScore = -999;
		int score;
		char player = depth % 2 == 0 ? computer : human;
		// System.out.println("======At depth = " + depth + " , ======player = "
		// + player + " ======");
		if (availablePairs.isEmpty())
			return new Move(new Pair(), 0);
		Iterator<Pair> it = availablePairs.iterator();
		Pair[] pairs = new Pair[availablePairs.size()];
		int i = -1;
		while (it.hasNext()) {
			pairs[++i] = it.next();
		}
		for (Pair pairForNextMove : pairs) {
			// System.out.println("----checking for pair "+pairForNextMove);
			playMove(pairForNextMove, player);
			score = getScore(depth);
			// System.out.println("--score recd is : "+score);
			if (score == 0) {
				Move mv = getBestMove(depth + 1);
				score = mv.score;
			}
			if (score < minScore) {
				minScore = score;
				minPair = pairForNextMove;
			}
			if (score > maxScore) {
				maxScore = score;
				maxPair = pairForNextMove;
			}
			undoMove(pairForNextMove);
			// System.out.println("--move undone: ");
		}
		if (player == computer) {
			Move m = new Move(maxPair, maxScore);
			// System.out.println("returning to depth : "+(depth-1)+", with move\n"+m);
			return m;
		} else {
			Move m = new Move(minPair, minScore);
			// System.out.println("returning to depth : "+(depth-1)+", with move\n"+m);
			return m;
		}
	}

	public int getScore(int depth) {
		if (isWin())
			return 10 - depth;
		if (isLoss())
			return depth - 10;
		return 0;
	}

	public boolean isWin() {
		for (int i = 0; i < 3; i++)
			if (grid[i][0] == computer && grid[i][1] == computer
					&& grid[i][2] == computer)
				return true;
		for (int i = 0; i < 3; i++)
			if (grid[0][i] == computer && grid[1][i] == computer
					&& grid[2][i] == computer)
				return true;
		if (grid[0][0] == computer && grid[1][1] == computer
				&& grid[2][2] == computer)
			return true;
		if (grid[0][2] == computer && grid[1][1] == computer
				&& grid[2][0] == computer)
			return true;
		return false;
	}

	public boolean isLoss() {
		for (int i = 0; i < 3; i++)
			if (grid[i][0] == human && grid[i][1] == human
					&& grid[i][2] == human)
				return true;
		for (int i = 0; i < 3; i++)
			if (grid[0][i] == human && grid[1][i] == human
					&& grid[2][i] == human)
				return true;
		if (grid[0][0] == human && grid[1][1] == human && grid[2][2] == human)
			return true;
		if (grid[0][2] == human && grid[1][1] == human && grid[2][0] == human)
			return true;
		return false;
	}

}
