const contactTemplate = (contact) => {
  return `
    <div style="font-family:Arial,sans-serif;padding:30px">
      <h2 style="color:#ff7a00;">
        New Contact Message
      </h2>

      <table cellpadding="10">

        <tr>
          <td><strong>Name:</strong></td>
          <td>${contact.fullName}</td>
        </tr>

        <tr>
          <td><strong>Email:</strong></td>
          <td>${contact.email}</td>
        </tr>

        <tr>
          <td><strong>Phone:</strong></td>
          <td>${contact.phone || "N/A"}</td>
        </tr>

        <tr>
          <td><strong>Subject:</strong></td>
          <td>${contact.subject}</td>
        </tr>

      </table>

      <hr/>

      <h3>Message</h3>

      <p>${contact.message}</p>

    </div>
  `;
};

export default contactTemplate;
