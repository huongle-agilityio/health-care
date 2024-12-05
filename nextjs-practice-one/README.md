# Next.js 15 Practice

This is a [Next.js](https://nextjs.org/) practice built with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

## Overview

- [This document](https://docs.google.com/document/d/1Pxz4i7bTHWRCa8x4zCorF9HUxJ1WicLndIJNAgCOJRQ/edit?tab=t.0) provides information about practice-one Next.JS
- Design:
  - [figma](<https://www.figma.com/design/fm7G2jYC6DfCX93wk8Zi3z/CareMate-(Community)?node-id=0-1&node-type=canvas&t=wkw1y108oira6rwi-0>)
  - Refer for form: [here](https://www.jotform.com/build/243378581809469?s=templates&salesforceTemplate=1)
- Estimate plan: [plan](https://docs.google.com/document/d/1Fx6D8fAdXLi-Vx2lW_XB7YPDIJDqMw0JrMsXwTFxZok/edit?tab=t.0#heading=h.cv6kvnd7rylc)
- Documents requirements: [requirements](https://docs.google.com/document/d/1PReqvuwG4ZWFjPevnZNuFKKSSJQQOcxQZx_N64HAWfc/edit?tab=t.0)

## App Bio

- A healthcare application designed to streamline patient experiences with features including secure login/signup, a powerful doctor filtering system, and appointment booking for hassle-free scheduling.

## Techniques Stack

- [Next.js](https://nextjs.org/) v15
- [React](https://react.dev/) v18
- [TypeScript](https://www.typescriptlang.org/) v5
- [Tailwind CSS](https://tailwindcss.com/) v3
- [NextUI](https://nextui.org/)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)/ [Jest](https://jestjs.io/)
- [React Hook Form](https://react-hook-form.com/)
- [zod](https://zod.dev/)
- [Strapi](https://strapi.io/)

## Development Tools

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://github.com/typicode/husky)
- [Vercel](https://vercel.com)
- [Commitlint](https://commitlint.js.org/#/)
- [Storybook](https://storybook.js.org/)

## Targets

- Understand and apply the core concepts of NextJS
- Utilize NextUI to create and customize UI components that match the design.
- Use Storybook to document React components.
- Improve PageSpeed scores to achieve the highest score around 90-95.
- Ensure responsive design that supports three device types: Mobile, Tablet, and Desktop.

## Requirements

- Users can see the following pages:
  - Landing Page
  - Appointments Booking
  - Reviews
  - Blog
  - Unauthenticated
    - Login
    - SignUp
  - Authenticated
    - Profile
    - Booking Details
- Landing page
  - Users can see the landing page
  - Users can click the button Get Started
- SignUp
  - Users can click the button Register in the header
  - Users can sign up for the application
  - Users input information must be validated
  - Users can show/ hide their password
- Login
  - Users can click the button Login in the header
  - Users can log in to the application with an email
  - Users input information must be validated
  - Users can show/ hide their password
- Logout
  - Users can log out of the application
- Appointments Booking
  - Users can see all the available doctors
  - Users can filter doctors by Specialty/ Rating/ Experience/ Fee
  - Users can reset the filter search
  - Users can click the button Book Appointment
    - Unauthenticated: Redirect to the Login page
    - Authenticated: Redirect to Booking page
  - Users can paginate with numbers and button prev/ next
- Booking Details
  - Users can see the form with their information already filled in
  - Users can submit the form after filling in all the fields
- Reviews
  - Users can see the doctors' ranking
  - Users can paginate with numbers and button prev/ next
- Profile
  - Users can see their information
  - Users can edit their information
  - Users input information must be validated
  - Users can view appointments they have booked.

## How to run

### Prerequisites

Make sure you install packages with correct version below:

- [node v20.11.0](https://nodejs.org/en/download/package-manager)
- [pnpm 9.12.1](https://pnpm.io/installation)

- **Note:**
  - Please add `.env` into root of project source code, refer `.env.sample`.

### Build and Run app

| Command            | Action                                     | Port                  |
| :----------------- | :----------------------------------------- | :-------------------- |
| `$ pnpm install`   | Install packages dependencies              | N/A                   |
| `$ pnpm build`     | Build app with optimized production mode   | N/A                   |
| `$ pnpm start`     | Starts the application in production mode. | http://localhost:3000 |
| `$ pnpm dev`       | Run the app in development mode            | http://localhost:3000 |
| `$ pnpm storybook` | Run Storybook.                             | http://localhost:6006 |
| `$ pnpm test`      | Run Unit Test                              | N/A                   |
| `$ pnpm coverage`  | Generate code coverage                     | N/A                   |

### Project structure

```shell
.
├── README.md                       # README file
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── .vscode                         # VSCode configuration
├── public                          # Public assets folder
├── src
│   ├── actions                     # Next.js actions
│   ├── app                         # Next.js App (App Router)
│   ├── components                  # React components
│   ├── constants                   # App constants
│   ├── hooks                       # Custom hooks
│   ├── icons                       # Icons folder
│   ├── layouts                     # React components for app layout
│   ├── models                      # Model type definitions
│   ├── services                    # Handle data with API: GET, POST, PUT, DELETE
│   ├── stores                      # App stores
│   ├── themes                      # Custom themes styles
│   ├── types                       # Type definitions
│   ├── ui                          # React components by feature
│   ├── utils                       # Utilities folder
├── .eslintrc.json                  # ESLint configuration
├── .lintstagedrc                   # Lint-stage
├── .prettierrc                     # Prettier configuration
├── jest.config.ts                  # Jest configuration
├── next.config.mjs                 # Next.js configuration
├── next.config.mjs                 # Next.js configuration
├── postcss.config.mjs              # Post CSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```
