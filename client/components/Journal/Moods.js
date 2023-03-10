const getMoods = async () => {
  return fetch('http://localhost:3000/moods').then((res) => res.json());
};

export default getMoods;
