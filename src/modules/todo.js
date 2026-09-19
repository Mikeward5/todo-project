import { date } from "./dateController.js";
import { nanoid } from "nanoid";

export class Todo {
  constructor(name, description, priority) {
    this.id = nanoid(10);
    this.name = name;
    this.description = description;
    this.date = date();
    this.priority = priority;
    this.actioned = false;
  }
}
