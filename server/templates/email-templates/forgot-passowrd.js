const subject = `Reset password`;

const html = `<p>We received a request to reset your password.</p>

<p>Click the following link to reset your password:</p>

<p><%= url %></p>

<p>Thanks.</p>`;

const text = `We received a request to reset your password.

Click the following link to reset your password:

<%= url %>

Thanks.`;

module.exports = {
  subject,
  text,
  html,
};
