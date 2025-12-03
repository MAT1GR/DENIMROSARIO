import nodemailer from 'nodemailer';

// 1. Configuración del transportador
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT), // Esto leerá 465
  secure: process.env.SMTP_SECURE === 'true', // Esto leerá true
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 2. Verificación de conexión (Opcional, pero recomendado para probar)
transporter.verify().then(() => {
  console.log('✅ Listo para enviar correos con ventas@denimrosario.com.ar');
}).catch((error) => {
  console.error('❌ Error conexión SMTP:', error);
});

// 3. Función para enviar correos
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Denim Rosario" <${process.env.EMAIL_FROM}>`, // Remitente elegante
      to,
      subject,
      html,
    });
    console.log('Correo enviado ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error enviando correo:', error);
    return false;
  }
};