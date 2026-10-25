export type EmotionType = 'angry' | 'frustrated' | 'calm' | 'confused';
export type PriorityType = 'urgent' | 'medium' | 'low';
export type TeamType = 'billing' | 'bugs' | 'features' | 'abuse' | 'general';
export type StatusType = 'open' | 'in-progress' | 'resolved' | 'auto-resolved';

export interface InternalNote {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  subject: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
    accountType: string;
    openTickets: number;
    responseTime: string;
    totalTickets?: number;
    lastPurchase?: string;
    accountAge?: string;
  };
  message: string;
  emotion: EmotionType;
  priority: PriorityType;
  team: TeamType;
  status: StatusType;
  createdAt: string;
  slaDeadline: string;
  slaMinutesRemaining: number;
  assignedTo?: string;
  tags: string[];
  responseText?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  resolutionTimeMinutes?: number;
  internalNotes?: InternalNote[];
}

export const mockTickets: Ticket[] = [
  {
    id: 'TKT-1001',
    subject: 'Cannot access my account - URGENT!',
    customer: {
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@company.com',
      avatar: 'SM',
      accountType: 'VIP Enterprise',
      openTickets: 2,
      responseTime: '<1 hour',
      totalTickets: 24,
      lastPurchase: '£5,000 - Oct 2025',
      accountAge: '3 years 4 months'
    },
    message: 'This is absolutely unacceptable! I\'ve been locked out of my account for 3 hours now and I have a critical presentation in 30 minutes. I pay £5000/month for your premium service and this is the treatment I get? Someone needs to fix this IMMEDIATELY or I\'m cancelling my entire contract!',
    emotion: 'angry',
    priority: 'urgent',
    team: 'bugs',
    status: 'open',
    createdAt: '2025-10-19T09:15:00Z',
    slaDeadline: '2025-10-19T10:15:00Z',
    slaMinutesRemaining: 32,
    tags: ['Account Access', 'VIP', 'Escalated']
  },
  {
    id: 'TKT-1002',
    subject: 'Invoice for September not received',
    customer: {
      name: 'James Cooper',
      email: 'j.cooper@email.com',
      avatar: 'JC',
      accountType: 'Standard',
      openTickets: 0,
      responseTime: '2-4 hours',
      totalTickets: 8,
      lastPurchase: '£49.99 - Sep 2025',
      accountAge: '1 year 3 months'
    },
    message: 'Hello, I haven\'t received my invoice for September yet. Could you please send it to my email? I need it for my accounting records. Thank you!',
    emotion: 'calm',
    priority: 'low',
    team: 'billing',
    status: 'auto-resolved',
    createdAt: '2025-10-19T08:30:00Z',
    slaDeadline: '2025-10-19T14:30:00Z',
    slaMinutesRemaining: 245,
    tags: ['Billing', 'Invoice'],
    responseText: 'Hi James,\n\nThank you for reaching out! I\'ve just resent your September invoice to j.cooper@email.com. You should receive it within the next few minutes.\n\nIf you don\'t see it in your inbox, please check your spam folder. The invoice number is INV-2025-09-1847.\n\nLet me know if you need anything else!\n\nBest regards,\nTicketEspresso AI Assistant',
    resolvedBy: 'AI Assistant',
    resolvedAt: '2025-10-19T08:32:00Z',
    resolutionTimeMinutes: 2
  },
  {
    id: 'TKT-1003',
    subject: 'Feature Request: Dark mode for mobile app',
    customer: {
      name: 'Priya Sharma',
      email: 'priya.s@techcorp.io',
      avatar: 'PS',
      accountType: 'Professional',
      openTickets: 1,
      responseTime: '1-2 hours',
      totalTickets: 7,
      lastPurchase: '£79.99 - Oct 2025',
      accountAge: '1 year 5 months'
    },
    message: 'Hi team! Love your product but really struggling with the bright interface at night. Would it be possible to add a dark mode to the mobile app? I know many users would appreciate this. Thanks for considering!',
    emotion: 'calm',
    priority: 'low',
    team: 'features',
    status: 'open',
    createdAt: '2025-10-19T07:45:00Z',
    slaDeadline: '2025-10-19T13:45:00Z',
    slaMinutesRemaining: 198,
    tags: ['Feature Request', 'Mobile', 'UI/UX']
  },
  {
    id: 'TKT-1004',
    subject: 'Payment failed again - getting worried',
    customer: {
      name: 'Marcus Johnson',
      email: 'marcus.j@startup.com',
      avatar: 'MJ',
      accountType: 'VIP',
      openTickets: 3,
      responseTime: '<30 min',
      totalTickets: 18,
      lastPurchase: '£299 - Oct 2025',
      accountAge: '2 years'
    },
    message: 'My payment has failed twice now and I\'m really worried my account will be suspended. I\'ve checked my card and everything looks fine on my end. This is stressing me out as we rely on your service for our business operations. Can someone please help me understand what\'s happening?',
    emotion: 'frustrated',
    priority: 'medium',
    team: 'billing',
    status: 'in-progress',
    createdAt: '2025-10-19T08:00:00Z',
    slaDeadline: '2025-10-19T11:00:00Z',
    slaMinutesRemaining: 105,
    assignedTo: 'Emma Williams',
    tags: ['Billing', 'Payment', 'VIP']
  },
  {
    id: 'TKT-1005',
    subject: 'How do I export my data?',
    customer: {
      name: 'Lisa Chen',
      email: 'lisa.chen@email.com',
      avatar: 'LC',
      accountType: 'Standard',
      openTickets: 0,
      responseTime: '3-5 hours',
      totalTickets: 3,
      lastPurchase: 'N/A - Free tier',
      accountAge: '8 months'
    },
    message: 'Hi, I need to export all my data to a CSV file but I can\'t find the option anywhere. Could you point me in the right direction? Thanks!',
    emotion: 'confused',
    priority: 'low',
    team: 'features',
    status: 'auto-resolved',
    createdAt: '2025-10-19T06:20:00Z',
    slaDeadline: '2025-10-19T12:20:00Z',
    slaMinutesRemaining: 275,
    tags: ['How-To', 'Data Export'],
    responseText: 'Hi Lisa,\n\nGreat question! Here\'s how to export your data:\n\n1. Go to Settings → Data Management\n2. Click on "Export Data"\n3. Select the data types you want to export\n4. Choose "CSV" as the format\n5. Click "Generate Export"\n\nYour CSV file will be ready to download within a few minutes, and we\'ll also email you a download link.\n\nHere\'s a direct link to get started: [Export Data Now]\n\nHope this helps!\n\nBest,\nTicketEspresso AI Assistant',
    resolvedBy: 'AI Assistant',
    resolvedAt: '2025-10-19T06:22:00Z',
    resolutionTimeMinutes: 2
  },
  {
    id: 'TKT-1006',
    subject: 'Report: Spam account posting offensive content',
    customer: {
      name: 'Admin Team',
      email: 'admin@platform.com',
      avatar: 'AT',
      accountType: 'Internal',
      openTickets: 1,
      responseTime: 'N/A',
      totalTickets: 142,
      lastPurchase: 'N/A - Internal',
      accountAge: 'N/A'
    },
    message: 'User @spammer123 is posting offensive and inappropriate content across multiple threads. Multiple reports received. Immediate action required.',
    emotion: 'calm',
    priority: 'urgent',
    team: 'abuse',
    status: 'in-progress',
    createdAt: '2025-10-19T09:30:00Z',
    slaDeadline: '2025-10-19T10:30:00Z',
    slaMinutesRemaining: 45,
    assignedTo: 'David Park',
    tags: ['Abuse', 'Urgent', 'Content Moderation']
  },
  {
    id: 'TKT-1007',
    subject: 'Dashboard loading very slowly',
    customer: {
      name: 'Robert Taylor',
      email: 'r.taylor@company.co.uk',
      avatar: 'RT',
      accountType: 'Enterprise',
      openTickets: 1,
      responseTime: '1-3 hours',
      totalTickets: 21,
      lastPurchase: '£999 - Sep 2025',
      accountAge: '4 years'
    },
    message: 'The main dashboard has been loading really slowly for the past two days. It takes about 30 seconds to load when it used to be instant. Is there an issue on your end?',
    emotion: 'confused',
    priority: 'medium',
    team: 'bugs',
    status: 'open',
    createdAt: '2025-10-19T08:45:00Z',
    slaDeadline: '2025-10-19T11:45:00Z',
    slaMinutesRemaining: 135,
    tags: ['Performance', 'Bug', 'Dashboard']
  },
  {
    id: 'TKT-1008',
    subject: 'Password reset not working!!!',
    customer: {
      name: 'Amanda Brooks',
      email: 'amanda.b@email.com',
      avatar: 'AB',
      accountType: 'Standard',
      openTickets: 2,
      responseTime: '2-4 hours',
      totalTickets: 6,
      lastPurchase: '£49.99 - Aug 2025',
      accountAge: '10 months'
    },
    message: 'I\'ve tried resetting my password 5 times and I\'m not receiving any emails! I\'ve checked spam, checked my email address is correct, everything! This is incredibly frustrating. I need to access my account NOW!',
    emotion: 'frustrated',
    priority: 'medium',
    team: 'bugs',
    status: 'open',
    createdAt: '2025-10-19T09:00:00Z',
    slaDeadline: '2025-10-19T12:00:00Z',
    slaMinutesRemaining: 115,
    tags: ['Account Access', 'Password Reset', 'Bug']
  },
  {
    id: 'TKT-1009',
    subject: 'Request for API documentation',
    customer: {
      name: 'Thomas Anderson',
      email: 'thomas.a@devshop.io',
      avatar: 'TA',
      accountType: 'Professional',
      openTickets: 0,
      responseTime: '4-6 hours',
      totalTickets: 12,
      lastPurchase: '£79.99 - Oct 2025',
      accountAge: '2 years'
    },
    message: 'Hello, I\'m integrating your API into our application. Could you please send me the latest API documentation? The link in your help centre seems to be outdated. Thanks!',
    emotion: 'calm',
    priority: 'low',
    team: 'features',
    status: 'auto-resolved',
    createdAt: '2025-10-19T05:15:00Z',
    slaDeadline: '2025-10-19T11:15:00Z',
    slaMinutesRemaining: 170,
    tags: ['API', 'Documentation'],
    responseText: 'Hi Thomas,\n\nThank you for letting us know about the outdated link! Here\'s the latest API documentation:\n\n📚 API v2.4 Documentation: https://docs.ticketespresso.com/api/v2.4\n\nKey updates in this version:\n- New webhook endpoints\n- Improved rate limiting\n- Enhanced error responses\n- GraphQL support (beta)\n\nI\'ve also flagged the broken help centre link for our team to fix.\n\nIf you have any questions during integration, feel free to reach out!\n\nHappy coding,\nTicketEspresso AI Assistant',
    resolvedBy: 'AI Assistant',
    resolvedAt: '2025-10-19T05:17:00Z',
    resolutionTimeMinutes: 2
  },
  {
    id: 'TKT-1010',
    subject: 'Charged twice for the same month!',
    customer: {
      name: 'Sophie Turner',
      email: 'sophie.turner@business.com',
      avatar: 'ST',
      accountType: 'VIP',
      openTickets: 1,
      responseTime: '<1 hour',
      totalTickets: 11,
      lastPurchase: '£299 - Oct 2025',
      accountAge: '1 year 8 months'
    },
    message: 'I just noticed I\'ve been charged TWICE for October! £299 was taken out on the 1st and another £299 today. This is completely unacceptable and I want an immediate refund. I\'m also concerned about how this even happened - do you not have proper systems in place??',
    emotion: 'angry',
    priority: 'urgent',
    team: 'billing',
    status: 'open',
    createdAt: '2025-10-19T09:40:00Z',
    slaDeadline: '2025-10-19T10:40:00Z',
    slaMinutesRemaining: 25,
    assignedTo: 'Emma Williams',
    tags: ['Billing', 'Refund', 'VIP', 'Escalated']
  },
  {
    id: 'TKT-1011',
    subject: 'Love the new update!',
    customer: {
      name: 'Oliver Green',
      email: 'oliver.g@email.com',
      avatar: 'OG',
      accountType: 'Standard',
      openTickets: 0,
      responseTime: '5-8 hours',
      totalTickets: 5,
      lastPurchase: 'N/A - Free tier',
      accountAge: '1 year'
    },
    message: 'Just wanted to say the new update is fantastic! The UI improvements make everything so much easier to use. Great work team! 🎉',
    emotion: 'calm',
    priority: 'low',
    team: 'features',
    status: 'resolved',
    createdAt: '2025-10-19T04:30:00Z',
    slaDeadline: '2025-10-19T10:30:00Z',
    slaMinutesRemaining: 85,
    tags: ['Feedback', 'Positive'],
    responseText: 'Hi Oliver,\n\nThank you so much for this wonderful feedback! 🎉 It absolutely made our day!\n\nOur design team worked really hard on this update, and hearing that it\'s making your experience better is exactly what we hoped for. I\'ll make sure to share your kind words with the entire team.\n\nWe have some exciting features coming in the next update too - stay tuned!\n\nThanks for being such a supportive user.\n\nWarm regards,\nSarah Chen\nProduct Team',
    resolvedBy: 'Sarah Chen',
    resolvedAt: '2025-10-19T04:42:00Z',
    resolutionTimeMinutes: 12
  },
  {
    id: 'TKT-1012',
    subject: 'Integration with Slack not working',
    customer: {
      name: 'Emily Davis',
      email: 'emily.d@company.com',
      avatar: 'ED',
      accountType: 'Enterprise',
      openTickets: 2,
      responseTime: '1-2 hours',
      totalTickets: 16,
      lastPurchase: '£999 - Oct 2025',
      accountAge: '2 years 6 months'
    },
    message: 'We set up the Slack integration yesterday but it\'s not sending notifications. I\'ve followed all the steps in the guide but still nothing. Not sure what I\'m missing here.',
    emotion: 'confused',
    priority: 'medium',
    team: 'bugs',
    status: 'open',
    createdAt: '2025-10-19T08:15:00Z',
    slaDeadline: '2025-10-19T11:15:00Z',
    slaMinutesRemaining: 130,
    tags: ['Integration', 'Slack', 'Bug']
  },
  {
    id: 'TKT-1013',
    subject: 'Hello how are you',
    customer: {
      name: 'John Smith',
      email: 'john.s@email.com',
      avatar: 'JS',
      accountType: 'Standard',
      openTickets: 1,
      responseTime: '3-5 hours',
      totalTickets: 2,
      lastPurchase: '£29.99 - Oct 2025',
      accountAge: '3 months'
    },
    message: 'Hello how are you',
    emotion: 'calm',
    priority: 'low',
    team: 'general',
    status: 'open',
    createdAt: '2025-10-19T09:45:00Z',
    slaDeadline: '2025-10-19T15:45:00Z',
    slaMinutesRemaining: 275,
    tags: ['Generic', 'Uncategorized', 'Needs Clarification']
  },
  {
    id: 'TKT-1014',
    subject: 'Suggestion: Bulk edit feature',
    customer: {
      name: 'Michael Brown',
      email: 'm.brown@agency.co.uk',
      avatar: 'MB',
      accountType: 'Professional',
      openTickets: 0,
      responseTime: '2-3 hours',
      totalTickets: 9,
      lastPurchase: '£79.99 - Oct 2025',
      accountAge: '1 year 2 months'
    },
    message: 'Would be great to have a bulk edit feature to update multiple items at once. Currently have to edit 100+ items individually which is time-consuming. Hope this can be considered for a future release!',
    emotion: 'calm',
    priority: 'low',
    team: 'features',
    status: 'open',
    createdAt: '2025-10-19T07:00:00Z',
    slaDeadline: '2025-10-19T13:00:00Z',
    slaMinutesRemaining: 215,
    tags: ['Feature Request', 'Productivity']
  },
  {
    id: 'TKT-1015',
    subject: 'Account suspension notice - please help!',
    customer: {
      name: 'Rachel White',
      email: 'rachel.w@startup.io',
      avatar: 'RW',
      accountType: 'Standard',
      openTickets: 1,
      responseTime: '1-2 hours',
      totalTickets: 4,
      lastPurchase: '£49.99 - Sep 2025',
      accountAge: '7 months'
    },
    message: 'I received an email saying my account will be suspended due to violation of terms, but I have no idea what I did wrong! Please can someone explain what happened? I\'m really worried and confused about this.',
    emotion: 'frustrated',
    priority: 'urgent',
    team: 'abuse',
    status: 'in-progress',
    createdAt: '2025-10-19T09:20:00Z',
    slaDeadline: '2025-10-19T10:20:00Z',
    slaMinutesRemaining: 35,
    assignedTo: 'David Park',
    tags: ['Account', 'Suspension', 'Urgent']
  },
  {
    id: 'TKT-1016',
    subject: 'Thank you for the quick support!',
    customer: {
      name: 'Daniel Lee',
      email: 'daniel.lee@email.com',
      avatar: 'DL',
      accountType: 'Professional',
      openTickets: 0,
      responseTime: '2-4 hours',
      totalTickets: 15,
      lastPurchase: '£79.99 - Oct 2025',
      accountAge: '3 years'
    },
    message: 'Just wanted to say thank you to Sarah who helped me yesterday. She was amazing and fixed my issue in minutes. Really appreciate the excellent customer service!',
    emotion: 'calm',
    priority: 'low',
    team: 'features',
    status: 'resolved',
    createdAt: '2025-10-19T03:45:00Z',
    slaDeadline: '2025-10-19T09:45:00Z',
    slaMinutesRemaining: 0,
    tags: ['Feedback', 'Positive', 'Closed'],
    responseText: 'Hi Daniel,\n\nThank you so much for taking the time to share this feedback! 😊\n\nI\'ve passed your kind words along to Sarah - she\'ll be thrilled to hear that she made such a positive impact. We really value customers like you who take the time to recognize great service.\n\nIf you ever need anything else, don\'t hesitate to reach out. We\'re always here to help!\n\nBest regards,\nEmma Williams\nCustomer Success Manager',
    resolvedBy: 'Emma Williams',
    resolvedAt: '2025-10-19T04:02:00Z',
    resolutionTimeMinutes: 17
  }
];

export const aiSuggestedResponses = {
  'TKT-1001': [
    {
      tone: 'Professional/Formal',
      text: 'Dear Sarah,\n\nI sincerely apologise for the inconvenience and frustration this has caused. I understand the urgency of your situation with your upcoming presentation.\n\nI have immediately escalated your case to our senior technical team and they are investigating the account access issue as a priority. You should receive access within the next 15 minutes.\n\nAs a VIP Enterprise customer, this service disruption is unacceptable. I will personally ensure this is resolved and follow up with you to discuss compensation for the inconvenience.\n\nBest regards,\n[Agent Name]'
    },
    {
      tone: 'Empathetic/Urgent',
      text: 'Hi Sarah,\n\nI completely understand your frustration - being locked out before a critical presentation is incredibly stressful. I\'m so sorry this happened.\n\nI\'ve flagged this as our highest priority and our tech team is working on it RIGHT NOW. I\'ll keep this ticket open and update you every 10 minutes until it\'s fixed.\n\nLet\'s get you back in ASAP.\n\n[Agent Name]'
    },
    {
      tone: 'Technical/Detailed',
      text: 'Hello Sarah,\n\nThank you for reporting this issue. I\'ve identified the problem:\n\n- Your account was temporarily locked due to multiple failed login attempts from an unrecognised IP address\n- This triggered our security protocol\n- I\'ve manually verified your identity and am unlocking your account now\n\nYour access will be restored in approximately 10-15 minutes. I\'ve also added your current IP to the trusted list to prevent this happening again.\n\nGiven the impact on your business, I\'ll arrange a follow-up discussion about service credits.\n\n[Agent Name]'
    }
  ]
};

export const knowledgeBaseArticles = [
  {
    title: 'How to Reset Your Password',
    url: '#',
    relevance: 95
  },
  {
    title: 'Account Access Troubleshooting',
    url: '#',
    relevance: 92
  },
  {
    title: 'VIP Support: Escalation Process',
    url: '#',
    relevance: 88
  }
];

export const teamStats = {
  billing: {
    name: 'Billing Team',
    openTickets: 4,
    avgResolutionTime: '2.3 hours',
    slaCompliance: 94,
    topAgent: 'Emma Williams'
  },
  bugs: {
    name: 'Technical Support',
    openTickets: 8,
    avgResolutionTime: '4.1 hours',
    slaCompliance: 87,
    topAgent: 'Alex Kumar'
  },
  features: {
    name: 'Product Team',
    openTickets: 3,
    avgResolutionTime: '6.2 hours',
    slaCompliance: 96,
    topAgent: 'Sarah Chen'
  },
  abuse: {
    name: 'Trust & Safety',
    openTickets: 2,
    avgResolutionTime: '1.8 hours',
    slaCompliance: 91,
    topAgent: 'David Park'
  }
};

export const quickResolutionTemplates = [
  {
    id: 'password-reset',
    label: 'Password Reset Sent',
    category: 'account',
    color: 'bg-blue-500',
    response: 'Hi {{name}},\n\nI\'ve sent a password reset link to {{email}}. You should receive it within the next few minutes.\n\nIf you don\'t see it, please check your spam folder. The link will expire in 24 hours.\n\nLet me know if you need any further assistance!\n\nBest regards,\n{{agent}}'
  },
  {
    id: 'refund-processed',
    label: 'Refund Processed',
    category: 'billing',
    color: 'bg-green-500',
    response: 'Hi {{name}},\n\nYour refund of {{amount}} has been processed and should appear in your account within 5-7 business days.\n\nRefund Reference: {{refundId}}\n\nIf you have any questions, please don\'t hesitate to reach out.\n\nBest regards,\n{{agent}}'
  },
  {
    id: 'bug-acknowledged',
    label: 'Bug Acknowledged',
    category: 'technical',
    color: 'bg-orange-500',
    response: 'Hi {{name}},\n\nThank you for reporting this issue. I\'ve logged it with our engineering team as ticket {{bugId}}.\n\nWe\'ll investigate and keep you updated on progress. You can track the status at: {{trackingUrl}}\n\nAppreciate your patience!\n\nBest regards,\n{{agent}}'
  },
  {
    id: 'feature-logged',
    label: 'Feature Request Logged',
    category: 'product',
    color: 'bg-purple-500',
    response: 'Hi {{name}},\n\nThank you for this great suggestion! I\'ve added it to our product roadmap for review.\n\nOur product team evaluates requests quarterly. We\'ll notify you if this feature is scheduled for development.\n\nKeep the ideas coming!\n\nBest regards,\n{{agent}}'
  },
  {
    id: 'invoice-sent',
    label: 'Invoice Sent',
    category: 'billing',
    color: 'bg-indigo-500',
    response: 'Hi {{name}},\n\nI\'ve resent your invoice to {{email}}. Invoice number: {{invoiceId}}\n\nYou should receive it within the next few minutes. Please check your spam folder if you don\'t see it in your inbox.\n\nLet me know if you need anything else!\n\nBest regards,\n{{agent}}'
  }
];
