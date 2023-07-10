import React from "react";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectionToDB } from "@utils/database";
import User from '@models/user'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionuser = await User.findOne({
      email: session.user.email
    })

    session.user.id = sessionuser._id.toString();
  },
  async signIn({ profile}) {

    try {
        await connectionToDB();


        // check if the user already exists

        const userExists = await User.findOne({
          email: profile.email
        });


        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ","").toLowerCase(),
            image: profile.picture,
          })

          
        }



        return true;
    }catch(error){
        console.log(error);
        return false;

    }
  }
});

export { handler as GET, handler as POST};
