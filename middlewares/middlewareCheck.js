const checkCreateRoom = (req, res, next) => {
  const { name, tv, air_conditioning } = req.body;
  if (!name || !tv || !air_conditioning) {
    res.status(400).json({ response: true, error: "Missing Data!" });
  } else if (
    typeof name !== "string" ||
    typeof tv !== "boolean" ||
    typeof air_conditioning !== "boolean"
  ) {
    res
      .status(400)
      .json({ response: true, error: "Data types are not correct" });
  } else {
    next();
  }
};

const checkCreateUser = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ response: true, error: "Missing Data!" });
  } else if (typeof name !== "string") {
    res
      .status(400)
      .json({ response: true, error: "Data types are not correct!" });
  } else {
    next();
  }
};

const checkCreateReservation = (req, res, next) => {
  const { user_id, room_id, time_start, time_end } = req.body;
  if (!user_id || !room_id || !time_start || !time_end) {
    res.status(400).json({ response: true, error: "Missing Data!" });
  } else if (
    typeof user_id !== "number" ||
    typeof room_id !== "number" ||
    typeof time_start !== "string" ||
    typeof time_end !== "string"
  ) {
    res
      .status(400)
      .json({ response: true, error: "Data types are not correct!" });
  } else {
    next();
  }
};

module.exports = {
  checkCreateRoom,
  checkCreateUser,
  checkCreateReservation,
};
