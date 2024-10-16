import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { ShoppingBasket } from "lucide-react";

interface EmailConfirmationTemplateProps {
  userFirstname?: string;
  confirmEmailLink?: string;
}

export const EmailConfirmationTemplate = ({
  userFirstname,
  confirmEmailLink,
}: EmailConfirmationTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirm Your Account - my project</Preview>
      <Body style={main}>
        <Container style={container}>
          <ShoppingBasket width={40} height={40} />
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              Welcome to my-project! We are excited to have you on board.Please
              confirm your email address by clicking link below:
            </Text>
            <Button style={button} href={confirmEmailLink}>
              Confirm Your Account
            </Button>

            <Text style={text}>
              If you did not create account with us. Please ignore this email.
            </Text>
            <Text style={text}>Thanks! My project team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

EmailConfirmationTemplate.PreviewProps = {
  userFirstname: "Alan",
  confirmEmailLink: "",
} as EmailConfirmationTemplateProps;

export default EmailConfirmationTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
