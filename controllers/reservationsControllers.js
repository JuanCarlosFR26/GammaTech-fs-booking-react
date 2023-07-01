const { pool } = require("../config/pgconfig");
const {
  listReservations,
  createReservation,
  updateReservation,
  deleteReservation,
  getReservationsByUserID,
} = require("../queries/queries");

const getReservations = async (req, res) => {
  const client = await pool.connect();

  try {
    const response = await client.query(listReservations);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const getReservationsFromUserId = async (req, res) => {
  const client = await pool.connect();
  const requiredId = req.params.id;

  try {
    const response = await client.query(getReservationsByUserID, [requiredId]);
    if (response.rows.length === 0) {
      res
        .status(200)
        .json({
          response: true,
          message: "This user doesn't have reservation",
        });
    } else {
      res.status(200).json({ response: true, result: response.rows });
    }
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

// revisar
const createNewReservation = async (req, res) => {
  const client = await pool.connect();
  const { user_id, room_id, time_start, time_end } = req.body;

  try {
    const userQuery = "SELECT * FROM users WHERE user_id = $1";
    const userResult = await client.query(userQuery, [user_id]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "this user is not exists" });
    }
    const roomQuery = "SELECT * FROM rooms WHERE room_id = $1";
    const roomResult = await client.query(roomQuery, [room_id]);
    if (roomResult.rows.length === 0) {
      return res.status(400).json({ error: "this room is not exists" });
    }
    const response = await client.query(createReservation, [
      user_id,
      room_id,
      time_start,
      time_end,
    ]);
    res.status(201).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const updateReservationById = async (req, res) => {
  const client = await pool.connect();
  const { user_id, room_id, time_start, time_end } = req.body;
  const requiredId = req.params.id;

  try {
    const response = await client.query(updateReservation, [
      user_id,
      room_id,
      time_start,
      time_end,
      requiredId,
    ]);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const deleteReservationById = async (req, res) => {
  const client = await pool.connect();
  const requiredId = req.params.id;

  try {
    const response = await client.query(deleteReservation, [requiredId]);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

module.exports = {
  getReservations,
  createNewReservation,
  updateReservationById,
  deleteReservationById,
  getReservationsFromUserId,
};
