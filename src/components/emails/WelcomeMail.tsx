import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export const WelcomeMail = ({ name }: { name: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Expensify!</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome <strong>{name}</strong> on <strong>Expenify</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We&apos;re happy to see you joined our application for the first time
              and we are sure you will love it as we already do!
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Remember that for any assistance you can contact us at{" "}
              <Link
                href={"mailto:hello@michelemanna.me"}
                className="text-blue-600 no-underline"
              >
                hello@michelemanna.me
              </Link>
            </Text>
            <Text>» Michele from Expensify</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeMail;
