import type { Profile } from '@/types';

// 个人资料数据 — 在这里修改你的个人信息
export const profile: Profile = {
  name: 'DM Notes',
  title: '修炼中的技术小杂鱼',
  avatar: '/assets/images/site/avatar.jpg',
  bio: '热爱技术与开源，专注于app开发、系统设计和 AI 应用。分享学习笔记与技术思考，记录成长轨迹。',
  location: '中国',
  email: 'biolabnote.help@outlook.com',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: '小红书', url: 'https://www.xiaohongshu.com', icon: 'xiaohongshu' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    
  ],
  skills: [
    { name: 'React / TypeScript', level: 30, category: '前端' },
    { name: 'Springboot/Java', level: 30, category: '后端' },
    { name: 'PostgreSQL / MySQL', level: 30, category: '数据库' },
    { name: 'Docker / AWS', level: 20, category: 'DevOps' },
    { name: 'System Design', level: 10, category: '架构' },
    { name: 'AI / LLM/ Python', level: 20, category: 'AI' },
  ],
  timeline: [
    {
      id: '1',
      type: 'work',
      title: '流浪的技术杂鱼',
      organization: 'opc科技公司',
      period: '2023 - 至今',
      description: '一只流浪的技术杂鱼，在opc科技公司修炼中，专注于app开发和AI应用，努力提升技能水平，期待在技术的海洋中找到属于自己的方向。',
    },
    {
      id: '2',
      type: 'education',
      title: '内科学 硕士',
      organization: '同济大学',
      period: '2020 - 2023',
      description: '主修内科学，研究方向为糖尿病及其并发症治疗和管理',
    },
    {
      id: '3',
      type: 'education',
      title: '临床医学 本科',
      organization: '同济大学',
      period: '2015 - 2020',
      description: '主修临床医学。',
    },
  ],
};
