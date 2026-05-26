import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
  Bagaimana Alur Kerjanya?
  1. Saat Login : Server membuat JWT (berisi data dari callbacks.jwt ), mengenkripsinya, lalu mengirimkannya ke browser sebagai cookie.
  2. Setiap Request : Browser otomatis mengirimkan cookie tersebut ke server.
  3. Verifikasi : Server Node.js menerima cookie, mengecek apakah enkripsinya valid menggunakan AUTH_SECRET . Jika valid, server "percaya" bahwa user tersebut adalah John Doe tanpa harus mengecek database lagi.
  4. Client-Side : Saat Anda memanggil useSession() di React, ia akan melakukan fetch ke API /api/auth/session . Server akan mendekripsi cookie tadi dan mengirimkan hasilnya (berisi data dari callbacks.session ) sebagai objek JSON biasa ke browser untuk ditampilkan di UI.
 */

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const url = `${process.env.APP_URL}/api/auth/login`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const body = await response.json();

        if (response.status === 200) {
          return body.data;
        }

        throw new Error(body.message || "Invalid credentials");
      },
    }),
  ],
  /**
   Callbacks digunakan sebagai "jembatan" untuk mengalirkan data. Alurnya adalah: 
   authorize -> jwt callback -> session callback -> client (useSession)
   
   Anda wajib menggunakan callbacks jika:
    1. Anda butuh User ID untuk melakukan fetch data spesifik user.
    2. Anda butuh costomisasi misalnya menambahkan role seperti sistem Role/Role-based Access Control (misal: membedakan tampilan Admin dan User).
    3. Anda menggunakan API eksternal dan butuh menyimpan Access Token agar bisa digunakan untuk fetch API di sisi client.
   Jika Anda ingin mencoba menerapkannya, Anda bisa menambahkan blok callbacks di dalam authOptions.
   
  Tanpa Menggunakan Callbacks:
  JWT Otomatis : NextAuth akan secara otomatis membuat token JWT yang hanya berisi data standar: name , email , dan picture (jika ada).
  Session Terbatas : Saat Anda memanggil useSession() di client-side, Anda hanya akan mendapatkan data standar tersebut.
  Data Terbuang : Meskipun di fungsi authorize Anda mengembalikan objek user lengkap (misalnya menyertakan id , role , atau token ), data tambahan tersebut tidak akan diteruskan ke session client. Data tersebut hanya "mampir" saat proses login saja.
   */
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  //custom page login, jika tidak ada maka akan menggunakan bawaan nextauth
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
