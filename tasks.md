# Task List for Investor Analysis Dashboard

## Critical Priority (User Access & Onboarding)
- [ ] Implement user authentication flows
  - [ ] Design and implement sign-up flow
    - [ ] Create sign-up form with email/password
    - [ ] Add email verification process
    - [ ] Implement OAuth options (Google, LinkedIn)
  - [ ] Design and implement login flow
    - [ ] Create login form
    - [ ] Add "forgot password" functionality
    - [ ] Implement session management
    - [ ] Add remember me functionality
- [ ] Create user onboarding experience
  - [ ] Design onboarding workflow
  - [ ] Implement data source connection steps
    - [ ] Crunchbase API integration setup
    - [ ] Database import configuration
  - [ ] Add progress indicator for onboarding steps
  - [ ] Create onboarding success state

## High Priority
- [x] Implement flexible search functionality for the investor table
  - [x] Update filtering logic to handle partial information
  - [x] Improve check size matching algorithm
  - [x] Ensure all relevant investors are shown even with incomplete queries
- [x] Refine search query logic (TOP PRIORITY)
  - [x] Improve inclusivity for broad queries
  - [x] Implement progressive refinement as more specific criteria are added
  - [x] Ensure less specific queries return more options
  - [x] Adjust logic to show all investors matching a single criterion (e.g., sector)
  - [x] Thoroughly test with various query scenarios
- [ ] Migrate dashboard functionality to Investor Overview
  - [ ] Move search functionality to Investor Overview page
  - [ ] Copy entire dashboard design as starting point
  - [ ] Adapt layout and components for the new context
- [ ] Finish the import process for your respective database
- [ ] Implement premium features paywall
  - [ ] Design upgrade prompts for premium features
  - [ ] Add payment integration for premium upgrades
  - [ ] Implement feature-gating logic for red flags
  - [ ] Create compelling upgrade messaging
- [ ] Add loading states and skeleton screens
  - [ ] Implement dashboard skeleton screen
  - [ ] Add loading states for investor list
  - [ ] Create shimmer effects for cards while loading

## Medium Priority
- [ ] Add advanced filtering options alongside text search
  - [ ] Create UI for manual filtering (dropdowns, checkboxes)
  - [ ] Allow combining manual filters with text search

## Low Priority
- [ ] Implement fuzzy matching for investor names and sectors

## Styling and UI Improvements
- [ ] Ensure consistent styling across all components
- [ ] Optimize layout for different screen sizes
- [ ] Add loading states for asynchronous operations
- [ ] Implement consistent layout structure across pages
  - [ ] Create MainLayout component for shared layout elements
  - [ ] Refactor pages to use MainLayout component
  - [ ] Ensure sidebar navigation works consistently across all pages
  - [ ] Test layout responsiveness across different pages

## Future Enhancements
- [ ] Develop personalized search based on user preferences and history

## Completed Tasks
- [x] Create basic table layout
- [x] Implement initial card components
- [x] Add search input field above the table
- [x] Implement basic

## UI/UX Improvements
- [ ] Enhance dashboard cards and investor list
  - [ ] Add appropriate icons to dashboard metric cards (Total Imported, Strike Zone, Red Flags)
  - [ ] Rename "Total Investors" to "Total Imported"
  - [ ] Add visual indicators for strike zone and red flag status in investor list
  - [x] Update total investors count to reflect actual imported/synced count
- [ ] Implement comprehensive filter system
  - [ ] Design and implement filter UI
  - [ ] Integrate filters with existing search functionality
  - [ ] Add filter persistence
