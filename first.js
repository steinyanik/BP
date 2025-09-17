document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("anmeldung-form");
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Spam-Honeypot
    if (document.getElementById("website").value) return;

    const name = document.getElementById("name").value.trim();
    const kommen = document.querySelector("input[name='auswahl']:checked")?.value || "";
    const bierpong = document.querySelector("input[name='auswahl1']:checked")?.value || "";
    const timestamp = new Date().toLocaleString();

    if (!name) 
    {
      alert("Bitte gib deinen Namen ein.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sende…";

    // Muss zu deinen Template-Variablen in EmailJS passen (z. B. {{name}}, {{kommen}},…)
    const params = 
    {
      to_email: "deine.mail@domain.de", // optional, falls im Template fest
      name,
      kommen,
      bierpong,
      timestamp
    };

    try 
    {
      await emailjs.send("service_py7qvq9", "template_0sq5tub", params);
      alert(`Danke für deine Anmeldung, ${name}!`);
      form.reset();
    } 
    catch (err) 
    {
      console.error(err);
      alert("Konnte leider nicht senden. Versuch es später erneut.");
    } 
    finally 
    {
      submitBtn.disabled = false;
      submitBtn.textContent = "Ja ich spiele das komplette Turnier mit";
    }
  });
});
