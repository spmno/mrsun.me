import { siteConfig } from './site';

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface HowToSchema {
  type: 'HowTo';
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  estimatedCost?: {
    type: 'MonetaryAmount';
    currency: string;
    value: string;
  };
  supply?: Array<{
    type: 'HowToSupply';
    name: string;
  }>;
  tool?: Array<{
    type: 'HowToTool';
    name: string;
  }>;
  step: Array<{
    type: 'HowToStep';
    position: number;
    name: string;
    text: string;
    image?: string;
  }>;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchema {
  type: 'FAQPage';
  mainEntity: Array<{
    type: 'Question';
    name: string;
    acceptedAnswer: {
      type: 'Answer';
      text: string;
    };
  }>;
}

export function generateHowToSchema({
  name,
  description,
  image,
  totalTime,
  steps,
}: {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  steps: HowToStep[];
}): HowToSchema {
  return {
    type: 'HowTo',
    name,
    description,
    ...(image && { image }),
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      type: 'HowToStep' as const,
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}

export function generateFAQSchema(items: FAQItem[]): FAQSchema {
  return {
    type: 'FAQPage',
    mainEntity: items.map((item) => ({
      type: 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        type: 'Answer' as const,
        text: item.answer,
      },
    })),
  };
}
