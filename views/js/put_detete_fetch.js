function postData(url = "/add", data = {}) {
  // Default options are marked with *
  const response = fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: data,
  });
  return response.json();
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
