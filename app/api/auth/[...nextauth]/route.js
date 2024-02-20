import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { ConnectToDb } from "@utils/database";
import User from "@models/user";

// Connect to MongoDB before initializing NextAuth
ConnectToDb().then(() => {
  const handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ],
    callbacks: {
      async session({session}) {
        // store the user id from MongoDB to session
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();

        return session;
      },
      async signIn({profile}) {
        try {
          // check if user already exists
          const userExists = await User.findOne({ email: profile.email });

          // if not, create a new document and save user in MongoDB
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            });
          }

          return true;
        } catch(err) {
          // Handle error
          console.error("Error during sign in:", err);
          return false;
        }
      }
    }
  });

  export {handler as GET, handler as POST};
});
