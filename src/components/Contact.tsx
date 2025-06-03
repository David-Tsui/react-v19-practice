function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    alert("Form submitted. Thank you for your message!" + `\nName: ${formData.name}\nMessage: ${formData.message}`)
  }

  return (
    <section>
      <h2>Contact</h2>
      <p>Email: example@email.com</p>
      <p>Phone: (123) 456-7890</p>
      <p>Feel free to reach out with any questions or feedback!</p>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            required
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            value={formData.message}
            placeholder="Enter your message"
          ></textarea>
        </div>

        <button type="submit">Send</button>
        <button
          type="reset"
          disabled={!formData.name && !formData.message}
          onClick={() => setFormData({ name: '', message: '' })}
        >
          Reset
        </button>
      </form>
    </section>
  )
}

export default Contact
