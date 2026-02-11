import bcrypt from 'bcryptjs';
import '../config/env.js';
import { Admin } from '../models/index.js';
import sequelize from '../config/db.js';

const seedAdmin = async () => {
    try {
        const username = "admin";
        const password = "admin"; // Change this

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if admin exists
        const exists = await Admin.findOne({ where: { userName: username } });
        if (exists) {
            console.log("Admin user already exists");
            process.exit();
        }

        // Create Admin
        await Admin.create({
            userName: username,
            userPassword: hashedPassword
        });

        console.log(`Admin created! Username: ${username}, Password: ${password}`);
    } catch (error) {
        console.error("Error seeding admin:", error);
    } finally {
        await sequelize.close(); // Close connection
    }
};

seedAdmin();