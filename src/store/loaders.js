import { getTestimonialsFromServer } from "./testimonialSlice.js";
import { store } from "./store.js";
import {
  getBitesFromServer,
  getMyBitesFromServer,
  getSingleBiteFromServer,
} from "./bitesSlice.js";

export const testimonialLoader = () => {
  store.dispatch(getTestimonialsFromServer());
  // return null;
};

export const bitesLoader = () => {
  store.dispatch(getBitesFromServer());
};

export const singleBiteLoader = ({ params }) => {
  store.dispatch(getSingleBiteFromServer(params.id));
};

export const getMyBitesLoader = () => {
  const loggedInId = store.getState().users.loggedInUser.id;
  store.dispatch(getMyBitesFromServer(loggedInId));
};

export const setLoggedInTrue = () => {
  console.log("loader from home page");
};
