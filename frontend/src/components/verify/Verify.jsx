import "./verify.css";

export default function Verify({ title, hint, linkText }) {
  return (
    <div className="verify">
      <div className="verifyBox">
        <span className="verifyText">{title}</span>
        <p className="verifyHint">{hint}</p>
        <a
          href="https://mail.google.com/"
          target="_blank"
          rel="noreferrer"
          className="verifyLink"
        >
          {linkText}
        </a>
      </div>
    </div>
  );
}
