# Alpheric Project Structure

## Complete File Structure

```
src/
├── App.tsx                          # Main App component with Router and Redux Provider
├── main.tsx                         # Application entry point
├── index.css                        # Global styles
│
├── assets/                          # Static assets (images, videos, icons)
│   ├── AboutUs/                     # About Us page assets
│   │   ├── ClientsDelighted.png
│   │   ├── IndustryReach.png
│   │   ├── PartnershipsForged.png
│   │   ├── ProjectsDelivered.png
│   │   ├── Resultsretained.png
│   │   └── SuccessAchieved.png
│   │
│   ├── AboutUsPage/                 # About Us page specific assets
│   │   ├── aimshala.png
│   │   ├── BondOver.png
│   │   ├── Booktick.png
│   │   ├── Cloud.png
│   │   ├── Cog.png
│   │   ├── culture1.png - culture4.png
│   │   ├── DaljeetSingh.png
│   │   ├── Ekrocx.png
│   │   ├── Hostripples.png
│   │   ├── Hswf.png
│   │   ├── InteriorDesign.png
│   │   ├── Lightning.png
│   │   ├── Mission.png
│   │   ├── NeerajDhiman.png
│   │   ├── QuoteIcon.png
│   │   ├── QuoteLeft.png
│   │   ├── QuoteRight.png
│   │   ├── Shield.png
│   │   ├── Spark.png
│   │   ├── Vision.png
│   │   └── WhoWeAre1.jpg, WhoWeAre2.jpg
│   │
│   ├── Answers/                     # Answer section assets
│   │   └── Answer1.png
│   │
│   ├── CareerPage/                  # Career page assets
│   │   ├── bg.png
│   │   ├── bg2.jpg
│   │   ├── BlackQuote.png
│   │   ├── Business.png
│   │   ├── Design.png
│   │   ├── o1.png - o4.png
│   │   ├── Positions.png
│   │   ├── Star.png
│   │   ├── Tech.png
│   │   └── VikramSingh.png
│   │
│   ├── Carousel/                    # Carousel images
│   │   ├── asset1.jpeg - asset5.jpeg
│   │
│   ├── ClientsLogo/                 # Client logo images
│   │   ├── AimA1.png
│   │   ├── Aimshala.png
│   │   ├── AmberGroup.png
│   │   ├── Aqualogica.png
│   │   ├── ASC.png
│   │   ├── Avenys.png
│   │   ├── BAchpanBachaoAndolan.png
│   │   ├── BearBask.png
│   │   ├── BeautyClub.png
│   │   ├── BigBingo.png
│   │   ├── BookTIk.png
│   │   ├── BOS.png
│   │   ├── CERTIN.png
│   │   ├── CodeBright.png
│   │   ├── DEF.png
│   │   ├── Dominos.png
│   │   ├── DoxinBird.png
│   │   ├── DRDO.png
│   │   ├── Drum.png
│   │   ├── Dunkins.png
│   │   ├── Ekrocx.png
│   │   ├── Estates.png
│   │   ├── Fitvio.png
│   │   ├── GeoExpert.png
│   │   ├── GrandAjnara.png
│   │   ├── GrandOmaxe.png
│   │   ├── GraphicAds.png
│   │   ├── Gulshans.png
│   │   ├── HELOGOPHYGITAL.png
│   │   ├── HimachalDigital.png
│   │   ├── Honasa.png
│   │   ├── Hostripple.png
│   │   ├── HSWFNetwork.png
│   │   ├── HurrysPrantha.png
│   │   ├── HypeMagazine.png
│   │   ├── IPD.png
│   │   ├── IstStartMovingAndStorage.png
│   │   ├── Jubliant.png
│   │   ├── Kheloge.png
│   │   ├── Magnus.png
│   │   ├── MamaEarth.png
│   │   ├── Maww.png
│   │   ├── NISG.png
│   │   ├── Notifire.png
│   │   ├── Ocirich.png
│   │   ├── ODEA.png
│   │   ├── Popeyes.png
│   │   ├── PSEB.png
│   │   ├── SamraConstructions.png
│   │   ├── Satyarthi.png
│   │   ├── Semiconic.png
│   │   ├── ShopRun.png
│   │   ├── Super4.png
│   │   ├── Supertech.png
│   │   ├── TATA.png
│   │   ├── TheDarmaCo.png
│   │   ├── TheInteriorDesign.png
│   │   └── Tris.png
│   │
│   ├── CommingSoon/                 # Coming soon page assets
│   │   ├── background.jpg
│   │   ├── comming-soon.gif
│   │   ├── Container.png
│   │   ├── facebook.png
│   │   ├── girls.png
│   │   ├── instagram.png
│   │   ├── linkedin.png
│   │   ├── react.svg
│   │   ├── threads.png
│   │   ├── tik.png
│   │   ├── twitter.png
│   │   ├── vision.gif
│   │   └── youtube.png
│   │
│   ├── ContractUS/                  # Contact Us page assets
│   │   ├── Call.png
│   │   ├── Chat.png
│   │   ├── Edit.png
│   │   ├── Mail.png
│   │   ├── Office1.png - Office3.png
│   │   └── subhero.png
│   │
│   ├── Customer-icons/              # Customer icon assets
│   │   ├── Chanel.png
│   │   ├── coca-cola.png
│   │   ├── Double.png
│   │   ├── Gucci.png
│   │   ├── Hm.png
│   │   ├── Hyundai.png
│   │   ├── Lacoste.png
│   │   ├── play.png
│   │   ├── Puma.png
│   │   ├── Rage.png
│   │   ├── Rolex.png
│   │   ├── Starbuck.png
│   │   ├── Versace.png
│   │   └── Vl.png
│   │
│   ├── Homeicons/                   # Home page icons
│   │   ├── asset-1.png - asset-5.png
│   │
│   ├── Homepage/                    # Homepage specific assets
│   │   ├── alpheric-a1.jpeg
│   │   ├── alpheric-gif.gif
│   │   ├── alpheric-icon.png
│   │   ├── Arrow.png
│   │   ├── asset.png
│   │   ├── design-asset-cropped.png
│   │   ├── menu.png
│   │   ├── reelPoster.png
│   │   ├── spiral.png
│   │   └── text.png
│   │
│   ├── logo/                        # Logo variations and brand assets
│   │   ├── behance.png
│   │   ├── Blacklogo.png
│   │   ├── Chat.png
│   │   ├── Circle.png
│   │   ├── dribble.png
│   │   ├── FoorDribble.png
│   │   ├── FoorInsta.png
│   │   ├── FootBehance.png
│   │   ├── FootLinkdin.png
│   │   ├── Hands.png
│   │   ├── insta.png
│   │   ├── Laptop.png
│   │   ├── linkdin.png
│   │   ├── logo1.png - logo7.png
│   │   ├── People.png
│   │   ├── Puzzle.png
│   │   ├── Rocket.png
│   │   ├── Search.png
│   │   ├── Sparky.png
│   │   ├── Tik.png
│   │   └── Whitelogo.png
│   │
│   ├── OurProjects/                 # Project showcase images
│   │   ├── p1.png, p1s.png
│   │   ├── p2.png, p2s.png
│   │   ├── p3.png, p3s.png
│   │   └── p4.png, p4s.png
│   │
│   ├── Pilot_assets/                # Pilot program assets
│   │   └── [15 files: 12 PNG, 2 JPEG, 1 SVG]
│   │
│   ├── ServicePage/                 # Service page assets
│   │   └── [27 PNG files]
│   │
│   ├── Solutions/                   # Solution images
│   │   ├── Blank.png
│   │   ├── Build.jpg
│   │   ├── Business.jpg
│   │   ├── Consult.jpg
│   │   ├── Design.jpg
│   │   ├── Host.jpg
│   │   └── Market.jpg
│   │
│   ├── Ticker/                      # Ticker animation assets
│   │   └── [12 SVG files]
│   │
│   ├── Tools/                       # Tool icons/images
│   │   └── [33 PNG files]
│   │
│   ├── Video/                       # Video files
│   │   └── [2 MP4, 1 PNG]
│   │
│   ├── Videos/                      # Additional video assets
│   │   └── [1 PNG file]
│   │
│   ├── WhatNext/                    # What's next section assets
│   │   └── [3 PNG files]
│   │
│   ├── dummy.png                    # Placeholder images
│   ├── dummy2.png
│   └── dummy3.png
│
├── Brief/                           # Brief/Proposal documents
│   ├── Brief.png
│   ├── Contract.jpg
│   └── Proposal.jpg
│
├── Components/                      # Reusable UI components
│   ├── Button.tsx                   # Button component
│   ├── CarouselCard.tsx             # Carousel card component
│   ├── Checkbox.tsx                 # Checkbox input component
│   ├── InputField.tsx               # Input field component
│   ├── ParsedHtml.tsx               # HTML parser component
│   ├── QuestionnaireCard.tsx        # Questionnaire card component
│   ├── RadioButton.tsx              # Radio button component
│   ├── ScrollToTop.tsx              # Scroll to top functionality
│   ├── SelectField.tsx              # Select dropdown component
│   ├── ServiceCard.tsx              # Service card component
│   ├── SneekPeak.tsx                # Sneak peek component
│   ├── SolutionCard.tsx             # Solution card component
│   │
│   └── PopUp/                       # Modal/Popup components
│       ├── ApplicationRecieved.tsx  # Application received modal
│       ├── ContactModal.tsx         # Contact modal
│       ├── ModalForm.tsx            # Generic modal form
│       ├── StartPilotModal.tsx      # Start pilot modal
│       ├── ThankYouForPilot.tsx     # Thank you for pilot modal
│       ├── ThankYouMessage.tsx      # Thank you message modal
│       └── ViewScope.tsx            # View scope modal
│
├── Layouts/                         # Layout components
│   ├── Footer.tsx                   # Footer component
│   └── Navbar.tsx                   # Navigation bar component
│
├── pages/                           # Page components and sections
│   ├── AboutPage/                   # About page sections
│   │   ├── Collaborate.tsx
│   │   ├── CorePillar.tsx
│   │   ├── CultureSection.tsx
│   │   ├── Ecosystem.tsx
│   │   ├── FoundersSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Journey.tsx
│   │   ├── Philosophy.tsx
│   │   ├── Quote.tsx
│   │   ├── SubHero.tsx
│   │   ├── VisionMission.tsx
│   │   ├── WhatWeDo.tsx
│   │   └── WhoWeAre.tsx
│   │
│   ├── AboutUs.tsx                  # About Us main page
│   │
│   ├── ActionPage/                  # Action page sections
│   │   ├── HeroSection.tsx
│   │   └── SubHero.tsx
│   │
│   ├── Actions.tsx                  # Actions main page
│   │
│   ├── Build.tsx                    # Build page
│   │
│   ├── CareerPage/                  # Career page sections
│   │   ├── frequentlyAskedQuestions.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HiringProcess.tsx
│   │   ├── InternshipsSection.tsx
│   │   ├── OpenPosition.tsx
│   │   ├── ReadyToGrow.tsx
│   │   ├── SubHero.tsx
│   │   ├── TestimonialSlider.tsx
│   │   └── WhyJoin.tsx
│   │
│   ├── Careers.tsx                  # Careers main page
│   │
│   ├── CaseStudy.tsx                # Case study page
│   │
│   ├── ComminSoon.tsx               # Coming soon page
│   │
│   ├── Consult.tsx                  # Consult page
│   │
│   ├── ContactUs.tsx                # Contact Us page
│   │
│   ├── Contractus/                  # Contract Us page sections
│   │   ├── ContractForm.tsx
│   │   ├── ContractSection.tsx
│   │   ├── FrequentlyAskedQuestions.tsx
│   │   ├── HeroSection.tsx
│   │   ├── NewBusinessInquiry.tsx
│   │   ├── OfficesSection.tsx
│   │   └── Subhero.tsx
│   │
│   ├── ContractUsFinal/             # Contract Us final page sections
│   │   ├── CallToActionBanner.tsx
│   │   ├── ContractFormSection.tsx
│   │   ├── ContractGrid.tsx
│   │   ├── HeroSection.tsx
│   │   └── OpenToSection.tsx
│   │
│   ├── DesignPage/                  # Design page sections
│   │   ├── DesignPractice.tsx
│   │   ├── Homepage.tsx
│   │   ├── Table.tsx
│   │   ├── ToolsSection.tsx
│   │   └── UxDesgin.tsx
│   │
│   ├── DesignPage.tsx               # Design page main
│   │
│   ├── Dreamers/                    # Dreamers page sections
│   │   ├── DreamerTable.tsx
│   │   ├── Homepage.tsx
│   │   ├── OutcomesSection.tsx
│   │   └── WhoItHelps.tsx
│   │
│   ├── form.tsx                     # Form component
│   │
│   ├── Homepage/                    # Homepage sections
│   │   ├── AboutUs.tsx
│   │   ├── AnswerQuestion.tsx
│   │   ├── ClientLogoMarquee.tsx
│   │   ├── Contact.tsx
│   │   ├── Design.tsx
│   │   ├── frequentlyAskedQuestions.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Hire.tsx
│   │   ├── Latest insights.tsx
│   │   ├── OurProjects.tsx
│   │   ├── Piolet.tsx
│   │   ├── Questionnaire.tsx
│   │   ├── Solution.tsx
│   │   └── WhatNext.tsx
│   │
│   ├── Homepage.tsx                 # Homepage main
│   │
│   ├── Host.tsx                     # Host page
│   │
│   ├── Industries/                  # Industries page sections
│   │   ├── IndustriesHero.tsx
│   │   └── IndustriesSection.tsx
│   │
│   ├── Industries.tsx               # Industries main page
│   │
│   ├── Inquiry.tsx                  # Inquiry page
│   │
│   ├── Insights.tsx                 # Insights main page
│   │
│   ├── InsightsPage/                # Insights page sections
│   │   ├── BlogLayout.tsx
│   │   ├── HeroSection.tsx
│   │   ├── InsightsKeyDetails.tsx
│   │   └── UpdatesSection.tsx
│   │
│   ├── JobDetails/                  # Job details page
│   │   └── JobDetailsPage.tsx
│   │
│   ├── KeyDetails/                  # Key details page sections
│   │   ├── ArticleLayout.tsx
│   │   └── KeyDetails.tsx
│   │
│   ├── LetsTalk/                    # Let's Talk page sections
│   │   ├── ContactForm.tsx
│   │   └── HeroSection.tsx
│   │
│   ├── LetsTalk.tsx                 # Let's Talk main page
│   │
│   ├── Market.tsx                   # Market page
│   │
│   ├── Network.tsx                  # Network page
│   │
│   ├── OurServices/                 # Our Services page sections
│   │   ├── BuildSection.tsx
│   │   ├── ConsultSection.tsx
│   │   ├── DesignSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HireSection.tsx
│   │   ├── HostSection.tsx
│   │   ├── IndustriesSection.tsx
│   │   ├── MarketSection.tsx
│   │   ├── PilotSection.tsx
│   │   └── Technology.tsx
│   │
│   ├── Pilot/                       # Pilot page sections
│   │   ├── CardGrid.tsx
│   │   ├── Dreamers.tsx
│   │   ├── HeroSection.tsx
│   │   ├── PilotProgrammTable.tsx
│   │   ├── PilotsWork.tsx
│   │   ├── Reports.tsx
│   │   ├── StartPilotForm.tsx
│   │   └── StartSmall.tsx
│   │
│   ├── Pilot.tsx                    # Pilot main page
│   │
│   ├── Secure.tsx                   # Secure page
│   │
│   ├── Services/                    # Services page sections
│   │   ├── Contact.tsx
│   │   ├── DesignExpert.tsx
│   │   ├── DesignInsights.tsx
│   │   ├── HireDesigner.tsx
│   │   ├── Human.tsx
│   │   ├── HumanCenter.tsx
│   │   ├── Industries.tsx
│   │   ├── LetsTalk.tsx
│   │   ├── OurWork.tsx
│   │   ├── Question.tsx
│   │   ├── StartPilot.tsx
│   │   ├── UiDesgin.tsx
│   │   ├── WhatWeOffer.tsx
│   │   ├── Whitepapers.tsx
│   │   └── WhyChooseUs.tsx
│   │
│   ├── Services.tsx                 # Services main page
│   │
│   ├── StartProject/                # Start Project page sections
│   │   ├── BusinessInquiry.tsx
│   │   ├── LetBuild.tsx
│   │   ├── RefFaq.tsx
│   │   ├── WantTalk.tsx
│   │   ├── WhatHappen.tsx
│   │   └── WhatMake.tsx
│   │
│   ├── Technology/                  # Technology page sections
│   │   ├── CaseStudies.tsx
│   │   ├── Faq.tsx
│   │   ├── HireAlpheric.tsx
│   │   ├── OurExperience.tsx
│   │   ├── TechnologyBuild.tsx
│   │   └── WhatDeliver.tsx
│   │
│   ├── ThankYou/                    # Thank You page sections
│   │   ├── thankYouConfig.tsx
│   │   └── ThankYouWrapper.tsx
│   │
│   └── ThankYou.tsx                 # Thank You main page
│
├── routes/                          # Routing configuration
│   └── AppRoutes.tsx                # Main routing configuration
│
├── store/                           # Redux store configuration
│   ├── index.ts                     # Store configuration and setup
│   ├── rootReducer.ts               # Root reducer combining all slices
│   │
│   └── Slice/                       # Redux slices (feature-based state management)
│       ├── authSlice.ts             # Authentication slice
│       │
│       ├── letsTalkForm/            # Let's Talk form related slices
│       │   ├── consultingThunk.ts   # Consulting form thunk
│       │   ├── formSubmissionSlice.ts # Form submission slice
│       │   ├── inquiryThunk.ts      # Inquiry form thunk
│       │   ├── services.ts          # Services slice
│       │   ├── supportThunk.ts      # Support form thunk
│       │   └── uploadThunk.ts       # File upload thunk
│       │
│       └── UxDesgin/                # UX Design related slices
│           ├── DesginPageThunk.ts   # Design page thunk
│           ├── ServiceThunk.ts      # Service thunk
│           └── UxDesgin.ts          # UX Design slice
│
└── utils/                           # Utility functions and helpers
    └── [Currently empty - ready for utility functions]
```

## Directory Organization Summary

### Core Application Files
- **App.tsx**: Main application component with routing and state management setup
- **main.tsx**: Application entry point
- **index.css**: Global styles

### Assets (`assets/`)
Organized by feature/page with subdirectories for:
- Page-specific assets (AboutUs, CareerPage, Homepage, etc.)
- Shared assets (logo, ClientsLogo, Tools, etc.)
- Media files (Video, Videos, Carousel)

### Components (`Components/`)
Reusable UI components organized by functionality:
- Form components (Button, InputField, Checkbox, RadioButton, SelectField)
- Display components (CarouselCard, ServiceCard, SolutionCard, QuestionnaireCard)
- Utility components (ScrollToTop, ParsedHtml, SneekPeak)
- Modal components (PopUp directory)

### Layouts (`Layouts/`)
Shared layout components:
- Navbar: Navigation bar
- Footer: Footer component

### Pages (`pages/`)
Page components organized by feature:
- Each main page has its own directory with section components
- Main page files (e.g., `Homepage.tsx`, `Services.tsx`) compose section components
- Section components are in subdirectories (e.g., `Homepage/`, `Services/`)

### Routes (`routes/`)
- **AppRoutes.tsx**: Centralized routing configuration

### Store (`store/`)
Redux state management:
- **index.ts**: Store configuration
- **rootReducer.ts**: Combines all reducers
- **Slice/**: Feature-based slices organized by domain:
  - `authSlice.ts`: Authentication
  - `letsTalkForm/`: Form-related state and thunks
  - `UxDesgin/`: UX Design feature state

### Utils (`utils/`)
Utility functions and helpers (currently empty, ready for use)

### Brief (`Brief/`)
Document assets (Brief, Contract, Proposal images)

## Best Practices Observed

1. **Feature-based organization**: Pages and related components are grouped together
2. **Separation of concerns**: Components, pages, layouts, and store are clearly separated
3. **Asset organization**: Assets are organized by page/feature for easy maintenance
4. **Redux structure**: Store is organized with feature-based slices
5. **Component reusability**: Shared components are in the Components directory

## Recommendations

1. **Utils directory**: Consider adding utility functions for:
   - API helpers
   - Form validation
   - Date formatting
   - Common calculations
   - Constants

2. **Types directory**: Consider adding a `types/` directory for TypeScript type definitions

3. **Constants directory**: Consider adding a `constants/` directory for app-wide constants

4. **Hooks directory**: Consider adding a `hooks/` directory for custom React hooks

5. **API directory**: Consider adding an `api/` directory for API service functions

