export const getDate = (value: string) => {
  const date = new Date(value);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const t = `${date.getHours()}:${date.getMinutes()}`;
  return `${yyyy}.${mm}.${dd}. ${t}`;
};
