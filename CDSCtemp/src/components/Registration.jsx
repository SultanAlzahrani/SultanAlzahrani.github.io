// Styles
import "../styles/Registration.css";

// Registration Section Title
function RegSectionTitle({ title }) {
  return (
    <section className="section-header">
      <span className="section-title">{title}</span>
    </section>
  );
}

// Register Button and its container
function Button({ text, className = "register-btn" }) {
  return (
    <div className="button-container">
      <button className={className}>{text}</button>
    </div>
  );
}

// Terms of Participation (Title & terms)
// Returns
function TermsSection() {
  return (
    <section className="terms-section">
      <h2 className="terms-msg">Terms of Participation</h2>
      <ul className="terms-list">
        <li>Be over the age of 79 </li>
        <li>Eat healthy, and stay hydrated</li>
        <li>Have prior expericne in the fileds of managament</li>
        <li>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam,
          doloribus.
        </li>
        <li>Lorem ipsum dolor sit amet consectetur.</li>
      </ul>
    </section>
  );
}

// Returns the Whole Registration Page
export default function RegistrationPage() {
  return (
    <section className="registration-page">
      <RegSectionTitle title="Registration" />
      <TermsSection />
      <Button text="Register" />
    </section>
  );
}
