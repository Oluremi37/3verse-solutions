const quoteTemplate = (quote) => {
  return `
    <div style="font-family:Arial,sans-serif;padding:30px">

      <h2 style="color:#ff7a00;">
        New Quote Request
      </h2>

      <table cellpadding="10">

        <tr>
          <td><strong>Name</strong></td>
          <td>${quote.fullName}</td>
        </tr>

        <tr>
          <td><strong>Email</strong></td>
          <td>${quote.email}</td>
        </tr>

        <tr>
          <td><strong>Phone</strong></td>
          <td>${quote.phone}</td>
        </tr>

        <tr>
          <td><strong>Service</strong></td>
          <td>${quote.service}</td>
        </tr>

        <tr>
          <td><strong>Budget</strong></td>
          <td>${quote.budget}</td>
        </tr>

      </table>

      <hr/>

      <h3>Project Details</h3>

      <p>${quote.projectDetails}</p>

    </div>
  `;
};

export default quoteTemplate;
