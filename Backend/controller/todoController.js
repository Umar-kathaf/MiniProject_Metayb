import TodoTable from "../models/todoModel.js";

export const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "description is required" });
    }
    const todoData = await TodoTable.create({ description: description });
    return res.status(201).json(todoData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};

export const getTodo = async (req, res) => {
  try {
    const todoLists = await TodoTable.findAll();
    return res.json(todoLists);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};
export const UpdateTodd = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todoId = await TodoTable.findByPk(id);
    if (!todoId) {
      return res.status(404).json({ Error: "Todo data not found" });
    } else if (!description) {
      return res.status(400).json({ Error: "description ids required" });
    }
    await todoId.update({ description: description });
    return res.json(todoId, { message: "Todo data updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletodo = await TodoTable.destroy({ where: { id } });
    if (!deletodo) {
      return res.status(404).json({ Error: "Todo data not found" });
    }
    return res.status(200).json({ message: "Todo data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};
