import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email || "";
        const password = credentials?.password || "";

        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.status === 200) {
          return data.user;
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, user, token }: any) {
      if ("id" in token && "email" in token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
