import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXTAUTH_URL;

export const VercelInviteUserEmail = ({
  username,
  userImage,
  organization,
  organizationImage,
  invite,
}: {
  username: string;
  userImage?: string | null;
  organization: string;
  organizationImage: string | null;
  invite: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>Join {organization} on Expensify!</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join <strong>{organization}</strong> on <strong>Expensify</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello there,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{username}</strong> has invited you to the{" "}
              <strong>{organization}</strong> organization on{" "}
              <strong>Expensify</strong>.
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    src={
                      userImage ||
                      "https://ui-avatars.com/api/?background=random&name=" +
                        username
                    }
                    width="64"
                    height="64"
                  />
                </Column>
                <Column align="center">
                  <Img
                    src={`${baseUrl}/vercel-arrow.png`}
                    width="12"
                    height="9"
                    alt="invited you to"
                  />
                </Column>
                <Column align="left">
                  <Img
                    className="rounded-full"
                    src={
                      organizationImage ||
                      "https://ui-avatars.com/api/?background=random&name=" +
                        organization
                    }
                    width="64"
                    height="64"
                  />
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={process.env.NEXTAUTH_URL + "/api/invite/" + invite}
              >
                Join the organization
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link
                href={process.env.NEXTAUTH_URL + "/api/invite/" + invite}
                className="text-primary no-underline"
              >
                {process.env.NEXTAUTH_URL + "/api/invite/" + invite}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VercelInviteUserEmail;
