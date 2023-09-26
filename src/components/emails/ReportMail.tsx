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

export const ReportMail = ({ organization, balance, spent, saved }: { balance: number, spent: number, saved:number, organization: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Your last month for {organization}!</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              See the report for your last <strong>month</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello there,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello, another month on Expensify is passed. You can see below all
              your progress in reaching your goal of having a better money
              management.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Report for the month of January 2024 for {organization}:
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
              Can't wait to see what you will be able to do next month!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ReportMail;
