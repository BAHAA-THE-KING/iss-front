export const generateSessionKey = () => {
  let res = "";
  for (let i = 0; i < 3; i++) {
    res += (Math.random() * 100000).toString(36);
  }
  return res.slice(0, 24);
};
