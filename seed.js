// Seed script to create demo users
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');

async function seedUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create demo users
    const salt = await bcrypt.genSalt(10);
    
    const demoUsers = [
      {
        name: 'Demo Student',
        email: 'student@uni.edu',
        password: await bcrypt.hash('password123', salt),
        role: 'student',
        department: 'Computer Science',
        semester: 4
      },
      {
        name: 'Demo Faculty',
        email: 'faculty@uni.edu',
        password: await bcrypt.hash('password123', salt),
        role: 'faculty',
        department: 'Computer Science'
      },
      {
        name: 'Demo Admin',
        email: 'admin@uni.edu',
        password: await bcrypt.hash('password123', salt),
        role: 'admin',
        department: 'Administration'
      },
      {
        name: 'John Smith',
        email: 'john@uni.edu',
        password: await bcrypt.hash('password123', salt),
        role: 'student',
        department: 'Computer Science',
        semester: 2
      },
      {
        name: 'Dr. Sarah Johnson',
        email: 'sarah@uni.edu',
        password: await bcrypt.hash('password123', salt),
        role: 'faculty',
        department: 'Computer Science'
      }
    ];

    const createdUsers = await User.insertMany(demoUsers);
    console.log(`✅ Created ${createdUsers.length} demo users`);
    
    console.log('\n📋 Demo Credentials:\n');
    createdUsers.forEach(user => {
      console.log(`Role: ${user.role.toUpperCase()}`);
      console.log(`Email: ${user.email}`);
      console.log(`Password: password123`);
      console.log('---');
    });

    await mongoose.connection.close();
    console.log('\n✨ Seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedUsers();
