import * as dbprop from "./dbproperties";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getExpenseDB = async (userid) => {
  // console.log(`${dbprop.getExpenseUrl}/${userid}` + ' dbprop.userLoginUrl');
  // const data = {
  //     username: username,
  //     password: userpassword
  // };
  // console.log(data);
  let response;
  try {
    response = await axios.get(`${dbprop.expenseUrl}/${userid}`, config);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const saveExpenseDB = async (expense, userid) => {
  // console.log(`${dbprop.saveEstimateUrl}/${userid}` + ' dbprop.userLoginUrl');
  const data = {
    expense,
  };
  console.log(data);
  let response;
  try {
    response = await axios.post(`${dbprop.expenseUrl}/${userid}`, data, config);
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteExpenseDB = async (id, userid) => {
  // console.log(`${dbprop.saveEstimateUrl}/${userid}` + ' dbprop.userLoginUrl');

  console.log(id);
  let response;
  try {
    response = await axios.delete(
      `${dbprop.expenseUrl}/${userid}/${id}`,
      config
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
