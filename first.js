function fireConfetti() {
  // Links
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.8 }
  });
  // Rechts
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.8 }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("anmeldung-form");
  const submitBtn = form.querySelector("button[type='submit']");
  const partnerField = document.getElementById("partner-field");
  const partnerInput = document.getElementById("partner");
  const bierpongRadios = document.querySelectorAll("input[name='auswahl1']");

  // zeigt/versteckt das Partnerfeld
  function updatePartnerField() {
    const choice = document.querySelector("input[name='auswahl1']:checked")?.value;
    const show = choice === "Mit Partner";
    partnerField.style.display = show ? "block" : "none";
    if (!show) partnerInput.value = ""; // leeren, wenn ausgeblendet
  }

  bierpongRadios.forEach(r => r.addEventListener("change", updatePartnerField));
  updatePartnerField(); // Initialzustand setzen

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (document.getElementById("website").value) return; // Honeypot

    const name = document.getElementById("name").value.trim();
    const kommen = document.querySelector("input[name='auswahl']:checked")?.value || "";
    const bierpong = document.querySelector("input[name='auswahl1']:checked")?.value || "";
    const partner = partnerInput.value.trim();
    const timestamp = new Date().toLocaleString();

    if (!name) {
      alert("Bitte gib deinen Namen ein.");
      return;
    }
    if (bierpong === "Mit Partner" && !partner) {
      alert("Bitte gib den Namen deines Partners ein.");
      partnerInput.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sende…";

    // EmailJS Parameter – stelle sicher, dass dein Template {{partner}} enthält
    const params = {
      name,
      kommen,
      bierpong,
      partner: partner || "-",  // falls leer
      timestamp
    };

    try {
      await emailjs.send("service_py7qvq9", "template_0sq5tub", params);
      alert(`Danke für deine Anmeldung, ${name}!`);
      fireConfetti();
      form.reset();
      updatePartnerField(); // nach Reset neu setzen
    } catch (err) {
      console.error(err);
      alert("Konnte leider nicht senden. Versuch es später erneut.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Ja ich spiele das komplette Turnier mit";
    }
  });
});
