module.exports = {
  name: "err",
  execute(error) {
    console.log(
      `An error occured while connecting to the database: \n${error}`
    );
  },
};
