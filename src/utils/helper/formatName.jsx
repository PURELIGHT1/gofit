export function formatName(name) {
  const nameArray = name?.split(' ');
  if (nameArray.length > 1) {
    let name = `${nameArray[0]} `;
    for (let i = 1; i < nameArray.length; i++) {
      name += nameArray[i][0] + ' ';
    }
    return name;
  }

  return name;
}