/// <reference path="./types.d.ts"/>
const RULES = Deno.args[0].split('\n');
console.log('Part 1:');
{
	const containsMap = new Map<string, Set<string>>();
	RULES.forEach(rule => {
		const containerBag = rule.match(/(.+?) bag/)![1];
		const [...innerBags] = (rule.matchAll(/\d (.+?) bag/g)) as any;
		(innerBags as string[][]).forEach(([, bag]) => {
			if (!containsMap.has(bag)) containsMap.set(bag, new Set());
			containsMap.get(bag)!.add(containerBag);
		});
	});
	const visited = new Set<string>();
	function children(bag: string): number {
		if (visited.has(bag)) return 0;
		visited.add(bag);
		const bagSet = containsMap.get(bag);
		if (bagSet === undefined) return 1;
		let c = 1;
		bagSet.forEach(inBag =>
			c += children(inBag)
		);
		return c;
	}
	// should be 254
	console.log(children('shiny gold') - 1);
}

console.log('Part 2:');
{
	const containsMap = new Map<string, Map<string, number>>();
	RULES.forEach(rule => {
		const containerBag = rule.match(/(.+?) bag/)![1];
		const [...innerBags] = (rule.matchAll(/(\d) (.+?) bag/g)) as any;
		const map = new Map<string, number>();
		containsMap.set(containerBag, map);
		(innerBags as any[][]).forEach(match => {
			map.set(match[2], match[1]);
		});
	});
	function subBags(bag: string): number {
		const bagMap = containsMap.get(bag);
		if (bagMap === undefined) return 1;
		let c = 1;
		bagMap.forEach((count, color) => {
			c += count * subBags(color);
		});
		return c;
	}
	console.log(subBags('shiny gold') - 1);
}