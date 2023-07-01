const { pool } = require("../config/pgconfig");
const {
  listUsers,
  getUserId,
  createUser,
  updateUser,
  deleteReservationWithIdUser,
} = require("../queries/queries");

const getUsers = async (req, res) => {
  const client = await pool.connect();

  try {
    const response = await client.query(listUsers);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const getUserById = async (req, res) => {
  const client = await pool.connect();
  const requiredEmail = req.params.email;

  try {
    const response = await client.query(getUserId, [requiredEmail]);
    if (response.rows.length === 0) {
      res
        .status(200)
        .json({ response: true, message: "This user is not exists" });
    } else {
      res.status(200).json({ response: true, result: response.rows });
    }
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const createNewUser = async (req, res) => {
  const { name } = req.body;
  const client = await pool.connect();

  try {
    const response = await client.query(createUser, [name]);
    res.status(200).json({ response: true, result: response.rows });
    console.log('User registered')
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const updateUserById = async (req, res) => {
  const client = await pool.connect();
  const { name } = req.body;
  const requiredId = req.params.id;

  try {
    const response = await client.query(updateUser, [name, requiredId]);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const deleteUserById = async (req, res) => {
  const client = await pool.connect();
  const requiredId = req.params.id;

  const userQuery = getUserId;
  const userResult = await client.query(userQuery, [requiredId]);
  if (userResult.rows.length === 0) {
    return res.status(404).json({ error: "Este usuario no existe" });
  }

  try {
    const deleteReservationsQuery = deleteReservationWithIdUser;
    const deleteUserQuery = deleteUser;
    await client.query(deleteReservationsQuery, [requiredId]);
    await client.query(deleteUserQuery, [requiredId]);
    res
      .status(200)
      .json({ response: "Usuario y sus reservas eliminados correctamente" });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
};
