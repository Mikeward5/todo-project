import { date } from "./dateController.js";
import { nanoid } from "nanoid";

export class Project {
  constructor(projectID, name, description) {
    this.projectID = projectID;
    this.name = name;
    this.description = description;
    this.dateCreated = date();
    this.todoArray = [];
  }
}
