import React from 'react';

const key = '?app_id=' + process.env.REACT_APP_TFL_APPLICATION_ID + '&app_key=' + process.env.REACT_APP_TFL_APPLICATION_KEY;
const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const apiConfig ={
    apiKeyConfig: key,
    header: header
};
