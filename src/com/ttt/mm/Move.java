package com.ttt.mm;

import java.io.Serializable;

public class Move implements Serializable {
	
	private static final long serialVersionUID = 1L;

	Pair position;
	int score;

	public Move() {

	}

	public Move(Pair position, int score) {
		super();
		this.position = position;
		this.score = score;
	}
}
