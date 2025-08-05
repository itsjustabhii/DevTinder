#DevTinder APIs

authRouter

- POST/signup
- POST/login
- POST/logout

profileRouter

- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password

connectRequestRouter

- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId
- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

userRouter

- GET/user/connection
- GET/user/request
- GET/user/feed
