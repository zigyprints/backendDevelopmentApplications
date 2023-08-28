const homePage = (req, res) => {
  fetch("http://localhost:3000/api/tasks") 
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);
      // Handle the data as needed

      res.render("home", {
        tasks: data.tasks,
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle errors appropriately

      res.render("home",{tasks:null});
    });
};

module.exports = { homePage };
