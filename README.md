This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- Clone the repo

```bash
git clone https://github.com/psykat1116/Airbnb.git
```

- Change the directory name to lowercase otherwise it will not work

- Install dependencies

```bash
cd <Your Given Name>
npm install
```

- Create a .env file in the root directory and add the following

```bash
DATABASE_URL=
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

- Create a database in `MongoDB Atlas` and add the url to the .env file

- Create a [Cloudinary](https://cloudinary.com/) account and add the cloud name to the .env file

- Create a [Github OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) and add the client id and secret to the .env file

- Create a [Google OAuth App](https://developers.google.com/identity/protocols/oauth2) and add the client id and secret to the .env file

- Add any secret string to the `NEXTAUTH_SECRET` variable in the .env file

- Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
