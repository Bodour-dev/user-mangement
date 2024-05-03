export const SERVER_URL = "https://jsonplaceholder.typicode.com/users/";

export const INITIAL_USER_STATE = {
  id: 0,
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

export const COLUMNS_USERS_TABLE = [
  { id: "id", name: "ID" },
  { id: "name", name: "Name" },
  { id: "email", name: "Email" },
  { id: "phone", name: "Phone" },
  { id: "address", name: "Address" },
  { id: "website", name: "Website" },
  { id: "company", name: "Company Name" },
  { id: "action", name: "Action" },
];


