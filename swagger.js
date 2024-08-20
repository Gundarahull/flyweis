const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Node LINK_Flywies",
    description: "These Docs will give a brief idea about how the API works with Requests and Responses",
  },
  host: "flyweis-fmgs.onrender.com",  // Updated host to match your deployed URL
  schemes: ['https'],  // Updated scheme to https for the deployed environment
  tags: [
    {
      name: "Auth",
      description: "Authentication related endpoints"
    },
    {
      name: "Investment",
      description: "Investment related endpoints"
    },
    {
      name: "User Management",
      description: "User profile and management"
    }
  ],
};

const outputFile = './swagger-output.json';
const routes = [
  "./routes/login.routes",      // Auth routes
  "./routes/account.routes",    // User Management routes
  "./routes/investment.routes", // Investment routes
];

swaggerAutogen(outputFile, routes, doc);
