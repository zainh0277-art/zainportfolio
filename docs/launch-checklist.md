# Launch and discoverability

## Required before production

- Confirm the public domain; set SITE_URL to that origin.
- Configure the Firebase service-account secret described in README.
- Activate FormSubmit from the destination inbox, then confirm a second test arrives and replies route correctly.
- Check the existing Google Drive resume is publicly downloadable and up to date.
- Five sample-data case studies now replace the placeholders. Keep the Demo labels until actual project evidence is available.

## Off-page work requiring account access

- Add the canonical portfolio URL to GitHub's website field and LinkedIn's Contact Info and Featured section.
- Verify the domain in Google Search Console and Bing Webmaster Tools. Submit /sitemap.xml and inspect the homepage.
- Use a consistent bio: “Business Data Analytics student at UET Lahore. SQL, Power BI, Excel and C#; open to freelance data projects and analytics opportunities.”
- Request genuine links from relevant university or professional profiles where eligible. Do not purchase links or fabricate reviews.
- Publish useful technical explanations and, when ready, verified case studies that link to the relevant portfolio content.

These actions have not been performed by editing this repository. Search indexing and off-site account changes require separate verification/access.

## Acceptance checks

Check 320, 375, 768, 1024 and 1440 pixel layouts, mobile navigation, keyboard focus, form labels, service links, resume, no horizontal overflow, metadata, /robots.txt, /sitemap.xml and a genuinely missing URL returning 404. Test the real email flow separately from frontend rendering.

## Validation status

Local lint, TypeScript, production build and exported metadata/form checks passed. GitHub Actions run 37336882197 passed browser checks at 320, 375, 768, 1024 and 1440px, including mobile navigation and form validation. Additional short-screen coverage is included in the follow-up fix. Inbox delivery, public deployment and external search-account changes are not yet verified.
