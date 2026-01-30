// Database Schema for Portfolio Project

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  authorId: string;
  categoryId: string;
  published: boolean;
  publishedAt?: string;
  readTime: number; // in minutes
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  createdAt: string;
  updatedAt: string;
  
  // Relations
  author?: User;
  category?: Category;
  tags?: Tag[];
};

export type Comment = {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  author?: User;
  article?: Article;
  replies?: Comment[];
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number; // 1-10
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'other';
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type WorkExperience = {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  location: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
};
