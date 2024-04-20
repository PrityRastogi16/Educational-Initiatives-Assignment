# Educational-Initiatives-Assignment (To-Do List Manager)

This is a simple To-Do List Manager implemented in JavaScript, featuring functionalities like adding tasks, marking them as completed, deleting tasks, and viewing tasks with optional filtering.

## Functionalities

1. **Add Task**: Users can add new tasks with a description and an optional due date.
2. **Mark Completed**: Tasks can be marked as 'completed'.
3. **Delete Task**: Users have the option to delete tasks.
4. **View Tasks**: Tasks can be viewed all at once or filtered by their completion status.

## Design Patterns Used

1. **Memento Pattern**: Used to implement undo and redo functionalities for task modifications.
2. **Builder Pattern**: Utilized for constructing tasks with optional attributes like due date.

## Usage

1. Clone the repository:

    ```bash
    git clone https://github.com/PrityRastogi16/Educational-Initiatives-Assignment.git
    ```

2. Run the JavaScript file:

    ```bash
    node todolist-manager.js
    ```

## Example

```javascript
// Example usage
const toDoList = new ToDoList();
const taskBuilder = new TaskBuilder();

// Adding tasks
toDoList.addTask(taskBuilder.withDescription("Buy groceries").withDueDate("2023-09-20").build());
toDoList.addTask(taskBuilder.withDescription("Finish project").build());

// Deleting a task
toDoList.deleteTask("Buy groceries");

// Undo the deletion
toDoList.undo();

// Marking a task as completed
toDoList.markTaskCompleted("Finish project");

// Viewing pending tasks
toDoList.viewTasks('pending');

// Viewing completed tasks
toDoList.viewTasks('completed');
