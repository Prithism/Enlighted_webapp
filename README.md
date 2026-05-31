# EnlightEd - Modern Learning Dashboard

A premium AI-powered EdTech platform built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **AI-Powered Learning**: Intelligent recommendations and assistance
- **Comprehensive Dashboard**: Track progress, assignments, and performance
- **Interactive Components**: Engaging user interface elements
- **Mobile Responsive**: Optimized for all device sizes

## 📱 Available Pages

### ✅ Implemented Pages
- **Dashboard** (`/dashboard`) - Main overview with student stats, performance charts, and schedule
- **Assignments** (`/assignments`) - Assignment management and tracking
- **Performance** (`/performance`) - Detailed performance analytics and insights
- **Doubts** (`/doubts`) - Doubt resolution system with AI assistance
- **AI Assistant** (`/ai-assistant`) - Interactive AI chat for learning support
- **Quiz Center** (`/quiz`) - Quiz system with categories and leaderboards

### 🚧 Navigation Menu Items (Routes to be implemented)
- **Schedule** (`/schedule`) - Class scheduling and calendar
- **Batches** (`/batches`) - Batch management and group activities
- **Revision Center** (`/revision`) - Revision materials and study guides
- **Virtual Lab** (`/virtual-lab`) - Interactive virtual laboratory
- **Billing** (`/billing`) - Payment and subscription management
- **Settings** (`/settings`) - User preferences and configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/EnlightEd_app.git
cd EnlightEd_app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
EnlightEd_app/
├── app/                    # Next.js App Router pages
│   ├── ai-assistant/      # AI Assistant page
│   ├── assignments/       # Assignments management
│   ├── dashboard/         # Main dashboard
│   ├── doubts/           # Doubt resolution
│   ├── performance/      # Performance analytics
│   ├── quiz/            # Quiz system
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/            # Reusable components
│   ├── ui/              # Base UI components
│   ├── layout/          # Layout components (Sidebar, Header)
│   ├── dashboard/       # Dashboard-specific components
│   ├── charts/          # Chart components
│   └── ...              # Feature-specific components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## 🎨 Key Components

- **Sidebar Navigation**: Collapsible sidebar with smooth animations
- **Dashboard Cards**: Interactive cards with hover effects
- **Performance Charts**: Data visualization with Recharts
- **AI Chat Interface**: Real-time chat with AI assistant
- **Assignment Tracker**: Progress tracking and deadline management
- **Quiz System**: Interactive quizzes with scoring

## 🚀 Getting Started

1. **Dashboard**: Start with the main dashboard to get an overview
2. **Assignments**: Check and manage your assignments
3. **AI Assistant**: Get help with your studies
4. **Performance**: Track your learning progress
5. **Quiz Center**: Test your knowledge

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎯 Future Enhancements

- [ ] Complete remaining page implementations
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Mobile app version
- [ ] Offline support
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ by the EnlightEd Team

---

**Note**: This is an educational project showcasing modern web development practices with Next.js and TypeScript.