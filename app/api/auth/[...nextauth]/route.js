import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDB();

        const user = await User.findOne({ username: credentials.username });

        if (user && user.password === credentials.password) {
          console.log(credentials.password);
          return true;
        } else {
          return false;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
