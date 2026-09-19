import { date } from "./dateController.js";
import { nanoid } from "nanoid";

export class Project {
  constructor(name, description) {
    this.projectID = nanoid(10);
    this.name = name;
    this.description = description;
    this.dateCreated = date();
    this.todoArray = [];
  }
}
