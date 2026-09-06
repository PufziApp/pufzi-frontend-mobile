# 🐾 PufZi Mobile

Mobile application for **PufZi**, built with **React Native + TypeScript**.

## Requirements

Before running the project, make sure you have:

- Node.js 22+
- Android Studio + Android SDK (for Android)
- macOS + Xcode (for iOS)

## Setup

Clone the repository and install all project dependencies:

```bash
git clone <repository-url>
cd pufzi-frontend-mobile
npm install
```

`npm install` installs all required project dependencies.

## Run on Android

Start an emulator from **Android Studio → Device Manager**.

Start Metro:

```bash
npm start
```

Then, in a second terminal:

```bash
npm run android
```

## Run on iOS

> iOS development requires **macOS + Xcode**.

Install the iOS native dependencies when needed:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

Start Metro:

```bash
npm start
```

Then, in a second terminal:

```bash
npm run ios
```

The app will build and open in the iOS Simulator.

## Code Checks

Run ESLint:

```bash
npm run lint
```

Check translations:

```bash
npm run check:translations
```

Before every commit, **Husky automatically runs both checks**. If a check fails, the commit is blocked.

## Languages

The application supports:

- 🇬🇧 English
- 🇷🇴 Romanian
- 🇭🇺 Hungarian

Translation files are located in:

```text
src/i18n/locales/
```

## Quick Start

### Android

```bash
npm install
npm start
```

Second terminal:

```bash
npm run android
```

### iOS (macOS only)

```bash
npm install
cd ios
bundle install
bundle exec pod install
cd ..
npm start
```

Second terminal:

```bash
npm run ios
```
