import { resolve } from 'path';
import mail from '../config/mail';
import nodemailer from 'nodemailer';
import exphs from 'express-handlebars';
import nodeMailerExphs from 'nodemailer-express-handlebars';

class Mail {
  constructor() {
    const { host, port, auth, secure } = mail;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mail.default,
      ...message,
    });
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodeMailerExphs({
        viewEngine: exphs.create({
          layoutsDir: resolve(__dirname, viewPath, 'layouts'),
          partialsDir: resolve(__dirname, viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }
}

export default new Mail();
