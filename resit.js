Array.prototype.unique = function () {
	return this.filter(function (value, index, self) {
		return self.indexOf(value) === index;
	});
};

var puzzle = [
	[" ", 4, 1, " "],
	[" ", " ", 2, " "],
	[3, " ", " ", " "],
	[" ", 1, " ", 2]
];

function numBlanks(array) {
	// this function should return a number
	var count = 0;
	array.forEach(row => {
		row.forEach(item => {
			count = item === " " ? count + 1 : count;
		})
	})

	return count;
}

function linearSearch(array, item) {
	// this function should return a Boolean
	const key = JSON.stringify(item);

	return array.filter(element => {
		return JSON.stringify(element) == key;
	}).length > 0 ? true : false;
}

function notAppear(row) {
	// this function should return an array
	var list = [];
	const length = row.length;
	var index = 1;
	for (; index <= length; index++) {
		if (!row.includes(index)) {
			list.push(index);
		}
	}

	return list;
}

function possibilities(array) {
	// this function should return an array
	var poss = [];

	array.forEach(row => {
		poss.push(notAppear(row));
	});

	return poss;
}

function blankEntries(array) {
	// this function should return an array
	var blank = [];

	array.forEach((row, rowNum) => {
		row.forEach((item, colNum) => {
			if (item === " ") {
				blank.push([rowNum, colNum]);
			}
		});
	});

	return blank;
}

function randomShffule(array) {
	// this function returns randomly shuffled array
	return array.sort(function () {
		return .5 - Math.random();
	});
}

function checkCandidate(array, candidate, blank) {
	// this function should return a Boolean
	var cloneArray = [...array];
	var i, j;
	const size = cloneArray.length;
	blank.forEach((pos, index) => cloneArray[pos[0]][pos[1]] = candidate[index]);

	// check col
	//  |  	|  	|
	//  | 	|  	|
	//  \/	\/	\/
	for (i = 0; i < size; i++) {
		var tempCol = [];
		for (j = 0; j < size; j++) {
			const index = tempCol.findIndex(item => item === cloneArray[j][i]);
			if (index >= 0) {
				return false;
			}
			tempCol.push(cloneArray[j][i]);
		}
	}

	// check every block
	// -> -> 
	// -> ->
	const blockSize = Math.sqrt(size);
	for (i = 0; i < size; i += blockSize) {
		for (j = 0; j < size; j += blockSize) {
			var tempArr = [];
			var ii, jj;

			for (ii = 0; ii < blockSize; ii++) {
				for (jj = 0; jj < blockSize; jj++) {
					tempArr.push(cloneArray[i + ii][j + jj]);
				}
			}

			if (tempArr.unique().length != blockSize * blockSize) {
				return false;
			}
		}
	}

	return true;
}

function pickCandidate(array) {
	// this function should return an array
	var candidate = [];
	const poss = possibilities(array);
	const blank = blankEntries(array);

	while (true) {
		poss.forEach(row => {
			randomShffule(row).forEach(value => candidate.push(value));
		});

		if (checkCandidate(array, candidate, blank)) {
			return candidate;
		}

		candidate = [];
	}
}


console.log(numBlanks(puzzle));

console.log(linearSearch(puzzle, [" ", 4, 1, " "]));

console.log(notAppear(puzzle[0]));

console.log(possibilities(puzzle));

console.log(blankEntries(puzzle));

console.log(pickCandidate(puzzle));