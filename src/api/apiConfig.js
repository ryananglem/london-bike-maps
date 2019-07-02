const key = () => {
  return (
    "?app_id=" +
    process.env.REACT_APP_TFL_APPLICATION_ID +
    "&app_key=" +
    process.env.REACT_APP_TFL_APPLICATION_KEY
  );
};

export const apiConfig = {
  apiKeyConfig: key()
};
