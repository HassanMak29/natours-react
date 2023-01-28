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
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/users/login`,
    {
      email,
      password,
    }
  );
  return data;
};

export const logout = async () => {
  await axios.get(`${process.env.REACT_APP_API_URL}/users/logout`);
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
  await axios.delete(`${process.env.REACT_APP_API_URL}/users/deleteMe`);
};

export const getAllUsers = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
  return data.data;
};

export const updateUser = async (userId, name, email, role) => {
  const { data } = await axios.patch(
    `${process.env.REACT_APP_API_URL}/users/${userId}`,
    { name, email, role }
  );
  return data.data;
};

export const deleteUser = async (userId) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}`);
};

///////// TOURS /////////////
export const getAllTours = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tours`);
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

export const getAllBookings = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/booking`);
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
  return data.data;
};

export const getAllReviews = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/reviews`);
  return data.data;
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
