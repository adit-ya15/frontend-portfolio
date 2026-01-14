
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
    }
});

async function verify() {
    console.log('Verifying email configuration...');
    console.log('User:', process.env.MY_EMAIL);
    // Mask password for security
    console.log('Password set:', process.env.MY_PASSWORD ? '********' : 'Not set');

    try {
        await transporter.verify();
        console.log('✅ Server is ready to take our messages');
    } catch (error) {
        console.error('❌ Error verifying configuration:');
        console.error(error);
    }
}

verify();
