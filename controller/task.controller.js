const db = require("../db");
class TaskController {
  async createTask(req, res) {
    const { title, content, authorId } = req.body;
    const newTask = await db.query(
      `INSERT INTO newTask (title, content, authorId) values ($1, $2, $3) RETURNING *`,
      [title, content, authorId]
    );
    io.emit("newTaskCreated");
    res.json({ statusCode: res.statusCode });
  }
  async getAllTasks(req, res) {
    const allTasks = await db.query(`SELECT * FROM newTask`);

    const createdTask = newTask.rows[0];
    req.io.emit("newTaskCreated", createdTask);
    res.json(allTasks.rows);
  }
  async updateTaskStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    const updatedTask = await db.query(
      `UPDATE newTask SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    res.json(updatedTask.rows);
  }
}

module.exports = new TaskController();
