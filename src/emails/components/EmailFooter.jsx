import { Section, Text, Hr } from '@react-email/components';
import { theme } from '../theme';

export const EmailFooter = () => (
  <Section style={{ marginTop: '40px' }}>
    <Hr style={{ borderColor: theme.colors.border, margin: '20px 0' }} />
    
    {/* CEO Section */}
    <Text style={{ color: theme.colors.primary, fontWeight: 'bold', margin: '0' }}>Prathamesh Bhil</Text>
    <Text style={{ color: theme.colors.textSecondary, margin: '4px 0 16px', fontSize: '14px' }}>Founder & CEO, Cosmolix Private Limited</Text>
    <Text style={{ fontStyle: 'italic', color: theme.colors.textSecondary, borderLeft: `3px solid ${theme.colors.accent}`, paddingLeft: '12px' }}>
      "We are excited to welcome you to our growing engineering community."
    </Text>

    <Hr style={{ borderColor: theme.colors.border, margin: '30px 0 20px' }} />
    
    {/* Company Info */}
    <Text style={{ color: theme.colors.textSecondary, fontSize: '12px', textAlign: 'center', margin: '0 0 4px' }}>
      Cosmolix Private Limited | Ambethan, Pune
    </Text>
    <Text style={{ color: theme.colors.textSecondary, fontSize: '12px', textAlign: 'center', margin: '0 0 4px' }}>
      www.cosmolix.co.in | info@cosmolix.co.in
    </Text>
    <Text style={{ color: theme.colors.textSecondary, fontSize: '12px', textAlign: 'center', margin: '0' }}>
      ©2026 All rights reserved.
    </Text>
  </Section>
);