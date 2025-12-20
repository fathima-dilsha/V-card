# vCard Application - Frontend UI

A modern React/Next.js frontend application for creating and managing digital business cards (vCards) with user authentication.

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── auth/                     # Authentication pages
│   │   ├── page.tsx              # Auth home page
│   │   ├── register/page.tsx      # Registration page
│   │   └── login/page.tsx         # Login page
│   ├── dashboard/page.tsx         # Main vCard editor
│   ├── vcard/[id]/page.tsx        # Public vCard view
│   └── layout.tsx                # Root layout
│
├── components/                   # Reusable React components
│   ├── auth/                     # Authentication components
│   │   ├── RegisterForm.tsx       # Registration form
│   │   └── LoginForm.tsx          # Login form
│   │
│   ├── vcard/                    # vCard management components
│   │   ├── BasicInfo.tsx          # Basic info (name, job, company)
│   │   ├── HeadingDescription.tsx # Heading & description
│   │   ├── ContactDetails.tsx     # Contact details (mobile, email, address)
│   │   ├── SocialLinks.tsx        # Social media links
│   │   ├── WebLinks.tsx           # Website/portfolio links
│   │   ├── VideoUrl.tsx           # Video URL (YouTube/Vimeo)
│   │   ├── VCardPreview.tsx       # vCard preview/display
│   │   └── VCardEditor.tsx        # Main editor with tabs
│   │
│   └── ui/                       # UI primitives
│       └── button.tsx            # Button component
│
├── interfaces/                   # TypeScript interfaces
│   └── vcard.ts                  # vCard data models
│
├── api/                          # API service
│   └── vcard.ts                  # vCard API client
│
├── service/                      # Business logic services
│   └── axios.ts                  # HTTP client setup
│
├── utility/                      # Helper utilities
│   ├── encryption.ts             # Encryption utilities
│   ├── LocalStorage.ts           # Local storage wrapper
│   └── toLocalISOString.ts        # Date/time utilities
│
├── hooks/                        # Custom React hooks
│   └── use-mobile.ts             # Mobile detection hook
│
└── lib/                          # Library utilities
    └── utils.ts                  # General utilities
```

## Features

### 🔐 Authentication Module

- **User Registration**: Register with full name, email, and password
- **User Login**: Email and password-based authentication
- **Session Management**: Token-based authentication ready

### 📇 vCard Management

#### 1. Basic Information

- Name
- Job Title
- Company Name

#### 2. Heading & Description

- Short heading text
- Detailed description (up to 500 characters)

#### 3. Contact Details (Multiple)

- Mobile numbers
- Email addresses
- Physical addresses

#### 4. Social Links (Multiple)

- Supported platforms: Instagram, Facebook, LinkedIn, Twitter, YouTube, GitHub, TikTok, WhatsApp
- Profile URLs

#### 5. Web Links (Multiple)

- Title and URL for blogs, portfolios, etc.

#### 6. Video URL

- Support for YouTube and Vimeo videos

#### 7. vCard Preview

- Full-page preview of the created vCard
- Responsive design
- Clickable links and contact info

## Component Details

### Authentication Components

#### `RegisterForm.tsx`

- Validates all required fields
- Password confirmation
- Minimum 6-character password requirement
- Error handling and loading states

#### `LoginForm.tsx`

- Email and password validation
- Error handling and loading states
- Clear feedback to user

### vCard Components

#### `BasicInfo.tsx`

- Editable form for name, job title, and company
- Auto-save functionality
- Success/error messages

#### `HeadingDescription.tsx`

- Character counters for heading (100 max) and description (500 max)
- Textarea for detailed description
- Validation and auto-save

#### `ContactDetails.tsx`

- Add multiple contact details
- Support for mobile, email, and address types
- Remove individual contacts
- Displays added contacts in a list

#### `SocialLinks.tsx`

- Select from predefined platforms
- URL validation
- Preview of links before saving
- Open links in new tab

#### `WebLinks.tsx`

- Add custom titled web links
- URL validation
- Display link title and URL
- Edit and remove functionality

#### `VideoUrl.tsx`

- YouTube and Vimeo URL validation
- Optional field
- URL preview
- Link opens in new tab

#### `VCardPreview.tsx`

- Complete vCard display
- All information formatted nicely
- Clickable email links (mailto:)
- External links open in new tab
- Responsive design
- Metadata display (created/updated dates)

#### `VCardEditor.tsx`

- Main wrapper component with tab navigation
- Edit mode with all sections
- Preview mode with full vCard display
- State management for all vCard data
- Easy switching between edit and preview

### Pages

#### `/auth`

- Landing page with signup/login options
- Gradient background design
- Clear call-to-action buttons

#### `/auth/register`

- Registration form page
- Link to login page
- Clean, focused layout

#### `/auth/login`

- Login form page
- Link to registration page
- Simple, secure design

#### `/dashboard`

- Main vCard editor page
- Full editing interface
- Edit/preview tabs
- Title and description

#### `/vcard/[id]`

- Public vCard view page
- View others' vCards
- Fully responsive
- Share-ready design

## API Integration

All API calls are centralized in `src/api/vcard.ts`:

### Authentication Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### vCard Endpoints

- `GET /vcard/me` - Get current user's vCard
- `GET /vcard/:id` - Get vCard by ID
- `POST /vcard` - Create new vCard
- `PUT /vcard/:id` - Update entire vCard
- `PUT /vcard/basic-info` - Update basic info
- `PUT /vcard/contact-details` - Update contacts
- `PUT /vcard/social-links` - Update social links
- `PUT /vcard/web-links` - Update web links
- `PUT /vcard/video-url` - Update video URL

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Installation & Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   ```

3. **Run development server**:

   ```bash
   npm run dev
   ```

4. **Open browser**:
   ```
   http://localhost:3000
   ```

## Data Models

### User

```typescript
{
  id: string;
  fullName: string;
  email: string;
  vCard?: VCard;
}
```

### VCard

```typescript
{
  id?: string;
  userId: string;
  name: string;
  jobTitle: string;
  companyName: string;
  heading: string;
  description: string;
  contactDetails: ContactDetail[];
  socialLinks: SocialLink[];
  webLinks: WebLink[];
  videoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

### ContactDetail

```typescript
{
  id?: string;
  type: "mobile" | "email" | "address";
  value: string;
}
```

### SocialLink

```typescript
{
  id?: string;
  platform: string;
  url: string;
}
```

### WebLink

```typescript
{
  id?: string;
  title: string;
  url: string;
}
```

## Styling

- **Framework**: Tailwind CSS
- **Utilities**: Responsive classes, flexbox, grid
- **Colors**: Blue accent (#0066cc), gray palette
- **Typography**: Clean, readable fonts

## Form Validation

All forms include:

- Required field validation
- Email format validation
- URL validation for web/social links
- Password strength validation (min 6 chars)
- Password confirmation matching
- Character count display

## State Management

- **React Hooks**: useState for component state
- **Server Components**: Next.js server-side rendering
- **Client Components**: "use client" directive for interactive forms

## Error Handling

- Try-catch blocks for all async operations
- User-friendly error messages
- Loading states during submissions
- Success confirmations

## Responsive Design

- Mobile-first approach
- Tailwind breakpoints (sm, md, lg, xl)
- Flexible layouts
- Touch-friendly buttons and inputs

## Next Steps for Backend Integration

1. Connect all form submissions to actual API endpoints
2. Implement authentication state management (localStorage/cookies)
3. Add loading skeletons
4. Implement error boundaries
5. Add toast notifications for better UX
6. Implement optimistic updates
7. Add image upload for profile picture
8. Add QR code generation for vCard sharing

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Optimizations

- Next.js Image optimization
- Code splitting with dynamic imports
- CSS optimization with Tailwind
- Minimal dependencies

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management

---

**Note**: This is a frontend-only implementation. Backend API endpoints need to be created using Node.js/Nest.js with MySQL and Prisma as per the tech stack requirements.
