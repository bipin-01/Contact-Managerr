import {
  CONTACTS_CREATE_FAIL,
  CONTACTS_CREATE_REQUEST,
  CONTACTS_CREATE_SUCCESS,
  CONTACTS_DELETE_FAIL,
  CONTACTS_DELETE_REQUEST,
  CONTACTS_DELETE_SUCCESS,
  CONTACTS_LIST_FAIL,
  CONTACTS_LIST_REQUEST,
  CONTACTS_LIST_SUCCESS,
  CONTACTS_UPDATE_FAIL,
  CONTACTS_UPDATE_REQUEST,
  CONTACTS_UPDATE_SUCCESS,
} from "../constants/contactsConstants";
import axios from "axios";

export const listContacts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTACTS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/contacts`, config);

    dispatch({
      type: CONTACTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CONTACTS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createContactAction =
  (namee, emailAddress, department) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CONTACTS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/contacts/create`,
        { namee, emailAddress, department },
        config
      );

      dispatch({
        type: CONTACTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CONTACTS_CREATE_FAIL,
        payload: message,
      });
    }
  };

  export const deleteContactAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CONTACTS_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/contacts/${id}`, config);
  
      dispatch({
        type: CONTACTS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          dispatch({
            type: CONTACTS_DELETE_FAIL,
            payload: message,
          })
    }
  };
  
export const updateContactAction =
  (id, namee, emailAddress, department) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CONTACTS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/contacts/${id}`,
        { namee, emailAddress, department },
        config
      );

      dispatch({
        type: CONTACTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CONTACTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

