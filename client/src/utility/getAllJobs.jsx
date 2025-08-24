export const fetchJobDescription = async (URL) => {
  try {
    console.log(URL);
    
    const fetchmydata = await fetch(
      URL,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!fetchmydata) {
        throw new Error(`HTTP error! status: ${fetchmydata.status}`);
    }
    const data = await fetchmydata.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
