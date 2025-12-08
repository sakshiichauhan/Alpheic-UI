# Quick Reference: Enterprise File Structure

## 📁 Visual Directory Tree

```
src/
├── app/                    # App core & providers
├── assets/                 # Static assets (images, fonts, videos)
├── components/             # Reusable UI components
│   ├── ui/                 # Base design system
│   ├── forms/              # Form components
│   ├── layout/             # Layout components
│   ├── features/           # Feature components
│   ├── modals/             # Modal components
│   └── shared/             # Shared utilities
├── features/               # Feature modules (self-contained)
│   ├── auth/
│   ├── services/
│   ├── forms/
│   ├── careers/
│   ├── insights/
│   └── design/
├── pages/                  # Route-level pages
├── routes/                 # Routing configuration
├── store/                  # Redux store setup
├── api/                    # Centralized API layer
│   ├── client/             # API client setup
│   ├── endpoints/          # Endpoint definitions
│   ├── services/           # API service functions
│   └── types/              # API types
├── hooks/                  # Custom React hooks
├── types/                  # Global TypeScript types
├── utils/                  # Utility functions
│   ├── validation/
│   ├── formatting/
│   ├── helpers/
│   ├── constants/
│   └── errors/
├── config/                 # Configuration files
├── styles/                 # Global styles
├── __tests__/              # Test utilities
└── lib/                    # Third-party wrappers
```

## 🎯 Key Principles

1. **Feature-Sliced Design**: Features are self-contained modules
2. **Separation of Concerns**: Clear boundaries between layers
3. **Type Safety**: Comprehensive TypeScript organization
4. **Centralized API**: Single source of truth for API calls
5. **Component Organization**: Atomic design principles
6. **Scalability**: Easy to add new features

## 📦 Import Patterns

```typescript
// Components
import { Button } from '@/components/ui';
import { ServiceCard } from '@/components/features/services';

// Features
import { useAuth } from '@/features/auth/hooks/useAuth';
import { fetchServices } from '@/features/services/store/servicesThunks';

// API
import { servicesService } from '@/api/services/servicesService';

// Hooks
import { useDebounce } from '@/hooks';

// Types
import type { Service } from '@/features/services/types/services.types';

// Utils
import { validateEmail } from '@/utils';
```

## 🔄 Migration Priority

1. **High Priority**
   - Create `api/` layer (centralize API calls)
   - Organize `components/` by category
   - Extract `hooks/` directory
   - Organize `types/` properly

2. **Medium Priority**
   - Reorganize `assets/` by feature
   - Move features to `features/` directory
   - Create `config/` directory
   - Organize `utils/` by category

3. **Low Priority**
   - Add test structure
   - Create `lib/` wrappers
   - Add Storybook files
   - Optimize imports

## 📋 Component Structure Template

```
ComponentName/
├── ComponentName.tsx       # Component
├── ComponentName.test.tsx  # Tests
├── ComponentName.stories.tsx # Storybook (optional)
├── ComponentName.types.ts  # Types
└── index.ts                # Barrel export
```

## 📋 Feature Structure Template

```
featureName/
├── api/
│   └── featureApi.ts
├── components/
│   └── FeatureComponent/
├── hooks/
│   └── useFeature.ts
├── store/
│   ├── featureSlice.ts
│   └── featureThunks.ts
├── types/
│   └── feature.types.ts
└── utils/
    └── featureHelpers.ts
```

## 🚀 Quick Wins

1. **Create API Client** (1-2 hours)
   - Move fetch calls to `api/client/`
   - Create service functions in `api/services/`

2. **Organize Components** (2-3 hours)
   - Move to `components/ui/`, `components/forms/`, etc.
   - Add barrel exports

3. **Extract Hooks** (1-2 hours)
   - Move custom hooks to `hooks/`
   - Organize by category

4. **Organize Types** (1 hour)
   - Move types to `types/` or feature folders
   - Remove duplicates

See `ENTERPRISE_FILE_STRUCTURE.md` for complete documentation.

