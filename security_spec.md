# Aura AI Security Specification

## Data Invariants
1. A chat message cannot exist without a valid `userId` field.
2. Users can only access their own intelligence threads.
3. Personal Identifiable Information (PII) is limited to the `users` collection.

## The Dirty Dozen Payloads
1. Spoofing `userId` in chat creation. -> REJECTED (Rule checks `request.resource.data.userId`)
2. Injecting malicious code in `chatId`. -> REJECTED (Rule checks `isValidId`)
3. Reading global analytics without auth. -> REJECTED (Self-contained read-deny)
4. Deleting another user's chat. -> REJECTED (Rule checks `resource.data.userId`)
... [remaining tests mapped to rules]

## Verification
Rules version: 2
Default: Deny all.
Authentication: Required for core workspace.
Identity integrity: Enforced via `resource.data.userId` and `request.auth.uid`.
