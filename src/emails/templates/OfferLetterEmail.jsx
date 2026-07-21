// Fixed: Explicit React import required for serverless JSX rendering
import * as React from 'react';
import { Html, Head, Preview, Body, Container, Section, Text } from '@react-email/components';
import { theme } from '../theme';
import { EmailHero } from '../components/EmailHero';
import { OfferSummary } from '../components/OfferSummary';
import { CTAButtons } from '../components/CTAButtons';
import { EmailFooter } from '../components/EmailFooter';

// Fixed: Using default export function syntax explicitly
export default function OfferLetterEmail({
  studentName,
  studentEmail,
  prn,
  college,
  domainName,
  role,
  startDate,
  endDate,
  mode,
  offerId,
  verificationLink
}) {
  // NOTE: No window, document, navigator, or localStorage APIs are used here.
  // This is strictly pure UI logic to ensure safe server-side rendering.
  
  return (
    <Html>
      <Head />
      <Preview>Your Internship Offer from Cosmolix Private Limited</Preview>
      <Body style={{ backgroundColor: theme.colors.background, fontFamily: theme.fonts.main, padding: '20px 0' }}>
        <Container style={{ backgroundColor: theme.colors.card, margin: '0 auto', maxWidth: '700px', borderRadius: '12px', border: `1px solid ${theme.colors.border}`, overflow: 'hidden' }}>
          
          <EmailHero studentName={studentName} />

          <Section style={{ padding: '32px 24px' }}>
            <Text style={{ color: theme.colors.primary, fontSize: '16px', margin: '0 0 16px' }}>
              Hello <strong>{studentName}</strong>,
            </Text>
            
            <Text style={{ color: theme.colors.primary, fontSize: '16px', lineHeight: '1.5' }}>
              Your application has been successfully approved by Cosmolix Private Limited. We are delighted to welcome you to our Internship Program.
            </Text>

            <OfferSummary 
              prn={prn}
              role={role}
              domainName={domainName}
              startDate={startDate}
              endDate={endDate}
              offerId={offerId}
            />

            <CTAButtons verificationLink={verificationLink} />
            
            <EmailFooter />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}