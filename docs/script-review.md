# Community script integration review

The complete 61-line supplied README and 938-line `spoofer.py` were statically inspected on October 27, 2026. The adjacent MIT license was also read and included. The Python program was **not executed**; no account credentials, cookies, or state files were requested or read. No Discord or properties-service requests were made during review.

## File preservation

- Original file: `spoofer.py`, 34,982 bytes, 938 lines.
- SHA-256: `665eedc74102e15115cf6914797e78f4d50665d47b588cf2e0c7166387d472e2`.
- The hosted `dist/community/spoofer.py` is byte-identical to the supplied file. No logic, comments, or error messages were changed.
- The original MIT license identifies © 2026 Revere Group; the source credits nameless. The requested creator credit is in the footer; the copyright and full license remain included in the source distribution. The license is distributed at `dist/community/LICENSE.txt`.

## README corrections reflected in the website

| Supplied documentation | Actual implementation |
| --- | --- |
| “Nothing leaves your machine.” | The program sends the account token and cookie to Discord and fetches an analytics token. It also fetches a game catalog and posts an empty JSON object to a third-party client-properties service. The inspected properties request does not include the account credentials. |
| Menu 1: playtime; 2: games played; 3: refresh auth | Actual menu: 1 claim games, 2 refresh auth, 3 set fingerprint, 4 exit. There is no separate games-played menu action. Some error strings retain the old refresh number; the guide explicitly corrects them without altering the file. |
| Claiming applies to every game | Option 1 asks for a count and hours per game; blanks default to all loaded games and one hour. Input validation is incomplete, so the guide specifies positive, finite values. |
| Fingerprint is obtained manually | Optional menu option 3 can generate it on Windows through PowerShell from an executable path or process ID. The program also reads a manually supplied fingerprint from its state. |
| Working and unpatched; badges update in 1–2 days | Neither current effectiveness nor timing was verified. A 204 response and local claimed totals are not proof that Discord credited badges. The guide presents these as unverified author claims. |

## Concrete risks and data handling

The account token, cookie, analytics token, and optional fingerprint are saved as plaintext in `science_state.json` beside the program. The initial token/cookie prompts use ordinary visible terminal input. Enabling `DEBUG` would print authentication headers; the supplied value is `False`. The state file and credential-bearing logs must not be shared.

The optional fingerprint generator launches PowerShell with execution-policy bypass, reads PE executable metadata and signing information, and combines a Windows machine identifier with the account ID. The resulting fingerprint can be sent to Discord in launch events. This feature is Windows-only, and its effect on badge credit remains uncertain in the README.

No embedded live token or cookie, explicit third-party credential-forwarding code, or automatic execution of downloaded code was found in the supplied source. This is a static inspection, not a safety guarantee or a verification of external services. The program’s purpose is to send fabricated gameplay events using a normal user account. Discord’s official policy forbids self-bots and warns of possible account termination: https://support.discord.com/hc/en-us/articles/115002192352-Automated-User-Accounts-Self-Bots.

## Website boundary

The website hosts and fetches the Python file as inert text only. It adds no credential inputs, authentication flow, Python runtime, Discord API functionality, account actions, or background execution. The source viewer verifies its file against the packaged SHA-256 manifest, escapes it before syntax highlighting, and copies the complete original string instead of reading displayed DOM lines. Failed loading or integrity verification disables copying and offers retry. Clipboard failure selects the same complete source inside the existing editor.

The two prior explanation/tool sections are merged into one six-step guide. The existing editor is reused. Legacy `#how-it-works` and `#tools` anchors both resolve to the guide; navigation has one Get Started entry. All unrelated principal sections and both pre-existing stylesheets were compared with the preceding source and remain unchanged.

## Verification

The production build, lossless syntax-tokenization checks, HTML escaping, full 938-line rendering, and byte-for-byte source comparison passed. Browser clipboard contents matched the original byte count and SHA-256. Step keyboard controls, command copy, expand/collapse, network-error recovery, and same-length tampering rejection passed. Responsive widths checked: 320, 390, 768, 1024, and 1440 pixels. The Python program’s actual account effects were not tested.
