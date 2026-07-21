import { Section, Button, Row, Column } from '@react-email/components';
import { theme } from '../theme';

export const CTAButtons = ({ verificationLink }) => (
  <Section style={{ textAlign: 'center', marginTop: '32px' }}>
    <Row>
      <Column align="center">
        <Button
          href={verificationLink}
          style={{
            backgroundColor: theme.colors.accent,
            color: theme.colors.card,
            padding: '14px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            textDecoration: 'none',
            display: 'inline-block',
            minWidth: '200px'
          }}
        >
          VIEW OFFER LETTER
        </Button>
      </Column>
    </Row>
  </Section>
);