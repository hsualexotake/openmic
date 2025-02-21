const bcrypt = require("bcryptjs");

const hashPassword = async () => {
  const hashedPassword = await bcrypt.hash("dev", 10); // Hashes "dev" as the password
  console.log("Hashed Password:", hashedPassword);
};

hashPassword();
