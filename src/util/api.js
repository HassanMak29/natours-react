import axios from "axios";
axios.defaults.withCredentials = true;

///////// USER //////////
export const register = async (name, email, password, passwordConfirm) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/users/signup`,
    {
      name,
      email,
      password,
      passwordConfirm,
    }
  );
  return res.data;
};

export const login = async (email, password) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
    email,
    password,
  });

  return res.data;
};

export const logout = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/logout`);
  return res.data;
};

export const refresh = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/users/refresh`
  );
  return data;
};

export const updateProfile = async (form) => {
  const { data } = await axios.patch(
    `${process.env.REACT_APP_API_URL}/users/updateMe`,
    form
  );
  return data;
};

export const updatePassword = async (
  passwordCurrent,
  password,
  passwordConfirm
) => {
  const { data } = await axios.patch(
    `${process.env.REACT_APP_API_URL}/users/updateMyPassword`,
    { passwordCurrent, password, passwordConfirm }
  );
  return data;
};

export const deleteMyAccount = async () => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/users/deleteMe`
  );
  return res.data;
};

///////// TOURS /////////////
export const getAllTours = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tours/`);
  return data.data;
};

export const getTour = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/tours/${id}`
  );
  return data.data;
};

export const bookTour = async (tourId, userId, startDate) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/booking/checkout-session/${tourId}/${userId}/${startDate}`
  );
  return data;
};

////////// BOOKINGS ///////////////
export const getMyBookings = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/users/${id}/bookings`
  );
  return data.data;
};

export const deleteBooking = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL}/booking/${id}`);
};

///////////// REVIEWS ///////////////

export const getReviews = async (userId) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/reviews/${userId}`
  );
  return data;
};

export const addReview = async (tourId, review, rating) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/tours/${tourId}/reviews`,
    { review, rating }
  );
  return data;
};

export const updateReview = async (reviewId, rating, review) => {
  const { data } = await axios.patch(
    `${process.env.REACT_APP_API_URL}/reviews/${reviewId}`,
    { rating, review }
  );
  return data;
};

export const deleteReview = async (reviewId) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/reviews/${reviewId}`
  );
};
