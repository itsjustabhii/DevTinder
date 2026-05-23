**Project Overview**

- **Name**: devTinder — a matchmaking app for developers (backend).
- **Purpose**: Provide developer profiles, connection requests (swipe/interest), real-time chat, and premium membership payments.

**Tech Stack**

- **Backend**: Node.js, Express (`src/app.js`)
- **Database**: MongoDB via Mongoose (`src/config/database.js`)
- **Realtime**: Socket.IO (`src/utils/socket.js`)
- **Auth**: JWT in cookies, middleware in `src/middlewares/auth.js`
- **Payments**: Razorpay integration (`src/utils/razorpay.js`, `src/routes/payment.js`)
- **Mail**: AWS SES client wrapper (`src/utils/sendEmail.js`)

**Project Structure**

- **`src/app.js`**: App entry, route registration, DB connect, socket initialization.
- **`src/config/`**: Database connection (`database.js`).
- **`src/routes/`**: HTTP endpoints (auth, profile, request, user, payment, chat).
- **`src/models/`**: Mongoose models: `user`, `chat`, `connectionRequest`, `payment`.
- **`src/utils/`**: Helpers: `constants`, `razorpay`, `sendEmail`, `sesClient`, `socket`, `validation`, `cronjob`.
- **`src/middlewares/auth.js`**: `userAuth` middleware that reads JWT from cookie and loads user.

**High-level Workflow**

- **1. App start**: `npm run start` launches `src/app.js`, connects to MongoDB (via `DB_CONNECTION_SECRET`) and starts HTTP + Socket server.
- **2. Sign up / Login** (`POST /signup`, `POST /login`) — handled in [src/routes/auth.js](src/routes/auth.js). Passwords are hashed with `bcrypt` and JWT is issued and set as a cookie.
- **3. Profile management** (`GET /profile/view`, `PATCH /profile/edit`) — read and update user profile fields; edits validated by `src/utils/validation.js`.
- **4. Finding people / Feed** (`GET /feed`) — returns paginated list excluding existing connection relationships (logic in [src/routes/user.js](src/routes/user.js)).
- **5. Sending requests** (`POST /request/send/:status/:toUserId`) — create a `ConnectionRequest` with `status` in `ignored|interested`.
- **6. Reviewing requests** (`POST /request/review/:status/:requestId`) — recipient can `accepted|rejected` an incoming `interested` request.
- **7. Connections** (`GET /user/connections`) — lists accepted connections for the logged-in user.
- **8. Chat** (`GET /chat/:targetUserId` + Socket events) — server ensures a `Chat` document exists and uses Socket.IO to join private rooms, send and persist messages (`src/utils/socket.js` and `src/models/chat.js`).
- **9. Payments** (`POST /payment/create`) — creates a Razorpay order and saves a `Payment` document; incoming webhooks update payment status and mark users as premium (`POST /payment/webhook`).

**Key Files & Responsibilities**

- **[src/app.js](src/app.js)**: Registers routes, loads `cronjob`, starts server and sockets.
- **[src/config/database.js](src/config/database.js)**: Connects to MongoDB using `process.env.DB_CONNECTION_SECRET`.
- **[src/middlewares/auth.js](src/middlewares/auth.js)**: Verifies JWT from cookie using `process.env.JWT_SECRET` and attaches `req.user`.
- **[src/models/user.js](src/models/user.js)**: User schema, password validation, and `getJWT()` helper.
- **[src/models/connectionRequest.js](src/models/connectionRequest.js)**: Tracks connection lifecycle: `ignored`, `interested`, `accepted`, `rejected`.
- **[src/utils/socket.js](src/utils/socket.js)**: Joins users into secret room (sha256 of pair), saves messages to `Chat` and emits `messageReceived`.
- **[src/routes/payment.js](src/routes/payment.js)**: Creates Razorpay orders and validates webhook signatures using `RAZORPAY_WEBHOOK_SECRET`.

**Environment Variables**

- **`DB_CONNECTION_SECRET`**: MongoDB connection string (required).
- **`PORT`**: Server port (defaults referenced in code; set when running).
- **`JWT_SECRET`**: Secret used to sign/verify JWT tokens.
- **`RAZORPAY_KEY_ID`**, **`RAZORPAY_KEY_SECRET`**, **`RAZORPAY_WEBHOOK_SECRET`**: Razorpay credentials for creating orders and verifying webhooks.
- **AWS SES** credentials are expected to be configured by the AWS SDK environment or the `sesClient` helper.

**Common HTTP Endpoints (summary)**

- **Auth**
  - `POST /signup` — creates user, sets cookie token. ([src/routes/auth.js](src/routes/auth.js))
  - `POST /login` — authenticates and sets cookie token.
  - `POST /logout` — clears token cookie.
- **Profile**
  - `GET /profile/view` — returns logged-in user data.
  - `PATCH /profile/edit` — edit allowed fields validated by `validation.js`.
- **User / Feed**
  - `GET /feed?page=&limit=` — paginated user feed excluding existing connections.
  - `GET /user/requests/received` — pending incoming requests.
  - `GET /user/connections` — list of accepted connections.
- **Requests**
  - `POST /request/send/:status/:toUserId` — send `ignored|interested` request.
  - `POST /request/review/:status/:requestId` — review `accepted|rejected`.
- **Chat**
  - `GET /chat/:targetUserId` — returns or creates a chat between users; real-time messaging via Socket.IO events `joinChat` and `sendMessage`.
- **Payments**
  - `POST /payment/create` — create Razorpay order and `Payment` record.
  - `POST /payment/webhook` — webhook receiver to verify signature and update payment & user premium status.

**Setup & Run**

1. Copy `.env` variables (create a `.env` in project root) and set:

```
DB_CONNECTION_SECRET=<your-mongo-uri>
PORT=7777
JWT_SECRET=<your-jwt-secret>
RAZORPAY_KEY_ID=<id>
RAZORPAY_KEY_SECRET=<secret>
RAZORPAY_WEBHOOK_SECRET=<webhook-secret>
```

2. Install dependencies:

```
npm install
```

3. Run in development:

```
npm run dev
```

4. Production start:

```
npm run start
```

**Notes, Security & TODOs**

- Currently the JWT secret in `src/models/user.js` is hard-coded as `DEV@Tinder$790` for token generation; production should use `process.env.JWT_SECRET` consistently (see [src/models/user.js](src/models/user.js)).
- Validate friend/connection state before allowing chat messages in `src/utils/socket.js` (there's a TODO comment). Consider enforcing checks to avoid unauthorized messaging.
- Webhook endpoint expects JSON body — ensure your deployment sets raw body parsing appropriately if using signature verification.
- Consider rate-limiting and input sanitization on public endpoints.

**Contributing**

- Fork, create branch, add tests for new features, open a PR with a clear description.

**References**

- Main entry: [src/app.js](src/app.js)
- Routes: [src/routes](src/routes)
- Models: [src/models](src/models)
