---
name: client-message
description: Draft messages the user sends to a client in Telegram or email - replies to client questions, how-to instructions, "what was done" reports, translations of client messages. Also fills a project brief from exported client chats. Use when the user says "напиши клієнту", "що відповісти", "переклади", "звіт клієнту", or pastes a client message.
---

# Client message

The user copies the draft straight into a chat with the client. The client is usually not technical.

## Input

1. If the client wrote in another language, translate the message for the user first, then wait for what to answer.
2. Answer in the client's language. The user explains in Ukrainian what to say, the draft keeps that meaning and adds nothing new.
3. When the client asks several things in a row, answer them in one message in the same order.

## Format

1. Plain text only. No markdown: no blockquotes, no bold, no headings, no lists unless the user asks for steps.
2. Put a line `---------------` right after the message, nothing else around it.
3. Straight quotes `"..."` only, never local ones like `„...”` or `«...»`.
4. Greet ("Cześć", "Привіт", "Hello") only in the first message of a conversation or when the user asks.
5. Emoji only if the user uses them in the chat.

## Wording

1. Short and to the point, very simple words. No technical terms, or explain them in one plain phrase.
2. How-to instructions are one short paragraph with exact click paths: where to go, what to click, what to type, what the result should be.
3. If something depends on the client (access, accounts, content), say plainly what they need to do.
4. Do not promise dates, prices, or features the user did not mention.

## "What was done" report

List what changed in client terms (faster site, new design, security updates, new features they can use), not in code terms. Mention anything the client has to do next.

## Brief from chat exports

When the user gives Telegram chat exports and a brief or credentials doc to fill:

1. Read all messages, including files and links mentioned in them.
2. Fill only what the chats actually say. Leave unknown fields empty and list them for the user, never guess.
3. Credentials go only to the credentials doc the user named, never into the brief, chat replies, or repo files.
