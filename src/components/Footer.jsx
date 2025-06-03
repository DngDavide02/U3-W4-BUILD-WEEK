import React from "react";
import "./Footer.css";

const LinkedinFooter = () => {
  return (
    <footer className="text-secondary small fw-normal py-4 mt-auto">
      <div className="container" style={{ maxWidth: "1128px", margin: "0 auto", marginBottom: "2.4rem" }}>
        <div className="row gy-4">
          <div className="col-12 col-md-2">
            <ul className="list-unstyled footer-spaced-links">
              <li>
                <a href="#" className="footer-link">
                  Informazioni
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Informativa sulla community professionale
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Privacy e condizioni
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Sales Solutions
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Centro sicurezza
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-2">
            <ul className="list-unstyled footer-spaced-links">
              <li>
                <a href="#" className="footer-link">
                  Accessibilità
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Carriera
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Opzioni per gli annunci pubblicitari
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Mobile
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-2">
            <ul className="list-unstyled footer-spaced-links">
              <li>
                <a href="#" className="footer-link">
                  Talent Solutions
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Soluzioni di marketing
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Pubblicità
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Piccole imprese
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-3">
                <i className="bi bi-question-circle-fill me-2"></i>
                <div>
                  <div className="fw-bold">Domande?</div>
                  <div>Visita il nostro Centro assistenza.</div>
                </div>
              </li>

              <li className="d-flex align-items-start mb-3">
                <i className="bi bi-gear-fill me-2"></i>
                <div>
                  <div className="fw-bold">Gestisci il tuo account e la tua privacy</div>
                  <div>Vai alle impostazioni</div>
                </div>
              </li>

              <li className="d-flex align-items-start mb-">
                <i className="bi bi-shield-shaded me-2"></i>
                <div>
                  <div className="fw-bold">Trasparenza sui contenuti consigliati</div>
                  <div>Scopri di più sui contenuti consigliati.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-3 d-flex align-items-start">
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="language-select" className="form-label mb-1">
                Lingua:
              </label>
              <select id="language-select" className="form-select form-select-sm w-auto">
                <option value="it">Italiano</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>

        <div className="text-start text-muted small mt-3">LinkedIn Corporation © {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
};

export default LinkedinFooter;
