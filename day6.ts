/// <reference path="./types.d.ts"/>
const RESPONSES = Deno.args[0].split('\n\n');
console.log('Part 1:');
{
	let totalYes = 0;
	RESPONSES.forEach((group: any) => {
		group = group.replaceAll('\n', '');
		totalYes += new Set([...group]).size;
	});
	console.log(totalYes);
}
console.log('Part 2:');
{
	let totalAgrees = 0;
	const respPerPerson = RESPONSES.map(g => g.split('\n'));
	respPerPerson.forEach((group: any) => {
		totalAgrees += [...group[0]].filter(char =>
			group.every((p: string) => p.includes(char))
		).length;
	});
	console.log(totalAgrees);
}