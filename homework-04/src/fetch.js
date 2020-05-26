export const fetchTeamsData = () => {
  const url = "https://www.balldontlie.io/api/v1/teams";

  console.log("Fetch started");

  fetch(url)
    .then(response => {
      debugger;
      // response is here raw response
      // developer should decode response(parse it depending on data type (JSON), check response status (404 responses will also happen here))
      console.log("Response", { response });

      // status can be better checked (e.g. interval 199-299, `ok` property, ...)
      if (response.status === 200) {
        response.json().then(decodedData => {
          debugger;
          console.log("Decoded response", decodedData);
          return decodedData;
        });
      } else {
        console.log("Response status code is not OK!");
      }
    })
    // if error occurs log to console as error
    .catch(console.error)
    // finally will be always called when promise finished (`then` or `catch`)
    .finally(() => {
      console.log("Fetch finished!");
    });
};
