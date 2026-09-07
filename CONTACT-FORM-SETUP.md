# AssistQ Contact / Demo Forms

The website sends both forms to `POST https://app.assistq.in/api/public/contact`.

Deploy the included server patch to the AssistQ backend. Email delivery uses the backend's existing SMTP configuration.

Optional environment variable:
`CONTACT_TO=assistq1@gmail.com`

If `CONTACT_TO` is not set, the endpoint falls back to `assistq1@gmail.com`.

The forms collect only: name, email, phone, optional business name, optional plan/message, and consent.
