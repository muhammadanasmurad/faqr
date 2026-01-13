const express = require("express");
const app = express();
const path = require("path");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Contact form route
app.post("/contact", (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    console.log("New Contact Message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Subject:", subject);
    console.log("Message:", message);

    // Return JSON response
    res.json({
        success: true,
        message: `Thank you, ${name}! Your message has been received.`
    });
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
