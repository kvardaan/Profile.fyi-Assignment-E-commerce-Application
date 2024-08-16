# Profile.fyi Assignment: E-commerce Application

## Job Description
For the detailed job description, please refer to the following [link](https://docs.google.com/document/d/1s7KITQ_hHTMuEnXDRYumnSIXDYQ0sa6W5XzOc9PMxcw).

## Assignment
For a comprehensive guide on the assignment, visit [here](https://docs.google.com/document/d/1yUA4DMH4F8JS6m1Boqco668EhxSesKqS07toes0CdBg).

### Tech Stack
- **Frontend:** Next.js with TypeScript
- **Backend:** Next.js with TypeScript
- **Database:** Prisma ORM + PostgreSQL
- **Authentication:** Clerk
- **State Management:** React Context API
- **Styling:** Tailwind CSS

### Setup Instructions
#### 1. Clone the Repository.
  Open your terminal and clone the repository using -
  ```bash
  git clone https://github.com/kvardaan/Profile.fyi-Assignment-E-commerce-Application.git
  ```
#### 2. Install Dependencies
  Open the `Profile.fyi-Assignment-E-commerce-Application` directory in your preferred code editor or IDE.
  
  Open a terminal for the directory, then run the following command in the terminal to install all the dependencies.
  ```bash
  npm install
  ```

#### 3. Configure Environment Variables
  In the root of the directory, create a `.env` file by copying the `.env.example` file.
  ```bash
  cp .env.example .env
  ```

  In the `.env` file, set up the application environment and authentication routes.
  ```
  NODE_ENV=development
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  ```

#### 4. Set Up Database (PostgreSQL)
  You can use a cloud service like Neon or Supabase, or run a local instance with Docker -
  - Local PostgreSQL with Docker:
  ```bash
  docker run -d -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -e POSTGRES_DB=<database_name> -p 5432:5432 postgres
  ```

  Update the `.env` file with your PostgreSQL connection details -
  - Local instance -
  ```bash
  DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
  ```
  Make sure to replace `<username>`, `<password>` & `<database_name>` with the correct fields. 
  
  - Cloud instance: Set the `DATABASE_URL` to your cloud provider's URL.

#### 5. Configure Authentication
  Sign up at Clerk and create a new application. Under ***Sign in*** options, select only ***Email*** and disable other options.

  Get your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` from the Clerk dashboard and add them to the `.env` file:

  ```bash
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  CLERK_SECRET_KEY=
  ```

  Set up a webhook in the Clerk dashboard for syncing user data to your database, following the [Clerk documentation](https://clerk.com/docs/integrations/webhooks/sync-data). Configure `ngrok` as needed.

  Add the `WEBHOOK_SECRET` to your `.env` file -
  ```bash
  WEBHOOK_SECRET=
  ```

#### 6. Start the Application
  Run the application in development mode -
  ```bash
  npm run dev
  ```

  Visit the application at -
  ```bash
  http://localhost:<port_number>
  ```
  Replace `<port_number>` with the port number on which your application is running (default is 3000).


Additional Resources
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma ORM Documentation](https://www.prisma.io/docs/orm)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)

Feel free to reach out with any questions or issues!
