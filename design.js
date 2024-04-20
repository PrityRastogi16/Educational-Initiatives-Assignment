class Task {
    constructor(description, dueDate) {
        this.description = description;
        this.completed = false;
        this.dueDate = dueDate ? new Date(dueDate) : null;
    }

    markCompleted() {
        this.completed = true;
    }

    createMemento() {
        return {
            description: this.description,
            completed: this.completed,
            dueDate: this.dueDate
        };
    }

    restoreMemento(memento) {
        this.description = memento.description;
        this.completed = memento.completed;
        this.dueDate = memento.dueDate;
    }
}

class ToDoList {
    constructor() {
        this.tasks = [];
        this.history = [];
        this.redoStack = [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveState();
    }

    deleteTask(description) {
        const deletedTaskIndex = this.tasks.findIndex(task => task.description === description);
        if (deletedTaskIndex !== -1) {
            const deletedTask = this.tasks[deletedTaskIndex];
            const memento = deletedTask.createMemento();
            this.tasks.splice(deletedTaskIndex, 1);
            this.saveState(memento);
        }
    }

    undo() {
        if (this.history.length > 0) {
            const memento = this.history.pop();
            const task = new Task(memento.description, memento.dueDate);
            task.restoreMemento(memento);
            this.tasks.push(task);
            this.redoStack.push(memento);
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            const memento = this.redoStack.pop();
            const task = new Task(memento.description, memento.dueDate);
            task.restoreMemento(memento);
            this.tasks.push(task);
            this.history.push(memento);
        }
    }
   
    markTaskCompleted(description) {
        const task = this.tasks.find(task => task.description === description);
        if (task) {
            task.markCompleted();
            this.saveState();
        } else {
            console.log(`Task with description '${description}' not found.`);
        }
    }

    saveState(memento) {
        this.history.push(memento);
        this.redoStack = [];
    }

    viewTasks(filter = 'all') {
        let filteredTasks;
        if (filter === 'pending') {
            filteredTasks = this.tasks.filter(task => !task.completed);
        } else if (filter === 'completed') {
            filteredTasks = this.tasks.filter(task => task.completed);
        } else {
            filteredTasks = this.tasks;
        }
    
        filteredTasks.forEach(task => {
            const status = task.completed ? "Completed" : "Pending";
            console.log(`${task.description} - ${status}${task.dueDate ? `, Due: ${task.dueDate.toDateString()}` : ''}`);
        });
    }
}

class TaskBuilder {
    constructor() {
        this.description = null;
        this.dueDate = null;
    }

    withDescription(description) {
        this.description = description;
        return this;
    }

    withDueDate(dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    build() {
        return new Task(this.description, this.dueDate);
    }
}

// Example usage
const toDoList = new ToDoList();
const taskBuilder = new TaskBuilder();

// Adding tasks
toDoList.addTask(taskBuilder.withDescription("Buy groceries").withDueDate("2023-09-20").build());
toDoList.addTask(taskBuilder.withDescription("Finish project").build());

// Deleting a task
// console.log("Tasks before deletion:");
// toDoList.viewTasks();
// toDoList.deleteTask("Buy groceries");
// console.log("\nTasks after deletion:");
// toDoList.viewTasks();

// // Undo the deletion
// console.log("\nUndoing the deletion:");
// toDoList.undo();
// toDoList.viewTasks();

// // Redo the deletion
// console.log("\nRedoing the deletion:");
// toDoList.redo();
// toDoList.viewTasks();


console.log("All tasks:");
toDoList.viewTasks(); // or toDoList.viewTasks('all');
toDoList.markTaskCompleted("Finish project");

console.log("\nTasks after marking completion:");
toDoList.viewTasks();
// Viewing pending tasks
console.log("\nPending tasks:");
toDoList.viewTasks('pending');

// Viewing completed tasks
console.log("\nCompleted tasks:");
toDoList.viewTasks('completed');


