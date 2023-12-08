/**
 * Created by viclight on 03.12.2023.
 */

import NextAuth from "next-auth";
import {authConfig} from "@/configs/auth";

const handler = NextAuth(authConfig);

export {handler as GET, handler as POST};
