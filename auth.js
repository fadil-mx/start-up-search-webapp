import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID } from "./sanity/lib/queries";
import { writeclient } from "./sanity/lib/Write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({
            user: { name, email, image },
            profile: { id, login, bio },
        }) {
            const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID, { id });
            if (!existingUser) {
                await writeclient.create({
                    _type: "author",
                    id,
                    name,
                    username: login,
                    email,
                    image,
                    bio: bio || "",
                });
            }

            return true;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const user = await client
                    .withConfig({ useCdn: false })
                    .fetch(AUTHOR_BY_GITHUB_ID, {
                        id: profile?.id,
                    });

                token.id = user?._id;
                token.name = user?.name;

            }

            return token;
        },
        async session({ session, token }) {
            Object.assign(session, { id: token.id });
            Object.assign(session, { name: token.name });

            return session;
        },
    }

})