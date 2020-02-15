import nodemailer from 'nodemailer';
import mail from '../config/mail';

class Mail {
  constructor() {
    const { host, port, auth, secure } = mail;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mail.default,
      ...message,
    });
  }
}

export default new Mail();
