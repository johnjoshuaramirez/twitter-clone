import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextPageContext, NextApiRequest, NextApiResponse } from "next";

export async function getServerSideProps(context: NextPageContext) {
  let req: NextApiRequest = context.req as NextApiRequest;
  let res: NextApiResponse = context.res as NextApiResponse;

  if (!req) {
    throw new Error("Request object is undefined.");
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Notifications = () => {
  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
