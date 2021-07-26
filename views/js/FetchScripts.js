function userPost() {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;

  const url = "http://localhost:3000/";
  const data = { name: name, age: age };

  try {
    const response = fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error);
  }
  window.location.reload();
}

function userDelete(name) {
  const url = "http://localhost:3000/";
  const data = { name: name };

  try {
    const response = fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error);
  }
  window.location.reload();
}

function userUpdate(name, age, i) {
  let name_set = document.getElementById("name." + i + "").value;
  let age_set = document.getElementById("" + age + "").value;

  const url = "http://localhost:3000/";
  const data = {
    old_name: name,
    old_age: age,
    new_name: name_set,
    new_age: parseInt(age_set),
  };

  try {
    const response = fetch(url, {
      method: "PUT", // или 'PUT'
      body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error);
  }
  window.location.reload();
}
