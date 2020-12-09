/// <reference path="./types.d.ts"/>
const POSITIONS = Deno.args[0].split('\n');
console.log('Part 1:');
{
	let maxSeatId = 0;
	POSITIONS.forEach(pos => {
		const fbPos = pos.substring(0, 7)
			.replaceAll('F', '0')
			.replaceAll('B', '1');
		const numfbPos = parseInt(fbPos, 2);
		const lrPos = pos.substring(7)
			.replaceAll('L', '0')
			.replaceAll('R', '1');
		const numlrPos = parseInt(lrPos, 2);
		const seatId = numfbPos * 8 + numlrPos;
		maxSeatId = maxSeatId < seatId ? seatId : maxSeatId;
	});
	console.log(maxSeatId);
}

console.log('Part 2:');
{
	const posArray = POSITIONS.map(pos => {
		const fbPos = pos.substring(0, 7)
			.replaceAll('F', '0')
			.replaceAll('B', '1');
		const numfbPos = parseInt(fbPos, 2);
		const lrPos = pos.substring(7)
			.replaceAll('L', '0')
			.replaceAll('R', '1');
		const numlrPos = parseInt(lrPos, 2);
		return numfbPos * 8 + numlrPos;
	});
	posArray.sort((a, b) => a - b);
	let seat = 0;
	for (var i = 1; i < posArray.length; i++) {
		const delta = posArray[i] - posArray[i - 1];
		if (delta == 2) {
			seat = posArray[i] - 1;
			break;
		}
	}
	console.log(seat);
}