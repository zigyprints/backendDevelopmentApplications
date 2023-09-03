import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // Add JSON body parsing middleware

app.get('/todo', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
    });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

app.post('/todo', async (req, res) => {
  try {
    const { description } = req.body;
    const post = await prisma.post.create({
      data: {
        description,
      },
    });
    res.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const server = app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

// // Gracefully shut down Prisma client on server termination
// process.on('SIGTERM', async () => {
//   console.log('Received SIGTERM. Closing Prisma client...');
//   await prisma.$disconnect();
//   server.close(() => {
//     console.log('Server closed.');
//     process.exit(0);
//   });
// });
