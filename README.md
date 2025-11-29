# QuranPulse v5.0 - AI-Powered Islamic SuperApp

## Project Overview

QuranPulse is Malaysia's first AI-powered Islamic SuperApp ecosystem that guides users from Iqra 1 (beginner) to Khatam Quran (advanced) with comprehensive support including AI voice analysis, multimedia content, and personalized learning paths. The platform combines traditional Islamic education with cutting-edge technology, featuring Arabic Kufi-inspired modern design and Zhipu AI integration.

## Features

- **Complete Learning Journey**: From Iqra 1 to Khatam Quran with structured progression
- **AI Voice Analysis**: Real-time feedback on pronunciation with accuracy scoring
- **Multimedia Integration**: Video, audio, and interactive content for enhanced learning
- **Islamic Compliance**: Strict adherence to JAKIM standards and Shafi'i Mazhab
- **Transparent Ethics**: Open donation system with transparent fund usage reporting
- **Ibadah Toolkit**: Prayer times, Qibla direction, Zakat calculator, and more
- **Community Features**: Leaderboards, achievements, and social learning
- **Islamic Marketplace**: Halal products and Islamic services
- **Family Plan**: Multi-account management for families

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite (PWA - Mobile First)
- **UI Framework**: Tailwind CSS v4.0 + Shadcn/UI + Framer Motion
- **State Management**: Zustand (Global) + TanStack Query (Server)
- **Backend**: Supabase (PostgreSQL) + Row Level Security (RLS)
- **AI Engine**: GLM-4 (Primary) + Google Gemini (Fallback) + OpenAI Whisper (STT)
- **Storage**: Supabase Storage (CDN) with automatic compression

## Project Structure

```
src/
├── assets/                 # Static assets (images, fonts)
│   ├── bg/                 # Background images (Kufi patterns)
│   └── branding/           # Logo and branding assets
├── modules/                # Feature modules
│   ├── auth/              # Authentication module
│   ├── dashboard/         # Dashboard module
│   ├── quran/             # Quran reading module
│   ├── iqra/              # Iqra learning module
│   ├── ai-hub/            # AI chatbot module
│   ├── multimedia/        # Video/podcast module
│   ├── ibadah/            # Prayer times, qibla, etc.
│   ├── gamification/      # Achievements, leaderboards
│   ├── souq/              # Marketplace module
│   ├── family/            # Family management
│   ├── admin/             # Admin panel
│   ├── infaq/             # Donation system
│   └── landing/           # Landing page
├── shared/                # Shared components and utilities
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services and utilities
│   └── types/             # TypeScript type definitions
├── stores/                # Zustand stores
├── lib/                   # Library configurations
├── utils/                 # Utility functions
├── types/                 # TypeScript type definitions
└── locales/               # i18n translation files
```

## Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd quranpulse-v5
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

## Database Schema

The application uses a comprehensive PostgreSQL database with the following main entities:

- **profiles**: User profiles with XP, level, subscription tier, etc.
- **quran_progress**: Quran reading progress tracking
- **iqra_tracking**: Iqra learning progress and voice analysis
- **multimedia_content**: Video and audio content management
- **prayer_tracking**: Daily prayer completion tracking
- **infaq_transactions**: Donation and transparency system
- **achievements**: Gamification and achievement system

All tables implement Row Level Security (RLS) for proper data isolation.

## Development

### Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Run production build
npm run preview

# Lint code
npm run lint
```

### Component Architecture

The application follows a modular component architecture:

- **Shared Components**: Reusable UI components in `src/shared/components`
- **Feature Modules**: Each feature has its own module with dedicated components
- **State Management**: Centralized stores in `src/stores` using Zustand
- **API Services**: Encapsulated data fetching in `src/shared/services`

### Theme System

The application uses a "Modern Digital Kufi" theme with:

- Neon Cyan (#00E5FF) as primary color
- Golden Yellow (#FFD700) as secondary color
- Deep Black (#050505) as background
- Glassmorphism effects for modern UI

## API Integration

The application integrates with various services:

- **Quran.com API**: For Quranic content and translations
- **JAKIM API**: For prayer times and Islamic calendar
- **Zhipu AI (GLM models)**: For AI-powered features
- **Supabase**: For database, authentication, and storage

## Internationalization

The app supports multiple languages with focus on Bahasa Malaysia and English. Translation files are located in the `locales/` directory.

## Testing

Coming soon - comprehensive testing setup with React Testing Library and Jest.

## Deployment

The application is designed for deployment on Vercel or similar platforms that support Vite applications. The PWA nature allows for installation on mobile devices.

### Deployment Options

#### 1. Vercel (Recommended)

The easiest way to deploy is using Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect the Vite project and build it
4. Set the following environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

#### 2. GitHub Actions + Vercel

For automated deployments from GitHub:

1. Set up the following secrets in your GitHub repository:
   - `VERCEL_TOKEN`: Your Vercel access token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

2. The workflow in `.github/workflows/deploy.yml` will automatically deploy on pushes to main branch

#### 3. Docker Deployment

Build and run with Docker:

```bash
# Build the Docker image
docker build -t quranpulse .

# Run the container
docker run -p 3000:3000 -e VITE_SUPABASE_URL=your_url -e VITE_SUPABASE_ANON_KEY=your_key quranpulse
```

Or use docker-compose:

```bash
docker-compose up -d
```

#### 4. Manual Build and Deploy

Build the project manually:

```bash
npm run build
```

The built files will be in the `dist/` directory, which you can deploy to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the development team or open an issue in the repository.