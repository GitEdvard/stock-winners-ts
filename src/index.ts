const world = 'world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}

let element = document.getElementById('firstparagraph')!;
console.log(element)
// element.textContent('Updated paragraph');
