import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export const ReportMail = ({
  organization,
  balance,
  spent,
  saved,
  type,
}: {
  balance: number;
  spent: number;
  saved: number;
  organization: string;
  type: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>
        Your last {type} for {organization}!
      </Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              See the report for your last <strong>{type}</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello there,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello, another {type} on Expensify is passed. You can see below
              all your progress in reaching your goal of having a better money
              management.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Report for the {type} of {organization}:
            </Text>
            <ul className="list-disc">
              <li className="text-black text-[14px] leading-[24px]">
                Total balance: {balance}€{" "}
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Total spent: {spent}€{" "}
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Total saved: {saved}€{" "}
              </li>
            </ul>
            <Text>
              Can&apos;t wait to see what you will be able to do next {type}!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ReportMail;
