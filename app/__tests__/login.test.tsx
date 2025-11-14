import { render, screen } from '@testing-library/react'
import LoginPage from '../login/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

// Mock toast hook so it doesn't error in tests
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

// Basic smoke test to ensure the login page renders the form and demo accounts section

describe('LoginPage', () => {
  it('renders login form and demo accounts section', () => {
    render(<LoginPage />)

    expect(screen.getByText('SMILE Insurance')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByText('Demo Accounts')).toBeInTheDocument()
  })
})
