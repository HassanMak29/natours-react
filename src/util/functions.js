export const nextTourDate = (tour) => {
  let date;
  let futureDates = [];
  let indexes = [];
  for (let i = 0; i < tour.startDates.length; i++) {
    if (new Date(tour.startDates[i].date) > new Date()) {
      futureDates.push(new Date(tour.startDates[i].date));
      indexes.push(i);
    }
  }
  if (futureDates.length > 0) {
    date = new Date(futureDates[0]).toLocaleString("en-us", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return {
    date,
    preciseDate: new Date(futureDates[0]).getTime(),
    index: indexes[0],
  };
};
