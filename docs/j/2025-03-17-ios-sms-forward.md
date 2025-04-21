---
title: SMS forward for iOS
date: 2025-03-17
tags: ["SMS", "iOS", "Telegram", "Workers"]
---

I have a sim card, I want to get notified for messages sent to this number, but
I don't have any Android phone available but quite a few legacy iPhones.

So let's make a sms forwarder running on iOS. Is that even possible? (yes)

Since iOS 11.0, Apple provides a cool feature [^sms-filter] to filter (censor) your messages
with arbitrary app. For a message to be filtered, however, there are a few constraints
(because the sender must be classified as an “Unknown Sender” [^unknown-sender]):

[^sms-filter]: https://developer.apple.com/documentation/identitylookup/sms-and-mms-message-filtering
[^unknown-sender]: https://support.apple.com/guide/iphone/block-filter-and-report-messages-iph203ab0be4/ios

- the sender must not be in your contact list;
- you haven't sent any message to this sender.

Fortunately, this matches the characteristic of most verify code messages!

still wip :>
