import React, { useEffect, useState } from "react";
import "./TermsPopup.css"

const TermsPopup = ({ onAccept }) => {
  const [show, setShow] = useState(true); // Modal visibility state

  const handleAccept = () => {
    // Set agreement status in local storage
    localStorage.setItem("hasAgreedToTerms", "true");
    setShow(false); // Hide the modal
    onAccept(); // Callback to indicate acceptance
  };

  const handleDecline = () => {
    alert("You must agree to the terms to continue.");
  };

  useEffect(() => {
    // Prevent scrolling when modal is shown
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show) return null; // Don't render modal if hidden

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backdropFilter: "blur(5px)", color: "black", textAlign: "left" }}
      tabIndex="-1"
      aria-labelledby="termsModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        style={{ width: "80vw", maxWidth: "none" }}
      >
        <div className="modal-content d-flex flex-column" style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}>
          <div className="modal-header">
            <h5 className="modal-title" id="termsModalLabel">
              Haftungsausschluss und Wichtige Sicherheitshinweise von Personal-Peak-360
            </h5>
          </div>
          <div className="modal-body" style={{
          flex: "1 1 auto",
          overflowY: "auto",
        }}>
          <h3>Individuelle Betreuung</h3>
                    <p>Die bei Personal-Peak-360 angebotenen Trainings- und Ernährungspläne werden auf der Grundlage einer individuellen Auswertung erstellt. Unser Team setzt sich aus Fachleuten unterschiedlicher Disziplinen zusammen, darunter zertifizierte Personal Trainer, Trainingstherapeuten, Ernährungsberater, Ärzte, Psychologen, Bachelor Professionals of Physical Fitness, Physiotherapeuten und Sporttherapeuten. Diese Pläne werden in Zusammenarbeit mit unserem Expertenteam konzipiert, wobei nicht immer alle genannten Fachleute direkt beteiligt sind. Die spezifische Zusammensetzung des Beratungsteams kann variieren, um den bestmöglichen Plan für Ihre persönlichen Ziele und Bedürfnisse zu entwickeln.

                        Die Häufigkeit, mit der Trainingspläne erstellt werden, liegt im Ermessen Ihres Trainers. Es besteht kein Anspruch auf eine bestimmte Anzahl von Trainings- oder Ernährungsplänen.</p>

                    <h3>Eigenverantwortung und Sicherheit</h3>
                    <p>Trotz der fachkundigen Beratung durch unser Team liegt die Verantwortung für die Umsetzung und Anwendung der empfohlenen Pläne und Maßnahmen ausschließlich bei Ihnen. Es ist wichtig, dass Sie vor Beginn jeglicher Empfehlungen Ihre individuelle Situation und gesundheitliche Eignung berücksichtigen. Bei Unsicherheiten oder bestehenden gesundheitlichen Bedingungen empfehlen wir dringend, vorab eine ärztliche Beratung einzuholen.</p>

                    <h3>Auswahl der Trainingspläne</h3>
                    <p>Bei der Erstellung Ihres individuellen Trainingsplans müssen Sie zu Beginn auswählen, ob Sie einen Plan für das Training zu Hause ohne Equipment, zu Hause mit Equipment oder für das Gym erhalten möchten. Diese Auswahl kann erst nach den ersten drei Monaten wieder geändert werden, da alle Pläne individuell erstellt werden.</p>

                    <h3>Haftungsausschluss</h3>
                    <p>Personal-Peak-360 übernimmt keine Garantie oder Haftung für die Wirksamkeit, Sicherheit oder Folgen der Anwendung der bereitgestellten Trainings- und Ernährungspläne. Die Nutzung der von Personal-Peak-360 bereitgestellten Informationen und Empfehlungen erfolgt auf eigenes Risiko. Für direkte oder indirekte Schäden, die aus der Anwendung der Inhalte entstehen, lehnen wir jede Haftung ab.</p>

                    <h3>Urheberrechtlicher Hinweis und Schadensersatz</h3>
                    <p>Alle Inhalte, die von Personal-Peak-360 bereitgestellt werden, einschließlich, aber nicht beschränkt auf Trainings- und Ernährungspläne, sind rechtlich geschützt und ausschließlich für den privaten Gebrauch des registrierten Empfängers bestimmt. Jegliche Form der Vervielfältigung, Verbreitung, Modifikation oder sonstigen Nutzung dieser Inhalte ohne unsere ausdrückliche schriftliche Genehmigung, einschließlich der Weitergabe von Zugangsdaten an Dritte, ist strengstens untersagt. Verstöße gegen diese Urheberrechtsbestimmungen können zu Schadensersatzforderungen führen, die sich nach dem Umfang des Verstoßes richten und in der Regel zwischen 500 € und 25.000 € liegen. In Fällen schwerwiegender oder vorsätzlicher Urheberrechtsverletzungen behalten wir uns das Recht vor, höhere Forderungen zu stellen.</p>

                    <h3>Datenschutz-Kurzinformation</h3>
                    <p>Bei Personal-Peak-360 nehmen wir den Schutz Ihrer persönlichen Daten ernst. Die im Rahmen der Nutzung unseres Portals erhobenen Daten (wie z.B. Name, Kontaktinformationen und Nutzungsdaten) werden zum Zweck der individuellen Betreuung, der Bereitstellung unserer Dienste sowie für interne Analyse- und Verbesserungszwecke verarbeitet. Diese Datenverarbeitung erfolgt mit dem Ziel, unser Angebot bestmöglich auf Ihre Bedürfnisse abzustimmen und die Qualität unserer Dienstleistungen zu erhöhen. Ihre Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben, es sei denn, dies ist gesetzlich vorgeschrieben oder für die Erbringung unserer Dienstleistungen erforderlich. Mit der Nutzung unserer Dienste erklären Sie sich mit dieser Verarbeitung Ihrer Daten einverstanden. Sie haben das Recht auf Auskunft, Berichtigung, Löschung und, unter bestimmten Umständen, auf Einschränkung der Verarbeitung Ihrer Daten. Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.

                        Unsere Website trackt die Dauer Ihrer Besuche, um Statistiken zu erstellen und unser Angebot zu verbessern. Diese Informationen helfen uns, Ihre Benutzererfahrung stetig zu optimieren.</p>

                    <h3>Schlussbemerkung und Einverständniserklärung</h3>
                    <p>Die von Personal-Peak-360 bereitgestellten Informationen wurden mit größter Sorgfalt und nach bestem Wissen und Gewissen zusammengestellt. Eine Haftung für die Vollständigkeit, Richtigkeit und Aktualität der Informationen wird jedoch ausgeschlossen. Mit der Fortsetzung der Nutzung unserer Dienste stimmen Sie zu, diese Bedingungen zu akzeptieren und erkennen an, dass Sie die volle Verantwortung für die Anwendung der Empfehlungen tragen.</p>
                    
          </div>
          <div
        className="modal-footer d-flex justify-content-between"
        style={{
          flexShrink: "0",
        }}
      >
        <strong>COPYRIGHT – ©2025 Personal-Peak 360°</strong>
        <div style={{display: 'flex', gap: '10px'}}>
          <button className="btn btn-secondary" onClick={handleDecline}>
            Ablehnen
          </button>
          <button className="btn btn-primary" onClick={handleAccept}>
            Weiter
          </button>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPopup;
