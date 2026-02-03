export const baseURL = "http://192.168.18.129:3000";

export const FireApi = async (endpoint, method, body=null, Headers=null) => {
  const headers = {
    "content-type": "application/json",
  };
  const options = {
    method,
    headers: Headers ? Headers : headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response=await fetch(`${baseURL}/${endpoint}`,options);
  if(response.ok && response.status>=200 && response.status<=301 ){
    return response.json()
  }else{
    const json= response.json()
    return json
  }
};
