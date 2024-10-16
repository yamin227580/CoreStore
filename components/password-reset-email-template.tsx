import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  username?: string;
  updatedDate?: Date;
  resetPasswordLink: string;
}

export const ResetPasswordEmail = ({
  username,
  updatedDate,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(updatedDate);

  return (
    <Html>
      <Head />
      <Preview>You requested to update the password for your account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <h2 style={logoTitle}>My Project</h2>
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hi, {username}</Text>
            <Text style={paragraph}>
              You requested to update the password for your account on{" "}
              {formattedDate}. If this was you, then no further action is
              required.
            </Text>
            <Text style={paragraph}>
              However if you did NOT perform this password change, please{" "}
              <Link href={resetPasswordLink} style={link}>
                reset your account password
              </Link>{" "}
              immediately.
            </Text>

            <Text style={paragraph}>
              Still have questions? Please contact{" "}
              <Link href="#" style={link}>
                My Project Support
              </Link>
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              My Project Support Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmail.PreviewProps = {
  username: "My Project User",
  updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: 30,
};

const logoTitle = {
  fontSize: "22px",
  fontWeight: "600",
};

const sectionsBorders = {
  width: "100%",
  display: "flex",
};

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid rgb(145,71,255)",
  width: "102px",
};

const link = {
  textDecoration: "underline",
};
