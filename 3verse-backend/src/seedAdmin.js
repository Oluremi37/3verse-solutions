import dotenv from "dotenv";
dotenv.config();

import readline from "readline";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => {
    rl.question(question, resolve);
  });

const seedAdmin = async () => {
  try {
    await connectDB();

    console.log("\n=== Create 3Verse Super Admin ===\n");

    const fullName = await ask("Full name: ");
    const email = await ask("Email: ");
    const password = await ask("Password: ");

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingAdmin) {
      console.log("\nAn admin with this email already exists.");
      process.exit(1);
    }

    const admin = await Admin.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: "super-admin",
      isActive: true,
    });

    console.log("\n✅ Super admin created successfully!");
    console.log(`Name: ${admin.fullName}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Failed to create super admin:");
    console.error(error.message);

    process.exit(1);
  } finally {
    rl.close();
  }
};

seedAdmin();
