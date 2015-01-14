package com.ttt.mm;

import java.io.Serializable;

public class Pair implements Serializable {
	
	private static final long serialVersionUID = 1L;

	public int i, j;

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pair other = (Pair) obj;
		if (i != other.i)
			return false;
		if (j != other.j)
			return false;
		return true;
	}

	public Pair() {

	}

	public Pair(int i, int j) {
		this.i = i;
		this.j = j;
	}
}
