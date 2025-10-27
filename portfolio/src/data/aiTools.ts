export type AITool = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  imageUrl?: string;
};

export const aiTools: AITool[] = [
  {
    title: 'Text Summarizer',
    description: 'An AI-powered tool that generates concise summaries of long articles and documents.',
    tags: ['NLP', 'Python', 'Transformers'],
    link: '/ai-tools/text-summarizer',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
  },
  {
    title: 'Code Explainer',
    description: 'Explains complex code snippets in plain English to help you understand how they work.',
    tags: ['Code Analysis', 'Machine Learning', 'Python'],
    link: '/ai-tools/code-explainer',
    imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f',
  },
  {
    title: 'Image Generator',
    description: 'Generate unique images from text descriptions using advanced AI models.',
    tags: ['Computer Vision', 'GANs', 'Python'],
    link: '/ai-tools/image-generator',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
  },
];
