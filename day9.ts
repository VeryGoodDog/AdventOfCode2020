/// <reference path="./types.d.ts"/>
const NUMS = Uint32Array.from(Deno.args[0].split('\n') as any);
const PRE_LENGTH = 25;
let target = 0;
let targetI = 0;
console.log('Part 1:');
{
	let curHeadI = 0;
	let curHead: number;
	let nextI = PRE_LENGTH;
	let next = 0;
	const head = NUMS.slice(curHeadI, nextI);
	for (var i = 0; i < NUMS.length - PRE_LENGTH; i++) {
		head.sort();
		curHead = NUMS[curHeadI++];
		next = NUMS[nextI++];
		let foundValue = false;
		for (var j = 0; j < PRE_LENGTH - 1 && !foundValue; j++) {
			const front = head[j];
			const needed = next - front;
			const subHead = head.subarray(j + 1);
			foundValue = subHead.includes(needed);
		}
		if (!foundValue)
			break;
		// move on to the next numbers
		head[head.indexOf(curHead)] = next;
	}
	console.log(next);
	target = next;
	targetI = nextI - 1; // because it increments
}
console.log('Part 2:');
{
	// the range MUST be within the numbers before num
	const potentialRange = NUMS.slice(0, targetI).reverse();
	let i: number;
	let j = 0;
	for (i = 0; i < potentialRange.length; i++) {
		let sum = 0;
		for (j = i; j < potentialRange.length && sum < target; j++) {
			sum += potentialRange[j];
		}
		if (sum == target) break;
	}
	const part = potentialRange.subarray(i, j);
	let min = part[0];
	let max = part[0];
	for (var k = 1; k < part.length; k++) {
		if (part[k] < min) min = part[k];
		else if (part[k] > max) max = part[k];
	}
	console.log(min + max);
}