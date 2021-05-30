const nodemailer = require('nodemailer');
const config = require('config')[process.env.NODE_ENV];

const sendMail = (params) => {
  let transport = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    auth: {
      user: config.email.auth.username,
      pass: config.email.auth.password,
    },
  });

  const message = {
    from: params.from,
    to: params.to,
    subject: params.subject,
  };

  if (params.contentType === 'text') {
    message.text = params.content;
  } else {
    message.html = params.content;
  }

  transport.sendMail(message, function (err, info) {
    return [err, info];
  });
};

module.exports = {
  sendMail,
};
