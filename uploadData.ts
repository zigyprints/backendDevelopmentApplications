import { openDb } from './db';
import { Todo } from './src/models/todoModel';

async function uploadData() {
  try {
    const todoList: Todo[] = [
      { id: 1, title: 'Buy groceries', description: 'Buy milk and eggs', isCompleted: false },
      { id: 2, title: 'Finish project', description: 'Complete backend tasks', isCompleted: true },
      { id: 3, title: 'Call friend', description: 'Set up a meeting', isCompleted: false },
    ];

    const db = await openDb();

    for (const todo of todoList) {
      await db.run(
        'INSERT INTO todo (title, description, isCompleted) VALUES (?, ?, ?)',
        todo.title,
        todo.description,
        todo.isCompleted ? 1 : 0
      );
    }

    await db.close();

    console.log('Data uploaded successfully.');
  } catch (error) {
    console.error('Failed to upload data:', error);
  }
}

uploadData();

