import { Section, Row, Column, Text } from '@react-email/components';
import { theme } from '../theme';

export const OfferSummary = ({ prn, role, domainName, startDate, endDate, offerId }) => {
  const cardStyle = {
    backgroundColor: theme.colors.card,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: '24px',
    marginTop: '24px',
  };

  const labelStyle = { color: theme.colors.textSecondary, fontSize: '14px', margin: '0 0 4px' };
  const valueStyle = { color: theme.colors.primary, fontSize: '16px', fontWeight: 'bold', margin: '0 0 16px' };

  return (
    <Section style={cardStyle}>
      <Text style={{ color: theme.colors.primary, fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px' }}>
        Offer Summary
      </Text>
      
      <Row>
        <Column>
          <Text style={labelStyle}>Role</Text>
          <Text style={valueStyle}>{role}</Text>
        </Column>
        <Column>
          <Text style={labelStyle}>Department</Text>
          <Text style={valueStyle}>{domainName}</Text>
        </Column>
      </Row>

      <Row>
        <Column>
          <Text style={labelStyle}>Reference (Offer ID)</Text>
          <Text style={valueStyle}>{offerId}</Text>
        </Column>
        <Column>
          <Text style={labelStyle}>PRN</Text>
          <Text style={valueStyle}>{prn}</Text>
        </Column>
      </Row>

      <Row>
        <Column>
          <Text style={labelStyle}>Duration</Text>
          <Text style={valueStyle}>{startDate} &rarr; {endDate}</Text>
        </Column>
      </Row>
    </Section>
  );
};