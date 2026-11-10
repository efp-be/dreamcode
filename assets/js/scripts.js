
/**
 * Handle mail sending
 *
 * @param {string} name
 * @param {string} email
 * @param {string} message
 */
const sendMail = async (name, email, message) => {
	const container = document.querySelector(".contact .status");
	const form = document.getElementById("contact-form");
	const button = document.getElementById("form-trigger");

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 10000);

	button.disabled = true;

	try {
		const response = await fetch("mail.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				message,
			}),
			signal: controller.signal,
		});

		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}

		const data = await response.json();

		container.className = "status";
		container.classList.add(data.status);
		container.textContent = data.message;

		if (data.status === "success") {
			form.reset();
		}

	} catch (error) {
		container.className = "status error";

		if (error.name === "AbortError") {
			container.textContent = "The request timed out. Please try again.";
		} else {
			container.textContent = "Your message could not be sent. Please try again later.";
		}

		console.error("Mail sending error:", error);

	} finally {
		clearTimeout(timeoutId);
		button.disabled = false;
	}
};
