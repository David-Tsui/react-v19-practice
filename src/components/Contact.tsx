
const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  alert("Form submitted. Thank you for your message!")
}

function Contact() {
  return (
    <section>
      <h2>Contact</h2>
      <p>Email: example@email.com</p>
      <p>Phone: (123) 456-7890</p>
      <p>Feel free to reach out with any questions or feedback!</p>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
        </div>

        <button type="submit">Send</button>
      </form>
    </section>
  )
}

export default Contact
