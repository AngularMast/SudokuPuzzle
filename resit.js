var puzzle = [
	[" ", 4, 1, " "],
	[" ", " ", 2, " "],
	[3, " ", " ", " "],
	[" ", 1, " ", 2]
];

function numBlanks(array) {
	// this function should return a number
	var num = 0;
	//Determines whether an array is an array
	if (!(array instanceof Array)) {
		return num;
	}

	for (var i = 0; i < array.length; i++) {
		//Determines whether an array[i] is an array
		if (!(array[i] instanceof Array)) {
			return 0;
		}

		for (var j = 0; j < array[i].length; j++) {
			//Determine if it is an empty string. If so, increase the count
			if (array[i][j] === " ") {
				num++;
			}
		}
	}
	return num;
}

function linearSearch(array, item) {
	// this function should return a Boolean
	//Determines whether an array is an array
	if (!(array instanceof Array)) {
		return false;
	}

	for (var i = 0; i < array.length; i++) {
		//array[i] is equal to item, and returns true if it is
		if (array[i] === item) {
			return true;
		}
	}
	//False is returned if no item is found
	return false;
}

function notAppear(row) {
	// this function should return an array
	var list = [];

	for (var i = 1; i <= 4; i++) {
		//Find the missing number in the row and push it into the list
		if (linearSearch(row, i) == false) {
			list.push(i);
		}
	}

	return list;
}

function possibilities(array) {
	// this function should return an array
	var poss = [];

	//Find the missing number in the array and push it into the poss
	for (var i = 0; i < array.length; i++) {
		poss.push(notAppear(array[i]));
	}

	return poss;
}

function blankEntries(array) {
	// this function should return an array
	var blank = [];
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			if (array[i][j] === " ") { //Finds the location of all the empty strings in the two-dimensional array and pushes them into a blank
				blank.push([i, j]);
			}
		}
	}

	return blank;
}

function pickCandidate(array) {
	// this function should return an array
	var candidate = [];

	var blank = blankEntries(array);

	var poss = possibilities(array);

	for (var i = 0; i < blank.length; i++) {
		var j = blank[i][0]; //Gets the row in which the current empty space is located
		var idx = Math.floor(Math.random() * poss[j].length) //Randomly get the number to fill in, depending on the number missing in the row
		candidate.push(poss[j][idx]); //Push the obtained number into the candidate
		poss[j].splice(idx, 1); //Removes used Numbers from candidate Numbers
	}

	return candidate
}


/**
 * function test
 */

function test() {
	console.log("======================test numBlanks begin======================")
	var num = numBlanks(puzzle)
	console.log("numBlanks", num)
	console.log("======================test numBlanks end  ======================\n\n")


	console.log("======================test linearSearch begin======================")
	var exist = linearSearch(puzzle[0], 4)
	console.log("linearSearch puzzle[0] exist item 4", exist)
	console.log("======================test linearSearch end  ======================\n\n")


	console.log("======================test notAppear begin======================")
	var list = notAppear(puzzle[0])
	console.log("notAppear puzzle[0]", JSON.stringify(list))
	console.log("======================test notAppear end  ======================\n\n")


	console.log("======================test possibilities begin======================")
	var poss = possibilities(puzzle)
	console.log("possibilities", JSON.stringify(poss))
	console.log("======================test possibilities end  ======================\n\n")


	console.log("======================test blankEntries begin======================")
	var blank = blankEntries(puzzle)
	console.log("blankEntries", JSON.stringify(blank))
	console.log("======================test blankEntries end  ======================\n\n")


	console.log("======================test pickCandidate begin======================")
	var candidate = pickCandidate(puzzle)
	console.log("pickCandidate", JSON.stringify(candidate))
	console.log("======================test pickCandidate end  ======================\n\n")

}


test();