# NexoMedix Mobile App

A cross-platform mobile chat application built with Expo, allowing users to interact with specialists.

## 🌟 Features

- Find specialist
- Schedule appointments with specialist
- Cross-platform compatibility (iOS, Android)
- Clean and intuitive UI with custom components
- Dark/Light theme support
- Secure API key management

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Clerk API key

### Environment Setup

1. Create a `.env` file in the root directory:
   ```bash
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=clerk_publishable_key
   EXPO_PUBLIC_BACKEND_URL=api_url
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

## 🏗️ Project Structure

```
project-root/
├── app/                   # Main application code
│   ├── (tabs)/            # Tab-based navigation
│        └── index.tsx     # Entry point
│   ├── (modals)/          # Modals used
│   ├── auth/              # Auth related pages
│   ├── schedule/          # Schedule related pages
│   ├── specialist/        # Specialist related pages
│   ├── specialist-form/   # Specialist Form related pages
│   ├── _layout.tsx        # Root layout configuration
├── assets/                # Static assets
├── components/            # Reusable UI components
├── constants/             # App constants and theme
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── services/             # API and utility services
└── types/                # TypeScript type definitions
```

## 🛠️ Development

### Adding New Features

1. **New Components**
   - Place reusable components in `/components`
   - Follow the existing component structure

2. **API Integration**
   - Add new API services in `/services`
   - Use environment variables for sensitive data

3. **Styling**
   - Use theme constants from `/constants/Colors`
   - Follow responsive design patterns

### Running in Development

```bash
# Start Expo development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android
```


## 🔐 Security

- Never commit the `.env` file
- Keep API keys secure
- Follow Expo's security best practices

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue in the repository
- Contact the development team