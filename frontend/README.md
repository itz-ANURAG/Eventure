const { Octokit } = require("@octokit/rest");

// Replace these values with your own information
const GITHUB_TOKEN =process.env.REACT_APP_GITHUB_TOKEN ;
const REPO_OWNER = 'itz-ANURAG'; 
const REPO_NAME = 'Eventure'; 

// Initialize Octokit with authentication
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

// Define the README content
const README_CONTENT = `
# Eventure - Your Personal Event Manager 🎉

**Eventure** is a robust event management platform that allows users to seamlessly view, register, and manage events. It also integrates a secure payment system to facilitate event registrations. The project implements full-stack web development technologies, focusing on user-friendly design and functionality.

## 🌟 Features
- **User Authentication:** Secure user login using JSON Web Tokens (JWT).
- **Event Browsing:** Users can view upcoming events and register for them.
- **Event Management:** Users can create new events, upload images, and manage their event schedule.
- **Payment Integration:** A seamless payment system for processing payments for event registrations.
- **Responsive Design:** Optimized for both desktop and mobile views.

## 🚀 Tech Stack
- **Frontend:** HTML, CSS, JavaScript, React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas Cloud)
- **Authentication:** JSON Web Tokens (JWT)
- **Tools:** Visual Studio Code, Git

## 📁 Project Structure
\`\`\`
Eventure/
│
├── client/                # React.js Frontend
│   ├── public/            # Public files (index.html, images, etc.)
│   ├── src/               # React components, pages, services, etc.
│
├── server/                # Node.js Backend
│   ├── models/            # Mongoose models for MongoDB
│   ├── routes/            # API endpoints
│   ├── controllers/       # Logic for handling API requests
│   ├── middleware/        # Authentication middleware
│
├── .gitignore
├── README.md
└── package.json
\`\`\`

## 🛠️ Setup Instructions
1. **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/itz-ANURAG/Eventure.git
    \`\`\`

2. **Install dependencies for both client and server:**
    \`\`\`bash
    cd Eventure/client
    npm install

    cd ../server
    npm install
    \`\`\`

3. **Set up environment variables:**  
   - Create a \`.env\` file in the \`server/\` directory.
   - Add your MongoDB connection string, JWT secret, and payment API keys.

4. **Run the application:**
    \`\`\`bash
    # For the frontend (React app)
    cd Eventure/client
    npm start

    # For the backend (Node.js server)
    cd ../server
    npm run dev
    \`\`\`

5. **Access the application:**  
   Navigate to \`http://localhost:3000\` in your browser to use the application.

## 🤝 Contributors
A special thanks to all the contributors who made this project possible:

- **Anurag Gupta** - [@itz-ANURAG](https://github.com/itz-ANURAG)
- **Chirag Murarka** - [@ChiragMurarka](https://github.com/ChiragMurarka)
- **Aryan Kesharwani** - [@Aryan14021974](https://github.com/Aryan14021974)
- **Abhishek Kumar Yadav** - [@Abhi-11-sirius](https://github.com/Abhi-11-sirius)

## 📜 License
This project is licensed under the [MIT License](LICENSE).

## 📧 Contact
If you have any questions or suggestions, feel free to reach out to us.
`;

// Update README file on GitHub
async function updateReadme() {
  try {
    // Get the README file from the repository
    const { data: { sha } } = await octokit.repos.getContent({
      owner: itz-ANURAG,
      repo: Eventure,
      path: 'frontend/README.md',
    });

    // Update the README file
    await octokit.repos.createOrUpdateFileContents({
      owner:itz-ANURAG,
      repo: Eventure,
      path: 'fronten/README.md',
      message: 'Updated README file',
      content: Buffer.from(README_CONTENT).toString('base64'),
      sha: sha,
    });

    console.log('README.md file updated successfully!');
  } catch (error) {
    console.error('Error updating README:', error);
  }
}

updateReadme();
