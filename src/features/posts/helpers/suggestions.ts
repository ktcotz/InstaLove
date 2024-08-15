export const suggestions = (str?: string) => {
  if (!str) return false;

  const atIndex = str.lastIndexOf("@");

  console.log(atIndex);

  if (atIndex !== -1) {
    const searchText = str.slice(atIndex + 1);

    if (searchText.trim() !== "" && !searchText.includes(" ")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
