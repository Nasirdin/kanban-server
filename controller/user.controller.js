const db = require("../db");

class UserController {
  async createUser(req, res) {
    const { username, login, password } = req.body;
    try {
      const checkUser = await db.query(
        `SELECT * FROM person WHERE username = $1`,
        [login]
      );

      if (checkUser.rows.length <= 0) {
        const newUser = await db.query(
          `INSERT INTO person (username, login, password) VALUES ($1, $2, $3) RETURNING *`,
          [username, login, password]
        );
        res.status(201).json(newUser.rows[0]);
      } else {
        res.status(409).json({
          statusCode: 409,
          message: "Пользователь с таким логином уже существует",
        });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ statusCode: 500, message: "Внутренняя ошибка сервера" });
    }
  }

  async login(req, res) {
    const { login, password } = req.body;
    try {
      const user = await db.query(
        `SELECT * FROM person WHERE login = $1 AND password = $2`,
        [login, password]
      );

      if (user.rows.length === 1) {
        res.json({
          statusCode: 200,
          message: "Вход выполнен успешно",
          user: user.rows[0],
        });
      } else {
        res.status(401).json({
          statusCode: 401,
          message: "Неверное имя пользователя или пароль",
        });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ statusCode: 500, message: "Внутренняя ошибка сервера" });
    }
  }

  async getOneUser(req, res) {
    const { id } = req.params;
    try {
      const user = await db.query(`SELECT * FROM person WHERE id = $1`, [id]);
      if (user.rows.length > 0) {
        res.json(user.rows[0]);
      } else {
        res.status(404).json({
          statusCode: 404,
          message: "Пользователь не найден",
        });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ statusCode: 500, message: "Внутренняя ошибка сервера" });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deleteResult = await db.query(`DELETE FROM person WHERE id = $1 RETURNING *`, [id]);
      if (deleteResult.rows.length > 0) {
        res.json({
          statusCode: 200,
          message: "Пользователь удален",
          user: deleteResult.rows[0],
        });
      } else {
        res.status(404).json({
          statusCode: 404,
          message: "Пользователь не найден",
        });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ statusCode: 500, message: "Внутренняя ошибка сервера" });
    }
  }
}

module.exports = new UserController();
