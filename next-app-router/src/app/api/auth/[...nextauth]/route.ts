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
        const user = { id: "1", password: "123", email: "narji@gmail.com" };

        const email = credentials?.email;
        const password = credentials?.password;

        if (email === user.email && password === user.password) {
          return user;
        } else {
          return null;
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
