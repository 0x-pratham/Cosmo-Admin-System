import { Section, Text, Img } from '@react-email/components';
import { theme } from '../theme';

export const EmailHero = ({ studentName }) => (
  <Section style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: theme.colors.primary, borderRadius: '12px 12px 0 0' }}>
    <Img 
      src="https://i.ibb.co/fzXy3900/CX-PNG-V.png" 
      width="60" 
      height="60" 
      alt="CX Logo" 
      style={{ margin: '0 auto', marginBottom: '20px' }} 
    />
    <Text style={{ color: theme.colors.accentLight, fontSize: '16px', fontWeight: 'bold', margin: '0 0 10px' }}>
      Congratulations!
    </Text>
    <Text style={{ color: theme.colors.card, fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
      Your Internship Offer
    </Text>
    <Text style={{ color: theme.colors.card, fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
      has been officially issued.
    </Text>
  </Section>
);