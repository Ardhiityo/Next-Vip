import { signUpWithGoogle } from "@/app/lib/firebase/service";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
          /**
            ## Error Code Yang Diizinkan NextAuth:
            NextAuth hanya mengenali error code berikut untuk ditampilkan di halaman login:
            - CredentialsSignin
            - AccessDenied
            - Verification
            - Default
           */
          throw new Error("CredentialsSignin");

          /**
           Jka kamu ingin menampilkan pesan error custom ("Email or Password is incorrect"), kamu harus:
            1. Membuat halaman login kustom (bukan menggunakan NextAuth default)
            2. Membaca query parameter error dan menampilkan pesan sendiri
           */

          /**
             1. CredentialsSignin Login gagal (email/password salah) 
             2. AccessDenied Login berhasil tapi tidak punya izin 
             3. Verification Masalah verifikasi email/magic link 
             4. Default Error umum/unknown
          */
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (account?.provider === "google") {
        token.type = "google";
        const userData = {
          name: user.name,
          email: user.email,
        };
        signUpWithGoogle(userData, ({ data }) => {
          token.id = user.id;
          token.name = data.name;
          token.role = data.role;
          token.email = user.email;
        });
      } else if (account?.provider === "credentials") {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, user, token }: any) {
      if ("id" in token && "email" in token && "role" in token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
