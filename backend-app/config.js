const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    // host: "db4free.net",
    host: "localhost",
    user: "root",
    password: "",
    database: "restdb",
  },
  listPerPage: 10,
  TOKEN_KEY: "the-super-strong-secrect",
};
module.exports = config;
