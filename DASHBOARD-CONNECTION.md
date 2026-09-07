# AssistQ website ↔ dashboard connection

The website uses the real AssistQ dashboard widget implementation and points it at:
https://app.assistq.in

The public website chatbot uses clientId `assistq-site`.

The dashboard `server.js` patch in the companion package creates an internal, active AssistQ website client automatically. It is marked `internal:true` and is excluded from Foundation Offer client counts.

Deploy the dashboard package first, then deploy this website package.

Client Login buttons point to https://app.assistq.in/ so paying clients use the existing dashboard authentication.

The website pricing reads from GET /api/public/plans, keeping public pricing aligned with the dashboard PLAN_CATALOG.
