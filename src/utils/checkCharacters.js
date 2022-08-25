const checkIfFound = (characters, name) => {
  if (
    characters.some((character) => {
      return character.name === name && character.found;
    })
  ) {
    return "inactive";
  }
};

const checkIfAllFound = (characters) => {
  return characters.every((character) => character.found);
};

export { checkIfFound, checkIfAllFound };
