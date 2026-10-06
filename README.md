# Zain Hassan — Business Data Analytics Portfolio

Portfolio for freelance data work and analytics opportunities. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion, deployed as a static site on Firebase Hosting.

## Focus

SQL and relational databases, Power BI dashboards, Excel reporting, and C# data applications. Studying BS Business Data Analytics at UET Lahore.

The existing blue/navy theme is preserved. The Portfolio Lab contains five clearly labelled demo case studies with synthetic sample data, not commissioned client work. Each has three consistent dashboard views, a problem statement, approach, findings, recommendation and limitations.

## Development

Use Node.js 22 and npm:

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

`npm run build` exports to `out/`. Never commit generated output, local environment files, or credentials.

## Deployment

The workflow validates pull requests and deploys `main` to Firebase project `zainportfolio-007`. Configure the GitHub Actions secret `FIREBASE_SERVICE_ACCOUNT_ZAINPORTFOLIO_007` with a service account authorized for this project. No credentials belong in browser code. The previous duplicate workflows pointed to another project and were removed.

Default canonical origin: https://zainportfolio-007.web.app. If a custom domain is used, set the GitHub repository variable `SITE_URL` to its HTTPS origin before building. Confirm the real production hostname before publishing.

## Contact delivery — activation required

The form posts to FormSubmit for `zainh0277@gmail.com`, including name, email, message, a honeypot and default CAPTCHA. It no longer opens Gmail or claims a message was sent locally. FormSubmit handles confirmation/errors. Direct email and WhatsApp remain available.

Before launch, submit once from the deployed site, open the activation email in the destination inbox, and confirm the form. Then send a second test and verify that it reaches the inbox and Reply-To uses the sender address. Until these steps are complete, delivery is unverified. Do not include sensitive client data in test submissions. The site discloses FormSubmit processing beside the form.

## SEO and discovery

The build includes a canonical URL, descriptive metadata, social preview, ProfilePage/Person structured data, robots.txt and sitemap.xml. Firebase returns real 404s for missing routes instead of rewriting every URL to the homepage.

See [Launch and discovery checklist](docs/launch-checklist.md) for remaining owner actions. Search inclusion, rankings, AI recommendations and hiring are not guaranteed.

## Content

- `src/data/personal.ts`: contact details and introduction
- `src/data/skills.ts`: skill categories without arbitrary percentages
- `src/components/sections/ServicesSection.tsx`: services and deliverables
- `src/data/projects.ts`: typed project registry
- `src/data/demo-projects.json`: generated case study content
- `public/projects/`: 15 dashboard SVGs and five downloadable sample datasets
- `scripts/generate-demo-projects.py`: reproducible source for all demo content and visuals
- `src/lib/site.ts`: canonical origin and search description

Contact: [zainh0277@gmail.com](mailto:zainh0277@gmail.com) · [LinkedIn](https://www.linkedin.com/in/zain-hassan-13859b371/) · [GitHub](https://github.com/zainh0277-art)

## Rebuild demo dashboards

Run `python3 scripts/generate-demo-projects.py` from the repository, then build normally. The generator uses only Python's standard library. Every view for a given project uses the same six records. Amounts and ratios are derived from those records, not claimed client outcomes. Views are static SVGs; the accessible portfolio gallery provides view switching and full-size inspection. No live Power BI report or paid client result is implied.
