const numbers = '1234567890';

export const getRandomId = (ids: string[]): string => {
  let template = [
    ['#', '-', '#', '#'],
    ['#', '-', '#', '#', '#'],
    ['#', '#', '-', '#', '#', '#'],
    ['#', '-', '#', '#', '-', '#', '#', '#'],
    ['#', '#', '#', '-', '#', '#', '#', '#'],
    ['#', '-', '#', '#', '#', '-', '#', '#', '#', '#']
  ];
  let id = '';
  let isNew = false;

  for (let i = 0; i < template.length && !isNew; i++) {
    id = template[i].map(t => t === '#' ? numbers[Math.floor(Math.random() * numbers.length)] : '-').join('');
    isNew = ids.indexOf(id) === -1;
  }

  return id;
}
